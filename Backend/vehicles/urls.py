from django.urls import path
from . import views

urlpatterns = [
    path('vehicles/', views.get_vehicles, name="get_all_vehicles"),
    path('vehicle/<str:vehicle_id>/', views.get_vehicle_by_id, name="get_vehicle_by_id"),
    path('vehicles/create/', views.add_vehicle, name="add_vehicle"),
    path('vehicle/edit/<str:vehicle_id>/', views.edit_vehicle, name="edit_vehicle"),
    path('vehicle/delete/<str:vehicle_id>/', views.delete_vehicle, name="delete_vehicle")
]