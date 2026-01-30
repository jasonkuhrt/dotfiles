#!/usr/bin/env bash
set -euo pipefail

# Resolve the active epic ID from branch name, .issues/ context, or explicit arg.
#
# Usage:
#   resolve-epic.sh                  # Auto-detect from branch
#   resolve-epic.sh --epic <id>      # Explicit epic ID
#
# Output: The epic ID (e.g. Heartbeat-2az) on stdout.
# Exit 1 with explanation on stderr if no epic found.

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

if [[ -n "$epic_id" ]]; then
  # Verify it exists
  if ! bd show "$epic_id" --json >/dev/null 2>&1; then
    echo "Epic not found: $epic_id" >&2
    exit 1
  fi
  echo "$epic_id"
  exit 0
fi

# Auto-detect from branch name
branch=$(git branch --show-current 2>/dev/null || true)
key=""

if [[ -n "$branch" ]]; then
  key=$(echo "$branch" | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')
fi

# Fallback: scan .issues/ directory for issue key
if [[ -z "$key" ]]; then
  if [[ -d ".issues" ]]; then
    key=$(ls -1 .issues/ 2>/dev/null | grep -oiE '[a-z]+-[0-9]+' | head -1 | tr '[:lower:]' '[:upper:]')
  fi
fi

if [[ -z "$key" ]]; then
  echo "ERROR: Cannot resolve epic." >&2
  echo "" >&2
  echo "No issue key found in:" >&2
  echo "  - Branch: ${branch:-<not on a branch>}" >&2
  echo "  - .issues/ directory" >&2
  echo "" >&2
  echo "Use --epic <id> to specify explicitly." >&2
  exit 1
fi

# Search beads for an open epic matching this key
epic_id=$(bd list --type epic --status open --json --limit 0 2>/dev/null \
  | jq -r --arg key "$key" '
    (.[] | select(.external_ref != null and (.external_ref | ascii_upcase) == $key) | .id)
    // (.[] | select(.title | ascii_upcase | contains($key)) | .id)
    // empty
  ' | head -1)

if [[ -z "$epic_id" ]]; then
  echo "ERROR: No open epic found for issue key: $key" >&2
  echo "" >&2
  echo "Branch: ${branch:-<none>}" >&2
  echo "Searched for: external_ref=$key or title containing $key" >&2
  echo "" >&2
  echo "Use --epic <id> to specify explicitly." >&2
  exit 1
fi

echo "$epic_id"
