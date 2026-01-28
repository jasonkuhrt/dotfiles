#!/bin/bash
# Gather tag conflicts (tags that differ between local and remote)
# Outputs JSON array of conflicts
# Skips auto-generated tags (codepush/*, etc.) by default

set -euo pipefail

# Tags matching these patterns are skipped (auto-generated, not meaningful to sync)
SKIP_PATTERNS=(
  "codepush/*"
)

should_skip_tag() {
  local tag="$1"
  for pattern in "${SKIP_PATTERNS[@]}"; do
    # Use bash pattern matching
    if [[ "$tag" == $pattern ]]; then
      return 0
    fi
  done
  return 1
}

LOCAL_TAGS_FILE=$(mktemp)
REMOTE_TAGS_FILE=$(mktemp)
trap "rm -f $LOCAL_TAGS_FILE $REMOTE_TAGS_FILE" EXIT

git show-ref --tags 2>/dev/null | while read -r SHA REF; do
  TAG="${REF#refs/tags/}"
  [[ "$TAG" == *"^{}" ]] && continue
  should_skip_tag "$TAG" && continue
  echo "$TAG $SHA"
done > "$LOCAL_TAGS_FILE"

git ls-remote --tags origin 2>/dev/null | while read -r SHA REF; do
  TAG="${REF#refs/tags/}"
  [[ "$TAG" == *"^{}" ]] && continue
  should_skip_tag "$TAG" && continue
  echo "$TAG $SHA"
done > "$REMOTE_TAGS_FILE"

echo "["
FIRST="true"
while read -r TAG LOCAL_SHA; do
  REMOTE_SHA=$(grep "^$TAG " "$REMOTE_TAGS_FILE" 2>/dev/null | cut -d' ' -f2 || echo "")
  if [ -n "$REMOTE_SHA" ] && [ "$LOCAL_SHA" != "$REMOTE_SHA" ]; then
    [ "$FIRST" = "false" ] && echo ","
    FIRST="false"
    printf '  {"tag": "%s", "localCommit": "%s", "remoteCommit": "%s"}' \
      "$TAG" "$LOCAL_SHA" "$REMOTE_SHA"
  fi
done < "$LOCAL_TAGS_FILE"
echo ""
echo "]"
