---
name: effect-review
description: >
  Review Effect-based code for data structure exhaustiveness, Schema patterns, idiomatic
  patterns, and best practices. Use when reviewing PRs, writing new Effect modules, creating
  Schema classes, tagged unions, enums, type guards, or auditing existing code.
---

# Effect Code Review

## When to Trigger

* Reviewing PRs that touch Effect-based modules
* Writing new modules in Effect-based packages
* Auditing existing Effect code for improvement

## Review Checklist

### 1. Exhaustive Effect Data Structure Use

Verify ALL data types follow Effect conventions:

| Native type                    | Should be                                 | Notes                                            |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------ |
| `Map`, `ReadonlyMap`           | `HashMap`                                 | Structural equality, O(1) lookup                 |
| `Record<K,V>` used as data map | `HashMap`                                 | Native `Record` only for `Schema.*` wire format  |
| `Set`, `ReadonlySet`           | `HashSet`                                 |                                                  |
| `Date`, `string` (dates)       | `DateTime.Utc` or `DateTime.Zoned`        | `Schema.DateTimeUtc` at serialization boundaries |
| `number` (timestamps)          | `DateTime.Utc`                            |                                                  |
| `string` (durations)           | `Duration`                                |                                                  |
| `T \| null`, `T \| undefined`  | `Option`                                  |                                                  |
| Prefix-keyed lookups           | `Trie`                                    | Hierarchical keys (paths, routes)                |
| Ordered key ranges             | `RedBlackTree` or `SortedMap`/`SortedSet` | Numeric/date ranges                              |
| Raw discriminated unions       | `Data.TaggedEnum`                         | Derives constructors, `$is`, `$match`            |

__Exceptions (correct as-is):__

* `Schema.Array`, `Schema.Record`, `Schema.optional` — these define the wire/serialization format, not the internal domain model
* Function parameters accepting plain arrays for ergonomics (convert internally)

### 2. Tagged Union Discipline

Discriminated unions MUST use `Data.TaggedEnum` — never raw TS unions with manual discriminants:

* [ ] All domain unions defined via `Data.TaggedEnum<{ Variant: { ... } }>` — not `{ op: "x" } | { op: "y" }`
* [ ] `Data.taggedEnum<T>()` destructured for constructors, `$is`, `$match`
* [ ] `$match` used instead of `switch` — compiler-enforced exhaustiveness, no fallthrough risk
* [ ] `$is("Variant")` used for filtering/type guards — returns narrowed arrays, no manual `Extract<>`
* [ ] Values constructed via derived constructors (`Add({ ... })`) — never raw object literals

### 3. Import Style

* [ ] Lib modules imported as `import * as <NS>` with qualified access (`Patch.generatePatches(...)`)
* [ ] Never destructured named imports from lib modules (`import { foo } from "./bar.js"`)
* [ ] Namespace alias matches filename (`import * as Patch from "./patch.js"`)

### 4. Pattern Quality

* [ ] Uses `pipe` or generator style consistently (not mixing ad-hoc)
* [ ] `Effect.gen` for sequential effectful code
* [ ] `Array.groupBy`, `Array.partition`, `Array.flatMap` from Effect — not native array methods
* [ ] `Option.match` / `Option.getOrElse` instead of null checks
* [ ] `HashMap.get` returns `Option` — propagate rather than `.pipe(Option.getOrThrow)`
* [ ] `Order.mapInput` for derived orderings — not raw comparator functions

### 5. Error Handling

* [ ] Typed errors with `Data.TaggedError` or `Schema.TaggedError`
* [ ] No `Error` base class in Effect signatures — use domain-specific errors
* [ ] `Effect.catchTag` for selective error recovery

### 6. Schema as Model Entity

Effect Schema has two modes for capturing data shapes:

* __Class mode__ (`Schema.TaggedClass`): Defines a __model entity__ — a class that co-locates identity (`_tag`), predicates (`.is()`), and data-derived operations. The class IS the namespace for its domain concept. This is not OOP; it's co-location convenience.
* __ESM mode__ (`Schema.Struct`, `Schema.Union`, `Schema.Literal`, etc.): Defines a structural schema for wire formats, validation, and transformations. No entity semantics — just shape.

Use class mode for domain models (entities with identity and behavior). Use ESM mode for wire-format definitions, intermediate schemas, and pure validation shapes. Everything below governs class-mode patterns.

#### 6a. The class owns its operations

The class body is where you put things intrinsic to the model: type predicates, data-derived fields, orderings over its own data. Not business logic — __data logic__.

```typescript
export class BookmarkLeaf extends S.TaggedClass<BookmarkLeaf>('BookmarkLeaf')('BookmarkLeaf', {
  name: S.String,
  url: S.String,
}) {
  static is = S.is(BookmarkLeaf) // predicate: intrinsic
  get domain() {
    return new URL(this.url).hostname
  } // derived data: OK
  // ❌ NOT here: fetchPageTitle() — that's business logic, belongs in a service
}
```

What belongs on the class — anything intrinsic to the model's data:

* `static is` — always, no exceptions (the class owns its own type guard)
* Data-derived fields, orderings, comparisons, derivations of any kind over the model's own data

What does NOT belong:

* Business logic, side effects, service calls
* Freestanding predicates (`const isLeaf = Schema.is(BookmarkLeaf)` — put it on the class)

#### 6b. Always TaggedClass

Always use `TaggedClass`, not `Class`. The `_tag` field provides:

* Runtime identity for `Schema.Union` dispatch
* Meaningful `.is()` predicates — without `_tag`, `.is()` degrades to `instanceof`-only checking, which fails on plain data
* Forward-compatibility: any model can join a union later without refactoring from `Class` to `TaggedClass`
* Compatibility with `$match` and `$is` from `Data.TaggedEnum`

`Schema.Class` exists but offers no advantage that justifies losing the above. Since 6a mandates `static is` on every class, and `_tag` is what makes `.is()` robust, `TaggedClass` is the only consistent choice.

* __Never__ access `_tag` directly (`value._tag === "Foo"`) — use `MyClass.is(value)`, which the class co-locates
* __Never__ `instanceof` — breaks across serialization boundaries, doesn't narrow structurally

#### 6c. Construction and enums

* Instances via `MyClass.make({ ... })` — the stable factory API across both class-mode and ESM-style schema declarations. `new MyClass({ ... })` only works on class-mode and breaks on ESM-style.
* Enums: `Schema.Enums({ active: "active", inactive: "inactive" } as const)` — without `as const`, literal types widen to `string` and type safety is lost. Access values via `MyEnum.enums.active`.

#### 6d. File organization

Schemas can live one-per-file, grouped under a directory, or in a single file — whatever matches the domain's natural boundaries. Co-locate what's mutually defined, separate what's independent. This is a domain-cohesion concern, not a recursion constraint — `Schema.suspend()` handles circular references across files (see 6e).

Import style follows the project's general rules (typically `import * as <NS>` with qualified access). This skill does not override project or global import conventions — Section 6 is about what goes ON the class, not how consumers import it.

#### 6e. Schema.suspend() for recursive references

`suspend()` defers schema evaluation to break circular references — whether self-referencing within a file or across files via circular imports.

* Always annotate the return type: `(): S.Schema<Type, Encoded>` — without it, TypeScript infers implicit `any` and loses round-trip safety
* Self-references need `as any` because the class isn't fully defined during its own body evaluation:

```typescript
children: S.Array(S.suspend((): S.Schema<Tree, TreeEncoded> => Tree as any))
```

* For self-referencing types where `Encoded` differs from `Type`, forward-declare an `interface` for the Encoded form before the class — this lets TypeScript resolve the circular type
