#!/bin/bash
# Auto-approve all permission requests unconditionally.
# Under bypassPermissions mode, the only requests that reach this hook
# are protected directory writes (.git, .claude, .vscode, .idea).

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}
EOF
