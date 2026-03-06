#!/usr/bin/env bash
# flo-orphan-guard: Warn when bd create without --parent is used on an epic branch
input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# Only relevant if the command is bd create without --parent
if [[ "$command" =~ bd[[:space:]]+create ]] && [[ ! "$command" =~ --parent ]]; then
  # Only warn on epic branches (feature/hea-* pattern = Linear issue branch)
  branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [[ "$branch" =~ ^feature/hea- ]]; then
    cat <<'EOF'
{"systemMessage": "**[flo-orphan-guard]**\nBare `bd create` without `--parent` detected on an epic branch.\n\nYou're creating a bead without specifying a parent epic. This produces orphaned beads that aren't attached to the active epic.\n\n**Use `/flo:add` instead**, which automatically resolves the active epic and sets `--parent`."}
EOF
    exit 0
  fi
fi

echo '{}'
