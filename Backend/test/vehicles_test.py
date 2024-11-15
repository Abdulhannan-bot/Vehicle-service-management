from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from rest_framework import status
from vehicles.models import Vehicle
from vehicles import views

class VehicleTests(APITestCase):

    def setUp(self):
        self.vehicle_data = {
            'registration_number': 'ABC123',
            'owner_name': 'John Doe',
            'model': 'Sedan',
            'issue_type': 2,
            'is_repaired': False,
        }
        self.vehicle = Vehicle.objects.create(**self.vehicle_data)

    def test_get_all_vehicles(self):
        url = reverse("get_all_vehicles")
        self.assertEqual(resolve(url).func, views.get_vehicles)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["success"],True)
        self.assertIn('data', response.data)

    def test_get_vehicle_by_id_success(self):
        url = reverse("get_vehicle_by_id", kwargs={'vehicle_id': str(self.vehicle.id)})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['id'], self.vehicle.id)
        self.assertEqual(response.data['data']['registration_number'], self.vehicle.registration_number)
        self.assertEqual(response.data['data']['owner_name'], self.vehicle.owner_name)
        self.assertEqual(response.data['data']['repair_cost'], self.vehicle.repair_cost)
        self.assertEqual(response.data['data']['is_repaired'], self.vehicle.is_repaired)

    def test_get_vehicle_by_id_not_found(self):
        url = reverse("get_vehicle_by_id", kwargs={'vehicle_id': '999999'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['msg'], 'Vehicle not found')

    def test_add_vehicle(self):
        data = {
            'registration_number': 'XYZ456',
            'owner_name': 'Jane Doe',
            'model': 'SUV',
            'issue_type': 1,
        }
        url = reverse("add_vehicle")
        self.assertEqual(resolve(url).func, views.add_vehicle)
        response = self.client.post(url, data = data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"],True)
        self.assertIn('data', response.data)

    def test_add_vehicle_duplicate_data(self):
        url = reverse("add_vehicle")
        duplicate_data = self.vehicle_data.copy()
        duplicate_data["owner_name"] = "James Smith"
        response = self.client.post(url, data = duplicate_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('registration_number', response.data['errors'])
        self.assertEqual(response.data['errors']['registration_number'][0], 'This registration number is already in use.')


    def test_add_vehicle_missing_fields(self):
        url = reverse("add_vehicle")
        incomplete_data = {
            'owner_name': 'Jane Doe',
            'model': 'SUV',
            'repair_cost': '300.00',
            'issue_type': 'Repair',
            'is_repaired': False,
        }
        response = self.client.post(url, data=incomplete_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_edit_vehicle_success(self):
        url = reverse("edit_vehicle",kwargs={'vehicle_id': str(self.vehicle.id)})
        data = {'repair_cost': 250.00}
        response = self.client.patch(f"{url}", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['repair_cost'], 250.00)

    def test_edit_vehicle_not_found(self):
        url = reverse("edit_vehicle",kwargs={'vehicle_id': '999'})
        data = {'repair_cost': 250.00}
        response = self.client.patch(f"{url}", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_vehicle_invalid_data(self):
        url = reverse("edit_vehicle",kwargs={'vehicle_id': str(self.vehicle.id)})
        data = {'repair_cost': -250.00}
        response = self.client.patch(f"{url}", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_delete_vehicle_success(self):
        url = reverse("delete_vehicle",kwargs={'vehicle_id': str(self.vehicle.id)})
        response = self.client.delete(f"{url}")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_vehicle_not_found(self):
        url = reverse("delete_vehicle",kwargs={'vehicle_id': '999'})
        response = self.client.delete(f"{url}999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)