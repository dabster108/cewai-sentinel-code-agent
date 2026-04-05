import sys
import os
import secrets
import re
from pathlib import Path
from dotenv import load_dotenv

sys.path.append(os.path.join(os.path.dirname(__file__), "sentinel_agent", "src"))
from sentinel_agent.crew import SentinelAgent
from fastapi import FastAPI, UploadFile, File, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

load_dotenv(override=True)

app = FastAPI()

MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", "200000"))
MAX_FILES = int(os.getenv("MAX_FILES", "10"))
ALLOWED_CONTENT_TYPES = {"text/x-python", "text/plain", "application/octet-stream"}
API_KEY = os.getenv("API_KEY")
FIXED_REPORT_PATH = Path("issues/fixed_files_report.md")
FIXED_BLOCK_PATTERN = re.compile(r"####\s+([^\n`]+?\.py)\s*```python\n(.*?)```", re.DOTALL)

if not API_KEY:
    print("Warning: API_KEY is not set. Set it in the environment to secure the API.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["*"]
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store"
    return response

@app.get("/health-check")
def health_check():
    return {"status": "ok"}


def verify_api_key(x_api_key: str | None):
    if not API_KEY:
        return
    if not x_api_key or not secrets.compare_digest(x_api_key, API_KEY):
        raise HTTPException(status_code=401, detail="Unauthorized")


def parse_analysis_output(raw_output: str):
    try:
        return json.loads(raw_output)
    except Exception:
        return {"text": raw_output}


def extract_fixed_code(raw_text: str, requested_filename: str):
    requested_name = Path(requested_filename).name

    matches = FIXED_BLOCK_PATTERN.findall(raw_text)
    if not matches:
        return None, None

    for filename, fixed_code in matches:
        if Path(filename).name == requested_name:
            return filename, fixed_code

    filename, fixed_code = matches[0]
    return filename, fixed_code


def analyze_source_code(filename: str, source_code: str) -> dict:
    result = SentinelAgent().crew().kickoff(inputs={"source_code": source_code})
    raw_output = getattr(result, "raw", str(result))
    analysis_json = parse_analysis_output(raw_output)

    report_text = ""
    if FIXED_REPORT_PATH.exists():
        report_text = FIXED_REPORT_PATH.read_text()

    fixed_filename, fixed_code = extract_fixed_code(
        f"{raw_output}\n{report_text}",
        filename,
    )

    return {
        "status": "success",
        "filename": filename,
        "analysis": analysis_json,
        "fixed_filename": fixed_filename,
        "fixed_code": fixed_code,
        "fixed_code_available": bool(fixed_code),
    }


@app.post("/scan-file")
async def scan_file(
    file: UploadFile = File(...),
    x_api_key: str | None = Header(default=None, alias="X-API-Key")
):
    verify_api_key(x_api_key)
    if not file.filename.endswith(".py"):
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "Only Python (.py) files are allowed."}
        )

    if file.content_type and file.content_type not in ALLOWED_CONTENT_TYPES:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "Unsupported content type."}
        )

    try:
        source_code = await file.read()
        if len(source_code) > MAX_UPLOAD_BYTES:
            return JSONResponse(
                status_code=413,
                content={"status": "error", "message": "File too large."}
            )

        source_code = source_code.decode("utf-8", errors="replace")
        return analyze_source_code(file.filename or "unnamed.py", source_code)

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )


async def analyze_upload(file: UploadFile) -> dict:
    filename = file.filename or "unnamed"
    if not filename.endswith(".py"):
        return {
            "status": "error",
            "filename": filename,
            "error": "Only Python (.py) files are allowed.",
        }

    if file.content_type and file.content_type not in ALLOWED_CONTENT_TYPES:
        return {
            "status": "error",
            "filename": filename,
            "error": "Unsupported content type.",
        }

    try:
        source_code = await file.read()
        if len(source_code) > MAX_UPLOAD_BYTES:
            return {
                "status": "error",
                "filename": filename,
                "error": "File too large.",
            }

        source_code = source_code.decode("utf-8", errors="replace")
        return analyze_source_code(filename, source_code)
    except Exception as e:
        return {
            "status": "error",
            "filename": filename,
            "error": str(e),
        }


@app.post("/scan-files")
async def scan_files(
    files: list[UploadFile] = File(...),
    x_api_key: str | None = Header(default=None, alias="X-API-Key")
):
    verify_api_key(x_api_key)
    if len(files) > MAX_FILES:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": f"Max {MAX_FILES} files allowed."}
        )

    results = []
    for upload in files:
        results.append(await analyze_upload(upload))

    return {
        "status": "success",
        "results": results,
    }


if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)