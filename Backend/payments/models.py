from django.db import models
from vehicles.models import Vehicle

class Payment(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"Payment for {self.vehicle} - {self.amount_paid}"

