---
name: sd-find-replace
description: Use when performing batch find/replace in text files, batch renaming, or pattern substitution. Not for code symbol renaming (use Serena).
---

# sd Find Replace

## Quick Reference

```bash
sd 'pattern' 'replacement' file       # Basic replacement
sd -p 'pattern' 'replacement' file    # Preview (no changes)
sd -F 'literal' 'replacement' file    # Literal string mode (no regex)
sd -f i 'pattern' 'replacement' file  # Case-insensitive
sd -f w 'word' 'replacement' file     # Whole words only
sd -n 1 'pattern' 'replacement' file  # Replace first match only
```

**Flags (`-f`):** `i` case-insensitive | `m` multi-line | `s` dot-matches-newline | `w` whole-words

## Batching

**Always batch into one Bash call** — tool call overhead adds latency:

```bash
# GOOD: Single tool call
sd 'pattern1' 'replace1' file && \
sd 'pattern2' 'replace2' file && \
sd 'pattern3' 'replace3' file

# BAD: Multiple Bash tool calls
```

**Even better — combine with alternation:**

```bash
# One regex handles multiple variations
sd '(foo|bar|baz)' 'qux' file
sd '`(ADMIN|MEMBER|GUEST)`' '`@$1`' file
```

See [reference/sd-patterns.md](reference/sd-patterns.md) for regex patterns, captures, gotchas, and engine details.

## When NOT to Use sd

| Situation                      | Use Instead                              |
| ------------------------------ | ---------------------------------------- |
| Code symbol renaming           | `mcp__serena__rename_symbol` (LSP-aware) |
| Need to review each occurrence | Edit tool (see context)                  |
| Single known location          | Edit tool                                |
| Need lookahead/lookbehind      | Edit tool (sd doesn't support these)     |

## Never Use

- `perl -pi -e` -- silent data corruption with special characters
- `sed -i` -- platform-inconsistent escaping
