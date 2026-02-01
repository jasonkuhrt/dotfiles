#!/usr/bin/env bash
set -euo pipefail

# flo resolve — return the active epic ID
#
# Usage:
#   resolve.sh                  # Read from .flo/state.yml (bootstrap if missing)
#   resolve.sh --epic <id>      # Override: re-bootstrap with explicit ID
#
# Stdout: the epic ID.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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
# Locate state file
# ---------------------------------------------------------------------------

repo_root=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [[ -z "$repo_root" ]]; then
  echo "ERROR: Not inside a git repository." >&2
  exit 1
fi

state_file="$repo_root/.flo/state.yml"

# ---------------------------------------------------------------------------
# --epic override: re-bootstrap with explicit ID
# ---------------------------------------------------------------------------

if [[ -n "$epic_id" ]]; then
  exec bash "$SCRIPT_DIR/bootstrap.sh" --epic "$epic_id"
fi

# ---------------------------------------------------------------------------
# Read existing state
# ---------------------------------------------------------------------------

if [[ -f "$state_file" ]]; then
  stored=$(grep '^epic:' "$state_file" | sed 's/^epic:[[:space:]]*//' || true)
  if [[ -n "$stored" ]]; then
    echo "$stored"
    exit 0
  fi
fi

# ---------------------------------------------------------------------------
# No state — bootstrap
# ---------------------------------------------------------------------------

exec bash "$SCRIPT_DIR/bootstrap.sh"
