#!/bin/bash
# SessionStart hook — surface the session ID into the agent's context.
#
# The agent needs the session ID to add the `Session-Id` trailer to commits
# (see ~/.claude/rules/git-commits.md). Claude Code does not otherwise expose
# the ID to the agent. SessionStart hook stdout becomes additionalContext.
#
# This restores the session-id half of the old session-start-resume-info.sh,
# which was deleted in dotfiles commit aad7c23a (cmux wrapper migration); the
# cmux bundled wrapper replaced the cmux parts but not this.

HOOK_INPUT=$(cat)
SESSION_ID=$(echo "$HOOK_INPUT" | jq --raw-output '.session_id // empty' 2>/dev/null)

if [[ -n "$SESSION_ID" ]]; then
  echo "Session-Id: $SESSION_ID"
  echo "Use this as the \`Session-Id\` trailer on commits made this session."
  echo "Resume this session with: claude --resume $SESSION_ID"
fi
