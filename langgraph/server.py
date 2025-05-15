from fastapi import FastAPI
from pydantic import BaseModel
import os, openai

openai.api_key = os.getenv("OPENAI_API_KEY")
app = FastAPI()

class ChatIn(BaseModel):
    prompt: str

@app.post("/chat")
async def chat(inpt: ChatIn):
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content": inpt.prompt}],
    )
    return {"reply": resp.choices[0].message.content}
