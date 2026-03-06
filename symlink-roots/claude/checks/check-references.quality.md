---
refs:
  - ~/.claude/checks/skill-arguments.quality.md
---

## check-references

Check files that make factual claims should back them with precise references. This standard uses two tiers: frontmatter `refs:` for broad source pages and per-check `ref:` for specific sections. The goal is traceability — a reviewer should be able to follow any `ref:` link and find the exact passage that justifies the check.

---

### 1. Per-check `ref:` must use anchor links when the source page has them

A `ref:` line after a check heading should point to the specific section backing the claim. If the source page has anchor navigation (e.g., `#pass-arguments-to-skills`), the link must include the anchor. A bare page URL is too vague to serve as a citation.

#### Correct

```markdown
### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills
```

#### Incorrect

```markdown
### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills
```

The bare URL points to the entire skills page — a reader has to scan the whole page to find the relevant passage.

---

### 2. Every `ref:` must pinpoint content that substantiates the specific claim

A reference is not a "see also." The linked section must contain the fact, behavior, or specification that the check enforces. If no section directly backs the claim, either find a better source or omit `ref:`.

#### Correct

```markdown
### 5. Use `$ARGUMENTS` for single-argument skills
ref: https://code.claude.com/docs/en/skills#available-string-substitutions

(Section documents $ARGUMENTS, $ARGUMENTS[N], and $N — directly relevant.)
```

#### Incorrect

```markdown
### 5. Use `$ARGUMENTS` for single-argument skills
ref: https://code.claude.com/docs/en/skills#frontmatter-reference

(Frontmatter reference section documents YAML fields, not argument substitution.)
```

A tangentially-related section erodes trust in all references.

---

### 3. Frontmatter `refs:` lists broad source pages, not anchored sections

Frontmatter `refs:` captures the source pages that broadly cover the check file's domain. These are page-level URLs — the entry points a reviewer would read to understand the landscape. Anchored URLs belong in per-check `ref:` lines, not in frontmatter.

#### Correct

```yaml
---
refs:
  - https://code.claude.com/docs/en/skills#pass-arguments-to-skills
  - https://code.claude.com/docs/en/skills#available-string-substitutions
---
```

(Each ref points to a distinct section covering a different aspect of the domain.)

#### Incorrect

```yaml
---
refs:
  - https://code.claude.com/docs/en/skills
  - https://code.claude.com/docs/en
---
```

URLs too broad — the entire docs site is not a useful citation.

---

### 4. Frontmatter `refs:` omitted when no external sources exist

If the entire check file documents local conventions with no external documentation, omit the `refs:` field entirely. Don't populate it with irrelevant or decorative links.

#### Correct

```yaml
---
# (no refs — these are local project conventions)
---

## code-style-conventions
```

#### Incorrect

```yaml
---
refs:
  - https://google.github.io/styleguide/tsguide.html
---

## code-style-conventions

### 1. Use camelCase for local variables
```

If the check doesn't actually derive from that style guide, the link is misleading.

---

### 5. Checks making factual claims about system behavior require `ref:`

If a check asserts "system X does Y" or "feature Z works like W," that is a factual claim. Factual claims need citations so reviewers can verify the claim is current and accurate. Convention-based checks (style preferences, team agreements) don't need refs.

#### Factual claim — needs `ref:`

```markdown
### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills

Skills use `$0` for the first argument...
```

#### Convention — `ref:` optional

```markdown
### 8. `argument-hint` bracket terms should be descriptive and kebab-case

Hint terms appear in the autocomplete UI. Use kebab-case naming.
```

(Kebab-case is a team convention, not a documented system requirement.)

---

### 6. Don't fabricate `ref:` for convention-based checks

If a check is a local convention not documented externally, omit `ref:` entirely. A forced or tangentially-related link is worse than no link — it signals "this is verified" when it isn't.

#### Correct

```markdown
### 2. Prefer namespace imports for domain modules

(No ref: — this is a team style convention.)
```

#### Incorrect

```markdown
### 2. Prefer namespace imports for domain modules
ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

(MDN documents import syntax, not our namespace convention.)
```

---

### 7. Prefer primary authoritative sources over secondary ones

When multiple sources exist, link to the official documentation or specification — not blog posts, community answers, or third-party tutorials. Primary sources are more stable and less likely to become stale.

#### Correct

```markdown
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills
```

#### Incorrect

```markdown
ref: https://dev.to/someone/claude-code-skills-tips-2025-abc123
```

Blog posts move, get outdated, or disappear. Official docs are the source of truth.

---

### 8. Acknowledge uncertainty when documentation is ambiguous

If a check enforces behavior that isn't explicitly documented (inferred from examples, tested empirically, or extrapolated), note this in the check body. The `ref:` should still point to the closest relevant section, with a caveat.

#### Correct

```markdown
### 7. Shell preprocessing is for dynamic context injection
ref: https://code.claude.com/docs/en/skills#inject-dynamic-context

Note: Whether `$0`/`$ARGUMENTS` substitution occurs inside `!`command`` blocks
is not explicitly documented. Keep argument substitution and shell preprocessing
separate until verified.
```

#### Incorrect

```markdown
### 7. Shell preprocessing supports $ARGUMENTS inside !`command` blocks
ref: https://code.claude.com/docs/en/skills#inject-dynamic-context
```

Stating undocumented behavior as fact, with a ref that doesn't confirm it.

---

### 9. One `ref:` per check — if multiple sources needed, use the most specific

Each check should have at most one `ref:` line pointing to its strongest backing source. If a check synthesizes multiple sources, pick the one that most directly supports the core claim. Secondary sources can be mentioned in the check body as prose if needed.

#### Correct

```markdown
### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills

Skills use `$0` for the first argument. See also the
[substitution variables](https://code.claude.com/docs/en/skills#available-string-substitutions)
reference for the full list.
```

#### Incorrect

```markdown
### 3. Positional arguments use 0-based indexing
ref: https://code.claude.com/docs/en/skills#pass-arguments-to-skills
ref: https://code.claude.com/docs/en/skills#available-string-substitutions
ref: https://code.claude.com/docs/en/skills#frontmatter-reference
```

Multiple `ref:` lines per check create ambiguity about which is the primary citation.
