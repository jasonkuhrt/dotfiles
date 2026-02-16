---
description: Reformat documentation to compact nested list style (dyslexia-friendly)
---

# Compact Documentation Formatting

## Why

The user has dyslexia. Frequent format switching (headers, code blocks, bold, tables, prose) in small visual distances creates significant cognitive load. Compact nested lists provide consistent visual rhythm and predictable structure.

## Core Principles

Priority order — never sacrifice a higher priority for a lower one:

1. **Meaning is sacred**
   - we read for meaning; formatting serves comprehension
   - never be lossy with information — that's a slippery slope
   - preserve all facts, relationships, and nuance
   - BUT: more succinct prose (same meaning, fewer words) is encouraged and helpful
   - succinct ≠ lossy — tighter writing that preserves meaning is a win
   - keep content DRY — references over repetition
     - repeated info creates source-of-truth tension
     - tracking multiple locations is exhausting
     - link or reference instead of copy-pasting
2. **Local consistency is paramount**
   - all items in a group MUST follow the same pattern
   - if one item deviates (multi-line when others are one-line, etc.), everything breaks down
   - a block of consistent one-liners is fine; mixing one-liners with multi-line items is not
   - when in doubt, check: "do all siblings look the same?"
   - document-wide consistency matters too (lesser extent) — repeated visual idioms become familiar
     - if ASCII tables are used in one section, prefer them elsewhere too
     - builds pattern recognition across the whole document
     - reduces "learning cost" as reader progresses
3. **Information density** (within constraints of 1 and 2)
   - scrolling causes loss of place/locality in document
   - the more dense the layout, the better — less scrolling, easier to maintain context
   - compact does NOT mean semantically cropped — it means efficiently laid out
4. **Point-form skeleton layout**
   - content lives in nested lists, not prose paragraphs
   - markdown `#` titles are for major document breaks only
   - within sections, structure comes from list nesting, not more headers
5. **Sections are bold, numbered OR bulleted based on semantics**
   - numbered lists — when order/sequence matters (steps, procedures)
   - bullet lists — when items are parallel/non-sequential (concepts, options)
   - numbers imply "do this, then this" — confusing if there's no sequence
   - bold the title regardless
   - one-liner format (`* __Title__ — description`) is fine IF all siblings match
   - multi-line format (title alone, content nested below) when any item needs it
6. **Whitespace and visual gaps**
   - em-dash (—) creates visual breathing room inline
   - consistent indentation creates vertical rhythm
   - whitespace is a tool, not wasted space

## Rules

1. **One continuous nested list per section** — no jumping between formatting styles
2. **Bold titles on their own line** — title first, content follows as nested items
3. **Code blocks nested under list items** — indent 2 spaces more than the parent bullet to be "owned" by it
4. **Multi-line commands in fenced blocks** — don't split across multiple list items
5. **Single-line commands as inline code** — backticks for short commands in prose
6. **Em-dash (—) for inline descriptions** — cleaner than colons or parentheses
7. **Arrow (→) for paths/flows** — indicates "leads to" or "maps to"
8. **Numbered lists for sequential steps** — when order matters (implies "then")
9. **Bullet lists for parallel items** — when items are non-sequential (concepts, options, details)
10. **Avoid tables when possible** — convert to nested lists unless truly tabular
11. **Backslash for forced line breaks** — use `\` at end of line (not two trailing spaces) when content must wrap within a single list item (e.g., URL on own line below title); dprint converts `two spaces` → `\` anyway, and backslash is visible in source

## Pattern

````markdown
## Section Title

1. **Step Name**
   - description or context
   1. **Sub-step Name**

      ```sh
      command here
      ```

      - follow-up detail

   2. **Another Sub-step**
      - detail

2. **Next Step**
   - simple step with no sub-sections
````

## Decision Tree

When reformatting, ask these questions in order:

1. **Does this change lose information?**
   - YES → don't do it, find another way
   - NO → continue
2. **Does this change preserve meaning while using fewer words?**
   - YES → do it (succinct is good)
   - NO → that's fine, just don't add fluff
3. **Will all siblings in this group have the same format?**
   - YES → continue
   - NO → adjust until they match (consistency trumps any single item's "ideal" format)
4. **Does this reduce vertical space / scrolling?**
   - YES → good, prefer this option
   - NO → acceptable if required by constraints above

| Change type                            | Meaning preserved? | Consistent? | Result           |
| -------------------------------------- | ------------------ | ----------- | ---------------- |
| Tighter prose, same facts              | ✓                  | ✓           | ✓ Do it          |
| Remove "unnecessary" details           | ✗                  | —           | ✗ Don't          |
| One item multi-line, siblings one-line | ✓                  | ✗           | ✗ Make all match |
| All items multi-line together          | ✓                  | ✓           | ✓ Fine           |
| All items one-line together            | ✓                  | ✓           | ✓ Fine           |
| Convert prose to list                  | ✓                  | ✓           | ✓ Do it          |
| Convert table to list                  | ✓                  | ✓           | ✓ Usually do it  |

## Anti-patterns

- `**Title:** description on same line` when siblings are multi-line — break consistency
- `- Step name` for sections — use `1. **Step Name**` (numbered + bold)
- Prose paragraphs between list items — keep everything in the list structure
- Multiple `###` headers in quick succession — flatten into numbered list items
- Tables for simple key-value data — use `**Key** — value` in a list
- Removing context "to be concise" — that's lossy, not succinct

## Nightmare Example

This is what NOT to do. 5 headings, 3 visual styles (ASCII box, list, code block), prose interspersed — hugely expensive cognitive load for straightforward information:

```markdown
## Node Package Management

### Architecture

┌─────────────────────────────────────────────────────────────────┐
│ PATH order (first wins) │
├─────────────────────────────────────────────────────────────────┤
│ ~/.npm-global/bin ← npm globals (claude, dprint, nx, etc) │
│ ~/Library/pnpm ← pnpm binaries (node, npm, pnpm) │
│ /opt/homebrew/bin ← brew (fallback node, initial pnpm) │
└─────────────────────────────────────────────────────────────────┘

### Why this setup?

1. **Homebrew** — initial bootstrap (node + pnpm) → `/opt/homebrew/bin`
2. **pnpm** — Node versions (`pnpm env use`) → `~/Library/pnpm/nodejs/<ver>`
3. **npm** — global CLI tools → `~/.npm-global` (fixed, version-agnostic)
4. **Key insight** — npm globals install to `~/.npm-global` independent...

### Bootstrap flow (fresh machine)

1. `brew install node pnpm` — initial node + pnpm
2. `pnpm env use --global lts` — pnpm installs its own node
3. `./sync` — installs npm globals to `~/.npm-global`

After bootstrap, brew's node is effectively unused (pnpm's comes first in PATH).

### npx fallback chain

npx <cmd> → local node_modules → ~/.npm-global → downloads

This is why we use npm (not pnpm) for globals — `npx` checks npm's global dir.
```

**Problems:**

- 5 headings for one conceptual topic
- ASCII art box (visual style #1)
- Numbered list (visual style #2)
- Code block (visual style #3)
- Prose paragraphs floating between sections
- Reader's eye jumps constantly between formats
- Could be 50% smaller with one consistent list structure

## Case Study: Inline Arrows vs Sublists

**Hard to parse:**

```markdown
- `npx <cmd>` → local node_modules → `~/.npm-global` → downloads
```

**Easier to parse:**

```markdown
- **npx fallback chain**
  1. local `node_modules`
  2. `~/.npm-global`
  3. downloads
```

**Why:** Inline arrows pack sequential info horizontally — eyes have to track left-to-right through mixed content. A numbered sublist shows sequence vertically with clear ordering, one item per line.

## Case Study: Numbered Lists → ASCII Table with Icon

**Before** (numbered list with em-dash descriptions):

```markdown
1. `brew install node pnpm` — initial node + pnpm
2. `pnpm env use --global lts` — pnpm installs its own node
3. `./sync` — installs npm globals to ~/.npm-global
```

**After** (ASCII table with arrow icon for sequence):

```markdown
- **Bootstrap flow**
```

↓ brew install node pnpm initial node + pnpm
↓ pnpm env use --global lts pnpm installs its own node
↓ ./sync installs npm globals to ~/.npm-global

```

```

**Why better:**

- `↓` shows sequence without numbered list overhead
- columns align: command | description
- monospace = natural grid, easier scanning
- less visual noise than `1.` `2.` `3.` with backticks and em-dashes

## Case Study: Content First, Then Formatting

**First line of defence:** improve the content itself, then format it.

The PATH order + Tool responsibilities example showed this. Initially we had two separate sections:

```markdown
- **PATH order** (first wins)
```

~/.npm-global/bin npm globals
~/Library/pnpm pnpm binaries
/opt/homebrew/bin brew fallback

```
* __Tool responsibilities__
```

Homebrew bootstrap → /opt/homebrew/bin
pnpm versions → ~/Library/pnpm
npm CLI tools → ~/.npm-global

```

```

We tried aligning columns across blocks — formatting gymnastics. But the real fix was realizing the content was redundant. Same three items, shown twice. DRYing it into one block:

```markdown
- **PATH & tool layout**
```

Priority Tool Manages Location
1st npm global CLI tools ~/.npm-global/bin
2nd pnpm node versions ~/Library/pnpm
3rd Homebrew initial bootstrap /opt/homebrew/bin

```

```

**Lesson:** formatting can't fix flawed content structure. Fix the content first, then formatting becomes straightforward.

## Case Study: ASCII Tables vs Markdown Tables

**Core principle:** as a visual pattern repeats, its cognitive cost goes down.

- a 40-line md table is much cheaper than a 4-line md table
- the visual overhead (pipes, dashes) is "paid down" over repetition
- small tables → ASCII (whitespace easier than bars)
- large tables → md tables (overhead amortized, consistency wins)

**ASCII tables (code blocks):**

- whitespace is easier on eyes than pipes/bars
- can align columns ACROSS multiple blocks (md tables can't)
- if Claude Code is editing, it can maintain alignment (negates dprint advantage)
- best for: small tables, cross-block alignment needs

**Markdown tables:**

- dprint auto-formats them (advantage for human editors)
- better for complex tables with many columns
- overhead is amortized as table grows larger
- best for: large tables, complex data, rendered output matters

**Example comparison:**

```markdown
- **Small table** (ASCII better — less visual noise)
```

1st npm global CLI tools
2nd pnpm node versions
3rd Homebrew initial bootstrap

```

* __Same table__ (md — overhead not worth it for 3 rows)
| Priority | Tool     | Manages           |
| -------- | -------- | ----------------- |
| 1st      | npm      | global CLI tools  |
| 2nd      | pnpm     | node versions     |
| 3rd      | Homebrew | initial bootstrap |
```

**Decision:** count the rows. Small (< ~10) → ASCII. Large → md table.

**Future idea — visual cost linter:**

These principles could be quantified into a deterministic linter:

- visual cost per character type (pipe > dash > space)
- cost reduction curve based on repetition (amortization formula)
- format-switch penalty (each switch = cognitive interrupt)
- contiguity bonus (same format N lines in a row reduces per-line cost)
- sibling consistency check (do all items in a group match?)

Could score a document and suggest: "4-row md table costs more than ASCII equivalent" or "3 format switches in 10 lines — consolidate?"

## Workflow

This is a preview-iterate-apply workflow. Never apply changes without user approval.

1. **Read**
   - read the target section or file
2. **Preview**
   - show the reformatted version in a fenced code block
   - do NOT apply yet
3. **Iterate**
   - wait for user feedback
   - if user requests changes, show updated preview
   - repeat until user approves
4. **Apply**
   - only after explicit approval (e.g. "apply it", "looks good", "yes")
   - make the edits

## Formatting Process

1. Identify hierarchy: what are sections vs. sub-sections vs. details
2. Sections and sub-sections → numbered + bold, title on own line
3. Details → bullet points nested under their parent
4. Commands → fenced code blocks nested at correct indent level
5. Verify no information was lost
