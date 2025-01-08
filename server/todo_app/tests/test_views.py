from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from todo_app.models import Task

class TaskTests(APITestCase):

    def setUp(self):
        self.task_data = {'title': 'Test Task', 'description': 'Test Description'}
        self.task = Task.objects.create(**self.task_data)
        self.task_url = reverse('task-detail', kwargs={'pk': self.task.pk})
        self.task_list_url = reverse('task-list')

    def test_create_task(self):
        response = self.client.post(self.task_list_url, self.task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.get(id=response.data['id']).title, 'Test Task')

    def test_list_tasks(self):
        response = self.client.get(self.task_list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_task(self):
        updated_data = {'title': 'Updated Task', 'description': 'Updated Description'}
        response = self.client.put(self.task_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, 'Updated Task')

    def test_delete_task(self):
        response = self.client.delete(self.task_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)

    def test_delete_all_tasks(self):
        response = self.client.delete(reverse('task-delete-all'), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)
