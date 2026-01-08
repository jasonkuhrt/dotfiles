#!/bin/bash
# dprint wrapper for Zed that prefers local dprint over global
#
# Priority:
# 1. Project-local dprint (node_modules/.bin/dprint)
# 2. Global dprint (pnpm global or Homebrew)
#
# Usage: dprint-wrapper.sh [dprint args...]
# Example: dprint-wrapper.sh fmt --stdin markdown

# Find project root (walk up looking for package.json)
find_project_root() {
  local dir="$PWD"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" ]]; then
      echo "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

# Try local dprint first
if project_root=$(find_project_root); then
  local_dprint="$project_root/node_modules/.bin/dprint"
  if [[ -x "$local_dprint" ]]; then
    exec "$local_dprint" "$@"
  fi
fi

# Fall back to global dprint
exec dprint "$@"
