# Using ref MCP for Documentation

**When working with libraries, check the docs with Ref.** Don't guess APIs - verify with actual documentation.

When you need to look up documentation for APIs, libraries, or services:

1. **Search first** - Use `ref_search_documentation` with a full sentence query
2. **Read selectively** - Only `ref_read_url` on the most promising results
3. **Iterate** - Refine your query based on what you learn, don't bulk-load
4. **Minimize tokens** - Ref returns ~5k tokens max per read; trust its relevance filtering

Example flow:

```
SEARCH 'Effect Schema decode unknown data validation'
READ <most relevant URL from results>
# If needed, refine and search again
```

Avoid: Fetching entire documentation pages upfront. Ref handles excerpt selection.

## Ref vs effect-docs MCP

| Aspect               | Ref                       | effect-docs                 |
| -------------------- | ------------------------- | --------------------------- |
| **Search precision** | Focused, few results      | Noisy, includes API refs    |
| **Read targeting**   | Section-level via anchors | Whole page, paginated       |
| **Token efficiency** | ~2k for exact section     | Full page from beginning    |
| **API coverage**     | Prose docs                | Prose + individual API refs |

**Use Ref as primary** - it's universal and token efficient. Fall back to effect-docs only when you need specific Effect API signatures (e.g., exact type params for `Schema.decodeUnknown`).
