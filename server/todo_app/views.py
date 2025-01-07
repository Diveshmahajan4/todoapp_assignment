from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer

# 1. Add Task & List Tasks
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# 2. Edit or Delete Task
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# 3. Delete All Tasks
class TaskDeleteAllView(APIView):
    def delete(self, request):
        Task.objects.all().delete()
        return Response({"message": "All tasks have been deleted."}, status=status.HTTP_204_NO_CONTENT)
