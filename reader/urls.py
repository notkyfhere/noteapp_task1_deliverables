
from django.urls import path
from . import views


app_name = 'reader'  

urlpatterns = [
    path('',                  views.article_list, name='article_list'),         
    path('article/<int:pk>/', views.article_detail, name='article_detail'),
    path('note/add/',         views.add_note,       name='add_note'),
    path('note/<int:pk>/edit/',   views.edit_note,  name='edit_note'),
    path('note/<int:pk>/delete/', views.delete_note,name='delete_note'),
]
