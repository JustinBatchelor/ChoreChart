from re import S
import re
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Chore
from .serializers import ChoreSerizlizer, CreateChoreSerializer


# Create your views here.


class GetSpecificChore(generics.ListAPIView):
    
    serializer_class = ChoreSerizlizer

    def get(self, request, pk):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        queryset = Chore.objects.filter(id=pk)
        if queryset.exists():
            chore = queryset[0]
            return Response(ChoreSerizlizer(chore).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class GetAllChores(generics.ListAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerizlizer

class CreateChoresView(generics.CreateAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerizlizer

class DeletChoreView(generics.DestroyAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerizlizer

    def get(self, request, pk):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        queryset = Chore.objects.filter(id=pk)
        if queryset.exists():
            chore = queryset[0]
            return Response(ChoreSerizlizer(chore).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        queryset = Chore.objects.filter(id=pk)
        if queryset.exists():
            chore = queryset[0]
            chore.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PutChoreView(generics.UpdateAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerizlizer

    def get(self, request, pk):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        queryset = Chore.objects.filter(id=pk)
        if queryset.exists():
            chore = queryset[0]
            return Response(ChoreSerizlizer(chore).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



class ChoresView(APIView):
    serializer_class = CreateChoreSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        
        if serializer.is_valid():
            print(serializer)
            id = serializer.data.id
            title = serializer.data.title
            last_completed = serializer.data.last_completed
            queryset = Chore.objects.filter(title=title)
            if queryset.exists():
                chore = queryset[0]
                chore.id = id
                chore.last_completed = last_completed
                chore.save(update_fields=['id', 'last_completed'])
                return Response(ChoreSerizlizer(chore).data, status=status.HTTP_200_OK)
            else:
                chore = Chore(title=title, last_completed=last_completed)
                chore.save()
                return Response(ChoreSerizlizer(chore).data, status=status.HTTP_201_CREATED)