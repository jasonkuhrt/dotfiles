#!/usr/bin/env bash
# wait-ci.sh — Poll a GitHub PR's current HEAD checks to a terminal state.
#
# This script is intentionally anchored to the PR head SHA and the PR's
# statusCheckRollup. Workflow-run name polling is not authoritative for repos
# with conditional fanout: a dashboard/plan job can finish before matrix jobs
# are even created.
#
# Exit codes:
#   0 — all visible checks green after the stable grace window
#   1 — at least one check failed/cancelled/timed out/action-required
#   2 — stale head or merge conflict; rerun/fix before polling further
#   3 — usage error
#
# Env tunables:
#   GH_CI_GRACE — seconds the all-green rollup must stay stable before exit
#                 (default 90; catches late-created matrix/fanout checks)
#   GH_CI_POLL  — poll interval seconds (default 30)
#
# allow-sleep-poll: this script is the canonical CI poll.

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: wait-ci.sh <PR_NUMBER>" >&2
  exit 3
fi

pr_number="$1"
shift

if [ $# -gt 0 ]; then
  echo "NOTE: workflow-name arguments are ignored; statusCheckRollup is authoritative for PR CI."
fi

stable_grace="${GH_CI_GRACE:-90}"
poll_interval="${GH_CI_POLL:-30}"

initial_json=$(gh pr view "$pr_number" --json headRefName,headRefOid,mergeable,mergeStateStatus)
head_branch=$(jq -r '.headRefName' <<<"$initial_json")
head_sha=$(jq -r '.headRefOid' <<<"$initial_json")

prev_signature=""
stable_since=0
printed_visible_green=0

normalize_checks() {
  jq -c '
    def name: .name // .context // .workflowName // "?";
    def url: .detailsUrl // .targetUrl // "";
    def has($xs; $x): ($xs | index($x)) != null;

    [
      .statusCheckRollup[]? |
      if .__typename == "StatusContext" then
        (.state // "PENDING") as $state |
        {
          name: name,
          workflow: "status-context",
          state: $state,
          conclusion: $state,
          url: url,
          terminal: has(["SUCCESS", "ERROR", "FAILURE"]; $state),
          success: ($state == "SUCCESS"),
          failure: has(["ERROR", "FAILURE"]; $state)
        }
      else
        (.status // "UNKNOWN") as $status |
        (.conclusion // "") as $conclusion |
        {
          name: name,
          workflow: (.workflowName // "check-run"),
          state: $status,
          conclusion: $conclusion,
          url: url,
          terminal: ($status == "COMPLETED"),
          success: (
            $status == "COMPLETED"
            and has(["SUCCESS", "NEUTRAL", "SKIPPED"]; $conclusion)
          ),
          failure: (
            $status == "COMPLETED"
            and has(["FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED", "STALE", "STARTUP_FAILURE"]; $conclusion)
          )
        }
      end
    ]
  '
}

summarize_checks() {
  jq -r '
    sort_by(.workflow, .name)
    | group_by(.workflow + "\u0000" + .name)
    | .[]
    | {
        workflow: .[0].workflow,
        name: .[0].name,
        total: length,
        states: (map(.state + ":" + .conclusion) | unique | join(","))
      }
    | "\(.workflow) / \(.name) total=\(.total) states=\(.states)"
  '
}

while true; do
  raw=$(gh pr view "$pr_number" --json headRefName,headRefOid,mergeable,mergeStateStatus,statusCheckRollup)
  now=$(date +%s)

  current_sha=$(jq -r '.headRefOid' <<<"$raw")
  current_branch=$(jq -r '.headRefName' <<<"$raw")
  mergeable=$(jq -r '.mergeable' <<<"$raw")
  merge_state=$(jq -r '.mergeStateStatus' <<<"$raw")

  if [ "$current_sha" != "$head_sha" ]; then
    echo "STALE HEAD: PR #$pr_number moved from $head_sha to $current_sha. Rerun the CI poll for the new head."
    exit 2
  fi

  if [ "$mergeable" = "CONFLICTING" ]; then
    echo "CONFLICT: PR #$pr_number ($current_branch) has merge conflicts with its base. Resolve before polling CI."
    exit 2
  fi

  checks=$(normalize_checks <<<"$raw")
  total=$(jq 'length' <<<"$checks")
  signature=$(jq -S -c 'sort_by(.workflow, .name, .state, .conclusion, .url)' <<<"$checks")

  if [ "$signature" != "$prev_signature" ]; then
    stable_since="$now"
    printed_visible_green=0
    printf '%s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    printf 'PR #%s head=%s branch=%s merge=%s\n' "$pr_number" "${head_sha:0:10}" "$current_branch" "$merge_state"
    if [ "$total" -eq 0 ]; then
      printf 'pending: no checks visible yet\n'
    else
      summarize_checks <<<"$checks"
    fi
    prev_signature="$signature"
  fi

  failures=$(jq -r '.[] | select(.failure) | [.name, .conclusion, .url] | @tsv' <<<"$checks")
  if [ -n "$failures" ]; then
    echo "=== FAILED ==="
    printf '%s\n' "$failures" | while IFS=$'\t' read -r name conclusion url; do
      printf '  %s -> %s (%s)\n' "$name" "$conclusion" "$url"
    done
    exit 1
  fi

  success_count=$(jq '[.[] | select(.success)] | length' <<<"$checks")
  if [ "$total" -gt 0 ] && [ "$success_count" -eq "$total" ]; then
    stable_for=$((now - stable_since))
    remaining=$((stable_grace - stable_for))
    if [ "$remaining" -le 0 ]; then
      echo "=== ALL GREEN ==="
      echo "PR #$pr_number head ${head_sha:0:10}: $total checks successful after ${stable_grace}s stable grace."
      exit 0
    fi
    if [ "$printed_visible_green" -eq 0 ]; then
      echo "VISIBLE GREEN: $total checks successful; waiting ${remaining}s stable grace for late fanout."
      printed_visible_green=1
    fi
  fi

  sleep "$poll_interval"
done
