---
name: effect-schema
description: Use when reading, reviewing, designing or authoring anything built on Heartbeat's schema stack, before asserting how it behaves. Triggers include Prisma model files (`parts/prisma/src/schema/*.model.ts`, `*.prisma`), `@libs/effect-prisma` (`Model`, `TypeOnlyModel`, `Field.*`, `$` refs, `Selection`, directives), `@libs/effect-plus` `S` (`ClassPlus`, `StructPlus`, `into`/`Into`, `brandPlus`, `Id`), Effect v4 `VariantSchema`, the generated `Models`/`Ids`/`Scalars`, the CAS and scoped-autoincrement plugins, cell projections and RPC payloads, or the generated Prisma client's input and result types.
---

# effect-schema

Heartbeat's schema stack is four layers with distinct owners. Most wrong claims
come from reading one layer's comments and asserting another layer's behavior.
Read `reference.md` in this directory for the layer map, the posture table, the
model surface, the cell patterns and the verification locations.

## Authority, in order

1. **The `.prisma` file and Prisma's generated client are the modelling
   authority** (`libs/effect-prisma/CONTRIBUTING.md` §1). When a posture is in
   question, read `parts/prisma/src/prisma.generated.source/client/models/<M>.ts`
   and see what Prisma types.
2. The authored TypeScript model declares value codecs and write postures;
   storage facts (`Unique`, `UpdatedAt`, `DefaultNow`, `VarChar`, …) are
   declarative markers with no consumer today beyond `PrimaryKey` and the
   block directives. A TS model that omits a marker for a PSL attribute is
   under-declared, not broken.
3. JSDoc on a combinator describes the TypeScript posture it builds. It is
   not a statement about what the database or Prisma does at runtime.
4. Upstream Effect (`Model.ts`'s `json*` variants, `GeneratedByDb`) is a
   different vocabulary for raw SQL. Its existence proves nothing here.

## Before you assert, read the owner

| The claim is about | Read this first |
| --- | --- |
| whether a write-input key is optional | the generated client's `<M>CreateInput` (optionality comes from the PSL, value type from `Models.<M>.Create["field"]`) |
| who fills an omitted column on write | `schema/Operation.ts:39-43` and `runtime/modelCodec.ts` `encodeData`: the codec encodes present fields only; constructor defaults run only in `make*`; otherwise the PSL `@default` or nothing |
| what a `Field.*` combinator does per variant | `schema/Model/field.ts` and `__tests__/Model.test.ts`, not the README |
| what a variant static is | `schema/Model/model.ts` `makeModel`: `withPlusStatics(extract(variant))`, so every variant carries `into`/`Into`, `make`, `is`, `fields` |
| what `$` / `$Pick` / `Create.$` mean | `schema/Model/selection.ts` (value `$` is select-only) and the generated facade namespace (`generator/artifacts/schema/facade.ts`) for the type-position twins |
| what a CAS update issues or returns | `libs/prisma-cas/src/runtime.ts` `executeGuardedUpdate` |
| what the allocator writes and through which client | `libs/prisma-synthetic-scoped-autoincrement/src/runtime.ts` and `generator/artifacts/runtimeExtension.ts` (plugins chain first, codec outermost) |
| how a cell should shape a model | an existing cell (`cells/Page/models/Page.model.ts`, `cells/Email/models/*.projection.ts`, `cells/DynamicWorkflow/api/procedures/*.spec.ts`) |

## Rules that prevent the known mistakes

- A PSL `@default(...)`/`@updatedAt` paired with a plain TS combinator is a
  **declarative gap**, part of the backlog of models being brought in line.
  Say so. Do not call it a conflict or a defect.
- `Into` is the pick every fielded schema has; on `Models.X.create` it means
  "a subset of the create boundary". Do not call it orthogonal to variants or
  claim an input-side projector is missing. The bare `Models.X` is the
  `select` variant.
- Do not propose an API-facing variant family. Payloads are picks over the
  Prisma write variants plus command extras; stricter-than-boundary fields are
  named explicitly.
- `prisma.x.project(P).update({ cas })` already reads the row back after the
  guarded `updateMany`. `project` has no `create`.
- Type-only models run no codecs; a table written by a plugin beneath the codec
  gets nothing from constructor defaults. Database-owned timestamps there are
  `@default(now())`/`@updatedAt` in the PSL and `Field.DefaultNow(...)` /
  `Field.UpdatedAt(...)` in TS.
- `Field.Nullable`: select required `A | null` with ctor default `null`; create
  family `optional(NullOr)`; update family `mutableKey(optional(...))`.
- Renames in a derived cell model use `Models.X.into({...}, { encodeKeys })`.

## Answer shape

State the fact, the owner you read, and the file:line. If you did not read the
owning layer, say "not verified" instead of inferring from a comment.
