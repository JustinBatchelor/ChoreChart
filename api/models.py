from datetime import date, datetime
from django.db import models

# Create your models here.

class Chore(models.Model):
    id = models.AutoField(auto_created=True ,primary_key=True)
    title = models.CharField(max_length=100, default="", unique=True)
    last_completed = models.DateTimeField(auto_now=True)