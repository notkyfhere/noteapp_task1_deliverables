from django.db import models

class Article(models.Model):
    title   = models.CharField(max_length=200)
    content = models.TextField()

class Note(models.Model):
    article       = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='notes')
    selected_text = models.TextField()
    note_text     = models.TextField()
    created_at    = models.DateTimeField(auto_now_add=True)

# Create your models here.
