from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework import response
from .views import GetSpecificChore, GetAllChores, CreateChoresView, DeletChoreView, PutChoreView
from .serializers import ChoreSerizlizer

urlpatterns = [
    path('get', GetAllChores.as_view()),
    path('get/<int:pk>', GetSpecificChore.as_view()),
    path('post', CreateChoresView.as_view()),
    path('delete/<int:pk>', DeletChoreView.as_view()),
    path('put/<int:pk>', PutChoreView.as_view()),
]
