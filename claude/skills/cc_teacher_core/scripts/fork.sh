#!/bin/bash
# Fork a task to an independent Claude Code session in a new Ghostty fullscreen space
# Usage: fork.sh <task-title> <parent-session-id> <prompt>

set -e

TASK_TITLE="$1"
PARENT_SESSION="$2"
PROMPT="$3"

if [[ -z "$TASK_TITLE" || -z "$PROMPT" ]]; then
  echo "Usage: fork.sh <task-title> <parent-session-id> <prompt>" >&2
  exit 1
fi

WORKING_DIR="$(pwd)"
FORK_DIR="$WORKING_DIR/.clauding/cc_fork"
mkdir -p "$FORK_DIR"

TIMESTAMP=$(date +%s)-$RANDOM
PROMPT_FILE="$FORK_DIR/prompt-$TIMESTAMP.txt"
SCRIPT_FILE="$FORK_DIR/launch-$TIMESTAMP.sh"

# Write prompt with parent session reference
cat > "$PROMPT_FILE" << EOF
[Fork of session: $PARENT_SESSION. Do not read parent transcript unless asked.]

$PROMPT
EOF

# Write launcher script
cat > "$SCRIPT_FILE" << EOF
#!/bin/bash
cd "$WORKING_DIR"
cat "$PROMPT_FILE"
echo ""
claude "\$(cat $PROMPT_FILE)"
EOF
chmod +x "$SCRIPT_FILE"

# Launch in new Ghostty fullscreen space
open --new -a Ghostty.app --args --fullscreen=true --title="Fork: $TASK_TITLE" -e "$SCRIPT_FILE"

echo "Forked: $TASK_TITLE"
