---
name: ref
description: Use when you need to force documentation lookup via Ref MCP, or want deterministic doc search instead of heuristic tool selection. Triggers on "/ref <question>".
---

# Ref Lookup

Force Claude to use Ref MCP for documentation lookup. Bypasses heuristic tool selection.

## Usage

```
/ref how do I decode unknown data with Effect Schema
/ref what's the difference between Schema.Class and Schema.TaggedClass
/ref Effect HttpClient how to set headers
```

## Quick Reference

| Tool | Purpose |
|------|---------|
| `ref_search_documentation` | Search with full sentence query (include library name) |
| `ref_read_url` | Read specific result URL from search |

## Procedure

1. **Search** — Call `ref_search_documentation` with the user's query
   - Include library/framework name for best results
   - For private docs, include `ref_src=private`

2. **Read** — Call `ref_read_url` on the most relevant result(s)
   - Start with top result
   - Read additional only if first doesn't answer

3. **Answer** — Respond based on what Ref returned
   - Cite the source URL
   - If Ref has nothing useful, say so clearly — don't fall back to general knowledge without disclosure

## When Ref Returns Nothing

1. Try rephrasing (different terms, more/less specific)
2. If still nothing: tell user Ref doesn't have this indexed
3. Suggest: upload docs to Ref dashboard, or ask if they want general-knowledge answer instead

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague query without library name | Include "Effect", "React", etc. in query |
| Reading all results | Start with top result, expand only if needed |
| Falling back silently | Always disclose when using general knowledge |

## Not This Skill

- **Setup/troubleshooting** → `/ref:doctor`
- **Dashboard operations** → `/ref:doctor`
- **Pricing questions** → `/ref:doctor`
