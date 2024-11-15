from django.contrib import admin
from .models import Vehicle

class VehicleAdmin(admin.ModelAdmin):
    list_display = ['id', 'model', 'owner_name', 'registration_number', 'issue_type', 'created_at']
    search_fields = ['id', 'model', 'owner_name', 'registration_number', 'issue_type']

admin.site.register(Vehicle, VehicleAdmin)