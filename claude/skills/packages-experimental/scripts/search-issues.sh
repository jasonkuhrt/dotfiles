#!/usr/bin/env bash
# Search for new issues in a repo
# Usage: search-issues.sh <repo> <query>

set -euo pipefail

REPO="$1"
QUERY="$2"

gh issue list --repo "$REPO" --search "$QUERY" --state open --json number,title,createdAt --limit 20
