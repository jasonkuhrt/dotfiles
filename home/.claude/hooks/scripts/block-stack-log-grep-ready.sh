#!/usr/bin/env bash
# block-stack-log-grep-ready: Route dev-stack readiness checks through the
# canonical CLI, not grep-on-log monitors.
#
# Failure mode this prevents: arming a `tail -f /tmp/dev-stack-*.log | grep`
# Monitor that watches for a "Server started" / "stack ready" marker, then
# sitting idle when the log format changed or the marker never appeared.
# Silence-equals-still-running is indistinguishable from silence-equals-the-
# stack-is-already-up-but-my-pattern-missed-it. The dev skill says: use
# `npm run dev:stack:ready` (poll) or `npm run dev:stack:status -- --json`
# (one-shot). Both speak the same contract the stack actually emits.

set -euo pipefail

input=$(cat)
command=$(printf '%s' "$input" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command',''))" 2>/dev/null || true)

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

# Pattern: any tail -f / -F that references a dev-stack-related log AND a grep
# (or similar) that looks for stack-readiness markers anywhere in the
# pipeline.
has_tail_follow='tail[[:space:]].*-[fF]'
references_devstack_log='dev-stack[^[:space:]|;&]*\.log'
readiness_markers='(Server[[:space:]]+started|stack[[:space:]]+ready|seeding[[:space:]]+a[[:space:]]+fresh|seed[[:space:]]+complete|Local:[[:space:]]*http|listening[[:space:]]+on)'

if [[ ! "$command" =~ $has_tail_follow ]] \
  || [[ ! "$command" =~ $references_devstack_log ]] \
  || [[ ! "$command" =~ $readiness_markers ]]; then
  echo '{}'
  exit 0
fi

read -r -d '' MSG <<'EOF' || true
**[block-stack-log-grep-ready]**

Do not grep-monitor the dev-stack log for readiness markers — log formats drift (e.g. `Server started, listening` vs `Starting Server`) and a missed marker leaves you sitting on a silent monitor while the stack is already up.

Use the canonical CLI from the `dev` skill instead:

  # one-shot status (good for branching logic):
  npm run dev:stack:status -- --json

  # block until ready (good as Bash run_in_background:true):
  npm run dev:stack:ready

Grep-watching the log is still fine for *specific error signatures* during a test (e.g. `Null constraint`, `EADDRINUSE`) — the ban is only for using grep as a readiness gate.
EOF

export MSG
python3 -c 'import json,os; print(json.dumps({"decision":"block","reason":os.environ["MSG"]}))'
