from rest_framework import serializers
from .models import Payment
from vehicles.serializers import VehicleIssueSerializer

class GetPaymentSerializer(serializers.ModelSerializer):
    vehicle = VehicleIssueSerializer(read_only=True)
    class Meta:
        model = Payment
        fields = ["id", "vehicle", "amount_paid", "payment_method"]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "amount_paid", "vehicle", "payment_method"]
