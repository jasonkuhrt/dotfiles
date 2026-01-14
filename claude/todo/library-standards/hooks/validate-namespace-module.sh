#!/bin/bash
# Validates _.ts (namespace module) content after edits

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# Only validate _.ts files (not _.test.ts, _.test.fixture.ts)
if [[ "$file_path" == */_.ts ]] && [[ "$file_path" != *_.test.ts ]] && [[ "$file_path" != *_.test.fixture.ts ]]; then
  cd "$CLAUDE_PROJECT_DIR"

  if [[ ! -f "$file_path" ]]; then
    exit 0
  fi

  content=$(cat "$file_path")
  dir=$(dirname "$file_path")
  dir_name=$(basename "$dir")

  # Convert kebab-case to PascalCase for expected namespace name
  pascal_name=$(echo "$dir_name" | sed -E 's/(^|-)([a-z])/\U\2/g')

  errors=""

  # Check if barrel module exists
  if [[ -f "$dir/__.ts" ]]; then
    # Must export namespace from barrel
    if ! echo "$content" | grep -qE "^export \* as [A-Z][a-zA-Z0-9]* from '\./__.js'"; then
      errors+="_.ts with __.ts sibling must contain: export * as $pascal_name from './__.js'\n"
    fi
  else
    # Must export from implementation file or as namespace
    if ! echo "$content" | grep -qE "^export \* (as [A-Z][a-zA-Z0-9]* )?from '\./[a-z]"; then
      errors+="_.ts without __.ts must contain: export * as $pascal_name from './<name>.js' or export * from './<name>.js'\n"
    fi
  fi

  # Check for forbidden patterns
  if echo "$content" | grep -qE "^import "; then
    errors+="_.ts should not have import statements (only re-exports)\n"
  fi

  if [[ -n "$errors" ]]; then
    echo "Library Standards: _.ts validation issues in $file_path:"
    echo -e "$errors"
    echo "See ~/.claude/docs/conventions/library-local.md for details."
  fi
fi

exit 0
