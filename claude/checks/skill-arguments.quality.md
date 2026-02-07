---
refs:
  - https://code.claude.com/docs/en/skills#pass-arguments-to-skills
  - https://code.claude.com/docs/en/skills#available-string-substitutions
  - https://code.claude.com/docs/en/skills#frontmatter-reference
  - https://code.claude.com/docs/en/skills#inject-dynamic-context
---

## skill-arguments

Skills that accept user input must use the argument system optimally. Every feature exists for a reason — skipping any one forces Claude to guess or forces users to discover behavior by trial.

---

### 1. `argument-hint` required when skill accepts arguments
ref: https://code.claude.com/docs/en/skills#frontmatter-reference

If a skill's description or body expects user-provided input, `argument-hint` MUST be present in frontmatter. This is the only way users discover what to type — it appears in the autocomplete dropdown.

#### Correct

```yaml
---
name: fix-issue
description: Fix a GitHub issue
argument-hint: [issue-number]
---
```

#### Incorrect

```yaml
---
name: fix-issue
description: Fix a GitHub issue by number
---
```

Missing `argument-hint`. Users see `/fix-issue` in autocomplete with no indication it expects a number.

---

### 2. Use substitution variables, not prose descriptions of arguments
ref: https://code.claude.com/docs/en/skills#available-string-substitutions

When the skill body needs to reference user input, use `$ARGUMENTS`, `$ARGUMENTS[N]`, or `$N` — never describe what the argument is in natural language when the substitution system handles it.

#### Correct

```yaml
---
name: shan:equip
argument-hint: [skill-or-loadout]
---

bun ~/path/to/shan.ts skill equip $ARGUMENTS
```

#### Incorrect

```yaml
---
name: shan:equip
argument-hint: [skill-or-loadout]
---

Equip the specified skill or loadout. The user will provide the name as an argument.

bun ~/path/to/shan.ts skill equip $ARGUMENTS
```

The prose "The user will provide the name as an argument" is redundant — `$ARGUMENTS` already places the input, and `argument-hint` already documents the contract.

---

### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills

Skills use `$0` for the first argument, `$1` for the second, etc. `$N` is shorthand for `$ARGUMENTS[N]`. This is 0-based.

Note: Commands (`.claude/commands/`) use 1-based indexing (`$1` = first). Do not mix conventions.

#### Correct

```yaml
---
name: migrate-component
argument-hint: [component] [from-framework] [to-framework]
---

Migrate the $0 component from $1 to $2.
```

#### Incorrect

```yaml
---
name: migrate-component
argument-hint: [component] [from-framework] [to-framework]
---

Migrate the $1 component from $2 to $3.
```

1-based indexing in a skill — `$1` here would be `from-framework`, not `component`.

---

### 4. `argument-hint` order must match positional index order
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills

The `argument-hint` field documents the positional contract. `$0` maps to the first bracketed term, `$1` to the second, etc. Mismatched ordering breaks the user's mental model.

#### Correct

```yaml
---
argument-hint: [source] [destination]
---

Copy from $0 to $1.
```

#### Incorrect

```yaml
---
argument-hint: [destination] [source]
---

Copy from $1 to $0.
```

Swapping the hint order but compensating with reversed indices — the autocomplete shows `[destination] [source]` but the user intuitively types source first.

---

### 5. Use `$ARGUMENTS` (not positional) for single-argument or free-form input
ref: https://code.claude.com/docs/en/skills#available-string-substitutions

When a skill takes one argument or an unbounded string, use `$ARGUMENTS` — not `$0`. It's clearer, and it handles multi-word input without quoting issues.

#### Correct

```yaml
---
name: fix-issue
argument-hint: [issue-number]
---

Fix GitHub issue #$ARGUMENTS following coding standards.
```

```yaml
---
name: search
argument-hint: [query...]
---

Search the codebase for: $ARGUMENTS
```

#### Incorrect

```yaml
---
name: fix-issue
argument-hint: [issue-number]
---

Fix GitHub issue #$0 following coding standards.
```

`$0` works but `$ARGUMENTS` is idiomatic for single-arg skills — clearer intent, and avoids 0-based confusion.

---

### 6. Implicit append is a fallback, not a design choice
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills

If `$ARGUMENTS` does not appear anywhere in the skill body, CC automatically appends `ARGUMENTS: <value>` at the end. This works but is a fallback — it means Claude has to interpret unstructured trailing text. Always place `$ARGUMENTS` explicitly where it belongs.

#### Correct

```yaml
---
name: explain-code
argument-hint: [file-path]
---

Explain the code in $ARGUMENTS with analogies and diagrams.
```

#### Incorrect

```yaml
---
name: explain-code
argument-hint: [file-path]
---

Explain code with analogies and diagrams.
```

Relies on implicit append — Claude receives `Explain code with analogies and diagrams.\n\nARGUMENTS: src/auth.ts` which is less clear about what the argument represents.

---

### 7. Shell preprocessing is for dynamic context injection
ref: https://code.claude.com/docs/en/skills#inject-dynamic-context

The `` !`command` `` syntax runs shell commands before Claude sees the content, replacing the placeholder with command output. Use it to inject dynamic context like git status, PR data, or environment info — not to echo arguments that `$ARGUMENTS` already provides.

Note: Whether `$0`/`$ARGUMENTS` substitution occurs inside `` !`command` `` blocks is not explicitly documented. Keep argument substitution and shell preprocessing separate until verified.

#### Correct

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
---

PR diff: !`gh pr diff`
Changed files: !`gh pr diff --name-only`

Summarize this pull request: $ARGUMENTS
```

#### Incorrect

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
---

!`echo "Summarize PR"`

Look up this PR and summarize it.
```

Using shell preprocessing just to produce static text — write it directly in the skill body.

---

### 8. `argument-hint` bracket terms should be descriptive and kebab-case
ref: https://code.claude.com/docs/en/skills#frontmatter-reference

Hint terms appear in the autocomplete UI. They should clearly communicate what's expected using kebab-case naming.

#### Correct

```yaml
argument-hint: [issue-number]
argument-hint: [skill-or-loadout]
argument-hint: [component] [from-framework] [to-framework]
argument-hint: [query...]
```

#### Incorrect

```yaml
argument-hint: [arg]
argument-hint: [name]
argument-hint: [n] [f] [t]
argument-hint: the issue number to fix
```

Vague names (`arg`, `name`), single-letter abbreviations, or prose instead of bracket syntax.

---

### 9. No-argument skills should not have `argument-hint`
ref: https://code.claude.com/docs/en/skills#frontmatter-reference

If a skill takes no arguments, omit `argument-hint` entirely. An empty or meaningless hint clutters autocomplete.

#### Correct

```yaml
---
name: budget
description: Show skill token budget breakdown
---
```

#### Incorrect

```yaml
---
name: budget
description: Show skill token budget breakdown
argument-hint: []
---
```

---

### 10. `${CLAUDE_SESSION_ID}` is for session correlation, not arguments
ref: https://code.claude.com/docs/en/skills#available-string-substitutions

The `${CLAUDE_SESSION_ID}` substitution provides the current session ID. Use it for logging, file naming, or session-specific output — not as a user-facing argument.

#### Correct

```yaml
Log output to logs/${CLAUDE_SESSION_ID}.log:
$ARGUMENTS
```

#### Incorrect

```yaml
Session: $ARGUMENTS
```

If the skill needs the session ID, use `${CLAUDE_SESSION_ID}` — don't ask the user to provide it.
