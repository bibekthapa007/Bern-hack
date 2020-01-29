from django.contrib import admin
from django.urls import path
from urlShort import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<str:token>', views.Home, name='Home'),
    path('',views.Make, name="Make new")
]
