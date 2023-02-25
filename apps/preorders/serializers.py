from rest_framework import serializers
from .models import PreOrder, PreOrderItem

class PreOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreOrder
        fields = '__all__'


class PreOrderItem(serializers.ModelSerializer):
    class Meta:
        model = PreOrderItem
        fields = '__all__'