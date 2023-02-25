from django.urls import path
from .views import ListPreOrdersView, ListPreOrderDetailView, ProcessPreOrderView, DeletePreOrderView

app_name="preorders"

urlpatterns = [
    path('getpreorders', ListPreOrdersView.as_view()),
    path('getpreorder/<identification>', ListPreOrderDetailView.as_view()),
    path('deletepreorder', DeletePreOrderView.as_view()),
    path('makepreorder', ProcessPreOrderView.as_view()),
]