#!/bin/sh
# claudex-worker-identity: when this session is a claudex dispatch worker
# (CLAUDEX_WORKER is exported by the claudex fish function), inject worker
# identity at session start so the lead-session memory rule "all coding
# dispatched to Codex" inverts instead of recursing. Without this, workers
# obey that rule and re-dispatch their own claudex children, which die when
# the headless -p turn ends (observed 2026-07-18: two silent zero-edit runs).
[ -n "$CLAUDEX_WORKER" ] || exit 0
cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"YOU ARE A CLAUDEX WORKER — the dispatch TARGET (sol running inside the Claude harness). The project rule 'all coding is dispatched to Codex' does NOT apply to you: you are its endpoint. Implement everything yourself, inline, in this session. Never spawn subagents (Agent/Task tools), never dispatch claudex/codex, never start background work that must outlive your turn — this is headless print mode and child processes are killed the moment your turn ends. Do not end your turn until every deliverable is complete and every named gate has actually run."}}
EOF
