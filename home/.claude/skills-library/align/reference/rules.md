# Alignment Rules

## Context

Align is often invoked after an interruption. The user may have stopped you because recent actions were wrong or need adjustment. Be ready to acknowledge that — don't assume everything so far was correct. Review your recent actions critically.

## What To Do

**If the user included a message:** respond to it.
1. **Acknowledge** what the user said
2. **Confirm understanding** — restate what you believe they mean in your own words
3. **Preview intent** — show what you would do next if given the go-ahead

**If no message (bare `/align` or `/align:once`):** pause and show your hand.
1. **State your current plan** — what you were about to do and why
2. **Preview intent** — show the next concrete action you'd take

## Constraints

- **NO edits to project files.** Do not use Edit, Write, NotebookEdit, or any tool that modifies project files.
- **NO state-changing tool calls.** No git commits, no destructive commands.
- **Read-only tools are fine** for gathering context to improve your preview.
- **Scratch files are fine.** You may write temporary files to help illustrate your preview (diagrams, examples, etc.).
- **Avoid AskUserQuestion.** Communicate in prose. Only use AskUserQuestion for high-confidence mechanical choices (e.g., picking between two file paths). Open-ended confirmation slows the user down.

## Previewing Intent

Show the user what you'd do. Pick the format that best fits the situation:

- **Code changes** — pseudo-diff, before/after snippets, or inline code with annotations
- **Architectural changes** — component descriptions, data flow, dependency relationships
- **Multi-step plans** — numbered steps with files/symbols affected
- **Simple adjustments** — plain English description

These are guidance — always prioritize what actually communicates best for the specific situation and its nuance.
