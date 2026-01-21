#!/bin/bash
# Guard: Remind Claude to use cc-configuring-permissions skill when editing settings.json

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only care about settings.json files
[[ -z "$FILE_PATH" ]] && exit 0
[[ ! "$FILE_PATH" =~ settings\.json$ ]] && exit 0

# Output reminder to transcript (exit 0 = continue, stdout goes to transcript)
cat <<'MSG'
⚠️ SETTINGS.JSON EDIT DETECTED

Before proceeding, verify you used the `cc-configuring-permissions` skill.
If not, STOP and invoke it now to verify correct syntax and known issues.

Key concerns:
- Permission pattern syntax (Skill, Bash, Read, MCP patterns, via Plugin)
- Known bugs to work around
- Restart requirements for manual edits
- Local vs plugin skill patterns (colon distinction)
MSG

exit 0
