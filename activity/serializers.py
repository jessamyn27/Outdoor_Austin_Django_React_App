from rest_framework import serializers
from .models import Activity, Feature


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    features = serializers.PrimaryKeyRelatedField(many=True, allow_null=True, read_only=True)
    class Meta:
    	model = Activity
    	fields = ('id', 'name', 'photo_url', 'features',)


class FeatureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Feature
        fields = ('id', 'name', 'photo_url', 'description',)
