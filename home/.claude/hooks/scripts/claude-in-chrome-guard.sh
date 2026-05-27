#!/usr/bin/env bash
# claude-in-chrome browser-tooling guard.
# PreToolUse hook, matcher: mcp__claude-in-chrome__.*
# On the first claude-in-chrome tool call of a session it hard-denies and puts
# the correct browser-tooling model in front of the agent; once the agent
# touches the ack marker it stays quiet for the rest of the session.
# Pairs with ~/.claude/rules/claude-in-chrome.md. Fail-open by design.

input=$(cat)
session=$(printf '%s' "$input" | jq -r '.session_id // empty' 2>/dev/null)
[ -z "$session" ] && session="unknown"

guard_dir="${TMPDIR:-/tmp}/claude-browser-guard"
ack="$guard_dir/ack-$session"

# Acknowledged already this session — allow the call silently.
if [ -f "$ack" ]; then
  exit 0
fi
mkdir -p "$guard_dir" 2>/dev/null

reason="BROWSER-TOOLING GUARD — first claude-in-chrome call this session. STOP and verify; do not guess:

1. The Claude in Chrome EXTENSION is \"the plugin\"; the mcp__claude-in-chrome__* tools are the interface to it. An \"Allow remote debugging?\" dialog is the CDP / remote-debugging path, NOT the plugin — if it appears, stop and tell the user.
2. claude-chrome-allow is LEGITIMATE — it pre-approves URLs in the extension's allowlist (see ~/.claude/rules/claude-in-chrome.md). It is the plugin's companion, not a workaround.
3. Read ~/.claude/rules/claude-in-chrome.md before proceeding. Never invent concepts — there is no \"re-allow navigation\".
4. If anything is uncertain, STOP and ask the user.

Cleared the above? Run this command, then retry the tool:
  touch '$ack'
The guard then stays quiet for the rest of this session."

if command -v jq >/dev/null 2>&1; then
  jq -cn --arg r "$reason" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
else
  printf '%s\n' "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"Browser-tooling guard: read ~/.claude/rules/claude-in-chrome.md, then touch $ack and retry.\"}}"
fi
exit 0
