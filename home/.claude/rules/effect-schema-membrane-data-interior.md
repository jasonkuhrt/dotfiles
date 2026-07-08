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
