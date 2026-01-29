#!/usr/bin/env bash
set -euo pipefail

# flo:next compaction recovery hook (SessionStart, source=compact)
#
# When context is compacted mid-session, the agent loses its working state.
# This hook queries bd to recover: which epic, which bead, and outputs
# a hot-path context dump so the agent can resume without a full cold entry.
#
# Safe to run globally — exits silently if not a compact event or not on
# a feature branch with a beads epic.

input=$(cat)
source=$(echo "$input" | jq -r '.source // empty')
session_id=$(echo "$input" | jq -r '.session_id // empty')

# Only act on compaction
if [[ "$source" != "compact" ]]; then
  exit 0
fi

# Must be in a git repo with bd available
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi
if ! command -v bd &>/dev/null; then
  exit 0
fi

# Derive issue key from branch
branch=$(git branch --show-current 2>/dev/null || true)
key=$(echo "$branch" | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')

if [[ -z "$key" ]]; then
  exit 0
fi

# Resolve epic (same logic as context.sh)
epic_id=$(bd list --type epic --status open --json --limit 0 2>/dev/null \
  | jq -r --arg key "$key" '
    (.[] | select(.external_ref != null and (.external_ref | ascii_upcase) == $key) | .id)
    // (.[] | select(.title | ascii_upcase | contains($key)) | .id)
    // empty
  ' | head -1)

if [[ -z "$epic_id" ]]; then
  exit 0
fi

# Sync to pick up any changes from concurrent agents
bd sync --import 2>/dev/null || true

# Find non-closed bead connected to this session (full session ID in comments).
# Comments are the canonical session identity store — assignee is just a short label.
active_bead=""
if [[ -n "$session_id" ]]; then
  while IFS= read -r bid; do
    [[ -z "$bid" ]] && continue
    if bd comments "$bid" --json 2>/dev/null \
      | jq -e --arg sid "$session_id" 'last | .body | contains($sid)' \
        >/dev/null 2>&1; then
      active_bead="$bid"
      break
    fi
  done < <(bd list --parent "$epic_id" --json --limit 0 2>/dev/null \
    | jq -r '.[] | select(.status != "closed") | .id')
fi

# Only recover if this session has a connected bead (was doing flo:next work).
# Sessions not using flo:next won't have logged their session ID — exit silently
# to avoid hijacking their post-compaction resume.
if [[ -z "$active_bead" ]]; then
  exit 0
fi

# --- Output recovery context ---

echo ""
echo "# FLO:NEXT COMPACTION RECOVERY"
echo ""
echo "Context was compacted. Your working state has been recovered from beads."
echo ""

# Epic progress
bd epic status 2>/dev/null | grep -A1 -F "$epic_id" || true
echo ""

echo "## Active Bead (claimed by this session)"
echo ""
bd show "$active_bead" 2>/dev/null
echo ""
echo "## Recovery Instructions"
echo ""
echo "You were working on $active_bead. Resume implementation:"
echo "1. Run: bash ~/.claude/skills/flo_next/scripts/context.sh --hot"
echo "2. Re-read the bead body above and continue where the compaction summary left off"
echo "3. When done, follow the flo:next Exit Protocol"
