from django.urls import path
from . import views
urlpatterns = [
    path('payments/', views.get_payments, name='get-payments'),
    path('payments/<int:payment_id>/', views.get_payment_by_id, name='get-payment-by-id'),
    path('payments/add/', views.add_payment, name='add-payment'),
    path('payments/<int:payment_id>/update/', views.update_payment, name='update-payment'),
    path('payments/<int:payment_id>/delete/', views.delete_payment, name='delete-payment'),
]
