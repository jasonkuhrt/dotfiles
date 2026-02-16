---
name: remind
description: Use when saving reminders, todos, things to try, or quick notes for later. Triggers on "remind me", "save a todo", "remember to", "add reminder", or /remind.
---

# Remind

Persistent reminders stored at `~/.claude/reminders.md` as a markdown checklist.

## Storage Format

```md
- [ ] `2025-02-11` Try zerobrew, a replacement for homebrew
- [ ] `2025-02-11` Fix the auth bug
- [x] `2025-02-10` Update dotfiles sync script
```

Each item: `- [ ] \`<date-added>\` <text>`

## Operations

### Add (`/remind <text>` or conversational)

1. Read `~/.claude/reminders.md` (create if missing, with `# Reminders\n` header)
2. Append: `- [ ] \`<today>\` <text>`
3. Confirm: `Saved: <text>`

### List (`/remind list` or "show reminders")

1. Read and display the file contents
2. If empty: "No reminders."

### Done (`/remind done <number>` or "mark reminder N done")

1. Read the file, find the Nth unchecked item (1-indexed)
2. Change `- [ ]` to `- [x]`
3. Confirm: `Done: <text>`

### Clear done (`/remind clear`)

1. Remove all `- [x]` lines
2. Confirm count removed

### Remove (`/remind remove <number>`)

1. Delete the Nth unchecked item entirely (no done mark, just gone)
2. Confirm: `Removed: <text>`

## Principles

- **Fast**: Add and confirm in one exchange. Don't ask clarifying questions for simple adds.
- **Non-lossy**: Preserve the user's exact wording. Don't rephrase or summarize.
- **Date-stamped**: Every item gets the date it was added, for context.

## Default Behavior

If `/remind` is invoked with text after it, treat as an add. If invoked bare, show the list.
