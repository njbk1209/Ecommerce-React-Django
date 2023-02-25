from django.contrib import admin
from .models import PreOrder, PreOrderItem

class PreOrderAdmin(admin.ModelAdmin):
    list_display = ('id','identification', 'full_name', 'amount')
    list_per_page = 25

admin.site.register(PreOrder, PreOrderAdmin)

class PreOrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'count', )
    list_display_links = ('id', 'name', )
    list_per_page = 25


admin.site.register(PreOrderItem, PreOrderItemAdmin)