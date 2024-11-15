from django.db import models

# Create your models here.

class Vehicle(models.Model):
    TYPE = (
        (1, 'New'),
        (2, 'Repair')
    )
    registration_number = models.CharField(max_length=20)
    owner_name = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    repair_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    issue_type = models.CharField(max_length=10, choices=TYPE, default=2)
    is_repaired = models.BooleanField(default=False)
    # issue_description = models.TextField(null = True, blank = True)
    # vehicle_type = models.CharField(max_length=10, choices=TYPE, default="new")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.model} ({self.get_issue_type_display()})"