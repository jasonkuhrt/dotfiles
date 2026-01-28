---
name: git:commit
description: Use when about to run git commit. Enforces thread-scoped commits and permission checks.
---

# Git Commit

## CRITICAL

**Only commit changes related to the current thread.**

Unrelated changes in the working directory are NOT yours to commit.

## Steps

1. **Check permission** — invoke `git:mode-control` skill
2. **Identify thread-related files** — what did YOU change for THIS task?
3. **Stage only those files** — `git add <specific-files>`
4. **Verify before commit** — `git status` should show ONLY thread-related changes staged
5. **Commit**

## Override

User must explicitly request broader scope:

| User says                         | Action                      |
| --------------------------------- | --------------------------- |
| "commit"                          | Thread-related changes only |
| "commit all", "commit everything" | All staged/unstaged changes |
| "commit these files: X, Y, Z"     | Exactly those files         |

**Default is thread-scoped. No exceptions.**

## Red Flags

If you're about to stage files you didn't touch for this thread:

- STOP
- Ask: "I see unrelated changes to X, Y. Should I include those?"
- Wait for explicit confirmation

## Common Mistakes

| Mistake                            | Fix                                             |
| ---------------------------------- | ----------------------------------------------- |
| `git add .` without checking       | Always `git status` first, stage specific files |
| Including files from previous work | Only stage what YOU changed for THIS task       |
| Assuming user wants everything     | Default is thread-scoped                        |
