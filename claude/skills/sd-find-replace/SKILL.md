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

## Patterns

**Captures:**

```bash
sd '(\w+)@(\w+)' '$2 <$1>' file              # user@domain → domain <user>
sd '(?P<first>\w+) (?P<last>\w+)' '$last, $first' file  # Named captures
```

**Alternation:**

```bash
sd '(ADMINS?|MEMBERS?)' '@$1' file           # Handles ADMIN, ADMINS, MEMBER, MEMBERS
```

**Character classes:**

```bash
sd '[0-9]{4}-[0-9]{2}-[0-9]{2}' 'DATE' file  # Match dates
sd '\p{Greek}+' '[GREEK]' file               # Unicode categories
```

**Anchors:**

```bash
sd '^#+ ' '' file                            # Remove markdown headings
sd 'TODO$' 'DONE' file                       # End of line
```

## Gotchas

**Patterns starting with `-`** — use `--` to end flag parsing:

```bash
sd -- '-foo' 'bar' file              # Find "-foo", replace with "bar"
sd 'find' -- '-replacement' file     # Replacement is "-replacement"
```

**Literal `$` in replacement** — use `$$`:

```bash
sd 'price' '$$100' file              # Results in: $100
```

**Ambiguous capture references** — use `${var}` braces:

```bash
# WRONG: reads as $dollars_dollars (undefined)
sd '(?P<dollars>\d+)' '$dollars_dollars' file

# RIGHT: explicit boundary
sd '(?P<dollars>\d+)' '${dollars}_dollars' file
```

**Files modified in-place by default** — no `-i` flag needed (unlike sed). Use `-p` to preview first.

## When NOT to Use sd

| Situation                      | Use Instead                              |
| ------------------------------ | ---------------------------------------- |
| Code symbol renaming           | `mcp__serena__rename_symbol` (LSP-aware) |
| Need to review each occurrence | Edit tool (see context)                  |
| Single known location          | Edit tool                                |
| Need lookahead/lookbehind      | Edit tool (sd doesn't support these)     |

## Never Use

- `perl -pi -e` — silent data corruption with special characters
- `sed -i` — platform-inconsistent escaping

## Appendix

### Regex Engine

sd uses Rust's [`regex` crate](https://docs.rs/regex/latest/regex/) (RE2-style), not PCRE.

**Supported:** Alternation, captures, named captures, quantifiers, character classes, Unicode (`\p{...}`), anchors, word boundaries

**Not supported:** Lookahead `(?=...)`, lookbehind `(?<=...)`, backreferences `\1`

**Why this matters:** Guaranteed O(m\*n) time complexity — no catastrophic backtracking, no ReDoS vulnerabilities. If a pattern compiles, it runs fast.

### Links

- [sd GitHub](https://github.com/chmln/sd)
- [Rust regex syntax](https://docs.rs/regex/latest/regex/#syntax)
