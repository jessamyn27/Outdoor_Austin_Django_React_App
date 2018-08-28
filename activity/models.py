from django.db import models

# Create your models here.
class Activity(models.Model):
    name = models.CharField(max_length=100)
    photo_url = models.TextField()

    def __str__(self):
        return self.name

class Feature(models.Model):
    name = models.CharField(max_length=100)
    photo_url = models.TextField()
    description = models.CharField(max_length=200)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='features')

    def __str__(self):
        return self.name
