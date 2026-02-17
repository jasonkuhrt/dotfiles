#!/usr/bin/env bash
# Search for issues using multiple queries
# Usage: search-all-queries.sh <repo> <query1> [query2...]
# Example: search-all-queries.sh microsoft/typescript-go "panic OR crash" "rename OR refactor"

set -euo pipefail

REPO="$1"
shift

for query in "$@"; do
  gh issue list --repo "$REPO" --search "$query" --state open --json number,title,createdAt --limit 10
done | jq -s 'add | unique_by(.number)'
