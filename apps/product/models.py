from django.db import models
from datetime import datetime
from apps.category.models import Category

from django.conf import settings

class Product(models.Model):
    code = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='photos/%Y/%m/', blank = True, null=True, default='')
    description = models.TextField()
    caracteristicas = models.JSONField(default=dict)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name = 'images')
    image = models.ImageField(upload_to='photos/%Y/%m/', default="", null=True, blank=True)
