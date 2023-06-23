# tasks.py

from celery import shared_task
from django.utils import timezone
from .models import PreOrder

@shared_task
def delete_expired_preorders():
    current_date = timezone.now().date()
    expired_preorders = PreOrder.objects.filter(date_expired__lte=current_date)

    for preorder in expired_preorders:
        preorder.delete()
