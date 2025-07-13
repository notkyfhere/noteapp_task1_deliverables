// reader/static/reader/js/note.js

document.addEventListener('DOMContentLoaded', () => {
  const textArea      = document.getElementById('text-area');
  const inputSel      = document.getElementById('input-selected');
  const inputNote     = document.getElementById('input-note');
  const btnSubmit     = document.getElementById('btn-submit');
  const notesList     = document.getElementById('notes-list');
  console.log('🚀 note.js loaded, ARTICLE_ID=', typeof ARTICLE_ID, ARTICLE_ID);

 
  textArea.addEventListener('mouseup', () => {
    const sel = window.getSelection().toString().trim();
    if (sel.length > 0) {
      inputSel.value = sel;
    }
  });

  
  btnSubmit.addEventListener('click', () => {
    const selected = inputSel.value.trim();
    const noteText = inputNote.value.trim();
    if (!selected || !noteText) {
      alert('Both selected text and note are required.');
      return;
    }

    fetch('/note/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken':   getCookie('csrftoken')
      },
      body: `article_id=${ARTICLE_ID}&selected_text=${encodeURIComponent(selected)}&note_text=${encodeURIComponent(noteText)}`
    })
    .then(r => r.json())
    .then(data => {
      if (data.id) {
        
        const div = document.createElement('div');
        div.className = 'note';
        div.dataset.id = data.id;
        div.innerHTML = `
          <strong class="sel">${data.selected_text}</strong>:
          <span class="txt">${data.note_text}</span>
          <button class="btn-edit">edit</button>
          <button class="btn-del">delete</button>
        `;
        notesList.prepend(div);
        inputNote.value = '';  
      } else {
        console.error(data);
      }
    });
  });

 
  notesList.addEventListener('click', e => {
    const noteDiv = e.target.closest('.note');
    if (!noteDiv) return;
    const nid = noteDiv.dataset.id;

    
    if (e.target.matches('.btn-del')) {
      fetch(`/note/${nid}/delete/`, {
        method:'POST',
        headers:{ 'X-CSRFToken': getCookie('csrftoken') }
      })
      .then(r=>r.json())
      .then(j=>{
        if (j.ok) noteDiv.remove();
      });
    }

    
    if (e.target.matches('.btn-edit')) {
      const span = noteDiv.querySelector('.txt');
      const old  = span.textContent;
      const inp  = document.createElement('input');
      inp.type   = 'text';
      inp.value  = old;
      noteDiv.replaceChild(inp, span);
      inp.focus();

      inp.addEventListener('keypress', ev => {
        if (ev.key === 'Enter') {
          fetch(`/note/${nid}/edit/`, {
            method:'POST',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'X-CSRFToken': getCookie('csrftoken')
            },
            body:`note_text=${encodeURIComponent(inp.value)}`
          })
          .then(r=>r.json())
          .then(j=>{
            if (j.ok) {
              const newSpan = document.createElement('span');
              newSpan.className = 'txt';
              newSpan.textContent = j.note_text;
              noteDiv.replaceChild(newSpan, inp);
            }
          });
        }
      });
    }
  });

  
  function getCookie(name) {
    const cookies = document.cookie.split(';').map(c=>c.trim());
    for (let c of cookies) {
      if (c.startsWith(name+'=')) return c.split('=')[1];
    }
    return '';
  }
});
