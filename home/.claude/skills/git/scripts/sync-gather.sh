#!/bin/bash
# git-sync gather - Collect repository state for planning
# Combines output from subscripts into single JSON
# Usage: sync-gather.sh [trunk]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TRUNK="${1:-}"

# Get static info first (we need trunk and ghAvailable for other scripts)
STATIC=$("$SCRIPT_DIR/sync-gather-static.sh" "$TRUNK")
TRUNK=$(echo "$STATIC" | jq -r '.trunk')
GH_AVAILABLE=$(echo "$STATIC" | jq -r '.ghAvailable')

# Gather all components
WORKTREES=$("$SCRIPT_DIR/sync-gather-worktrees.sh" "$TRUNK" "$GH_AVAILABLE")
BRANCHES=$("$SCRIPT_DIR/sync-gather-branches.sh" "$TRUNK" "$GH_AVAILABLE")
TAGS=$("$SCRIPT_DIR/sync-gather-tags.sh")

# Combine into single JSON (extract fields from static)
STARTING_DIR=$(echo "$STATIC" | jq -r '.startingDir')
MAIN_WORKTREE=$(echo "$STATIC" | jq -r '.mainWorktree')
CURRENT_BRANCH=$(echo "$STATIC" | jq -r '.currentBranch')
IS_DIRTY=$(echo "$STATIC" | jq -r '.isDirty')

cat <<EOF
{
  "trunk": "$TRUNK",
  "startingDir": "$STARTING_DIR",
  "mainWorktree": "$MAIN_WORKTREE",
  "currentBranch": "$CURRENT_BRANCH",
  "isDirty": $IS_DIRTY,
  "ghAvailable": $GH_AVAILABLE,
  "worktrees": $WORKTREES,
  "mainWorktreeBranches": $BRANCHES,
  "tagConflicts": $TAGS
}
EOF
