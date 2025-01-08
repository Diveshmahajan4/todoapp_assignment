from django.urls import path
from .views import TaskListCreateView, TaskDetailView, TaskDeleteAllView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/delete-all/', TaskDeleteAllView.as_view(), name='task-delete-all'),
]