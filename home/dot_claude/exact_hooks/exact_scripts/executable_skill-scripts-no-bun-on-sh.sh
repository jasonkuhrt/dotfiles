#!/usr/bin/env bash
# skill-scripts-no-bun-on-sh: Block bun usage on .sh skill scripts - must use bash
input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# Check if command runs a .sh file under skills directory with bun
if [[ "$command" =~ bun[[:space:]]+(~|\$HOME|/Users/[^/]+)/\.claude/skills/[^[:space:]]+\.sh ]]; then
  cat <<'EOF'
{"decision": "block", "reason": "**[skill-scripts-no-bun-on-sh]**\n\nBash scripts (`.sh`) must run with `bash`, not `bun`. Bun is a JS/TS runtime and cannot parse shell syntax.\n\n**Fix:** Replace `bun` with `bash`:\n```bash\nbash ~/.claude/skills/<skill>/scripts/<name>.sh [args]\n```"}
EOF
  exit 0
fi

echo '{}'
