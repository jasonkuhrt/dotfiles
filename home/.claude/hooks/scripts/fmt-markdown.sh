#!/bin/bash
# PostToolUse(Write|Edit|MultiEdit): format markdown with the project's own
# formatter — never a global install. Resolution order:
#   1. `vp fmt` when the project is a vite-plus project (vite config present
#      and vp resolvable) — config-correct, the repo's sanctioned entrypoint.
#   2. The project-local oxfmt bin (node_modules/.bin/oxfmt).
#   3. Neither → silent no-op.
f=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')
case "$f" in
*.md) ;;
*) exit 0 ;;
esac
[ -f "$f" ] || exit 0
root="${CLAUDE_PROJECT_DIR:-$PWD}"
cd "$root" 2>/dev/null || exit 0
if { [ -f vite.config.mts ] || [ -f vite.config.ts ]; } \
  && command -v vp >/dev/null 2>&1; then
  vp fmt "$f" >/dev/null 2>&1
  exit 0
fi
if [ -x node_modules/.bin/oxfmt ]; then
  node_modules/.bin/oxfmt "$f" >/dev/null 2>&1
fi
exit 0
