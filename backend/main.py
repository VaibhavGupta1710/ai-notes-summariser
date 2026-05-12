from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


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