from django.shortcuts import render
from .models import Activity, Feature
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from rest_framework import generics
from .serializers import ActivitySerializer, FeatureSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class FeatureList(generics.ListCreateAPIView):
  queryset = Feature.objects.all().prefetch_related('activity')
  serializer_class = FeatureSerializer

class FeatureDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Feature.objects.all().prefetch_related('activity')
  serializer_class = FeatureSerializer
