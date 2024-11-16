from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from vehicles.models import Vehicle
from components.models import Component
from issues.models import Issue

class IssueTests(APITestCase):

    def setUp(self):
        self.vehicle = Vehicle.objects.create(registration_number="ABC123", owner_name="John Doe")
        # self.component = Component.objects.create(name="Engine", component_type="new")
        self.issue_data = {
            'vehicle_id': self.vehicle.id,
            'issue_description': 'Engine replacement needed',
            'issue_type': 1,
        }
        self.issue = Issue.objects.create(**self.issue_data)

    def test_get_issues(self):
        url = reverse('get_issues')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_issue_by_id(self):
        url = reverse('get_issue_by_id', kwargs={'issue_id': self.issue.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_add_issue(self):
    #     url = reverse('add_issue')
    #     response = self.client.post(url, data=self.issue_data, format='json')
    #     print(response)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_issue(self):
        url = reverse('update_issue', kwargs={'issue_id': self.issue.id})
        data = {'status': 2}
        response = self.client.patch(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_issue(self):
        url = reverse('delete_issue', kwargs={'issue_id': self.issue.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
