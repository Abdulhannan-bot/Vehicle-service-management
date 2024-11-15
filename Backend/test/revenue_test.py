from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.utils import timezone
from payments.models import Payment
from vehicles.models import Vehicle
from datetime import timedelta

class RevenueTests(APITestCase):

    def setUp(self):
        Payment.objects.all().delete()
        today = timezone.now().date()
        self.yesterday = today - timedelta(days=1)
        self.this_month = today.replace(day=1)
        self.this_year = today.replace(month=1, day=1)
        self.vehicle = Vehicle.objects.create(registration_number="ABC123", owner_name="John Doe", model="Honda")

        # Create test payments
        Payment.objects.create(payment_date=today, amount_paid=100, payment_method="cash", vehicle=self.vehicle)
        Payment.objects.create(payment_date=today, amount_paid=150, payment_method="cash", vehicle=self.vehicle)
        Payment.objects.create(payment_date=self.yesterday, amount_paid=50, payment_method="cash", vehicle=self.vehicle)
        Payment.objects.create(payment_date=self.this_month, amount_paid=200, payment_method="cash", vehicle=self.vehicle)
        Payment.objects.create(payment_date=self.this_year, amount_paid=300, payment_method="cash", vehicle=self.vehicle)

        pays = Payment.objects.all()

        for i in pays:
            print(i.payment_date, i.amount_paid)

    def test_daily_revenue(self):
        url = reverse('daily_revenue')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(response.data['date']), str(timezone.now().date()))
        self.assertEqual(response.data['revenue'], 250)  # 100 + 150

    def test_monthly_revenue(self):
        url = reverse('monthly_revenue')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['month'], timezone.now().date().month)
        self.assertEqual(response.data['year'], timezone.now().date().year)
        self.assertEqual(response.data['revenue'], 500)  # 100 + 150 + 200 + 50 (including yesterday's)

    def test_yearly_revenue(self):
        url = reverse('yearly_revenue')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['year'], timezone.now().date().year)
        self.assertEqual(response.data['revenue'], 800)  # 100 + 150 + 50 + 200 + 300
