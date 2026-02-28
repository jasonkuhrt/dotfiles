#!/usr/bin/env bash
# Guard: Block dangerous chezmoi operations that silently destroy runtime edits.
#
# Always blocked:
#   chezmoi apply --force / -f
#   chezmoi state delete-bucket
#   chezmoi state delete (without --key)
#
# Always allowed:
#   chezmoi apply --no-tty <target>    (targeted, safe)
#   chezmoi apply --no-tty             (full apply, safe if no conflicts)
#   chezmoi status / diff / cat / managed / verify / doctor
#   chezmoi state delete --bucket=X --key=Y  (surgical, safe)
#   chezmoi state get / dump
#   chezmoi add / forget / source-path
#
# When blocked, the message tells the agent the correct conflict resolution flow.

set -euo pipefail

COMMAND=$(jq -r '.command // empty' < /dev/stdin)
if [ -z "$COMMAND" ]; then exit 0; fi

# Only inspect chezmoi commands
if ! echo "$COMMAND" | grep -qE '(^|\s|&&|\|)chezmoi\s'; then
  exit 0
fi

IS_DANGEROUS=false
REASON=""

# --- chezmoi apply --force / -f ---
if echo "$COMMAND" | grep -qE 'chezmoi\s+apply\s.*(-f\b|--force)'; then
  IS_DANGEROUS=true
  REASON="chezmoi apply --force overwrites runtime files without conflict detection"
fi

# --- chezmoi state delete-bucket (nukes all tracked state) ---
if echo "$COMMAND" | grep -qE 'chezmoi\s+state\s+delete-bucket'; then
  IS_DANGEROUS=true
  REASON="chezmoi state delete-bucket erases ALL file tracking state — next apply can silently overwrite every managed file"
fi

# --- chezmoi state delete without --key (too broad) ---
if echo "$COMMAND" | grep -qE 'chezmoi\s+state\s+delete\b' && ! echo "$COMMAND" | grep -qE 'delete-bucket'; then
  if ! echo "$COMMAND" | grep -qE -- '--key'; then
    IS_DANGEROUS=true
    REASON="chezmoi state delete without --key is too broad — specify the exact file with --key=/absolute/path"
  fi
fi

if [ "$IS_DANGEROUS" = false ]; then
  exit 0
fi

cat >&2 <<ERRMSG
BLOCKED: Dangerous chezmoi operation.

$REASON

Conflict resolution flow (use the chezmoi skill):
  1. chezmoi status <target>          # Check for conflicts (col 1 = M)
  2. chezmoi diff <target>            # Show what would change
  3. ASK THE USER for approval
  4. chezmoi state delete --bucket=entryState --key=<absolute_target_path>
  5. chezmoi apply --no-tty <target>  # Apply one file
  6. chezmoi status <target>          # Verify in sync

Never nuke all state. Never use --force. Always resolve per-file.
ERRMSG
exit 2
