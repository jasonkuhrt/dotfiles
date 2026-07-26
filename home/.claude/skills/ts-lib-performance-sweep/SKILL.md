---
name: ts-lib-performance-sweep
description: Use when a TypeScript library needs a type-performance or declaration-emit pass — TS7056 (type exceeds serialization limit), TS4023/TS2883 (name cannot be named / not portable), TS2589 (instantiation depth), slow typechecks, or when consumers of a types-heavy lib start failing declaration emit. Also for proactive sweeps of type-level-heavy lib code (schema builders, lifted clients, HKT machinery).
---

# TS Lib Performance Sweep

An editing pass over one library's type-level code for compiler performance and
declaration-emit stability. The lib's contract: **consumers rely on inference at
app level** — any fix that requires a consumer-side annotation is rejected;
problems are fixed where they are created.

## The core idiom: named interfaces at public results

The printer can NEVER structurally expand an `interface` — it always emits a
reference. A `type` alias only gets best-effort naming: its `aliasSymbol` is
lost whenever the checker evaluates through it (conditional resolution, mapped
instantiation, `Pick`/`Omit` composition, distribution). So:

- **Compute with aliases/conditionals internally.**
- **Wrap every public RESULT in a named generic interface** — the effect-v4
  schema idiom: `interface OptionFromNullOr<S> extends decodeTo<Option<toType<S>>, NullOr<S>> {}`.
- Function types become interfaces with call signatures.
- Never let a consumer-visible type resolve terminally to a bare
  conditional/mapped alias.
- Boundary: unions/conditionals/mapped types cannot BE interfaces — those stay
  aliases, which is exactly why the named wrapper goes at the result position.
- `interface X extends <computed>` requires the base to resolve to an object
  type with statically known members.

## Emit-error triage

| Error           | Meaning                                                                              | Fix                                                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TS2883 / TS4023 | Type is nameable only via a deep/install-graph path (`node_modules/...`, `dist/...`) | Export a public alias at the package boundary the consumer already imports ("keep this alias even though it is only X: downstream declaration emit must be able to name it through this package"). Check whether a "cleanup" removed a value import the emit needed. |
| TS7056          | Serialized structural expansion exceeds the cap                                      | LOCATE the fat first (see procedure) — naming-at-the-source only works if the alias survives to the printer. Last resort: annotate the blown binding with an honest workaround comment ("remove if the surface or tsc ever compacts enough to infer here").          |
| TS2589          | Instantiation depth                                                                  | Often engine-specific (see tsc/tsgo below). Reduce conditional nesting; check for accidental distribution.                                                                                                                                                           |

Known trap: `import type {} from './x'` is **erased** — it does not reliably pull
augmentations/registries into the program. Use `export type * from './x'` for
type-registry surfaces.

## Signature discipline for generic methods

Mirror Prisma's two-slot pattern: the parameter position is a mapped type over
the inferred parameter itself (`SelectSubset<TActual, TValidated>`-style) so
inference anchors on the call-site literal; the big derived type participates
only as the constraint/validation slot. This buys per-call-site precision.
Verified caveat: it does NOT by itself shrink declaration emit — inference
anchoring and emit size are separate problems.

## Façade packages must not mint symbols

A re-export package (`export * as O from './lib/option.ts'` over `effect/Option`)
stays emit-transparent ONLY while the upstream symbols flow through unchanged.
`export type Option<A> = Upstream.Option<A>` mints a NEW symbol declared in the
façade's internal module — emitted declarations must then name that module,
which is usually not package-exports-reachable → TS2883 deep-path leak. Pure
`export * from` (or `export type { X } from`) keeps the upstream symbol, so
emit names the upstream package portably. Deliberate _renames_
(`Context<T> = Upstream.Services<T>`) cannot avoid minting — those need their
declaring module exposed in the package `exports` map instead.
The same rule holds in VALUE position: `export const make = Upstream.make`
mints a fresh value symbol with an inferred type — use `export { make } from`
(same name) or `export { catch as catchAll } from` (rename; keywords are legal
in the from-position). Value renames that survive a charter check belong in the
exports-mapped form too.
Diagnostic: swap the façade namespace for the upstream one at one usage — if
emit errors change, the façade is minting symbols.

## Two verified emit/compat foot-guns

- **`unknown` in public codec/channel types**: downstream distributive
  conditionals collapse it (Prisma's `Exact<unknown, unknown>` → `{}`), breaking
  assignability far from the source. The same value universe that survives
  distribution: `NonNullable<unknown> | null | undefined`.
- **`Omit` retained as an operand**: `TModel & Omit<TPayload, keyof TModel>`
  kept unevaluated in an inferred type can serialize megabytes at emit. An
  inline key-remapped mapped type
  (`{ [K in keyof TPayload as K extends keyof TModel ? never : K]: TPayload[K] }`)
  is the same type but evaluates eagerly to the compact concrete form
  (measured: 2,000,000 chars → 571).

## Known perf items (sweep checklist)

- Prefer interfaces over intersections (`extends` chains cache; `&` re-flattens).
- Avoid unwanted distributivity: `[T] extends [U]` when not distributing.
- Variance annotations (`in`/`out`) on hot generic params.
- `import type` everywhere types-only.
- Big literal unions in hot positions: prefer a base type + validation.
- Formatting/style conventions live in `~/.claude/checks/ts.types*.quality.md` —
  run `/check @checks`, don't restate them here.

## Sweep procedure (bounded — this is the part agents get wrong)

1. **Baseline gate first.** Record the exact error inventory before touching
   anything (`<compiler> --build <consumer tsconfig> --pretty false | grep "error TS"`).
2. **Run BOTH `tsc` and `tsgo`.** They diverge on depth limits and emit; a fix
   verified on one may be red on the other. CI's compiler is the authority.
3. **One hunk, one gate run, evaluate.** Never batch speculative fixes — land
   the minimal surviving subset, revert inert hunks.
4. **Hard stop after ~3 falsified hypotheses.** Stop, write down the facts
   table (state → error counts), and hand off with it. Churning past that point
   produces over-edited wrong fixes.
5. Probe validity: an annotated `declare const x: SomeAlias<...>` prints the
   annotation as written — it proves nothing about expansion. Probes must force
   the checker to print an _inferred_ type.
6. Finish by adding an emit ratchet where possible: a fixture consumer whose
   declaration build is part of the lib's test gate, so "consumers rely on
   inference" stays true permanently.

## Red flags

- "I'll add an annotation in the app to unblock" — rejected; lib problem.
- "Rename the alias / add a named alias" without confirming the alias survives
  to the printer — verified no-op failure mode.
- Fixing emit errors one error-code at a time — they are usually one
  serialization problem at different stages; locate first.
