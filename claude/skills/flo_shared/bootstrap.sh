#!/usr/bin/env bash
set -euo pipefail

# flo bootstrap — detect and persist the active epic
#
# Usage:
#   bootstrap.sh                  # Auto-detect via environment patterns
#   bootstrap.sh --epic <id>      # Explicit epic ID (skips detection)
#
# Writes .flo/state.yml in the git repo root.
# Stdout: the epic ID.
#
# Environment patterns (tried in order):
#   1. Branch-key: branch name → issue key → epic with matching external_ref
#   2. Single-epic: exactly one open epic → use it
#   3. Multi-epic: multiple open epics → list them, exit 1 (user must choose)
#   4. No epics → exit 1

# ---------------------------------------------------------------------------
# Parse flags
# ---------------------------------------------------------------------------

epic_id=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --epic)
      epic_id="$2"
      shift 2
      ;;
    *)
      echo "Unknown flag: $1" >&2
      exit 1
      ;;
  esac
done

# ---------------------------------------------------------------------------
# Locate repo root for .flo/ placement
# ---------------------------------------------------------------------------

repo_root=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [[ -z "$repo_root" ]]; then
  echo "ERROR: Not inside a git repository." >&2
  exit 1
fi

flo_dir="$repo_root/.flo"
state_file="$flo_dir/state.yml"

# ---------------------------------------------------------------------------
# Helper: write state and emit epic ID
# ---------------------------------------------------------------------------

write_state() {
  local id="$1"
  mkdir -p "$flo_dir"
  printf 'epic: %s\n' "$id" > "$state_file"
  echo "$id"
}

# ---------------------------------------------------------------------------
# Explicit --epic: validate and write
# ---------------------------------------------------------------------------

if [[ -n "$epic_id" ]]; then
  if ! bd show "$epic_id" --json >/dev/null 2>&1; then
    echo "ERROR: Epic not found: $epic_id" >&2
    exit 1
  fi
  write_state "$epic_id"
  exit 0
fi

# ---------------------------------------------------------------------------
# Pattern 1: Branch-key → external_ref match
# ---------------------------------------------------------------------------

branch=$(git branch --show-current 2>/dev/null || true)
key=$(echo "$branch" | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]' || true)

if [[ -n "$key" ]]; then
  found=$(bd list --type epic --status open --json --limit 0 2>/dev/null \
    | jq -r --arg key "$key" '
      (.[] | select(.external_ref != null and (.external_ref | ascii_upcase) == $key) | .id)
      // (.[] | select(.title | ascii_upcase | contains($key)) | .id)
      // empty
    ' | head -1 || true)

  if [[ -n "$found" ]]; then
    write_state "$found"
    exit 0
  fi
fi

# ---------------------------------------------------------------------------
# Pattern 2/3: Open epic count
# ---------------------------------------------------------------------------

epics_json=$(bd list --type epic --status open --json --limit 0 2>/dev/null || echo "[]")
epic_count=$(echo "$epics_json" | jq 'length')

if [[ "$epic_count" -eq 0 ]]; then
  echo "ERROR: No open epics found." >&2
  echo "Create one with: bd create --type epic --title \"...\"" >&2
  exit 1
fi

if [[ "$epic_count" -eq 1 ]]; then
  found=$(echo "$epics_json" | jq -r '.[0].id')
  write_state "$found"
  exit 0
fi

# Pattern 3: Multiple — list and ask user to choose
echo "ERROR: Multiple open epics found. Specify with --epic <id>:" >&2
echo "" >&2
echo "$epics_json" | jq -r '.[] | "  \(.id): \(.title)"' >&2
echo "" >&2
exit 1
