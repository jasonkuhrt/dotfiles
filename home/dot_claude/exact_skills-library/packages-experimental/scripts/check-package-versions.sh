#!/usr/bin/env bash
# Check current vs latest version for a package
# Usage: check-package-versions.sh <package-name>
# Output: JSON with current and latest versions

set -euo pipefail

PACKAGE="$1"

# Get current version from package.json
CURRENT=$(grep "\"$PACKAGE\"" package.json 2>/dev/null | head -1 | sed 's/.*"\^*\([^"]*\)".*/\1/' || echo "not-installed")

# Get latest from npm
LATEST=$(npm view "$PACKAGE" version 2>/dev/null || echo "not-found")

echo "{\"package\":\"$PACKAGE\",\"current\":\"$CURRENT\",\"latest\":\"$LATEST\",\"needs_update\":$([ "$CURRENT" != "$LATEST" ] && echo "true" || echo "false")}"
