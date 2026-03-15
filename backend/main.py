from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="CoPilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

VISION_PROMPT = (
    "You are a Vision Analysis Agent. Look at this website screenshot and identify all UI elements. "
    "Return ONLY valid JSON with this exact structure (no markdown, no code blocks): "
    '{"pageTitle": "Short description of what website/page this is", '
    '"elements": [{"type": "button|input|link|text|image|checkbox|dropdown|other", '
    '"label": "what the element says or does", '
    '"location": "top/middle/bottom + left/center/right"}], '
    '"summary": "One sentence describing the overall purpose of this page"} '
    "Be thorough. Identify every visible interactive element."
)

INSTRUCTION_PROMPT = (
    "You are a Plain English Instruction Agent helping elderly or low-literacy users understand websites. "
    "You will receive a JSON description of a webpage. Write friendly, simple numbered steps a grandparent could follow. "
    "Rules: Use simple words. No jargon. No technical terms. "
    "Refer to buttons by their visible label or color. "
    "Number each step clearly (1. 2. 3.). Be warm and reassuring. Maximum 8 steps. "
    "End with one short reassurance sentence on its own line. "
    "Return plain text only."
)

SECURITY_PROMPT = (
    "You are a Security and Dark Pattern Detection Agent protecting vulnerable users from online scams. "
    "You will receive a JSON description of a webpage. Analyse it for threats. "
    "Return ONLY valid JSON (no markdown, no code blocks): "
    '{"riskLevel": "safe|low|medium|high", '
    '"flags": [{"type": "scam|dark_pattern|warning", "description": "Plain English description"}], '
    '"trustSignals": ["list of positive trust indicators"], '
    '"verdict": "One plain-English sentence: is this page safe?"}'
)


def run_vision_agent(image_bytes: bytes, mime_type: str) -> str:
    image_part = {
        "mime_type": mime_type,
        "data": base64.b64encode(image_bytes).decode("utf-8")
    }
    response = model.generate_content(
        [VISION_PROMPT, image_part],
        generation_config={"temperature": 0.3, "max_output_tokens": 1500}
    )
    return response.text


def run_instruction_agent(vision_output: str) -> str:
    prompt = "Here is the page analysis:\n\n" + vision_output + "\n\nWrite simple step-by-step instructions for this page."
    response = model.generate_content(
        [INSTRUCTION_PROMPT, prompt],
        generation_config={"temperature": 0.5, "max_output_tokens": 1000}
    )
    return response.text


def run_security_agent(vision_output: str) -> str:
    prompt = "Here is the page analysis:\n\n" + vision_output + "\n\nCheck for scams, dark patterns, and safety issues."
    response = model.generate_content(
        [SECURITY_PROMPT, prompt],
        generation_config={"temperature": 0.2, "max_output_tokens": 1000}
    )
    return response.text


@app.get("/")
def root():
    return {"status": "CoPilot API is running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyse")
async def analyse(file: UploadFile = File(...)):
    allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Only PNG, JPG, and WEBP images are supported.")

    image_bytes = await file.read()

    if len(image_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large. Please use an image under 10MB.")

    try:
        vision_result = run_vision_agent(image_bytes, file.content_type)
        instruction_result = run_instruction_agent(vision_result)
        security_result = run_security_agent(vision_result)

        return {
            "success": True,
            "vision": vision_result,
            "instruction": instruction_result,
            "security": security_result,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Analysis failed: " + str(e))