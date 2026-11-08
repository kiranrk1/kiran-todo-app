from rest_framework import viewsets

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    Provides create, list, retrieve, update, and delete actions
    for tasks in Kiran's To-Do App.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer