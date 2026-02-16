---
name: session:new
description: Generate a carry-over prompt capturing current session context for a new Claude Code session. Use when the user wants to continue work in a fresh session, says "new session", "carry over", or /session:new.
---

# Session Handoff

Generate a self-contained prompt the user can paste into a new Claude Code session to continue the current work.

## Process

1. **Analyze the conversation** — identify:
   - What was being worked on (the task/feature/investigation)
   - Current state (what's done, what's in progress, what's blocked)
   - Key decisions made and their rationale
   - Relevant file paths, commit hashes, and technical details
   - Open questions or next steps

2. **Generate the prompt** — output a fenced code block (` ```text `) containing:
   - A `## Context` section with project path and branch
   - Numbered subsections for each active topic/task
   - For each topic: current state, what we know, what's wanted/next
   - Relevant commit hashes, file paths, config details
   - Any technical discoveries worth preserving (avoid re-investigation)

3. **Tell the user** to copy the prompt and paste it into: `claude --new`

## Guidelines

- **Be specific, not generic.** Include actual paths, hashes, key names, command outputs — anything that prevents the next session from re-discovering what this session already learned.
- **Omit completed work** unless it's context for in-progress work.
- **Keep it under 200 lines.** Compress ruthlessly. The next session can read files; the prompt just needs enough to know WHERE to look and WHAT was decided.
- **Include beads references** if any are in progress (`bd show <id>` for the next session to pick up).
