from django.contrib import admin
from .models import Payment
# Register your models here.

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'amount_paid', 'payment_date', 'payment_method')
    search_fields = ('vehicle__owner_name', 'payment_method')

admin.site.register(Payment, PaymentAdmin)