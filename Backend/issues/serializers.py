from rest_framework import serializers
from .models import Issue
from vehicles.models import Vehicle
from components.models import Component

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['id', 'vehicle', 'issue_description', 'issue_type', 'status']

    def validate_vehicle(self, value):
        if not Vehicle.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Vehicle not found.")
        return value

    # def validate_component(self, value):
    #     if not Component.objects.filter(id=value.id).exists():
    #         raise serializers.ValidationError("Component not found.")
    #     return value

    # def validate(self, data):
    #     if data['issue_type'] == 2 and data['component'].component_type != 2:
    #         raise serializers.ValidationError("Component must be of type 'repair' for repair issues.")
    #     if data['issue_type'] == 1 and data['component'].component_type != 1:
    #         raise serializers.ValidationError("Component must be of type 'new' for new issues.")
    #     return data
