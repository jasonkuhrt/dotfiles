#!/usr/bin/env bash
set -euo pipefail

# @describe flo resolve — return the active epic ID
# @option --epic <ID> Override: re-bootstrap with explicit ID

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

main() {
  local epic_id="${argc_epic:-}"

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
}

eval "$(argc --argc-eval "$0" "$@")"
