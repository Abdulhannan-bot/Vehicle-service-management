from django.urls import path
from . import views
urlpatterns = [
    path('payments/', views.get_payments, name='get-payments'),
    path('payments/<int:payment_id>/', views.get_payment_by_id, name='get-payment-by-id'),
    path('payments/create/', views.add_payment, name='add-payment'),
    path('payments/edit/<int:payment_id>/', views.update_payment, name='update-payment'),
    path('payments/delete/<int:payment_id>/', views.delete_payment, name='delete-payment'),
]
