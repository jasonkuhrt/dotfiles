## Ref vs effect-docs MCP

| Aspect               | Ref                       | effect-docs                 |
| -------------------- | ------------------------- | --------------------------- |
| __Search precision__ | Focused, few results      | Noisy, includes API refs    |
| __Read targeting__   | Section-level via anchors | Whole page, paginated       |
| __Token efficiency__ | ~2k for exact section     | Full page from beginning    |
| __API coverage__     | Prose docs                | Prose + individual API refs |

__Use Ref as primary__ - it's universal and token efficient. Fall back to effect-docs only when you need specific Effect API signatures (e.g., exact type params for `Schema.decodeUnknown`).
