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

1. Read `reference/importing.md` for mappings and conversion process
