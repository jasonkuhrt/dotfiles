#!/bin/bash
# Gather branches not in worktrees (live in main worktree)
# Args: trunk [ghAvailable]
# Outputs JSON array of branches

set -euo pipefail

TRUNK="${1:-develop}"
GH_AVAILABLE="${2:-false}"

# Build set of branches that have worktrees (once, not per-branch)
WT_BRANCHES=$(git worktree list --porcelain | grep '^branch refs/heads/' | sed 's/^branch refs\/heads\///')

echo "["
FIRST="true"
while IFS= read -r branch; do
  [ -z "$branch" ] && continue
  [ "$branch" = "$TRUNK" ] && continue

  # Skip if branch has a linked worktree
  if echo "$WT_BRANCHES" | grep -qx "$branch"; then
    continue
  fi

  [ "$FIRST" = "false" ] && echo ","
  FIRST="false"

  # Check for unpushed commits
  UNPUSHED_COUNT=0
  if git show-ref --verify --quiet "refs/remotes/origin/$branch" 2>/dev/null; then
    UNPUSHED_COUNT=$(git rev-list --count "origin/$branch..$branch" 2>/dev/null || echo "0")
  fi

  # Check PR status if gh available
  PR_STATE=""
  if [ "$GH_AVAILABLE" = "true" ]; then
    PR_STATE=$(gh pr list --head "$branch" --json state --jq '.[0].state // empty' 2>/dev/null || echo "")
  fi

  printf '  {"branch": "%s", "unpushedCount": %d' "$branch" "$UNPUSHED_COUNT"
  [ -n "$PR_STATE" ] && printf ', "prState": "%s"' "$PR_STATE"
  printf '}'
done < <(git branch --format='%(refname:short)')
echo ""
echo "]"
