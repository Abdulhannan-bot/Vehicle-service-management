from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from rest_framework import status
from components.models import Component
from components import views

class ComponentTests(APITestCase):

    def setUp(self):
        self.component_data = {
            'name': 'Component1',
            'component_type': 1,
        }
        self.component = Component.objects.create(**self.component_data)

    def test_get_all_components(self):
        url = reverse("get_components")
        self.assertEqual(resolve(url).func, views.get_components)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["success"], True)
        self.assertIn('data', response.data)

    def test_get_component_by_id_success(self):
        url = reverse("get_component_by_id", kwargs={'component_id': str(self.component.id)})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['id'], self.component.id)
        self.assertEqual(response.data['data']['name'], self.component.name)
        self.assertEqual(response.data['data']['component_type'], self.component.component_type)

    def test_get_component_by_id_not_found(self):
        url = reverse("get_component_by_id", kwargs={'component_id': '999999'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['msg'], 'Component not found')

    def test_add_component(self):
        data = {
            'name': 'Component2',
            'component_type': 2,
        }
        url = reverse("add_component")
        self.assertEqual(resolve(url).func, views.add_component)
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"], True)
        self.assertIn('data', response.data)

    def test_add_component_missing_fields(self):
        url = reverse("add_component")
        incomplete_data = {
            'name': 'Component3',
            'component_type': 'TypeC',
        }
        response = self.client.post(url, data=incomplete_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_component_success(self):
        url = reverse("update_component", kwargs={'component_id': str(self.component.id)})
        data = {'repair_price': 99.00}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_component_not_found(self):
        url = reverse("update_component", kwargs={'component_id': '999999'})
        data = {'purchase_price': -99.00}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_component_invalid_repair_price(self):
        url = reverse("update_component", kwargs={'component_id': str(self.component.id)})
        data = {'repair_price': -10.0}  # Invalid negative value
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['errors']['repair_price'][0], 'Repair price must be greater than 0.')

    def test_update_component_invalid_purchase_price(self):
        url = reverse("update_component", kwargs={'component_id': str(self.component.id)})
        data = {'purchase_price': -5.0}  # Invalid negative value
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['errors']['purchase_price'][0], 'Repair cost must be greater than 0.')

    def test_delete_component_success(self):
        url = reverse("delete_component", kwargs={'component_id': self.component.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_component_not_found(self):
        url = reverse("delete_component", kwargs={'component_id': '999999'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
