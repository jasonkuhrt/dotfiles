#!/usr/bin/env bash
# Initialize .config/packages-experimental/ from templates

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
CONFIG_DIR=".claude/packages-experimental"

if [[ -d "$CONFIG_DIR" ]]; then
  echo "Already initialized: $CONFIG_DIR exists"
  exit 0
fi

mkdir -p "$CONFIG_DIR"
cp "$SKILL_DIR/templates/packages.yaml" "$CONFIG_DIR/"
cp "$SKILL_DIR/templates/issues.md" "$CONFIG_DIR/"

echo "Initialized $CONFIG_DIR with templates"
echo "Next: Edit packages.yaml to add packages to track"
