#!/bin/bash
# dprint wrapper for Zed that prefers local dprint/config over global
#
# Priority for dprint binary:
# 1. Project-local dprint (node_modules/.bin/dprint)
# 2. Global dprint (in PATH - pnpm global or Homebrew)
#
# Priority for config:
# 1. Project-local dprint.json (auto-discovered by dprint)
# 2. Global config (~/.config/dprint/dprint.json)
#
# Usage: dprint-wrapper.sh [dprint args...]
# Example: dprint-wrapper.sh fmt --stdin markdown

GLOBAL_CONFIG="$HOME/.config/dprint/dprint.json"

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

# Find dprint config (walk up looking for dprint.json)
find_dprint_config() {
  local dir="$PWD"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/dprint.json" ]]; then
      echo "$dir/dprint.json"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

# Determine which dprint binary to use
DPRINT="dprint"
if project_root=$(find_project_root); then
  local_dprint="$project_root/node_modules/.bin/dprint"
  if [[ -x "$local_dprint" ]]; then
    DPRINT="$local_dprint"
  fi
fi

# Determine config: use global if no local config found
CONFIG_ARGS=()
if ! find_dprint_config >/dev/null 2>&1; then
  if [[ -f "$GLOBAL_CONFIG" ]]; then
    CONFIG_ARGS=("--config" "$GLOBAL_CONFIG")
  fi
fi

exec "$DPRINT" "${CONFIG_ARGS[@]}" "$@"
