# Claude Fork

Fork tasks to independent Claude Code sessions in separate Ghostty fullscreen spaces.

**When NOT to use:** For in-process parallel work, use CC's built-in Task tool with subagents. This skill is for spawning fully independent terminal sessions running a new Claude Code process, thread.

## Requirements

- macOS
- Ghostty terminal
- Claude Code CLI (`claude`) in PATH

## Steps

1. Run the fork script:

   ```bash
   ~/.claude/skills/cc_core/scripts/fork.sh "<task-title>" "${CLAUDE_SESSION_ID}" "<prompt>"
   ```

2. Tell user the fork was spawned.

## Notes

- **Steals focus** - macOS requires activation to create fullscreen space
- **Extra dock icon** - Unavoidable with `--new`
- **No new tab option** - Ghostty limitation ([#2353](https://github.com/ghostty-org/ghostty/issues/2353))
- **Transcripts linkable** - Fork tracking line connects parent/child sessions
