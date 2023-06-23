from django.db import models
from apps.product.models import Product

from django.contrib.auth import get_user_model
User = get_user_model()

class PreOrder(models.Model):
    BRANCH_CHOICES = (
        ('Valencia', 'Carabobo - Multimax Valencia'),
        ('Los Guayos', 'Carabobo - Multimax Los Guayos'),
        ('Caracas', 'Caracas - Multimax Los Ilustres'),
        ('Caracas_2', 'Caracas - Multimax Los Cortijos'),
        ('Caracas_3', 'Caracas - Multimax Express La Candelaria'),   
    )

    IDENTIFICATION_TYPES = (
        ('V', 'V'),
        ('J', 'J'),
        ('G', 'G'), 
        ('E', 'E'), 
        ('P', 'P'),
    )

    #Data cliente
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    identification = models.CharField(max_length=255)
    identification_types = models.CharField(
        max_length=10, choices=IDENTIFICATION_TYPES, default='V')
    address_line = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state_province_region = models.CharField(max_length=255)
    telephone_number = models.CharField(max_length=255)
    whatsapp_number = models.CharField(max_length=255)
    postal_zip_code = models.CharField(max_length=20)
    
    #Data de factura
    amount = models.DecimalField(max_digits=50, decimal_places=2)
    iva_preorder = models.DecimalField(max_digits=50, decimal_places=2)
    shipping_branch = models.CharField(
        max_length=255, choices=BRANCH_CHOICES, default='Carabobo - Multimax Valencia')
    date_created = models.DateTimeField(auto_now_add=True)
    date_expired = models.DateTimeField()
    
    def __str__(self):
        return str(self.id)

class PreOrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    preorder = models.ForeignKey(PreOrder, on_delete=models.CASCADE)
    code = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

