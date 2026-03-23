#!/usr/bin/env bash
set -euo pipefail

# Two-tier agent enforcement:
# Tier 1: Typed subagents (Explore, Plan, etc.) — always allowed without team (read-only)
# Tier 2: General-purpose agents — require team membership OR session-scoped bare-subagent flag

read_input() {
  if [[ -t 0 ]]; then
    printf ''
    return 0
  fi
  cat
}

input="$(read_input)"

if [[ -z "$input" ]]; then
  exit 0
fi

session_id="$(printf '%s\n' "$input" | jq -r '.session_id // empty' 2>/dev/null || true)"
subagent_type="$(printf '%s\n' "$input" | jq -r '.tool_input.subagent_type // empty' 2>/dev/null || true)"
team_name="$(printf '%s\n' "$input" | jq -r '.tool_input.team_name // empty' 2>/dev/null || true)"
agent_name="$(printf '%s\n' "$input" | jq -r '.tool_input.name // empty' 2>/dev/null || true)"

# Tier 1: typed subagents (Explore, Plan, claude-code-guide, etc.) always pass — read-only agents
if [[ -n "$subagent_type" ]]; then
  exit 0
fi

# Tier 2: general-purpose agents need team OR session-scoped flag
if [[ -z "$team_name" ]]; then
  # Check session-scoped bare-subagent gate
  if [[ -n "$session_id" && -f "$HOME/.claude/flags/allow-bare-subagents-${session_id}" ]]; then
    exit 0  # Session gate is open — user explicitly opted in
  fi

  cat >&2 <<'EOF'
BLOCKED: Agent spawned without team_name.

General-purpose agents MUST be team members. Use TeamCreate first, then pass team_name and name to the Agent tool.

Example:
  Agent({ team_name: "my-team", name: "worker-1", ... })

To enable bare subagents for this session, tell the agent "use subagents".
Typed subagents (Explore, Plan, etc.) are always allowed without a team.
EOF
  exit 2
fi

if [[ -z "$agent_name" ]]; then
  cat >&2 <<'EOF'
BLOCKED: Agent spawned without a name.

All team agents MUST have a name so the user can SendMessage to them directly.

Example:
  Agent({ team_name: "my-team", name: "worker-1", ... })
EOF
  exit 2
fi

exit 0
