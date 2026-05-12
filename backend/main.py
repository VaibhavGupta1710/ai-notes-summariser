from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import language_tool_python
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
tool = language_tool_python.LanguageTool('en-US')

class NotesInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "AI Notes App is running"}

@app.post("/summarise")
def summarise(notes: NotesInput):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"Summarise these notes in clear simple bullet points:\n\n{notes.text}"
            }
        ]
    )
    return {"summary": response.choices[0].message.content}

@app.post("/check-grammar")
def check_grammar(notes: NotesInput):
    matches = tool.check(notes.text)
    errors = []
    for match in matches:
        errors.append({
            "message": match.message,
            "suggestion": match.replacements[:3] if match.replacements else [],
            "offset": match.offset,
            "length": match.error_length
        })
    return {"errors": errors, "error_count": len(errors)}

@app.get("/app")
def serve_frontend():
    return FileResponse("../frontend/index.html")

app.mount("/static", StaticFiles(directory="../frontend"), name="static")