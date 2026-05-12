@echo off
start "" "http://127.0.0.1:5500/frontend/index.html"
cd /d C:\Users\1710v\Desktop\ai-notes-app\backend
python -m uvicorn main:app --reload