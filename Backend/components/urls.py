from django.urls import path
from . import views

urlpatterns = [
    path('components/', views.get_components, name='get_components'),
    path('components/<int:component_id>/', views.get_component_by_id, name='get_component_by_id'),
    path('components/create/', views.add_component, name='add_component'),
    path('components/edit/<int:component_id>/', views.update_component, name='update_component'),
    path('components/delete/<int:component_id>/', views.delete_component, name='delete_component'),
]