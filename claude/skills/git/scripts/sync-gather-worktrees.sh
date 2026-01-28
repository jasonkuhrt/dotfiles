#!/bin/bash
# Gather worktree info with PR status
# Args: trunk [ghAvailable]
# Outputs JSON array of worktrees

set -euo pipefail

TRUNK="${1:-develop}"
GH_AVAILABLE="${2:-false}"

echo "["
FIRST="true"
while IFS= read -r line; do
  if [[ "$line" == "worktree "* ]]; then
    WT_PATH="${line#worktree }"
  elif [[ "$line" == "branch refs/heads/"* ]]; then
    WT_BRANCH="${line#branch refs/heads/}"
    [ "$FIRST" = "false" ] && echo ","
    FIRST="false"

    # Check worktree state
    WT_GIT_DIR="$WT_PATH/.git"
    [ -d "$WT_PATH/.git" ] || WT_GIT_DIR=$(cat "$WT_PATH/.git" 2>/dev/null | sed 's/gitdir: //' || echo "")

    MID_REBASE="false"
    MID_MERGE="false"
    if [ -n "$WT_GIT_DIR" ]; then
      [ -d "$WT_GIT_DIR/rebase-merge" ] || [ -d "$WT_GIT_DIR/rebase-apply" ] && MID_REBASE="true"
      [ -f "$WT_GIT_DIR/MERGE_HEAD" ] && MID_MERGE="true"
    fi

    # Check for unpushed commits
    UNPUSHED_COUNT=0
    if git show-ref --verify --quiet "refs/remotes/origin/$WT_BRANCH" 2>/dev/null; then
      UNPUSHED_COUNT=$(git rev-list --count "origin/$WT_BRANCH..$WT_BRANCH" 2>/dev/null || echo "0")
    fi

    # Check PR status if gh available
    PR_STATE=""
    if [ "$GH_AVAILABLE" = "true" ] && [ "$WT_BRANCH" != "$TRUNK" ]; then
      PR_STATE=$(gh pr list --head "$WT_BRANCH" --json state --jq '.[0].state // empty' 2>/dev/null || echo "")
    fi

    printf '  {"path": "%s", "branch": "%s", "midRebase": %s, "midMerge": %s, "unpushedCount": %d' \
      "$WT_PATH" "$WT_BRANCH" "$MID_REBASE" "$MID_MERGE" "$UNPUSHED_COUNT"
    [ -n "$PR_STATE" ] && printf ', "prState": "%s"' "$PR_STATE"
    printf '}'
  fi
done < <(git worktree list --porcelain)
echo ""
echo "]"
