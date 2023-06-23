from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PreOrder, PreOrderItem
from apps.cart.models import Cart, CartItem
from apps.product.models import Product
from decimal import Decimal, InvalidOperation
from datetime import datetime, timedelta
from django.utils import timezone
from django.db import transaction

from apps.product.models import Product
from .tasks import delete_expired_preorders

class AddPreOrderView(APIView):
    @transaction.atomic
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        iva = Decimal('0.16')

        if PreOrder.objects.filter(user=user).exists():
            return Response(
                {'error': 'No puede crear otra preorden si tiene una activa.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        full_name = data['full_name']
        identification = data['identification']
        identification_types = data['identification_types']
        address_line = data['address_line']
        city = data['city']
        state_province_region = data['state_province_region']
        telephone_number = data['telephone_number']
        whatsapp_number = data['whatsapp_number']
        postal_zip_code = data['postal_zip_code']
        shipping_branch = data['shipping_branch']

        cart = Cart.objects.get(user=user)
        if not cart:
            return Response({'error': 'No hay un carrito de compras'}, status=status.HTTP_400_BAD_REQUEST)

        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Necesitas tener items en su carrito de compras'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_items = CartItem.objects.filter(cart=cart)

        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response(
                    {'error': 'Transaction failed, a product ID does not exist'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response(
                    {'error': 'El producto que seleccionó está agotado'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            total_amount = Decimal('0.0')
            for cart_item in cart_items:
                total_amount += (Decimal(cart_item.product.price) * Decimal(cart_item.count))

            total_iva = total_amount * iva

            total_amount = round(total_amount, 2)
            total_iva = round(total_iva, 2)

            now = datetime.now()
            date_created = now
            date_expired = now + timedelta(hours=4)

            end_of_day = datetime(now.year, now.month, now.day, 23, 59, 0)
            time_remaining = end_of_day - now

            if time_remaining < timedelta(hours=4):
                date_expired = now + time_remaining

            preorder = PreOrder.objects.create(
                user=user,
                full_name=str(full_name),
                identification=str(identification),
                identification_types=str(identification_types),
                address_line=str(address_line),
                city=str(city),
                state_province_region=str(state_province_region),
                telephone_number=str(telephone_number),
                whatsapp_number=str(whatsapp_number),
                postal_zip_code=str(postal_zip_code),
                amount=float(total_amount),
                iva_preorder=float(total_iva),
                shipping_branch=str(shipping_branch),
                date_created=date_created,
                date_expired=date_expired
            )

            for cart_item in cart_items:
                update_product = Product.objects.get(id=cart_item.product.id)
                quantity = int(update_product.quantity) - int(cart_item.count)
                sold = int(update_product.sold) + int(cart_item.count)

                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity, sold=sold
                )

            for cart_item in cart_items:
                product = Product.objects.get(id=cart_item.product.id)
                PreOrderItem.objects.create(
                    product=product,
                    preorder=preorder,
                    code=product.code,
                    name=product.name,
                    unit_price=cart_item.product.price,
                    count=cart_item.count,
                    total_price=Decimal(cart_item.product.price) * Decimal(cart_item.count)
                )
        except InvalidOperation as e:
            return Response(
                {'error': 'Error en el cálculo: ' + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {'preorder': 'El pedido se ha cargado satisfactoriamente.'},
            status=status.HTTP_201_CREATED
        )


class DeletePreOrderView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            with transaction.atomic():
                if not PreOrder.objects.filter(user=user).exists():
                    return Response(
                        {'error': 'La preorden no existe'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                preorder = PreOrder.objects.select_for_update().get(user=user)
                preorder_items = PreOrderItem.objects.order_by('preorder').filter(preorder=preorder)

                # Obtener la fecha actual
                current_date = timezone.now().date()

                if preorder.date_expired and preorder.date_expired <= current_date:
                    delete_expired_preorders.apply_async()

                if preorder_items.exists():
                    # Actualizar uno por uno su cantidad de stock y su venta
                    for preorder_item in preorder_items:
                        update_product = Product.objects.select_for_update().get(id=preorder_item.product.id)

                        # encontrar cantidad después de compra
                        quantity = int(update_product.quantity) + int(preorder_item.count)

                        # obtener cantidad de producto por vender
                        sold = int(update_product.sold) - int(preorder_item.count)

                        # actualizar el producto
                        Product.objects.filter(id=preorder_item.product.id).update(quantity=quantity, sold=sold)

                    # Eliminar los PreOrderItems
                    preorder_items.delete()

                # Eliminar la PreOrder
                preorder.delete()

                return Response({'Success': 'Se ha eliminado la preorden satisfactoriamente'}, status=status.HTTP_200_OK)

        except:
            return Response(
                {'error': 'Something went wrong when deleting preorder review'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetPreorderDetailView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            preorder = PreOrder.objects.filter(user=user).first()

            if preorder is not None:
                result = {
                    'id': preorder.id,
                    'full_name': preorder.full_name,
                    'identification_types': preorder.identification_types,
                    'identification': preorder.identification,
                    'address_line': preorder.address_line,
                    'city': preorder.city,
                    'state_province_region': preorder.state_province_region,
                    'telephone_number': preorder.telephone_number,
                    'whatsapp_number': preorder.whatsapp_number,
                    'postal_zip_code': preorder.postal_zip_code,
                    'amount': preorder.amount,
                    'iva': preorder.iva_preorder,
                    'shipping_branch': preorder.shipping_branch,
                    'date_created': preorder.date_created,
                    'date_expired': preorder.date_expired
                }

                pre_order_items = PreOrderItem.objects.filter(preorder=preorder).order_by('-date_added')

                result['pre_order_items'] = []

                for pre_order_item in pre_order_items:
                    sub_item = {
                        'code': pre_order_item.code,
                        'name': pre_order_item.name,
                        'unit_price': pre_order_item.unit_price,
                        'count': pre_order_item.count,
                        'total_price': pre_order_item.total_price,
                        'date_added': pre_order_item.date_added
                    }

                    result['pre_order_items'].append(sub_item)

                return Response({'preorder': result}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No existe un pedido con ese ID'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'error': 'Algo ha salido mal solicitando la preorden, intenta más tarde.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
