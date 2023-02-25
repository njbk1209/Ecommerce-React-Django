from django.db import models
from apps.product.models import Product
from datetime import datetime
from django.contrib.auth import get_user_model
User = get_user_model()

class PreOrder(models.Model):
    branch_choices = (
        ('Valencia', 'Carabobo - Multimax Valencia'),
        ('Los Guayos', 'Carabobo - Multimax Los Guayos'),
        ('Caracas', 'Caracas - Multimax Los Ilustres'),
        ('Caracas_2', 'Caracas - Multimax Los Cortijos'),
        ('Caracas_3', 'Caracas - Multimax Express La Candelaria'),   
    )

    transaction_types = (
        ('Transferencia', 'Transferencia Banesco - Banesco en bolivares'),
        ('Pago movil', 'Pago móvil'),
        ('Transferencia dolares nacional', 'Transferencia Banesco - Banesco en dolares nacional'),
        ('Transferencia dolares internacional', 'Tarjetas de crédito internacional'),
        ('Paypal', 'Paypal'),   
    )

    identification_types = (
        ('V', 'V'),
        ('E', 'E'),
        ('P', 'P'), 
    )

    rif_types = (
        ('V', 'V'),
        ('J', 'J'),
        ('G', 'G'), 
        ('E', 'E'), 
        ('P', 'P'), 
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    iva_preorder = models.DecimalField(max_digits=5, decimal_places=2)
    full_name = models.CharField(max_length=255)
    rif = models.CharField(max_length=25)
    rif_types = models.CharField(
        max_length=10, choices=rif_types, default='V')
    identification = models.CharField(max_length=255)
    identification_types = models.CharField(
        max_length=10, choices=identification_types, default='V')
    address_line = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state_province_region = models.CharField(max_length=255)
    postal_zip_code = models.CharField(max_length=20)
    telephone_number = models.CharField(max_length=255)
    whatsapp_number = models.CharField(max_length=255)
    shipping_branch = models.CharField(
        max_length=255, choices=branch_choices, default='Carabobo - Multimax Valencia')
    date_issued = models.DateTimeField(default=datetime.now)
    transaction_type = models.CharField(
        max_length=255, choices=transaction_types, default='Transferencia Banesco - Banesco en bolivares')
    
    def __str__(self):
        return self.id

class PreOrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    preorder = models.ForeignKey(PreOrder, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    count = models.IntegerField()
    date_added = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name

