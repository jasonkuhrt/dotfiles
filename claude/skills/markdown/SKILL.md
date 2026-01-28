---
name: markdown
description: Applies markdown syntax correctness and compact formatting when writing or editing markdown. Always evaluates heading density for compact mode.
---

# Markdown

## Operations

### 1. Check syntax

When writing markdown structures (tables, code blocks, lists, links), consult reference for correctness pitfalls.

-> Read `reference/syntax.md`

### 2. Evaluate compact mode

**Always evaluate when editing markdown files.** Check heading density and switch to compact mode when warranted.

- **Trigger** — 3+ consecutive headings would each contain ≤3 lines of content -> operation 3
- **Keep headings when:**
  - Long-form prose (each section has substantial content)
  - Documents with explicit TOC navigation requirements
  - User explicitly requests heading structure

### 3. Apply compact mode

Auto-triggered by operation 2, or user explicitly asks ("make this compact", "reformat to lists").

**Principles:**

- Target audience reads `.md` files directly in editors/terminals, not rendered HTML
- No `<details>` collapsibles, HTML tags, or render-dependent features
- Never lose information — preserve all facts, relationships, nuance
- Succinct (same meaning, fewer words) ≠ lossy
- Keep content DRY — reference instead of repeating

**Steps:**

1. **Read** — read the target file
2. **Check git status** — is file tracked with no unstaged changes?
   - **Yes** -> apply directly, user reviews via `git diff`
   - **No** -> show preview in fenced code block, wait for approval
3. **Iterate** — adjust if user requests changes

-> Read `reference/compact-mode.md` for detailed rules, examples, and decision tree
