import os
import subprocess
from typing import Type

from crewai.tools import BaseTool
from pydantic import BaseModel, Field


class GitHubPushToolInput(BaseModel):
    commit_message: str = Field(
        default="fix: auto security patch",
        description="The commit message to use when creating the commit.",
    )


class GitHubPushTool(BaseTool):
    name: str = "github_push"
    description: str = (
        "Stages all modified files, commits them with the given message, "
        "and pushes the commit to the configured GitHub repository and branch. "
        "Requires GITHUB_TOKEN, GITHUB_REPO, and GITHUB_BRANCH environment variables."
    )
    args_schema: Type[BaseModel] = GitHubPushToolInput

    def _run(self, commit_message: str = "fix: auto security patch") -> str:
        token = os.environ.get("GITHUB_TOKEN")
        repo = os.environ.get("GITHUB_REPO")
        branch = os.environ.get("GITHUB_BRANCH", "main")

        if not token:
            return "Error: GITHUB_TOKEN environment variable is not set."
        if not repo:
            return "Error: GITHUB_REPO environment variable is not set."

        # Build authenticated remote URL (token is not logged)
        remote_url = f"https://{token}@github.com/{repo}.git"

        try:
            # Resolve the actual git repo root so all commands run there,
            # not inside the sentinel_agent sub-package directory.
            repo_root_result = subprocess.run(
                ["git", "rev-parse", "--show-toplevel"],
                check=True,
                capture_output=True,
                text=True,
            )
            repo_root = repo_root_result.stdout.strip()

            # Point origin to the authenticated URL
            subprocess.run(
                ["git", "remote", "set-url", "origin", remote_url],
                check=True,
                capture_output=True,
                cwd=repo_root,
            )

            # Stage all changes from the repo root
            subprocess.run(
                ["git", "add", "."],
                check=True,
                capture_output=True,
                cwd=repo_root,
            )

            # Commit – allow empty commits to avoid failure if nothing changed
            subprocess.run(
                ["git", "commit", "--allow-empty", "-m", commit_message],
                check=True,
                capture_output=True,
                cwd=repo_root,
            )

            # Push to the target branch
