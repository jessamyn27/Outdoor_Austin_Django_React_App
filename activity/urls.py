from django.urls import path
from . import views

urlpatterns = [

    path('api/activities/', views.ActivityList.as_view(), name='activity-list'),
    path('api/activities/<int:pk>', views.ActivityDetail.as_view(), name='activity-detail'),
    path('api/features/', views.FeatureList.as_view(), name='feature-list'),
    path('api/features/<int:pk>', views.FeatureDetail.as_view(), name='feature-detail')
]
