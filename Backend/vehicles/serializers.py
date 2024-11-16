from rest_framework import serializers
from .models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(required=False)
    repair_cost = serializers.FloatField(required=False)
    registration_number = serializers.CharField(required=True)
    owner_name = serializers.CharField(required=True)
    class Meta:
        model = Vehicle
        fields = ["id","model", "registration_number", "owner_name", "issue_type", "repair_cost", "is_repaired", "created_at"]

    def validate_repair_cost(self, value):
        if value < 0:
            raise serializers.ValidationError("Repair cost must be greater than 0.")
        return value
    
    def validate_registration_number(self, value):
        if not self.instance or (self.instance and self.instance.registration_number != value):
            if Vehicle.objects.filter(registration_number=value, is_repaired=False).exists():
                raise serializers.ValidationError("This registration number is already in use.")
        return value
    
class VehicleIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'model']