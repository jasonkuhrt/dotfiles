#!/usr/bin/env bash
# Get changelog from GitHub release
# Usage: get-changelog-release.sh <repo> <version>

set -euo pipefail

REPO="$1"
VERSION="$2"

gh release view "$VERSION" --repo "$REPO" --json body --jq '.body'
