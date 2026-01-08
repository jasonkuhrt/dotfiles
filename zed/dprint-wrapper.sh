#!/bin/bash
# dprint wrapper that uses local config if available, otherwise falls back to global

# Check if we're in a project with a dprint config
if dprint fmt --stdin "$@" 2>/dev/null; then
  # dprint found a config in the current directory tree
  exit 0
else
  # Use global config
  dprint fmt --config /Users/jasonkuhrt/.config/dprint.json --stdin "$@"
fi