#!/bin/bash
# Validates __.ts (barrel module) content after edits

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# Only validate __.ts files
if [[ "$file_path" == */__.ts ]]; then
  cd "$CLAUDE_PROJECT_DIR"

  if [[ ! -f "$file_path" ]]; then
    exit 0
  fi

  content=$(cat "$file_path")
  dir=$(dirname "$file_path")

  errors=""

  # Check for forbidden patterns

  # Should not import from _.ts
  if echo "$content" | grep -qE "from '\./_.js'"; then
    errors+="__.ts must not import from _.ts (circular dependency)\n"
  fi

  # Should not have regular imports (only re-exports)
  if echo "$content" | grep -qE "^import [^{].*from"; then
    # Allow: import type { X } from
    # Disallow: import { X } from, import X from
    if echo "$content" | grep -vE "^import type " | grep -qE "^import "; then
      errors+="__.ts should only contain re-exports, not value imports\n"
    fi
  fi

  # Should not export from parent directories
  if echo "$content" | grep -qE "from '\.\./"; then
    errors+="__.ts should only export from within its library directory\n"
  fi

  # Check that all exports are from local files
  if echo "$content" | grep -qE "from '[^.]"; then
    errors+="__.ts should only export from relative paths (./), not package imports\n"
  fi

  if [[ -n "$errors" ]]; then
    echo "Library Standards: __.ts validation issues in $file_path:"
    echo -e "$errors"
    echo "See ~/.claude/docs/conventions/library-local.md for details."
  fi
fi

exit 0
