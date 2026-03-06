#!/usr/bin/env bash
set -euo pipefail

# Create a bead as a child of the given epic.
#
# Usage:
#   create-child.sh <epic-id> [bd create flags...]
#
# Example:
#   create-child.sh Heartbeat-2az --title="Fix retry button" --type=bug --priority=1
#
# Automatically appends --parent <epic-id> to bd create.
# Outputs the created bead ID and confirms parent attachment.

if [[ $# -lt 1 ]]; then
  echo "Usage: create-child.sh <epic-id> [bd create flags...]" >&2
  exit 1
fi

epic_id="$1"
shift

# Check that --parent is NOT already in the args (prevent double-parenting)
for arg in "$@"; do
  if [[ "$arg" == "--parent" || "$arg" == --parent=* ]]; then
    echo "ERROR: --parent already specified. This script adds --parent automatically." >&2
    exit 1
  fi
done

# Create with --parent and --silent to capture just the ID
bead_id=$(bd create "$@" --parent "$epic_id" --silent 2>&1)
exit_code=$?

if [[ $exit_code -ne 0 ]]; then
  echo "ERROR: bd create failed:" >&2
  echo "$bead_id" >&2
  exit $exit_code
fi

echo "$bead_id"
