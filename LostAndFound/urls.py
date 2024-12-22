from django.contrib import admin
from django.urls import path, re_path
from .views import home

urlpatterns = [
    path('', home, name='home'),  
    path('admin/', admin.site.urls), 
    re_path(r'^.*$', home, name='react-frontend'),
]
