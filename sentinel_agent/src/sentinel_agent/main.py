#!/usr/bin/env python
import os
import re
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv
from sentinel_agent.crew import SentinelAgent
from sentinel_agent.tools.github_push_tool import GitHubPushTool
from langfuse import Langfuse
load_dotenv(override=True)

logging.getLogger("LiteLLM").setLevel(logging.CRITICAL)


langfuse = Langfuse(
    public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
    secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
    host=os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
)

print("Langfuse tracing initialized")



DEFAULT_TARGET = "tests"


def read_directory_files(directory_path):
    """
    Read all Python files from a directory and format them for analysis.
    Returns a formatted string with file boundaries.
    """
    directory = Path(directory_path)
    
    if not directory.exists():
        raise FileNotFoundError(f"Directory not found: {directory_path}")
    
    if not directory.is_dir():
        raise NotADirectoryError(f"Path is not a directory: {directory_path}")
    
    # Find all Python files
    python_files = sorted(directory.glob("*.py"))
    
    if not python_files:
        raise ValueError(f"No Python files found in: {directory_path}")
    
    # Format all files with clear boundaries
    formatted_code = []
    file_list = []
    
    for py_file in python_files:
        file_list.append(py_file.name)
        try:
            content = py_file.read_text()
            formatted_code.append(f"""

FILE: {py_file.name}
PATH: {py_file.absolute()}


{content}

""")
        except Exception as e:
            formatted_code.append(f"""

FILE: {py_file.name}
ERROR: Could not read file - {str(e)}


""")
    
    summary = f"Analyzing {len(python_files)} Python file(s): {', '.join(file_list)}\n\n"
    return summary + "\n".join(formatted_code)


def run():
    """
    Run the Sentinel Code Analysis Crew.
    Pass a directory path or file path as the first argument.
    Defaults to analyzing all files in the 'tests/' directory.
    """
    target = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TARGET
    target = os.path.abspath(target)

    try:
        # Check if target is a directory or file
        if os.path.isdir(target):
            print(f"\nAnalyzing all Python files in directory: {target}\n")
            source_code = read_directory_files(target)
        else:
            print(f"\n Analyzing single file: {target}\n")
            with open(target, "r") as f:
                source_code = f"""

FILE: {os.path.basename(target)}
PATH: {target}


{f.read()}
"""
        
        result = SentinelAgent().crew().kickoff(inputs={"source_code": source_code})
        print("\n Analysis Completed Successfully")

        # Apply the fixes: try crew final output first, then fall back to report file
        final_output = str(result.raw) if hasattr(result, 'raw') else str(result)
        patched = apply_fixes_from_text(final_output, target)
        if not patched:
            report_path = Path("issues/fixed_files_report.md")
            if report_path.exists():
                patched = apply_fixes_from_text(report_path.read_text(), target)
            else:
                print("  No patched code blocks found — files not modified.")

        if patched:
            print("\nPushing fixed files to GitHub...")
            push_result = GitHubPushTool()._run(commit_message="fix: auto security patch")
            print(push_result)
        else:
            print(" No files were patched — skipping GitHub push.")
    except Exception as e:
        raise Exception(f"Error running crew: {e}")


def apply_fixes_from_text(text: str, target: str) -> bool:
    """
    Extract patched code blocks from text and write them to the original source files.
    Handles both formats the LLM may produce:
      - #### filename.py\n```python\n...
      - #### filename.py ```python\n...
    Returns True if at least one file was patched.
    """
    # \s* handles both a newline and a space between filename and opening fence
    pattern = r'####\s+([\w.]+\.py)\s*```python\n(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)

    if not matches:
        return False

    target_dir = Path(target) if os.path.isdir(target) else Path(target).parent
    patched_any = False

    for filename, fixed_code in matches:
        file_path = target_dir / filename
        if file_path.exists():
            file_path.write_text(fixed_code)
            print(f" Patched and saved: {file_path}")
            patched_any = True
        else:
            print(f"File not found, skipping: {file_path}")

    return patched_any


def apply_fixes_from_report(report_path: str, target: str):
    apply_fixes_from_text(Path(report_path).read_text(), target)


def train():
    print("Training not configured for this project yet.")


def test():
    print("Testing not configured yet.")


if __name__ == "__main__":
    run()