from rest_framework import serializers
from .models import Component

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'name', 'component_type', 'purchase_price', 'repair_price']
    
    def validate_repair_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Repair price must be greater than 0.")
        return value
    
    def validate_purchase_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Repair cost must be greater than 0.")
        return value