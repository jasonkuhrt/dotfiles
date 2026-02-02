---
name: effect-review
description: >
  Review Effect-based code for data structure exhaustiveness, Schema patterns, idiomatic
  patterns, and best practices. Use when reviewing PRs, writing new Effect modules, creating
  Schema classes, tagged unions, enums, type guards, or auditing existing code.
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

### 6. Schema as Model Entity

**Core principle:** A Schema class is a **model entity** — it co-locates identity, predicates, and data-derived operations so the class IS the namespace for its domain concept. This is not OOP; it's co-location convenience. Everything below serves this principle.

#### 6a. The class owns its operations

The class body is where you put things intrinsic to the model: type predicates, data-derived fields, orderings over its own data. Not business logic — **data logic**.

```typescript
export class BookmarkLeaf extends S.TaggedClass<BookmarkLeaf>("BookmarkLeaf")("BookmarkLeaf", {
  name: S.String,
  url: S.String,
}) {
  static is = S.is(BookmarkLeaf)            // predicate: intrinsic
  get domain() { return new URL(this.url).hostname }  // derived data: OK
  // ❌ NOT here: fetchPageTitle() — that's business logic, belongs in a service
}
```

What belongs on the class:
- `static is` — always, no exceptions (the class owns its own type guard)
- Data-derived fields (e.g., `fullName` from `first`/`last`, `domain` from `url`)
- `static order` / `static min` / `static max` when the model has a natural ordering
- Static factory variants if the model has common construction patterns

What does NOT belong:
- Business logic, side effects, service calls
- Freestanding predicates (`const isLeaf = Schema.is(BookmarkLeaf)` — put it on the class)

#### 6b. TaggedClass vs Class

`TaggedClass` adds `_tag` as a typed runtime discriminant field. `Class` only sets a Schema identifier (metadata, not data).

- **Union members**: MUST use `TaggedClass` — the `_tag` is what makes the derived `.is()` predicate work at runtime and what `Schema.Union` dispatches on
- **Standalone models** (not in any union): `Class` is fine — no discriminant needed
- **Never** access `_tag` directly (`value._tag === "Foo"`) — use `MyClass.is(value)`, which the class co-locates
- **Never** `instanceof` — breaks across serialization boundaries, doesn't narrow structurally

#### 6c. Construction and enums

- Instances via `new MyClass({ ... })` or `MyClass.make({ ... })` — never raw object literals with manual `_tag`
- Enums: `Schema.Enums({ active: "active", inactive: "inactive" })` with values inline, accessed via `MyEnum.enums.active`

#### 6d. File organization

Schemas can live one-per-file, grouped under a directory, or in a single file — whatever matches the domain's natural boundaries. The principle: **co-locate what's mutually defined, separate what's independent.**

Practical constraints:
- **Mutually recursive types must share a file.** `Schema.Union()` eagerly evaluates its arguments at ESM module initialization. If type A and type B reference each other and one appears in a `Schema.Union()` call, ESM's Temporal Dead Zone will throw `ReferenceError` if they're in separate files. `Schema.suspend()` is lazy and survives circular imports, but the Union call itself is not.
- **Independent models get their own files.** A type with no circular dependency on siblings (e.g., `BookmarkLeaf`) belongs in its own file.
- **Import path is flexible** — `from './schema/bookmark-leaf.js'` and `from './schema/__.js'` are both fine. The model entity is self-contained regardless of how you reach it.
- **Import style follows the project's general rules** (typically `import * as <NS>` with qualified access). This skill does not override project or global import conventions — Section 6 is about what goes ON the class, not how consumers import it.

#### 6e. Schema.suspend() for recursive references

`suspend()` defers schema evaluation to break circular references. Three cases:

| Case | Example | `as any`? | Why |
|------|---------|-----------|-----|
| Cross-module | A.field → B's schema | No | B is fully defined by the time suspend resolves |
| Self-reference | A.field → A itself | Yes | A isn't fully defined during its own class body evaluation |
| Mixed union | A.field → Union(A, B, C) | Only on A | A is self-ref (needs `as any`), B and C are cross-module (don't) |

Rules that apply to all cases:
- Return type annotation: `S.Schema<Type, Encoded>` — always explicit both generics
- Forward-declare `interface` with both Type and Encoded forms before the class (enables TS to resolve the circular type)
- Cross-module references point at an exported `const Schema = ClassName` — stable reference name

```typescript
// Cross-module (no as any)
children: S.Array(S.suspend((): S.Schema<Node, NodeEncoded> => NodeModule.Schema))

// Self-reference (as any required)
children: S.Array(S.suspend((): S.Schema<Tree, TreeEncoded> => Tree as any))

// Mixed union — outer suspend wraps union, inner suspend only for self-ref
next: S.optional(S.suspend((): S.Schema<FieldNext, FieldNextEncoded> =>
  S.Union(
    S.suspend((): S.Schema<Field, FieldEncoded> => Field as any),  // self
    Argument.Schema,                                                // cross
  )
))
```

Anti-patterns:
- `S.suspend(() => Foo)` with no return type annotation — implicit any, loses round-trip safety
- `as any` on a cross-module reference — unnecessary, masks real type errors
- No interface forward-declaration — self-reference won't typecheck

Reference: `~/projects/jasonkuhrt/graphql-kit/src/graphql-schema-path/nodes/` (5 files, all 3 cases)
