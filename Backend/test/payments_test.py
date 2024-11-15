from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from payments.models import Payment
from vehicles.models import Vehicle

class PaymentAPITestCase(APITestCase):
    def setUp(self):
        self.vehicle = Vehicle.objects.create(model="Test Vehicle", registration_number="ABC123", owner_name="Jon Smith")
        self.payment = Payment.objects.create(
            vehicle=self.vehicle,
            amount_paid="150.50",
            payment_method="cash"
        )
        self.valid_payload = {
            "vehicle": self.vehicle.id,
            "amount_paid": 200.00,
            "payment_method": "card"
        }
        self.invalid_payload = {
            "vehicle": self.vehicle.id,
            "amount_paid": "",
            "payment_method": "card"
        }

    def test_get_payments(self):
        url = reverse('get-payments')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_payment_by_id(self):
        url = reverse('get-payment-by-id', kwargs={'payment_id': self.payment.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['amount_paid'], str(self.payment.amount_paid))

    def test_get_payment_by_id_not_found(self):
        url = reverse('get-payment-by-id', kwargs={'payment_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_payment(self):
        url = reverse('add-payment')
        response = self.client.post(url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_payment_invalid(self):
        url = reverse('add-payment')
        response = self.client.post(url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_payment(self):
        url = reverse('update-payment', kwargs={'payment_id': self.payment.id})
        response = self.client.patch(url, {"amount_paid": "300.00"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['amount_paid'], "300.00")

    def test_update_payment_not_found(self):
        url = reverse('update-payment', kwargs={'payment_id': 999})
        response = self.client.patch(url, {"amount_paid": "300.00"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_payment(self):
        url = reverse('delete-payment', args=[self.payment.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_payment_not_found(self):
        url = reverse('delete-payment', args=[999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
