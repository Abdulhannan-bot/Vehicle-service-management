
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from django.utils import timezone
from payments.models import Payment
from datetime import timedelta

@api_view(['GET'])
def daily_revenue(request):
    today = timezone.now().date()
    tst = Payment.objects.filter(payment_date=today)
    for i in tst:
        print(i.amount_paid, i.payment_date)
    revenue = Payment.objects.filter(payment_date=today).aggregate(Sum('amount_paid'))
    print(revenue)
    return Response({"date": today, "revenue": revenue.get('amount_paid__sum', 0)})

@api_view(['GET'])
def monthly_revenue(request):
    today = timezone.now().date()
    first_day_of_month = today.replace(day=1)
    revenue = Payment.objects.filter(payment_date__gte=first_day_of_month).aggregate(Sum('amount_paid'))
    return Response({"month": today.month, "year": today.year, "revenue": revenue.get('amount_paid__sum', 0)})

@api_view(['GET'])
def yearly_revenue(request):
    today = timezone.now().date()
    first_day_of_year = today.replace(month=1, day=1)
    revenue = Payment.objects.filter(payment_date__gte=first_day_of_year).aggregate(Sum('amount_paid'))
    return Response({"year": today.year, "revenue": revenue.get('amount_paid__sum', 0)})
