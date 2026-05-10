#!/usr/bin/env bash
# SessionStart hook — surfaces unresolved deferrals from .session/*.md so
# the agent sees them at session start instead of silently inheriting
# broken promises from prior sessions.
#
# What it scans for (case-insensitive, word-boundary):
#   - DEFERRED    — explicit deferral
#   - DEFER       — same family
#   - PROMISED    — agent committed to returning
#   - "TODO(returning)" / "TODO(when " — conditional follow-ups
#
# Output goes to stdout, which Claude Code injects as additional context
# into the next user turn. Surfaced lines include their file + line number
# so the agent can navigate to them.
#
# Why this exists: SESSION.md and similar artifacts are write-only ledgers
# from a session's perspective — the agent that wrote them isn't around
# when their trigger conditions fire. Without explicit re-surfacing, soft
# deferrals ("we'll come back if X starts") rot into silent permanent
# deferrals. This hook closes that gap.

set -euo pipefail

HOOK_INPUT=$(cat)
CWD=$(echo "$HOOK_INPUT" | jq --raw-output '.cwd // empty')

# Bail silently if cwd is missing or no .session/ here.
if [[ -z "$CWD" ]]; then exit 0; fi
if [[ ! -d "$CWD/.session" ]]; then exit 0; fi

# Pattern set. The leading boundary keeps us from matching "deferred" mid-word.
# shellcheck disable=SC2016  # awk-style string is intentional
PATTERNS='\b(DEFERRED|DEFER|PROMISED|TODO\(returning|TODO\(when )\b'

# Limit to recent (mtime within 90 days) and small (<200KB) markdown files
# under .session/. The leading -L follows symlinks since `.session` is
# typically a symlink to `.sessions/<active>`. Avoids spamming on archive
# directories via maxdepth + size constraint.
mapfile -t MATCHES < <(
  find -L "$CWD/.session" -maxdepth 6 -name '*.md' -type f -size -200k -mtime -90 -print0 2>/dev/null \
    | xargs -0 grep -EHn -i "$PATTERNS" 2>/dev/null \
    | head -20
)

if [[ "${#MATCHES[@]}" -eq 0 ]]; then exit 0; fi

# Emit a section the agent will see in its next turn's context.
printf '\n=== Unresolved deferrals from .session/ ===\n'
printf 'These lines from prior sessions reference work that was deferred or\n'
printf 'promised. Re-evaluate whether their trigger conditions have fired —\n'
printf 'broken promises are a known failure mode (see docs).\n\n'

for line in "${MATCHES[@]}"; do
  # `grep -Hn` output: <path>:<line>:<text>. Normalize path to be repo-relative.
  rel="${line#"$CWD"/}"
  printf '  %s\n' "$rel"
done

printf '\n'
