from django.db.models import fields
from rest_framework import serializers
from .models import Chore

class ChoreSerizlizer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ('id', 'title', 'last_completed')


class CreateChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ('title', 'last_completed')