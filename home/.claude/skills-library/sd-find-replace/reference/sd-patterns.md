# sd Patterns & Reference

## Patterns

**Captures:**

```bash
sd '(\w+)@(\w+)' '$2 <$1>' file              # user@domain -> domain <user>
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

**Patterns starting with `-`** -- use `--` to end flag parsing:

```bash
sd -- '-foo' 'bar' file              # Find "-foo", replace with "bar"
sd 'find' -- '-replacement' file     # Replacement is "-replacement"
```

**Literal `$` in replacement** -- use `$$`:

```bash
sd 'price' '$$100' file              # Results in: $100
```

**Ambiguous capture references** -- use `${var}` braces:

```bash
# WRONG: reads as $dollars_dollars (undefined)
sd '(?P<dollars>\d+)' '$dollars_dollars' file

# RIGHT: explicit boundary
sd '(?P<dollars>\d+)' '${dollars}_dollars' file
```

**Files modified in-place by default** -- no `-i` flag needed (unlike sed). Use `-p` to preview first.

## Regex Engine

sd uses Rust's [`regex` crate](https://docs.rs/regex/latest/regex/) (RE2-style), not PCRE.

**Supported:** Alternation, captures, named captures, quantifiers, character classes, Unicode (`\p{...}`), anchors, word boundaries

**Not supported:** Lookahead `(?=...)`, lookbehind `(?<=...)`, backreferences `\1`

O(m\*n) guaranteed -- no backtracking.

## Links

- [sd GitHub](https://github.com/chmln/sd)
- [Rust regex syntax](https://docs.rs/regex/latest/regex/#syntax)
