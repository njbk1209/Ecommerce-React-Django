from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PreOrder, PreOrderItem
from apps.cart.models import Cart, CartItem
from apps.product.models import Product
from django.core.mail import send_mail
from datetime import datetime

from .serializers import PreOrderSerializer
from apps.product.models import Product
from apps.product.serializers import ProductSerializer


class DeletePreOrderView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            preorder_id = int(data['id'])
        except:
            return Response(
                {'error': 'PreOrder ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not PreOrder.objects.filter(id=preorder_id).exists():
                return Response(
                    {'error': 'La preordn no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            preorder = PreOrder.objects.get(user=user, id=preorder_id)
            preorder_items = PreOrderItem.objects.order_by('preorder').filter(preorder=preorder)

            result = []

            if PreOrderItem.objects.filter(preorder=preorder).exists():
                #Actalizar uno por uno su cantidad de stock y su venta
                
                for preorder_item in preorder_items:
                    update_product = Product.objects.get(id=preorder_item.product.id)

                    #encontrar cantidad despues de compra
                    quantity = int(update_product.quantity) + int(preorder_item.count)

                    #obtener cantidad de producto por vender
                    sold = int(update_product.sold) - int(preorder_item.count)

                    #actualizar el producto
                    Product.objects.filter(id=preorder_item.product.id).update(
                        quantity=quantity, sold=sold
                    )

                try:
                    for preorder_item in preorder_items:
                        preorder_item.delete()
                except:
                    return Response(
                        {'error': 'No se ha podido eliminar el item de la preorden'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
                
                try:
                    preorder.delete()
                    return Response({'Success': 'Se ha eliminado la preorden satisfactoriamente'}, status=status.HTTP_200_OK)
                except:
                    return Response(
                        {'error': 'Se eliminaron los items pero no se ha podido eliminar la preorden'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            else:
                preorder.delete()
                return Response({'Success': 'Se ha eliminado la preorden satisfactoriamente'}, status=status.HTTP_200_OK)

        except:
            return Response(
                {'error': 'Something went wrong when deleting preorder review'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ListPreOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            preorders = PreOrderItem.objects.order_by('-date_added').filter(preorder=preorder, user=user)
            result = []

            for preorder in preorders:
                item = {}
                item['id'] = preorder.id
                item['full_name'] = preorder.full_name
                item['identification'] = preorder.identification
                item['amount'] = preorder.amount
                item['shipping_branch'] = preorder.shipping_branch
                item['date_issued'] = preorder.date_issued

                result.append(item)
            
            return Response(
                {'orders': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving orders'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ListPreOrderDetailView(APIView):
    def get(self, request, identification, format=None):
        user = self.request.user
        try:
            if PreOrder.objects.filter(user=user, identification=identification).exists():
                preorder = PreOrder.objects.get(user=user, identification=identification)
                result = {}

                result['id'] = preorder.id
                result['amount'] = preorder.amount
                result['full_name'] = preorder.full_name
                result['identification_types'] = preorder.identification_types  
                result['identification'] = preorder.identification   
                result['rif_types'] = preorder.rif_types 
                result['rif'] = preorder.rif
                result['address_line'] = preorder.address_line
                result['city'] = preorder.city
                result['state_province_region'] = preorder.state_province_region
                result['postal_zip_code'] = preorder.postal_zip_code
                result['telephone_number'] = preorder.telephone_number
                result['whatsapp_number'] = preorder.whatsapp_number
                result['shipping_branch'] = preorder.shipping_branch
                result['date_issued'] = preorder.date_issued
                result['transaction_type'] = preorder.transaction_type

                pre_order_items = PreOrderItem.objects.order_by('-date_added').filter(preorder=preorder)
                result['pre_order_items'] = []

                for pre_order_item in pre_order_items:
                    sub_item = {}

                    sub_item['name'] = pre_order_item.name
                    sub_item['price'] = pre_order_item.price
                    sub_item['count'] = pre_order_item.count

                    result['pre_order_items'].append(sub_item)

                return Response(
                    {'preorder': result},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order detail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProcessPreOrderView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
    
        iva = 0.16
        
        identification_types = data['identification_types']
        identification = data['identification']
        rif_types = data['rif_types']
        rif = data['rif']
        full_name = data['full_name']
        address_line = data['address_line']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        telephone_number = data['telephone_number'] 
        whatsapp_number = data['whatsapp_number']
        transaction_type = data['transaction_type']
        shipping_branch = data['shipping_branch']
        
        cart = Cart.objects.get(user=user)


        #revisar si usuario tiene una preorden activa
        if PreOrder.objects.get(user=user):
            return Response(
                {'error': 'No puede tener más de una Preorden activa.'},
                status=status.HTTP_404_NOT_FOUND
            )

        #revisar si usuario tiene items en carrito
        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Need to have items in cart'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart_items = CartItem.objects.filter(cart=cart)

        #revisar si hay stock
        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response(
                    {'error': 'Transaction failed, a product ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response(
                    {'error': 'Not enough items in stock'},
                    status=status.HTTP_200_OK
                )
        
        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += (float(cart_item.product.price)
                             * float(cart_item.count))

        total_iva = total_amount * iva

        try:
            # Crear preorden dependiendo del método de pago
            newTransaction = transaction_type
        except:
            return Response(
                {'error': 'Error processing the transaction'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        if (newTransaction != 'Transferencia dolares internacional' or newTransaction != 'Tarjetas de crédito internacional' or newTransaction != 'Paypal'):

            #crear preorder
            try:
                preorder = PreOrder.objects.create(
                    user=user,
                    amount=float(total_amount),
                    iva_preorder = float(total_iva),
                    identification_types=str(identification_types),
                    identification=str(identification),
                    rif_types=str(rif_types),
                    rif=str(rif),
                    full_name=str(full_name),
                    address_line=str(address_line),
                    city=str(city),
                    state_province_region=str(state_province_region),
                    postal_zip_code=str(postal_zip_code),
                    telephone_number=str(telephone_number),
                    whatsapp_number=str(whatsapp_number),
                    shipping_branch=str(shipping_branch),
                    transaction_type=str(transaction_type)
                )  
            except:
                return Response(
                    {'error': 'No se ha cargado el pedido'},
                    status=status.HTTP_501_NOT_IMPLEMENTED
                )
            try:
                #Actualizar el STOCK del producto y la CANTIDAD VENDIDA
                for cart_item in cart_items:
                    update_product = Product.objects.get(id=cart_item.product.id)

                    #encontrar cantidad despues de compra
                    quantity = int(update_product.quantity) - int(cart_item.count)

                    #obtener cantidad de producto por vender
                    sold = int(update_product.sold) + int(cart_item.count)

                    #actualizar el producto
                    Product.objects.filter(id=cart_item.product.id).update(
                        quantity=quantity, sold=sold
                    )
            except:
                return Response(
                    {'error': 'No se ha podido actualizar el inventario'},
                    status=status.HTTP_502_NOT_IMPLEMENTED
                )
            
            try:
                for cart_item in cart_items:
                    # agarrar el producto
                    product = Product.objects.get(id=cart_item.product.id)
                    PreOrderItem.objects.create(
                        product=product,
                        preorder=preorder,
                        name=product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )
            except:
                return Response(
                    {'error': 'Preorden creado, pero no se han cargado items en la preorden'},
                    status=status.HTTP_503_NOT_IMPLEMENTED
                )    
            
            return Response(
                {'preorder': 'El pedido se ha cargado satisfactoriamente.'},
                status=status.HTTP_201_CREATED
            )