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

### 6. Schema Patterns

- [ ] **TaggedClass for discriminated unions**: Types participating in unions MUST use `Schema.TaggedClass`, not `Schema.Class` — `TaggedClass` adds `_tag` as a typed runtime field enabling derived predicates; `Class` only sets a Schema identifier
- [ ] **static is on every class**: All Schema classes define `static is = Schema.is(ClassName)` — the class IS the namespace for its own type guard
- [ ] **No instanceof on Schema types**: Always use `MyClass.is(value)` — never `value instanceof MyClass` (breaks across serialization boundaries, doesn't narrow structurally)
- [ ] **No direct _tag access**: Never `value._tag === "Foo"` — use `MyClass.is(value)` instead
- [ ] Instances created via `new MyClass({ ... })` or `Schema.make(MyClass)({ ... })` — never raw object literals with manual `_tag`
- [ ] Enums inline values directly in `Schema.Enums({ ... })` — no separate const object
- [ ] Runtime enum access via `MyEnum.enums.value` — not re-exporting the const

```typescript
// ✅ Class definition — TaggedClass with static is
export class BookmarkLeaf extends Schema.TaggedClass<BookmarkLeaf>("BookmarkLeaf")("BookmarkLeaf", {
  name: Schema.String,
  url: Schema.String,
}) {
  static is = Schema.is(BookmarkLeaf)
}

// ✅ Type guard — class as namespace
if (BookmarkLeaf.is(value)) { ... }

// ❌ instanceof — fragile, breaks across serialization
if (value instanceof BookmarkLeaf) { ... }

// ❌ direct _tag check — bypasses schema validation
if (value._tag === "BookmarkLeaf") { ... }

// ❌ Schema.Class for union members — no _tag field, no derived predicates
export class BookmarkLeaf extends Schema.Class<BookmarkLeaf>("BookmarkLeaf")({
  name: Schema.String,
  url: Schema.String,
}) {}

// ❌ Freestanding predicate — predicate belongs on the class
const isLeaf = Schema.is(BookmarkLeaf)

// ✅ Enum — inline values, access via .enums
export const Status = Schema.Enums({
  active: "active",
  inactive: "inactive",
})
export type Status = typeof Status.Type
// Runtime: Status.enums.active
```

#### Schema.suspend() for Recursive/Cross-Module References

Three cases, each with different rules:

**Case 1: Cross-module reference (no cycle in class definitions)**

File A references a class defined in File B. No `as any` needed.

```typescript
// root.ts — Root.next references Type from type.ts
import * as Type from './type.js'

export interface Root {
  readonly _tag: 'Root'
  readonly next?: Type.Type | undefined
}
export interface RootEncoded {
  readonly _tag: 'Root'
  readonly next?: Type.TypeEncoded | undefined
}

export class Root extends S.TaggedClass<Root>('Root')('Root', {
  next: S.optional(S.suspend((): S.Schema<Type.Type, Type.TypeEncoded> => Type.Schema)),
}) { static is = S.is(Root) }

export const Schema = Root
```

Rules:
- Forward-declare `interface` with both Type and Encoded forms BEFORE the class
- `suspend()` return type: `S.Schema<Type, Encoded>` — always explicit both generics
- Arrow returns the **exported Schema const** from the other module (`Type.Schema`)
- NO `as any` — the other module's Schema const is already fully defined

**Case 2: Self-reference (class references itself)**

A class has a field that recursively contains itself. Requires `as any`.

```typescript
// versioned.ts — BranchPoint.schema references Versioned (same file)
export interface Versioned { ... }
export interface VersionedEncoded { ... }

class BranchPointSchema extends S.Class<BranchPointSchema>('BranchPoint')({
  schema: S.suspend((): S.Schema<Versioned, VersionedEncoded> => Versioned as any),
}) { static is = S.is(BranchPointSchema) }

export class Versioned extends S.TaggedClass<Versioned>('V')('V', {
  branchPoint: S.NullOr(BranchPointSchema),
}) { static is = S.is(Versioned) }
```

Rules:
- `as any` is ONLY acceptable here because the class isn't fully defined when referenced
- Still requires forward-declared interfaces with both Type and Encoded forms
- Still requires explicit `S.Schema<Type, Encoded>` return type annotation

**Case 3: Cross-module union with self-reference**

A field's type is a union that includes the defining class itself plus other classes.

```typescript
// field.ts — Field.next can be Field | Argument | ResolvedType
export type FieldNext = Field | Argument.Argument | ResolvedType.ResolvedType
export type FieldNextEncoded = FieldEncoded | Argument.ArgumentEncoded | ResolvedType.ResolvedTypeEncoded

export class Field extends S.TaggedClass<Field>('F')('F', {
  next: S.optional(S.suspend((): S.Schema<FieldNext, FieldNextEncoded> =>
    S.Union(
      S.suspend((): S.Schema<Field, FieldEncoded> => Field as any),  // self-ref: as any
      Argument.Schema,       // cross-module: no as any
      ResolvedType.Schema,   // cross-module: no as any
    )
  )),
}) {}
```

Rules:
- Outer suspend wraps the whole union
- Inner suspend with `as any` ONLY for the self-referential member
- Cross-module members reference their exported Schema const directly — no `as any`

**ESM constraint: mutually recursive types must co-locate**

When two types are mutually recursive (A references B, B references A) and one appears as an eager argument to `Schema.Union()`, they MUST live in the same file. `Schema.Union()` evaluates its arguments at module initialization — ESM's Temporal Dead Zone will throw `ReferenceError` if the other module isn't fully initialized yet. `Schema.suspend()` is lazy and safe across circular imports, but `Schema.Union()` is not.

**Anti-patterns to flag:**

```typescript
// ❌ Missing Encoded type parameter — loses round-trip type safety
S.suspend((): S.Schema<BookmarkNode> => BookmarkNode)

// ❌ as any on cross-module reference — unnecessary, masks real type errors
S.suspend((): S.Schema<Type.Type, Type.TypeEncoded> => Type.Schema as any)

// ❌ No interface forward-declaration — class self-reference won't typecheck
export class Foo extends S.TaggedClass<Foo>('F')('F', {
  child: S.optional(S.suspend(() => Foo)),  // Type error or implicit any
})

// ❌ Referencing the class directly instead of exported Schema const
S.suspend((): S.Schema<Type.Type, Type.TypeEncoded> => Type.Type)
// Should be: Type.Schema (which equals Type.Type, but is the idiomatic export name)
```

**Each module that participates in suspend MUST export:**
- `interface Foo` — the decoded type (forward-declared, merges with class)
- `interface FooEncoded` — the encoded type (forward-declared)
- `class Foo` — the TaggedClass definition
- `const Schema = Foo` — stable reference for cross-module suspend

Reference implementation: `~/projects/jasonkuhrt/graphql-kit/src/graphql-schema-path/nodes/` (5 files showing all 3 cases)
