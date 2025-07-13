# reader/views.py

from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Article, Note


def article_list(request):
    """
    
    article_list
    reader/article_list.html
    """
    articles = Article.objects.all()
    return render(request, 'reader/article_list.html', {
        'articles': articles,
    })


def article_detail(request, pk):
    """
    
    article_detail
    reader/article_detail.html
    """
    article = get_object_or_404(Article, pk=pk)
    notes = article.notes.order_by('-created_at')
    return render(request, 'reader/article_detail.html', {
        'article': article,
        'notes': notes,
    })


@csrf_exempt
def add_note(request):
    """
    
    URL： note/add/   name='add_note'
    id、selected_text、note_text、created_at
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'invalid method'}, status=400)

    article = get_object_or_404(Article, pk=request.POST.get('article_id'))
    note = Note.objects.create(
        article=article,
        selected_text=request.POST.get('selected_text', '').strip(),
        note_text=request.POST.get('note_text', '').strip()
    )

    return JsonResponse({
        'id': note.pk,
        'selected_text': note.selected_text,
        'note_text': note.note_text,
        'created_at': note.created_at.isoformat(),
    })


@csrf_exempt
def edit_note(request, pk):
    """
    
    URL： note/<int:pk>/edit/   name='edit_note'
    JSON：{'ok': True, 'note_text': updated_text}
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'invalid method'}, status=400)

    note = get_object_or_404(Note, pk=pk)
    new_text = request.POST.get('note_text', '').strip()
    note.note_text = new_text
    note.save()

    return JsonResponse({'ok': True, 'note_text': note.note_text})


@csrf_exempt
def delete_note(request, pk):
    """
    
    note/<int:pk>/delete/   name='delete_note'
    JSON：{'ok': True}
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'invalid method'}, status=400)

    note = get_object_or_404(Note, pk=pk)
    note.delete()

    return JsonResponse({'ok': True})
