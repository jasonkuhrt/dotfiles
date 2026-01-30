---
name: speclist
description: Use when writing or reading structured specifications with numbered steps (flow) or entity definitions (def). Triggers on "speclist", "flow format", "def format", "procedural spec", or when documenting workflows/entities.
---

# Speclist

Structured specification format with two peer types: **flow** (procedural) and **def** (declarative).

| Format | Purpose     | Structure        | Example Use                |
| ------ | ----------- | ---------------- | -------------------------- |
| flow   | What to do  | Numbered steps   | Operations, procedures     |
| def    | What exists | Bulleted entries | Functions, entities, specs |

Both share common syntax documented in `reference/shared.md`.

## Operations

### Writing Flow

When authoring procedural content (operations, procedures, workflows):

1. Read `reference/flow.md` for structure and syntax
2. Read `reference/shared.md` for common conventions

### Writing Def

When authoring declarative content (functions, entities, component specs):

1. Read `reference/def.md` for structure and syntax
2. Read `reference/shared.md` for common conventions

### Reading

When interpreting/executing a speclist:

1. Identify format (flow vs def) from structure
2. Read the relevant reference file for syntax details

### Import Content

When converting existing content (Linear issues, specs, docs) into speclist format:

**Mapping Table:**

| Source Pattern            | Speclist Equivalent         | Example                                          |
| ------------------------- | --------------------------- | ------------------------------------------------ |
| `1. **STEP 1: Title**`    | `1. TITLE`                  | `1. **STEP 1: Upload file**` -> `1. UPLOAD FILE`  |
| `*italicized context*`    | `> **NOTE** context`        | `*We only support Stripe*` -> `> **NOTE** ...`    |
| `(skipped if condition)`  | `> **SKIP IF** _condition_` | `(skipped if valid)` -> `> **SKIP IF** _isValid_` |
| `![alt](url)`             | `![alt](url)`               | Same syntax (no change)                          |
| `1. **Requirements:**`    | `**Requirements:**` section | Keep as labeled section with numbered items      |
| Nested step numbers (5.2) | Flatten or use sub-steps    | `5.2` inside step 5 -> `5.1, 5.2` or top-level    |
| Bulleted entity lists     | Def format (`- **name**`)   | Entity descriptions -> def structure              |

**Conversion Process:**

1. IDENTIFY FORMAT
   1. Sequential steps -> use flow format
   2. Entity/function descriptions -> use def format
   3. Mixed -> separate into flow and def sections
2. CONVERT STEPS (flow)
   > **NOTE** Linear often uses `**STEP N: Title**` format.
   1. Extract step title -> convert to UPPERCASE label
   2. Sub-actions become numbered sub-steps
3. CONVERT ENTITIES (def)
   1. Entity name -> `- **name**`
   2. Description -> first sub-item
   3. Properties -> `key: value` sub-items
4. EXTRACT METADATA
   1. Italicized text after step title -> `> **NOTE** ...`
   2. Parenthetical skip conditions -> `> **SKIP IF** _condition_`
5. PRESERVE IMAGES
   > **NOTE** Markdown image syntax is unchanged between formats.
   1. Copy `![alt](url)` directly
6. FLATTEN STRUCTURE
   > **NOTE** Linear sometimes nests steps incorrectly (e.g., 5.2 = Step 6).
   1. If nested step is truly a sub-step: keep as sub-step
   2. If nested step is independent: promote to top-level step
7. CONVERT REQUIREMENTS
   > **NOTE** Requirements are declarative specs (what must exist), distinct from actions (what to do).
   1. Keep `**Requirements:**` label
   2. Convert requirement items to numbered list
   3. If step also has actions: add `**Actions:**` label before action items
   4. Nested requirements -> numbered sub-items (e.g., 1.1, 1.2)
