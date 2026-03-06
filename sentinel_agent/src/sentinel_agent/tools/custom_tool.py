# sentinel_agent/src/sentinel_agent/tools/custom_tool.py
from crewai.tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field
from pathlib import Path


class ReadFileToolInput(BaseModel):
    file_path: str = Field(..., description="Absolute path to the file to read.")

class ReadFileTool(BaseTool):
    name: str = "read_source_file"
    description: str = "Read the full contents of a Python source file at the given absolute path."
    args_schema: Type[BaseModel] = ReadFileToolInput

    def _run(self, file_path: str) -> str:
        try:
            return Path(file_path).read_text()
        except Exception as e:
            return f"Error reading file: {e}"


class WriteFileToolInput(BaseModel):
    file_path: str = Field(..., description="Absolute path of the file to overwrite with fixed content.")
    content: str = Field(..., description="The complete fixed source code content to write.")

class WriteFileTool(BaseTool):
    name: str = "write_source_file"
    description: str = "Overwrite a Python source file with the provided fixed content."
    args_schema: Type[BaseModel] = WriteFileToolInput

    def _run(self, file_path: str, content: str) -> str:
        try:
            path = Path(file_path).resolve()
            # Safety: only allow writes to .py files
            if path.suffix != ".py":
                return f"Refused: only .py files can be written, got {path.suffix}"
            path.write_text(content)
            return f"Successfully patched: {file_path}"
        except Exception as e:
            return f"Error writing file: {e}"