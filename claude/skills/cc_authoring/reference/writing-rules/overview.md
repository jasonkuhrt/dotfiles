# Writing Project Rules

## CRITICAL

The frontmatter key is **`paths:`**, NOT `globs:`. Claude Code silently ignores `globs:` (that's Cursor's key). Rules with unrecognized keys load unconditionally.

Glob patterns **must be quoted** in YAML (patterns starting with `*` or `{` are reserved YAML indicators).

## Rule File Locations

| Location               | Scope              | Loaded When           |
| ---------------------- | ------------------ | --------------------- |
| `.claude/CLAUDE.md`    | Project-wide       | Always                |
| `.claude/rules/*.md`   | File-specific      | When paths match      |
| `~/.claude/CLAUDE.md`  | User global        | Always (all projects) |
| `~/.claude/rules/*.md` | User file-specific | When paths match      |

## Creating File-Scoped Rules

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Rules

- Use Result types for errors
- Validate inputs at boundaries
```

Multiple paths:

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---
```

Brace expansion:

```markdown
---
paths:
  - "**/*.{ts,tsx}"
  - "{src,lib}/**/*.ts"
---
```

Global rules (no scoping): omit frontmatter entirely.

## Rules vs Skills

Consider a **skill** instead of a rule when:

- Content applies to **operations** (git push, running tests) not file edits
- Guidance is **on-demand** rather than always needed
- The path pattern doesn't match when the rule would actually help

**Gotcha:** A rule with `paths: ".github/**"` containing "never push to main" won't load during `git push` - it only loads when editing .github files. Use a skill or hook instead.

## Key Principles

1. **Prefer paths over project-wide** - reduces token usage
2. **Keep rules concise** - they consume context tokens
3. **One concern per rule file** - easier to maintain
4. **Multiple rules can match** - all matching rules apply
5. **Match paths to trigger** - ensure path fires when rule is needed
