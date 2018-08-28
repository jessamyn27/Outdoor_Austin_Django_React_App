from django.contrib import admin

# Register your models here.
from .models import Activity, Feature

admin.site.register(Activity)
admin.site.register(Feature)
