#!/usr/bin/env bash
# Get changelog from git history between dates
# Usage: get-changelog-git.sh <repo> <since-date> <until-date>
# Dates in YYYY-MM-DD format

set -euo pipefail

REPO="$1"
SINCE="$2"
UNTIL="$3"

gh api "repos/$REPO/commits?since=${SINCE}T00:00:00Z&until=${UNTIL}T23:59:59Z" \
  --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' \
  | grep -iE "fix|feat|port|lsp|rename|refactor" || true
