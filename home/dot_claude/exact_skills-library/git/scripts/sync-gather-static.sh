#!/bin/bash
# Gather static repository info
# Outputs: trunk, startingDir, mainWorktree, currentBranch, isDirty, ghAvailable

set -euo pipefail

TRUNK="${1:-}"
if [ -z "$TRUNK" ]; then
  TRUNK=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main")
fi

STARTING_DIR=$(pwd)
# Main worktree is the first entry in worktree list (the original clone)
MAIN_WORKTREE=$(git worktree list --porcelain | grep '^worktree ' | head -1 | sed 's/^worktree //')
CURRENT_BRANCH=$(git branch --show-current || echo "")
IS_DIRTY=$([ -n "$(git status --porcelain 2>/dev/null)" ] && echo "true" || echo "false")

GH_AVAILABLE="false"
if command -v gh &>/dev/null && gh auth status &>/dev/null; then
  GH_AVAILABLE="true"
fi

cat <<EOF
{
  "trunk": "$TRUNK",
  "startingDir": "$STARTING_DIR",
  "mainWorktree": "$MAIN_WORKTREE",
  "currentBranch": "$CURRENT_BRANCH",
  "isDirty": $IS_DIRTY,
  "ghAvailable": $GH_AVAILABLE
}
EOF
