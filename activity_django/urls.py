"""activity_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path, re_path
from django.views.generic import TemplateView

# from activity.views import renderReact #from folder emotion . views is views.py



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('activity.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # this is the appname.url
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
