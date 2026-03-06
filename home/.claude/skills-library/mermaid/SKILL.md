---
name: mermaid
description: Use when creating Mermaid diagrams. Triggers on "mermaid", "mermaid diagram", or when GitHub README rendering is needed.
---

# Mermaid

## CRITICAL

### After Modifying Mermaid

Ask user if they want PNG rendered: "Want me to render to PNG?"

### Node IDs

**IDs ARE labels.** Never use `A[Login]` - use `login` directly.

```mermaid
%% WRONG
A[Login] --> B[Validate]

%% RIGHT
login --> validate
```

Use `snake_case` for multi-word: `user_profile`, `validate_credentials`.

**Only use `[label]` when:** shape requires it, explicit user instruction, or matching existing style.

## When to Use Mermaid

| Use Mermaid When                   | Use D2 Instead When                 |
| ---------------------------------- | ----------------------------------- |
| GitHub README (native rendering)   | Terminal/code comment output needed |
| Existing Mermaid codebase          | Starting fresh                      |
| Sequence diagrams (Mermaid excels) | Complex layouts                     |

## References

- `references/style.md` - default style guide (node IDs, edge labels, subgraphs, formatting)
- `references/syntax.md` - flowcharts, sequences, state, class, ER, Gantt
- `references/directives.md` - accTitle, accDescr, %%{init}%%, themes

## Rendering to PNG

```bash
node ~/.claude/skills/mermaid/scripts/render.mjs <file.md>
node ~/.claude/skills/mermaid/scripts/render.mjs <file.md> --watch
```

Run `--help` for options. Uses `accTitle` directive for filenames.

**Watch mode:** On "update as I edit", "watch for changes", run with `--watch &` in background.

**Output:** `![name](path.png) · [Mermaid Live](url) <!-- mermaid:hash -->` - hash enables re-render on content change.

## Notes

- 80-100 column width for terminal compatibility
- Left-to-right or top-to-bottom flow
