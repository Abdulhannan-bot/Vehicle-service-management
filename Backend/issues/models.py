from django.db import models
from vehicles.models import Vehicle
from components.models import Component
# Create your models here.

class Issue(models.Model):
    STATUS = (
        (1, "Pending"),
        (2, "Resolved")
    )
    TYPE = (
        (1, "New Component"),
        (2, "Repair")
    )
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null = True)
    # component = models.ForeignKey(Component, on_delete=models.CASCADE, null = True)
    issue_type = models.CharField(max_length=10, choices=TYPE, default=2)
    issue_description = models.TextField()
    # repair_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
       return f"{self.issue_description[:50]}{'...' if len(self.issue_description) > 50 else ''} ({self.get_status_display()})"
