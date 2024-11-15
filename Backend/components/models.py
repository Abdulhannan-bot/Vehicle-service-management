from django.db import models

# Create your models here.

class Component(models.Model):
    TYPE = (
        (1, 'New'),
        (2, 'Repair')
    )
    name = models.CharField(max_length=255)
    component_type = models.CharField(max_length=10, choices=TYPE, default=1)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    repair_price =  models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
   
    def __str__(self):
        return f"{self.name} ({self.get_component_type_display()})"
