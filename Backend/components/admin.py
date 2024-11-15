from django.contrib import admin
from .models import Component

class ComponentAdmin(admin.ModelAdmin):
    list_display = ['name', 'component_type', 'created_at']
    search_fields = ['name', 'component_type']

admin.site.register(Component, ComponentAdmin)