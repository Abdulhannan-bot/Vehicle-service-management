from django.urls import path
from . import views

urlpatterns = [
    path('revenue/daily/', views.daily_revenue, name='daily_revenue'),
    path('revenue/monthly/', views.monthly_revenue, name='monthly_revenue'),
    path('revenue/yearly/', views.yearly_revenue, name='yearly_revenue'),
]
