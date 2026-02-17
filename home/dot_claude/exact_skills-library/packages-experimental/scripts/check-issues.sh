#!/usr/bin/env bash
# Check status of a tracked issue
# Usage: check-issues.sh <repo> <issue-number>

set -euo pipefail

REPO="$1"
ISSUE="$2"

gh issue view "$ISSUE" --repo "$REPO" --json state,title,closedAt
