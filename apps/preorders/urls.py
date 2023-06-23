from django.urls import path
from .views import GetPreorderDetailView, AddPreOrderView, DeletePreOrderView

app_name="preorders"

urlpatterns = [
    path('getpreorder', GetPreorderDetailView.as_view()),
    path('deletepreorder', DeletePreOrderView.as_view()),
    path('addpreorder', AddPreOrderView.as_view()),
]