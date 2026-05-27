#!/usr/bin/env bash
# gh-pr-checks-status — canonical "is this PR green / red / pending?" answer.
#
# Why this exists: `gh pr view <N> --json statusCheckRollup` returns a
# heterogeneous array of two GitHub types — `CheckRun` (modern Checks API)
# and `StatusContext` (legacy commit-status API). They use DIFFERENT field
# names for the same concept:
#
#   CheckRun:      .status in {QUEUED, IN_PROGRESS, COMPLETED}
#                  .conclusion in {SUCCESS, FAILURE, CANCELLED, TIMED_OUT,
#                                  ACTION_REQUIRED, NEUTRAL, SKIPPED, STALE}
#   StatusContext: .state in {PENDING, SUCCESS, ERROR, FAILURE}
#                  (no .status, no .conclusion — those will be null/missing)
#
# Ad-hoc python/jq scripts that only key off `.status` silently treat every
# StatusContext as "pending forever" — which is exactly how a green
# `E2E Local Sign Off` StatusContext caused a CI watch loop to never
# terminate. This script is the single source of truth for "what state is
# this check in" so callers can't get the field-name dispatch wrong.
#
# Usage:
#   gh-pr-checks-status.sh <PR_NUMBER> [HEAD_SHA_PREFIX]
#
# Prints one of these terminal lines on stdout:
#   green
#   failure: <name> — <detailsUrl>
#   pending: <X>/<Y> done, <Z> in_progress, <W> queued
#   stale-head: <actual_head>          (when HEAD_SHA_PREFIX was supplied and
#                                       the PR's current HEAD doesn't match)
#
# Exit code:
#   0  — green or pending (caller continues polling)
#   1  — failure (caller stops on red)
#   2  — usage error
#   3  — gh/jq error
#
# Examples:
#   gh-pr-checks-status.sh 1061
#   gh-pr-checks-status.sh 1061 fd675850ca

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <PR_NUMBER> [HEAD_SHA_PREFIX]" >&2
  exit 2
fi

PR=$1
SHA_PREFIX=${2:-}

raw=$(gh pr view "$PR" --json statusCheckRollup,headRefOid 2>/dev/null) || {
  echo "error: gh pr view failed for PR #$PR" >&2
  exit 3
}

python3 -c '
import json, sys
raw, sha_prefix = sys.argv[1], sys.argv[2]
data = json.loads(raw)
head = data.get("headRefOid", "")
if sha_prefix and not head.startswith(sha_prefix):
    print(f"stale-head: {head}")
    sys.exit(0)

# Per-check classification. Returns one of: "success", "pending-in-progress",
# "pending-queued", or a tuple ("failure", name, url) for terminal failures.
def classify(c):
    name = c.get("name") or c.get("context") or c.get("workflowName") or "?"
    url = c.get("detailsUrl") or c.get("targetUrl") or ""
    t = c.get("__typename")

    if t == "CheckRun":
        status = c.get("status")
        conclusion = c.get("conclusion")
        if status != "COMPLETED":
            # QUEUED, IN_PROGRESS, PENDING, WAITING, REQUESTED — non-terminal.
            return ("pending-in-progress" if status == "IN_PROGRESS" else "pending-queued"), name, url
        if conclusion in ("SUCCESS", "NEUTRAL", "SKIPPED"):
            return "success", name, url
        if conclusion in ("FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED", "STALE", "STARTUP_FAILURE"):
            return ("failure", name, url)
        return "pending-queued", name, url

    if t == "StatusContext":
        state = c.get("state")
        if state == "SUCCESS":
            return "success", name, url
        if state in ("ERROR", "FAILURE"):
            return ("failure", name, url)
        if state == "PENDING":
            return "pending-in-progress", name, url
        return "pending-queued", name, url

    return "pending-queued", name, url

checks = data.get("statusCheckRollup", [])
total = len(checks)
done = 0
in_progress = 0
queued = 0
failures = []

for c in checks:
    verdict = classify(c)
    if isinstance(verdict, tuple) and verdict[0] == "failure":
        failures.append((verdict[1], verdict[2]))
        done += 1
    else:
        kind = verdict if isinstance(verdict, str) else verdict[0]
        if kind == "success":
            done += 1
        elif kind == "pending-in-progress":
            in_progress += 1
        else:
            queued += 1

if failures:
    name, url = failures[0]
    print(f"failure: {name} — {url}")
    if len(failures) > 1:
        print(f"(plus {len(failures) - 1} more failing checks)")
    sys.exit(1)

if in_progress == 0 and queued == 0:
    print("green")
    sys.exit(0)

print(f"pending: {done}/{total} done, {in_progress} in_progress, {queued} queued")
sys.exit(0)
' "$raw" "$SHA_PREFIX"
