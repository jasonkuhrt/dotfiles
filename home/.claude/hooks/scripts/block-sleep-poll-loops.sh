#!/usr/bin/env bash
# block-sleep-poll-loops: reject Bash commands that poll something via a
# sleep loop (`until ... sleep ... done` or `while ... sleep ... done`).
#
# Claude Code provides three modern primitives for "watch X until Y":
#  - `/loop <interval> <prompt>` — re-invokes the agent on a cron, each
#    iteration becomes a chat message. Required for CI polling (see
#    memory: `feedback_use_loop_for_ci.md`).
#  - `Monitor` tool — long-running shell command, each stdout line
#    becomes a notification, exit ends the watch.
#  - `Bash run_in_background: true` — one-shot completion notification.
#
# A sleep-loop in Bash defeats all three: the harness only sees the final
# exit, so progress between iterations stays invisible.
#
# Escape hatch: include the literal token `allow-sleep-poll` anywhere in
# the command (commonly as `# allow-sleep-poll: <reason>`) and the hook
# lets it through.

set -euo pipefail

input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

if [[ "$command" == *"allow-sleep-poll"* ]]; then
  echo '{}'
  exit 0
fi

hit=0
if [[ "$command" =~ (^|[^A-Za-z_])until[[:space:]] ]] \
  && [[ "$command" =~ sleep[[:space:]] ]] \
  && [[ "$command" == *"done"* ]]; then
  hit=1
fi
if [[ "$command" =~ (^|[^A-Za-z_])while[[:space:]] ]] \
  && [[ "$command" =~ sleep[[:space:]] ]] \
  && [[ "$command" == *"done"* ]]; then
  hit=1
fi

if [[ "$hit" == 0 ]]; then
  echo '{}'
  exit 0
fi

read -r -d '' MSG <<'EOF' || true
**[block-sleep-poll-loops]**

This Bash command is a sleep-driven polling loop, which Claude Code's harness cannot surface progress for — only the final exit appears as a notification. Use one of the modern primitives instead:

1. `/loop <interval> <prompt>` — recurring re-invocation. Each tick is a chat message, so you see progress and can react. **Required for CI polling** (see memory `feedback_use_loop_for_ci.md`): `/loop 1m gh pr checks <N>`.
2. `Monitor` tool — single long-running shell command; each stdout line is a notification, exit ends the watch. Pick this when you need to react per-event (e.g. emit per terminal CI check, halt on first failure) and stay outside the conversation cadence.
3. `Bash run_in_background: true` — one completion notification only. Pick this when you genuinely just need "tell me when this single thing finishes" with no intermediate signals.

NEVER combine `Bash run_in_background` with a `sleep` loop — the loop suppresses every progress signal until exit, which is the exact failure mode this hook is rejecting.

Escape hatch: if this is a legitimate inline wait (e.g. waiting for a local dev server to come up before the next sequential step in the same shell), include `allow-sleep-poll` in the command — e.g. `# allow-sleep-poll: wait for vite dev server readiness inline`.
EOF

export MSG
python3 -c 'import json,os; print(json.dumps({"decision":"block","reason":os.environ["MSG"]}))'
