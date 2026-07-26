---
name: effect
description: >
  Effect conventions — data types, Schema patterns, namespace rules, idiomatic patterns.
  Use when writing Effect modules, creating Schema classes, tagged unions, enums, or type guards.
---

# Effect Conventions

Code checks are defined in `CHECKS.quality.md`. Run `/check @effect` to evaluate them.

## Documentation Lookup

Use Ref first for Effect guides, concepts, and pattern docs. Fall back to `effect-docs` only when you need exact API signatures or symbol-level reference detail that Ref does not expose cleanly. If neither is enough, read the source.

## Terminology

| Term                    | Definition                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Qualified access        | `Namespace.symbol(...)` — reader sees which domain concept owns the operation                              |
| Producer                | Module that defines a concept (`.ts` file or directory with barrel)                                        |
| Consumer                | Module that imports and uses a concept                                                                     |
| Producer-side namespace | Producer creates the namespace — class statics or barrel re-export. Done once, enforced centrally          |
| Consumer-side namespace | Consumer creates the namespace — `import * as X`. Duplicated at every import site                          |
| Class statics           | Operations co-located on a `Schema.TaggedClass` — `.is()`, `.make()`, getters. Class name IS the namespace |
| Module-scope exports    | Same operations as top-level `export const`/`export function`. No inherent namespace                       |
| Domain directory        | Directory whose name represents a problem-space concept. Name carries meaning at call sites                |
| Grouping directory      | Directory organizing files by non-domain criteria (tool, layer, convention). Name is housekeeping          |
| Barrel                  | A module (`__.ts` or `index.ts`) that re-exports from sibling modules. Aggregation point for a directory   |
| Serialization boundary  | Where data crosses program edge (HTTP, file, IPC). `Schema.*` uses native types here; domain logic does not |

## Schema Scope — Class Statics vs. Module Scope

**Default:** Class statics — use when the class can be the consumer's entry point. `Order.is(x)`, `Order.make({...})`.

**Fallback:** Module-scope exports — use only when the class cannot be the top-level export (e.g., combinators or custom transforms wrap the base schema, making the consumer-facing schema a composed value rather than the class itself).

## Codec and Decode Discipline

When a model is built with `S.ClassPlus`, `S.TaggedClassPlus`, or `S.TaggedErrorPlus`, the producer class owns the codec functions. Use the class statics:

```ts
PackageManifest.decodeUnknownEffect(input)
PackageManifest.decodeUnknownSync(input)
PackageManifest.make(input)
```

Do not route class schemas through generic `S.decodeUnknown*` helpers when the class static exists. Generic `S.*` codec functions are for bare schema values that do not have producer-owned statics.

Decode the outermost model and let schema cascade decode nested models. If `WorkspacePackage` has `manifest: PackageManifest`, decode `WorkspacePackage`; do not decode `PackageManifest` first and then call `WorkspacePackage.make`.

When context is needed to derive fields, compute only the missing plain fields, then decode the full outer object inline:

```ts
const rootDir = normalizePath(input.rootDir);
const relativePath = toRelativePath(workspaceRootDir, rootDir);

const workspacePackage = yield* WorkspacePackage.decodeUnknownEffect({
  isRoot: relativePath === '',
  manifest: input.manifest,
  name: input.manifest.name,
  relativePath,
  rootDir,
  rootDirRealPath: normalizePath(input.rootDirRealPath),
});
```

Do not create custom decode helpers like `decodePackageManifest(...)`, fake intermediate schemas, or builder functions when the target model can decode the complete object. Those hide the schema boundary and bypass cascade.

Do not force synchronous transforms or parser APIs into `Effect` just to make a boundary look uniform. Sync codec transforms stay sync. If a wrapper adds no behavior, re-export the upstream function or call it directly.

## Generator Yield Discipline

Do not say "`Effect.gen` can only yield Effects." The accurate model is: `yield*` works through the iterator/yieldable protocol, and Effect v4 implements that protocol across multiple data types.

In `Effect.gen`, yielded values must be Effect-yieldable: `Effect` values, `Context` references/services, and `Cause.YieldableError` values all implement `[Symbol.iterator]()` so they yield an `Effect` into the generator. In `Result.gen`, `Result` values are Result-yieldable. In `Option.gen`, `Option` values are Option-yieldable.

Crossing worlds is still explicit. A `Result<A, E>` is not automatically the failure channel of an `Effect.gen`; bridge it with `Effect.fromResult` or the local `E.fromResult` helper at the point where the code moves from Result composition into Effect composition. That bridge is about failure-channel semantics, not about JavaScript `yield*` being syntactically limited to Effects.

## File Organization

Schemas can live one-per-file, grouped under a directory, or in a single file — whatever matches the domain's natural boundaries. Co-locate what's mutually defined, separate what's independent. `Schema.suspend()` handles circular references across files.

## Namespace Diagnostic

When reviewing an import, ask:

1. Does the namespace prefix add domain meaning at the call site? If `Prefix.symbol(...)` reads as a domain statement, namespace is correct. If implementation noise, use named imports.
2. Does the producer already own the namespace? If class statics or barrel re-export exist, consumer-side namespace is redundant.
3. Does the consumer-side namespace name match filename/directory? No term mappings.
4. Is the directory domain or grouping? Domain name at call site uses namespace. Housekeeping name uses named imports.

---

# Effect: Schema at the Membrane, Data in the Interior

When modeling a tagged union (or any structured type) in an Effect codebase,
choose between `Schema` and `Data` by one litmus question:

> **Will unknown data ever need to *become* this type?**

- **Yes → Schema-first.** Define a schema (class/union); derive the type from
  it (`typeof X.Type`) and take the whole `to*` derivation family (codec,
  `toTaggedUnion`, `toArbitrary`, `toEquivalence`, `toFormatter`, JSON
  Schema). Boundary data — parsed, decoded, serialized, validated, generated
  for tests — always lives here.
- **No → Data-first.** Interior, transient values that only this module's own
  code constructs and that die inside the module: use `Data.TaggedEnum` +
  `Data.taggedEnum<T>()` (type-first; constructors, `$is`, `$match` derived
  from the type). Do NOT wrap interior values in schemas — the AST buys
  nothing when nothing ever decodes into the type, and it adds module-load
  cost and public schema surface.

## Why the split is principled, not preference

The two modules are capability-corollaries with inverted derivation
directions:

- **Schema derives value → type.** The schema is a runtime value carrying an
  AST; types and every capability are folds over that runtime structure.
  Structure-aware operations (validation, generation, codecs) are possible
  because structure exists at runtime.
- **Data derives type → value.** `taggedEnum` is a Proxy over an empty object
  (verified in effect@4.0.0-beta.85 source): constructors are
  `(props) => ({ ...props, _tag: key })`, `$is` checks only `_tag`. All
  derivation happens in the type checker. This is the ceiling of type-first
  in an erased language — only operations whose runtime behavior doesn't
  depend on the type's content are derivable.

So Schema-wrapping an interior type is paying for a membrane where there is
none, and Data-modeling a boundary type silently loses validation ("for
untrusted input, validate with the Schema module first" — effect's own docs
on `$is`).

## Promotion signal (one-way escalation)

The moment an interior Data type needs even ONE schema-derived capability
(an arbitrary for property tests, a codec, JSON Schema), promote it to a
schema class. Never hand-write the capability next to the Data type — that's
the derivation engine's job.

## Notes

- effect v4: `Equal.equals` is structural by default and `taggedEnum`
  constructors return plain objects, so Data carries no runtime apparatus —
  it is nearly pure type-level convenience. There is no perf argument for
  avoiding it.
- Tagged unions via manual `interface X { _tag: 'x' }` + literal-object
  construction are banned in both cases: use `Data.TaggedEnum` (interior) or
  a schema union (boundary). Manual interfaces are the worst of both — no
  derived constructors/matchers AND no derivable capabilities.

## The tell

Writing `_tag: 'something'` by hand in an object literal or interface — stop.
Ask the litmus question and reach for the right module's derivation instead.
