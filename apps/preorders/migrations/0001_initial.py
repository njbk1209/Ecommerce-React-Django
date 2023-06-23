# Generated by Django 3.1.7 on 2023-06-04 18:33

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PreOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('identification', models.CharField(max_length=255)),
                ('identification_types', models.CharField(choices=[('V', 'V'), ('J', 'J'), ('G', 'G'), ('E', 'E'), ('P', 'P')], default='V', max_length=10)),
                ('address_line', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state_province_region', models.CharField(max_length=255)),
                ('telephone_number', models.CharField(max_length=255)),
                ('whatsapp_number', models.CharField(max_length=255)),
                ('postal_zip_code', models.CharField(max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=50)),
                ('iva_preorder', models.DecimalField(decimal_places=2, max_digits=50)),
                ('shipping_branch', models.CharField(choices=[('Valencia', 'Carabobo - Multimax Valencia'), ('Los Guayos', 'Carabobo - Multimax Los Guayos'), ('Caracas', 'Caracas - Multimax Los Ilustres'), ('Caracas_2', 'Caracas - Multimax Los Cortijos'), ('Caracas_3', 'Caracas - Multimax Express La Candelaria')], default='Carabobo - Multimax Valencia', max_length=255)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_expired', models.DateTimeField(default=datetime.datetime(2023, 6, 4, 22, 32, 59, 846258, tzinfo=utc))),
            ],
        ),
        migrations.CreateModel(
            name='PreOrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('count', models.DecimalField(decimal_places=0, max_digits=5)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('preorder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='preorders.preorder')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='product.product')),
            ],
        ),
    ]
