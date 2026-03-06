#!/bin/bash

# =============================================================
# Backdate Git Commits Script
# Creates commits on specific past dates and pushes to GitHub
# =============================================================

# ---- CONFIGURATION: Edit this section ----

REPO_URL="https://github.com/dabster108/CrewAI-Sentinel-Code-Agent.git"
BRANCH="main"

# Format: "YYYY-MM-DD:NUM_COMMITS"
# Add or remove entries as needed
COMMIT_SCHEDULE=(
  "2026-02-16:10"
  "2026-02-19:5"
  "2026-02-20:5"
  "2026-02-21:5"
  # Add more dates here, e.g.:
  # "2026-02-23:6"
)

COMMIT_MESSAGE_PREFIX="chore: update project files"

# ---- END CONFIGURATION ----

set -e

echo "================================================"
echo " Backdated Commit Script"
echo "================================================"

# Check if we're inside a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Not inside a git repo. Initializing..."
  git init
  git remote add origin "$REPO_URL"
fi

# Make sure remote is set correctly
git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"

TOTAL=0

for entry in "${COMMIT_SCHEDULE[@]}"; do
  DATE="${entry%%:*}"
  COUNT="${entry##*:}"

  echo ""
  echo ">>> Making $COUNT commits on $DATE"

  for i in $(seq 1 "$COUNT"); do
    # Spread commits across the day (every ~90 mins apart)
    HOUR=$(( (i * 90) / 60 % 23 ))
    MIN=$(( (i * 90) % 60 ))
    TIMESTAMP="${DATE}T$(printf '%02d' $HOUR):$(printf '%02d' $MIN):00"

    # Touch a dummy file so each commit has a real change
    DUMMY_FILE=".commit_log"
    echo "Commit $TOTAL on $TIMESTAMP" >> "$DUMMY_FILE"

    git add "$DUMMY_FILE"

    GIT_AUTHOR_DATE="$TIMESTAMP" \
    GIT_COMMITTER_DATE="$TIMESTAMP" \
    git commit -m "$COMMIT_MESSAGE_PREFIX - day $DATE commit $i" \
      --allow-empty

    TOTAL=$(( TOTAL + 1 ))
    echo "  [✓] Commit $TOTAL: $TIMESTAMP"
  done
done

echo ""
echo "================================================"
echo " All $TOTAL commits created."
echo " Pushing to $BRANCH on $REPO_URL ..."
echo "================================================"

git push -u origin "$BRANCH"

echo ""
echo "Done! Check your GitHub contribution graph."
