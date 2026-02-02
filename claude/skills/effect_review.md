---
name: effect-review
description: Review Effect-based code for data structure exhaustiveness, idiomatic patterns, and best practices. Use when reviewing PRs, writing new Effect modules, or auditing existing code.
---

# Effect Code Review

## When to Trigger

- Reviewing PRs that touch Effect-based modules
- Writing new modules in Effect-based packages
- Auditing existing Effect code for improvement

## Review Checklist

### 1. Exhaustive Effect Data Structure Use

Verify ALL data types follow Effect conventions:

| Native type | Should be | Notes |
|-------------|-----------|-------|
| `Map`, `ReadonlyMap` | `HashMap` | Structural equality, O(1) lookup |
| `Record<K,V>` used as data map | `HashMap` | Native `Record` only for `Schema.*` wire format |
| `Set`, `ReadonlySet` | `HashSet` | |
| `Date`, `string` (dates) | `DateTime.Utc` or `DateTime.Zoned` | `Schema.DateTimeUtc` at serialization boundaries |
| `number` (timestamps) | `DateTime.Utc` | |
| `string` (durations) | `Duration` | |
| `T \| null`, `T \| undefined` | `Option` | |
| Prefix-keyed lookups | `Trie` | Hierarchical keys (paths, routes) |
| Ordered key ranges | `RedBlackTree` or `SortedMap`/`SortedSet` | Numeric/date ranges |
| Raw discriminated unions | `Data.TaggedEnum` | Derives constructors, `$is`, `$match` |

**Exceptions (correct as-is):**
- `Schema.Array`, `Schema.Record`, `Schema.optional` — these define the wire/serialization format, not the internal domain model
- Function parameters accepting plain arrays for ergonomics (convert internally)

### 2. Tagged Union Discipline

Discriminated unions MUST use `Data.TaggedEnum` — never raw TS unions with manual discriminants:

- [ ] All domain unions defined via `Data.TaggedEnum<{ Variant: { ... } }>` — not `{ op: "x" } | { op: "y" }`
- [ ] `Data.taggedEnum<T>()` destructured for constructors, `$is`, `$match`
- [ ] `$match` used instead of `switch` — compiler-enforced exhaustiveness, no fallthrough risk
- [ ] `$is("Variant")` used for filtering/type guards — returns narrowed arrays, no manual `Extract<>`
- [ ] Values constructed via derived constructors (`Add({ ... })`) — never raw object literals

### 3. Import Style

- [ ] Lib modules imported as `import * as <NS>` with qualified access (`Patch.generatePatches(...)`)
- [ ] Never destructured named imports from lib modules (`import { foo } from "./bar.js"`)
- [ ] Namespace alias matches filename (`import * as Patch from "./patch.js"`)

### 4. Pattern Quality

- [ ] Uses `pipe` or generator style consistently (not mixing ad-hoc)
- [ ] `Effect.gen` for sequential effectful code
- [ ] `Array.groupBy`, `Array.partition`, `Array.flatMap` from Effect — not native array methods
- [ ] `Option.match` / `Option.getOrElse` instead of null checks
- [ ] `HashMap.get` returns `Option` — propagate rather than `.pipe(Option.getOrThrow)`
- [ ] `Order.mapInput` for derived orderings — not raw comparator functions

### 5. Error Handling

- [ ] Typed errors with `Data.TaggedError` or `Schema.TaggedError`
- [ ] No `Error` base class in Effect signatures — use domain-specific errors
- [ ] `Effect.catchTag` for selective error recovery
