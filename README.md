# NoteApp

A simple Django application for managing articles and notes. Administrators can upload, edit, and delete articles; users can add, edit, and delete notes on each article.

## Project Structure

noteapp_proj/
├── db.sqlite3
├── manage.py
├── .gitignore
├── noteapp_proj/
│ ├── init.py
│ ├── asgi.py
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
├── reader/
│ ├── init.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── tests.py
│ ├── urls.py
│ ├── views.py
│ ├── migrations/
│ │ ├── init.py
│ │ └── 0001_initial.py
│ └── templates/reader/
│ ├── article_list.html
│ └── article_detail.html
└── static/reader/js/
└── note.js



## Features

- Article Management  
  Create, edit, and delete articles via Django Admin or custom views.  
- Note Management 
  Add, edit, and delete notes on each article; notes appear in reverse chronological order.  
- SQLite Database  
  Development uses SQLite (database file included).  
- AJAX Operations
  JavaScript-powered note operations for a smoother UX.

## Prerequisites

- Python 3.x  
- pip  
- Virtual environment tool (venv or virtualenv)

## Installation

```bash
git clone https://github.com/notkyfhere/noteapp_task1_deliverables.git
cd noteapp_task1_deliverables
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
Database Setup
bash


python manage.py makemigrations
python manage.py migrate
Running the Server
bash

python manage.py runserver 8005
Open your browser at http://127.0.0.1:8005/ to view articles and test notes.

