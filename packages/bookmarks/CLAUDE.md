# Bookmarks Package Rules

## Prefer Effect Data Types

Use Effect data types instead of native JS equivalents:

| Native | Effect | Notes |
|--------|--------|-------|
| `Map`, `Record` (as data map) | `HashMap` | O(1) lookup with structural equality |
| `Set` | `HashSet` | |
| `Date`, `string` (dates) | `DateTime.Utc` or `DateTime.Zoned` | Use `Schema.DateTimeUtc` at boundaries |
| `string` (durations) | `Duration` | |
| `T \| null`, `T \| undefined` | `Option` | |
| Prefix-keyed dictionaries | `Trie` | For hierarchical path keys |
| Ordered collections | `RedBlackTree`, `SortedMap` | |
| Raw discriminated unions | `Data.TaggedEnum` | Derives constructors, `$is`, `$match` |

**Exception:** `Schema.*` types (`Schema.Array`, `Schema.Record`, `Schema.optional`) define the wire/serialization format — native types are correct there.

## Tagged Unions via Data.TaggedEnum

Discriminated unions MUST use `Data.TaggedEnum`, not raw TS unions with a manual `op`/`kind`/`type` discriminant.

- `Data.taggedEnum<T>()` provides constructors, `$is` predicates, and `$match` exhaustive dispatch
- Use `$match` instead of `switch` — compiler-enforced exhaustiveness
- Use `$is("Variant")` for filtering/type guards — returns properly narrowed arrays
- Never manually construct tagged values as object literals — use the derived constructors

## Namespace Imports

Import lib modules as `import * as <NS>` with qualified access at call sites.

```typescript
// GOOD
import * as Patch from "./patch.js"
Patch.generatePatches(...)
Patch.$is("Add")
Patch.$match(patch, { Add: ..., Remove: ... })

// BAD
import { generatePatches, $is, $match } from "./patch.js"
```
