#!/usr/bin/env bash
# Check status of multiple issues at once
# Usage: check-all-issues.sh <repo> <issue-numbers...>
# Example: check-all-issues.sh microsoft/typescript-go 2244 2387 2133

set -euo pipefail

REPO="$1"
shift
ISSUES="$@"

for issue in $ISSUES; do
  result=$(gh issue view "$issue" --repo "$REPO" --json number,state,closedAt 2>/dev/null || echo '{"number":'$issue',"state":"ERROR"}')
  echo "$result"
done | jq -s '.'
