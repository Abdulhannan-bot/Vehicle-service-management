from rest_framework import serializers
from .models import Issue
from vehicles.models import Vehicle
from vehicles.serializers import VehicleIssueSerializer
from components.models import Component


class GetIssueSerializer(serializers.ModelSerializer):
    vehicle = VehicleIssueSerializer() # Nested serializer for Vehicle
    status = serializers.CharField(required=False)

    class Meta:
        model = Issue
        fields = ['id', 'vehicle', 'issue_description', 'issue_type', 'status']

   


class IssueSerializer(serializers.ModelSerializer):
    vehicle = serializers.PrimaryKeyRelatedField(queryset=Vehicle.objects.all())
    status = serializers.CharField(required=False)
    class Meta:
        model = Issue
        fields = ['id', 'vehicle', 'issue_description', 'issue_type', 'status']

    def validate_vehicle(self, value):
        if not Vehicle.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Vehicle not found.")
        return value
