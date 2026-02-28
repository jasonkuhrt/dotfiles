#!/bin/bash
# PostToolUse hook for *.tpl.md files
# Reminds Claude to use template-dsl skill

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [[ -z "$file_path" ]]; then
  exit 0
fi

if [[ "$file_path" == *.tpl.md ]]; then
  echo "Did you use the template-dsl skill? Templates must follow the DSL spec."
fi

exit 0
