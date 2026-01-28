---
name: cc:markers
description: "Use when asked to review @claude or @c markers in code, address inline notes, resolve review comments, or when seeing '// @claude', '// @c', '/* @claude', '/* @c' patterns in files."
---

# Claude Markers

Inline code comments for communicating with Claude during development.

## Syntax

```typescript
// @c <message>           // Default - address, ask if unclear
// @c? <message>          // Question - explain only, no code changes
// @c! <message>          // Action - address immediately, no discussion
// @c?! <message>         // Discuss-then-act - explain approach, wait for OK, then implement
```

`@claude` is an alias for `@c`.

## Modifiers

| Modifier | Mode     | Behavior                                                     |
| -------- | -------- | ------------------------------------------------------------ |
| (none)   | Default  | Address marker, ask if genuinely unclear                     |
| `?`      | Question | Explain/answer only, no code changes                         |
| `!`      | Action   | Address immediately, no discussion unless genuinely confused |
| `?!`     | Discuss  | Explain approach, wait for confirmation, then implement      |

## Behavior

1. Determine search scope:
   - If file path(s) provided → search those files
   - Otherwise → search only files with uncommitted changes (`git diff --name-only`)
2. Search for `@claude` and `@c` markers
3. For each marker:
   - Check modifier to determine response mode
   - Address per mode (explain, implement, or discuss-then-implement)
   - Delete marker after resolving
4. Repeat until none remain

## Notes

- Temporary - must not reach `develop` branch (CI enforces this)
- Distinct from `TODO` (in-progress PR work) and `FIXME` (persistent tech debt)
- CI pattern sourced from `assets/grep-pattern.txt` - update there to add new marker syntax
