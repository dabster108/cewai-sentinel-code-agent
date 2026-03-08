import sys
import os
from dotenv import load_dotenv
sys.path.append(os.path.join(os.path.dirname(__file__), "sentinel_agent", "src"))
from sentinel_agent.crew import SentinelAgent
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import uvicorn
import json

load_dotenv(override=True)

app = FastAPI()

@app.get("/health-check")
def health_check():
    return {"status": "ok"}


@app.post("/scan-file")
async def scan_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".py"):
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "Only Python (.py) files are allowed."}
        )

    try:
        # Read file content
        source_code = await file.read()
        source_code = source_code.decode("utf-8")

        # Run the agent
        result = SentinelAgent().crew().kickoff(inputs={"source_code": source_code})

        # Convert CrewAI result to simple JSON
        # If it has 'raw', use it; else fallback
        raw_output = getattr(result, "raw", str(result))

        # Try to parse JSON if it's valid, otherwise wrap as string
        try:
            analysis_json = json.loads(raw_output)
        except Exception:
            analysis_json = {"text": raw_output}

        return {
            "status": "success",
            "filename": file.filename,
            "analysis": analysis_json
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )


if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)