#!/usr/bin/env bash
# skill-scripts-bun-only: Block tsx/node usage on skill scripts - must use bun
input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# Check if command runs a .ts file under skills directory with tsx or node
# Patterns to catch:
#   tsx ~/.claude/skills/...
#   npx tsx ~/.claude/skills/...
#   node ~/.claude/skills/...
if [[ "$command" =~ (tsx|node)[[:space:]]+(~|\$HOME|/Users/[^/]+)/\.claude/skills/[^[:space:]]+\.ts ]]; then
  cat <<'EOF'
{"decision": "block", "reason": "**[skill-scripts-bun-only]**\n\nSkill scripts MUST run with `bun`, not tsx/node.\n\n**Fix:** Replace `tsx` or `node` with `bun`:\n```bash\nbun ~/.claude/skills/<skill>/scripts/<name>.ts\n```"}
EOF
  exit 0
fi

# Also catch npx tsx pattern
if [[ "$command" =~ npx[[:space:]]+tsx[[:space:]]+(~|\$HOME|/Users/[^/]+)/\.claude/skills/[^[:space:]]+\.ts ]]; then
  cat <<'EOF'
{"decision": "block", "reason": "**[skill-scripts-bun-only]**\n\nSkill scripts MUST run with `bun`, not `npx tsx`.\n\n**Fix:** Replace `npx tsx` with `bun`:\n```bash\nbun ~/.claude/skills/<skill>/scripts/<name>.ts\n```"}
EOF
  exit 0
fi

echo '{}'
