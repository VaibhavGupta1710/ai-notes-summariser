# AI Notes Summariser

An AI-powered web app that summarises your notes instantly.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python, FastAPI
- AI: Groq (LLaMA 3.3)

## Features
- Paste any notes and get an instant AI summary
- Fast and free using Groq API

## How to run locally
1. Clone the repo
2. Install dependencies: `pip install -r requirements.txt`
3. Add your Groq API key to `.env` file
4. Run: `python -m uvicorn main:app --reload`
