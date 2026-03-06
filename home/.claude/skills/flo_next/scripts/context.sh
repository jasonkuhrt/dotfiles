#!/usr/bin/env bash
set -euo pipefail

# @describe flo:next context loader — structured context dump for chain-aware epic work
# @flag --hot Ready list only (same session, next bead)
# @option --epic <ID> Override epic ID

main() {
  local epic_id="${argc_epic:-}"

  # ---------------------------------------------------------------------------
  # 1. Resolve epic (via .flo/state.yml — auto-bootstraps if missing)
  # ---------------------------------------------------------------------------

  SHARED_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../flo_shared" && pwd)"
  epic_id=$(bash "$SHARED_DIR/resolve.sh" ${epic_id:+--epic "$epic_id"})

  # ---------------------------------------------------------------------------
  # Hot next: graph + ready + blocked + in-progress
  # ---------------------------------------------------------------------------

  if [[ -n "${argc_hot:-}" ]]; then
    echo
    printf '═%.0s' {1..60}
    echo
    echo "FLO HOT NEXT · $epic_id"
    printf '═%.0s' {1..60}
    echo

    # Recently closed (for detecting concurrent agent closes)
    echo
    printf '─%.0s' {1..40}
    echo
    echo "RECENTLY CLOSED (check for new predecessors)"
    printf '─%.0s' {1..40}
    echo
    bd list --parent "$epic_id" --status closed --sort updated --reverse --limit 5 --json 2>/dev/null \
      | jq -r '.[] | "  ✓ \(.id): \(.title)\n    REASON: \(.close_reason // "(none)")\n    CLOSED: \(.closed_at // "unknown")"'

    # Dependency graph
    echo
    printf '─%.0s' {1..40}
    echo
    echo "DEPENDENCY GRAPH"
    printf '─%.0s' {1..40}
    echo
    bd graph "$epic_id" --compact

    # Ready + unclaimed (selectable)
    echo
    printf '─%.0s' {1..40}
    echo
    echo "READY (selectable — unclaimed, unblocked)"
    printf '─%.0s' {1..40}
    echo
    bd ready --unassigned --parent "$epic_id" --limit 0

    # Claimed (not selectable — another agent is working on it)
    claimed=$(bd list --parent "$epic_id" --status in_progress --json --limit 0 2>/dev/null \
      | jq '[.[] | select(.assignee != null and .assignee != "")]')
    claimed_count=$(echo "$claimed" | jq 'length')

    if [[ "$claimed_count" != "0" ]]; then
      echo
      printf '─%.0s' {1..40}
      echo
      echo "CLAIMED (not selectable — being worked on)"
      printf '─%.0s' {1..40}
      echo
      echo "$claimed" | jq -r '.[] | "  ◐ \(.id): \(.title) [claimed by \(.assignee)]"'
    fi

    # Blocked
    echo
    printf '─%.0s' {1..40}
    echo
    echo "BLOCKED (not selectable)"
    printf '─%.0s' {1..40}
    echo
    bd blocked --parent "$epic_id"

    echo
    exit 0
  fi

  # ---------------------------------------------------------------------------
  # Full context: epic details + chain + graph + ready + blocked
  # ---------------------------------------------------------------------------

  # 2. Epic details + progress
  echo
  printf '═%.0s' {1..60}
  echo
  echo "FLO CONTEXT"
  printf '═%.0s' {1..60}
  echo
  echo

  bd epic status 2>/dev/null | grep -A1 -F "$epic_id" || true
  echo

  bd show "$epic_id"

  # 3. Epic comments (cross-session learnings)
  epic_comments=$(bd comments "$epic_id" --json 2>/dev/null || echo "[]")
  comment_count=$(echo "$epic_comments" | jq 'if type == "array" then length else 0 end')

  if [[ "$comment_count" != "0" ]]; then
    echo
    printf '─%.0s' {1..40}
    echo
    echo "EPIC COMMENTS ($comment_count)"
    printf '─%.0s' {1..40}
    echo
    bd comments "$epic_id" 2>/dev/null
  fi

  # 4. Completed chain (closed children with close reasons)
  echo
  printf '─%.0s' {1..40}
  echo
  echo "COMPLETED (recent first)"
  printf '─%.0s' {1..40}
  echo

  closed=$(bd list --parent "$epic_id" --status closed --json --limit 0 --sort updated --reverse 2>/dev/null)
  closed_count=$(echo "$closed" | jq 'length')
  echo "$closed" | jq -r '.[] | "  ✓ \(.id): \(.title)\n    REASON: \(.close_reason // "(none)")"'

  # 5. Latest predecessor details (optimistic — most recently closed child)
  if [[ "$closed_count" != "0" ]]; then
    latest_id=$(echo "$closed" | jq -r '.[0].id')

    echo
    printf '─%.0s' {1..40}
    echo
    echo "LATEST PREDECESSOR: $latest_id"
    printf '─%.0s' {1..40}
    echo

    # Full show (body, acceptance, design, notes)
    bd show "$latest_id"

    # Comments (if any)
    pred_comments=$(bd comments "$latest_id" --json 2>/dev/null || echo "[]")
    pred_comment_count=$(echo "$pred_comments" | jq 'if type == "array" then length else 0 end')
    if [[ "$pred_comment_count" != "0" ]]; then
      echo
      echo "  COMMENTS:"
      bd comments "$latest_id" 2>/dev/null
    fi
  fi

  # 6. Dependency graph
  echo
  printf '─%.0s' {1..40}
  echo
  echo "DEPENDENCY GRAPH"
  printf '─%.0s' {1..40}
  echo

  bd graph "$epic_id" --compact

  # 7. Ready + unclaimed (selectable)
  echo
  printf '─%.0s' {1..40}
  echo
  echo "READY (selectable — unclaimed, unblocked)"
  printf '─%.0s' {1..40}
  echo

  bd ready --unassigned --parent "$epic_id" --limit 0

  # 8. Claimed (not selectable — another agent is working on it)
  claimed=$(bd list --parent "$epic_id" --status in_progress --json --limit 0 2>/dev/null \
    | jq '[.[] | select(.assignee != null and .assignee != "")]')
  claimed_count=$(echo "$claimed" | jq 'length')

  if [[ "$claimed_count" != "0" ]]; then
    echo
    printf '─%.0s' {1..40}
    echo
    echo "CLAIMED (not selectable — being worked on)"
    printf '─%.0s' {1..40}
    echo
    echo "$claimed" | jq -r '.[] | "  ◐ \(.id): \(.title) [claimed by \(.assignee)]"'
  fi

  # 9. Blocked
  echo
  printf '─%.0s' {1..40}
  echo
  echo "BLOCKED (not selectable)"
  printf '─%.0s' {1..40}
  echo

  bd blocked --parent "$epic_id"

  echo
}

eval "$(argc --argc-eval "$0" "$@")"
