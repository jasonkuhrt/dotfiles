#!/usr/bin/env bash
# wait-ci.sh — Poll a GitHub PR's current HEAD checks to a terminal state.
#
# This script is intentionally anchored to the PR head SHA and the PR's
# statusCheckRollup. Workflow-run name polling is not authoritative for repos
# with conditional fanout: a dashboard/plan job can finish before matrix jobs
# are even created.
#
# Exit codes:
#   0 — all visible checks green and relevant current-head workflow runs completed green
#   1 — at least one check failed/cancelled/timed out/action-required
#   2 — stale head or merge conflict; rerun/fix before polling further
#   3 — usage error
#
# Env tunables:
#   GH_CI_POLL  — poll interval seconds (default 120)
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

poll_interval="${GH_CI_POLL:-120}"

initial_json=$(gh pr view "$pr_number" --json headRefName,headRefOid,mergeable,mergeStateStatus)
head_branch=$(jq -r '.headRefName' <<<"$initial_json")
head_sha=$(jq -r '.headRefOid' <<<"$initial_json")
repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)

prev_signature=""
printed_waiting_green=0

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

normalize_workflow_runs() {
  gh api "repos/$repo/actions/runs?head_sha=$head_sha&per_page=100" |
    jq -c '
      def has($xs; $x): ($xs | index($x)) != null;

      [
        .workflow_runs[]? |
        (.status // "unknown" | ascii_downcase) as $status |
        (.conclusion // "" | ascii_downcase) as $conclusion |
        {
          id: (.id | tostring),
          name: (.name // .display_title // "workflow"),
          event: (.event // ""),
          state: $status,
          conclusion: $conclusion,
          createdAt: (.created_at // ""),
          startedAt: (.run_started_at // ""),
          updatedAt: (.updated_at // ""),
          url: (.html_url // ""),
          terminal: ($status == "completed"),
          success: (
            $status == "completed"
            and has(["success", "neutral", "skipped"]; $conclusion)
          ),
          failure: (
            $status == "completed"
            and has(["failure", "cancelled", "timed_out", "action_required", "startup_failure", "stale"]; $conclusion)
          )
        }
      ]
    '
}

workflow_run_job_count() {
  local run_id="$1"

  gh api "repos/$repo/actions/runs/$run_id/jobs?per_page=1" --jq '.total_count // 0' 2>/dev/null ||
    printf 'unknown'
}

filter_ignorable_workflow_runs() {
  local runs="$1"
  local ignored_ids=()
  local run_id
  local job_count
  local ignored_json

  while IFS= read -r run_id; do
    if [ -z "$run_id" ]; then
      continue
    fi

    job_count=$(workflow_run_job_count "$run_id")
    if [ "$job_count" = "0" ]; then
      ignored_ids+=("$run_id")
    fi
  done < <(jq -r '.[] | select(.terminal and .event == "pull_request_target" and .conclusion == "cancelled") | .id' <<<"$runs")

  if [ "${#ignored_ids[@]}" -eq 0 ]; then
    printf '%s\n' "$runs"
    return
  fi

  ignored_json=$(printf '%s\n' "${ignored_ids[@]}" | jq -R . | jq -s .)
  jq -c --argjson ignored "$ignored_json" '[.[] | select(.id as $id | ($ignored | index($id) | not))]' <<<"$runs"
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

summarize_workflow_runs() {
  jq -r '
    sort_by(.event, .name)
    | group_by(.event + "\u0000" + .name)
    | .[]
    | {
        event: .[0].event,
        name: .[0].name,
        total: length,
        states: (map(.state + ":" + .conclusion) | unique | join(",")),
        latestCreated: (map(.createdAt) | max // ""),
        latestUpdated: (map(.updatedAt) | max // "")
      }
    | "workflow-run / \(.event) / \(.name) total=\(.total) states=\(.states) latestCreated=\(.latestCreated) latestUpdated=\(.latestUpdated)"
  '
}

while true; do
  raw=$(gh pr view "$pr_number" --json headRefName,headRefOid,mergeable,mergeStateStatus,statusCheckRollup)

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
  raw_workflow_runs=$(normalize_workflow_runs)
  workflow_runs=$(filter_ignorable_workflow_runs "$raw_workflow_runs")
  total=$(jq 'length' <<<"$checks")
  raw_workflow_run_total=$(jq 'length' <<<"$raw_workflow_runs")
  workflow_run_total=$(jq 'length' <<<"$workflow_runs")
  ignored_workflow_run_total=$((raw_workflow_run_total - workflow_run_total))
  signature=$(
    jq -S -c \
      -n \
      --argjson checks "$checks" \
      --argjson workflowRuns "$workflow_runs" \
      --argjson ignoredWorkflowRunTotal "$ignored_workflow_run_total" \
      '{
        checks: ($checks | sort_by(.workflow, .name, .state, .conclusion, .url)),
        workflowRuns: ($workflowRuns | sort_by(.event, .name, .createdAt, .state, .conclusion, .url)),
        ignoredWorkflowRunTotal: $ignoredWorkflowRunTotal
      }'
  )

  if [ "$signature" != "$prev_signature" ]; then
    printed_waiting_green=0
    printf '%s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    printf 'PR #%s head=%s branch=%s merge=%s\n' "$pr_number" "${head_sha:0:10}" "$current_branch" "$merge_state"
    if [ "$total" -eq 0 ]; then
      printf 'pending: no checks visible yet\n'
    else
      summarize_checks <<<"$checks"
    fi
    if [ "$workflow_run_total" -eq 0 ]; then
      printf 'pending: no current-head workflow runs visible yet\n'
    else
      summarize_workflow_runs <<<"$workflow_runs"
    fi
    if [ "$ignored_workflow_run_total" -gt 0 ]; then
      printf 'ignored: %s cancelled pull_request_target workflow run(s) with zero jobs\n' "$ignored_workflow_run_total"
    fi
    prev_signature="$signature"
  fi

  failures=$(jq -r '.[] | select(.failure) | [.name, .conclusion, .url] | @tsv' <<<"$checks")
  workflow_failures=$(jq -r '.[] | select(.failure) | [.name, .conclusion, .url] | @tsv' <<<"$workflow_runs")
  if [ -n "$failures" ] || [ -n "$workflow_failures" ]; then
    echo "=== FAILED ==="
    if [ -n "$failures" ]; then
      printf '%s\n' "$failures" | while IFS=$'\t' read -r name conclusion url; do
        printf '  check %s -> %s (%s)\n' "$name" "$conclusion" "$url"
      done
    fi
    if [ -n "$workflow_failures" ]; then
      printf '%s\n' "$workflow_failures" | while IFS=$'\t' read -r name conclusion url; do
        printf '  workflow %s -> %s (%s)\n' "$name" "$conclusion" "$url"
      done
    fi
    exit 1
  fi

  success_count=$(jq '[.[] | select(.success)] | length' <<<"$checks")
  workflow_run_success_count=$(jq '[.[] | select(.success)] | length' <<<"$workflow_runs")
  if [ "$total" -gt 0 ] && [ "$success_count" -eq "$total" ]; then
    if [ "$workflow_run_total" -gt 0 ] && [ "$workflow_run_success_count" -eq "$workflow_run_total" ]; then
      echo "=== ALL GREEN ==="
      echo "PR #$pr_number head ${head_sha:0:10}: $total checks successful; $workflow_run_total current-head workflow runs completed successfully."
      exit 0
    fi
    if [ "$workflow_run_total" -eq 0 ] && [ "$raw_workflow_run_total" -gt 0 ]; then
      echo "=== ALL GREEN ==="
      echo "PR #$pr_number head ${head_sha:0:10}: $total checks successful; no relevant current-head workflow runs remain after ignoring $ignored_workflow_run_total no-job dashboard run(s)."
      exit 0
    fi
    if [ "$printed_waiting_green" -eq 0 ]; then
      if [ "$workflow_run_total" -eq 0 ]; then
        echo "VISIBLE GREEN: $total checks successful; waiting for current-head workflow runs to appear."
      else
        echo "VISIBLE GREEN: $total checks successful; waiting for $workflow_run_total current-head workflow runs to finish."
      fi
      printed_waiting_green=1
    fi
  fi

  sleep "$poll_interval"
done
