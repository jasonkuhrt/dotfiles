#!/usr/bin/env bash
# Guard: Block branch-switching git operations. These change the entire
# working tree, destroying other agents' in-progress work.
#
# Always blocked: git checkout <branch>, git switch, git stash
# Always allowed: git checkout -- <file>, git commit, git push, git pull, etc.
#
# For cross-branch work, use: git worktree add /tmp/wt-<branch> <branch>

set -euo pipefail

COMMAND=$(jq -r '.tool_input.command // empty')
if [ -z "$COMMAND" ]; then exit 0; fi

# --- Match dangerous branch-switching patterns ---

IS_DANGEROUS=false

# git stash (any subcommand)
if echo "$COMMAND" | grep -qE '^\s*git\s+stash(\s|$)'; then
  IS_DANGEROUS=true
fi

# git switch
if echo "$COMMAND" | grep -qE '^\s*git\s+switch(\s|$)'; then
  IS_DANGEROUS=true
fi

# git checkout — only dangerous when switching branches
if echo "$COMMAND" | grep -qE '^\s*git\s+checkout\s'; then
  # ALLOW: git checkout -- <files>  OR  git checkout <ref> -- <files>
  if echo "$COMMAND" | grep -qE '\s--\s'; then
    : # file-targeted, safe
  else
    IS_DANGEROUS=true
  fi
fi

if [ "$IS_DANGEROUS" = false ]; then
  exit 0
fi

WORKTREE=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || BRANCH="unknown"

cat >&2 <<ERRMSG
BLOCKED: git branch switch / stash is not allowed.

These operations rewrite the entire working tree, destroying in-progress
work for any other agent sessions sharing this worktree.

Current branch: $BRANCH
Worktree: $WORKTREE

Instead, use a temporary git worktree:
  git worktree add /tmp/wt-<branch> <branch>
  # ... work in /tmp/wt-<branch> ...
  git worktree remove /tmp/wt-<branch>

Or extract a single file without switching:
  git show <branch>:path/to/file > /tmp/file
  git checkout <branch> -- path/to/file
ERRMSG
exit 2
