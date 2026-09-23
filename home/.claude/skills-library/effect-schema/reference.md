# effect-schema reference

Paths are relative to the Heartbeat repo root. Line numbers are as of
2026-09-12; re-check before quoting.

## 1. The four layers

| Layer | Package | Owns | Does not own |
| --- | --- | --- | --- |
| Effect v4 Schema | `effect/Schema`, `effect/unstable/schema/VariantSchema` | codecs (Type/Encoded), `make` with constructor defaults, `decode`/`encode`, `optionalKey`/`optional`/`mutableKey`, `Class`, `Struct`, `brand`, `suspend`, `declare` | anything about Prisma |
| effect-plus `S` | `@libs/effect-plus` (`libs/effect-plus/src/lib/schema`) | `export * from 'effect/Schema'` plus `ClassPlus`, `StructPlus`, `TaggedClassPlus`, `TaggedStructPlus`, `TaggedErrorPlus`, `taggedClass/taggedError` builders, `brandPlus`, `Id.UuidV4(brand)`, `OpenEnum`, `TaggedUnionPlus`, `Unicode` checks, `withPlusStatics` (decode*/encode*/is/equals and `into`/`Into` on anything with `.fields`) | Prisma posture |
| effect-prisma schema DSL | `@libs/effect-prisma/schema` (`libs/effect-prisma/src/schema`) | `Model`/`TypeOnlyModel`/`TaggedUnionModel`, `Field.*` (posture + physical markers), `$` refs and `Relation`, `Selection` (`$`), `Meta`, `ModelDirectives`, `OperationPolicy` | the PSL file; write-input optionality |
| Prisma + generator | `parts/prisma/src/schema/*.prisma` (authored), `effect-prisma-generator` via `prisma generate` | the datamodel (DMMF), the generated client and its enriched input/result types, `Models`/`Ids`/`Scalars`/`Enums` facades under `parts/prisma/src/prisma.generated.source` (never committed) | — |

Plugins (sidecar `parts/prisma/effect-prisma.config.ts`): `@libs/prisma-cas`,
`@libs/prisma-synthetic-scoped-autoincrement`. Plugins `$extends` first and the
codec extension is outermost (`generator/artifacts/runtimeExtension.ts:96-100,
512-513`), so a plugin's own writes never pass through the codec.

PSL and TS are both hand-authored, side by side (`X.prisma`, `X.model.ts`).
The generator reconciles relations only (`generator/core/reconcileAuthoredSchema.ts`).
Storage facts are not reconciled yet; "eventual PSL generation from TS is the
intended direction" (`schema/Model/nativeType.ts:19-22`). `@parts/prisma#check`
is `prisma format` drift on `src/schema`; `#generate` emits the client.

## 2. Variants

`VariantToolkit = VariantSchema.make({ variants: ['select', ...PrismaOperations], defaultVariant: 'select' })`
(`schema/Model/variant.ts:39-78`). `select` backs the model value itself; the
bare `Models.X` IS the select variant. Every operation name is a static:
`Models.X.create`, `.update`, `.findMany`, … each built as
`S.withPlusStatics(VariantToolkit.extract(container, op))` (`model.ts:545-551`).

Upstream Effect `Model` uses `select/insert/update/json/jsonCreate/jsonUpdate`
for raw SQL. This library deliberately does not (`CONTRIBUTING.md` §1). There is
no `GeneratedByDb` because Prisma has no such posture.

Update-family keys are all `mutableKey(optional(field))` (`fieldMap.ts:344-365`,
`variant.ts:212-221`). `Schema.optional` = `optionalKey(UndefinedOr(S))`, so a
present `undefined` equals absence; test presence with `=== undefined`.

## 3. Posture table (CONTRIBUTING §2)

Prisma create input has exactly three postures. Every `Field.*` lands on one.

| `.prisma` | create input | `Field.*` |
| --- | --- | --- |
| no default, not ignored | required | plain schema |
| `@default(uuid()/cuid()/autoincrement()/dbgenerated(...))` | optional | `Field.Default(schema)` (no ctor default; Prisma owns the value) |
| `@default(false)`, `@default(0)` | optional | `Field.Default(value)(schema)` (value is also the select ctor default) |
| `@ignore` | absent everywhere | `Field.DbOnly(declaration)` |
| relation read only | absent from create, present in select | `Field.VariantOnly(['select'])` |

- Identity is orthogonal to posture: `Field.PrimaryKey(field)`. Compositions in
  `parts/prisma/src/schema/_/Ids.ts`: `Ids.defaulted(id)` = `PrimaryKey(Default(id))`,
  `Ids.appGenerated(id)` = `PrimaryKey(GeneratedByApp(id))`. `Field.IdOpaque`,
  `Field.IdInt`, `Field.IdEnum` exist for other key shapes.
- `Field.Nullable(x)` (`field.ts:826-860`): select `NullOr` + ctor default `null`
  (omit in `make` → `null`); create family `optional(NullOr)`; update family
  optional via the model rule. Applies per declared variant when `x` is already
  a variant field; physical markers are carried over.
- `Field.GeneratedByApp` = `FieldOnly([select, create*, update*, upsert])`:
  required on create.
- `Field.Json(x)`: marker; widens supplied variants when the document carries
  `S.also`. `Field.Layout.Object(Schema, mapping)`: one logical field over
  several columns; the mapping is required.
- `Field.Legacy({ old, new })`: select reads `old | new`; writes are `new`.
- Physical markers (symbol carriers copied onto the field, not AST annotations,
  `schema/Model/marker.ts`): `Field.Unique`, `Field.UpdatedAt`, `Field.DbName`,
  `Field.VarChar(n)`/`Text`/`Decimal(p,s)`/`UnsignedInt`/`MediumText`,
  `Field.DefaultNow`/`DefaultUuid`/`DefaultCuid`/`DefaultAutoincrement`/`DefaultDbGenerated`.
  Declarative today. Compound keys and indexes are model directives:
  `Model(name, fields, { id: [...], uniques: [{ fields }], indexes, map, fulltexts })`
  (`schema/Model/directives.ts`); the generator reads `directives.id` and
  `directives.uniques` for identity and unique criteria.

## 4. Timestamps

`Field.DateTime = S.Date` (no codec; Prisma carries `Date` natively).

| Combinator | select | create family | update family | For |
| --- | --- | --- | --- | --- |
| `DateTimeInsert` | `DateTimeUtcFromDate` | `Overrideable(…, now)` | absent | codec models, createdAt |
| `DateTimeUpdate` | `DateTimeUtcFromDate` | `Overrideable` | `Overrideable` | codec models, updatedAt |
| `DateRawInsert` / `DateRawUpdate` | `S.Date` | same shape | same shape | type-only models |

`Overrideable` = `decodeTo(brand('Override'))` + `withConstructorDefault(now)`:
the create-variant `Type` is `Date & Brand<'Override'>`, required; the default
applies only in `make*`. Consequences:

- A codec model with a **plain** PSL column: the enriched create input requires
  the branded value; callers pass `VariantSchema.Override(date)`
  (`lib/userService.ts:985`, `cells/DynamicWorkflow/api/procedures/create.handler.ts:18`)
  or build data with `Models.X.createMany.make({...})` so defaults run
  (`cells/Page/operations/operations.ts:2082-2104`).
- A codec model with PSL `@default(now())`: the enriched input has
  `createdAt?` (optionality is Prisma's); handlers may omit it and Prisma fills it
  (`cells/Email/api/procedures/create.handler.ts`). The TS side is
  under-declared until it composes `Field.DefaultNow(Field.DateTimeInsert)` and
  `Field.UpdatedAt(Field.DateTimeUpdate)` (`defaultFunction.ts:52-68`,
  `field.ts:238-256`, test `Model.test.ts:1330-1365`). Not a defect; backlog.
- Baselines: `BaseFields(id)` = `{ createdAt: DateTimeInsert, id: Ids.defaulted(id), updatedAt: DateTimeUpdate }`,
  `BaseFieldsTypeOnly` (DateRaw*), `BaseFieldsLegacy` (`parts/prisma/src/schema/_/BaseFields.ts`).
  New models use the baseline.
- Repo state (2026-09-12): 87 plain `createdAt` columns vs 21 `@default(now())`;
  4 plain `updatedAt` vs 11 `@updatedAt`.

## 5. What runs at runtime

- The codec extension (`runtime/extension.ts`, `runtime/modelCodec.ts`) encodes
  **present** write fields through the authored codecs and decodes results by
  projection. "Missing keys remain missing … neither model construction nor
  constructor defaults run" (`schema/Operation.ts:39-43`).
- Type-only models run no codecs; their field schemas must claim exactly what
  Prisma natively delivers (`model.ts` `TypeOnlyModel`).
- Generated write-input types: Prisma's own optionality (`?` from the PSL) with
  the value type replaced by `Models.X.Create["field"]`
  (`generator/enrich.ts` `applyModelCodecPatches`/`updateField`,
  `renderModelCodecFieldType`). Type-only models also keep the raw Prisma form.
- CAS (`libs/prisma-cas/src/runtime.ts`): `update({ cas: { expectedRevision }, data, where })`
  runs `updateMany` with the revision predicate and `revision: expected + 1`,
  then `findFirst` pinned to the new revision (fallback `findFirstOrThrow`).
  `where` must pin one row by a unique selector and may not use AND/OR/NOT.
  `GuardedOperations` moves `updateMany`/`updateManyAndReturn`/`upsert` to
  `.internal`. `acceptCurrentWhen(read, accept)` recovers
  `ConcurrentModification` for idempotent replays.
- Scoped autoincrement: `SyntheticScopedAutoIncrement({ scope: $.Email })` =
  `Field.Default(UnsignedInt.With(PositiveInt))` + annotation; PSL needs
  `@default(0)`; the allocator upserts `SyntheticScopedAutoIncrement` by
  `modelName_fieldName_scopeKey` in its own transaction, beneath the codec.
- Lifted client (`@libs/effect-prisma`): `findFirst`/`findUnique` → `Option`;
  `findFirstOrFail`/`findUniqueOrFail`; `Service.transaction()`; `$transaction`
  tuple; `prisma.x.project(P)` exposes `findFirst`, `findFirstOrThrow`,
  `findMany`, `update` returning `P['Type']` — no `create`
  (`runtime/modelProjection.ts:59-86`).
- Tests: `EffectPrisma.Test.make(Service)`; `prisma.x.findFirst.when({ select: P.select }).everySome(row)`;
  `prisma.x.update.calls`.

## 6. The model surface

Runtime value `Models.X` (generated facade = `Payload.withStorageFields(authored, storageFKs)`,
restores FK scalars like `communityId`):

| Member | What |
| --- | --- |
| `Models.X` | select-variant struct schema + plus statics; `.fields`, `.make`, `.is`, `.decode*`, `.encode*` |
| `Models.X.create` / `.update` / `.<op>` | that boundary's struct; each has `.fields`, `.make`, `.is`, `.into`, `.Into` |
| `Models.X.$({ a: true, rel: { b: true } })` | select projector; returns schema carrying `.select`; relations only from select; inline nested specs one level deep, deeper via another `$` |
| `Models.X.into({...}, { encodeKeys })` / `.Into<Self>()({...})` | pick (`true`) and add (schema) fields; struct or class |
| `Models.X.fields.id.generate()` | id statics survive on `fields` |
| `Models.X.FromOperation`, `.statics(...)`, `.computed(...)`, `.One`, `.Many`, `.Back` | model plumbing |

Type position (generated facade `export declare namespace X`): `X` (decoded
row), `X.Encoded`, `X.Create` (create Type + storage FKs), `X.Create.$<Sel>`,
`X.Create.$Pick<Sel>`, `X.Create.$Omit<Sel>`, `X.$<Sel>`, `X.$Pick<Sel>`,
`X.$Omit<Sel>`, `X.<field>`, `X.fields.<field>`. `Selection.Of<typeof Models.X, Sel, Variant>`
is the library-level twin. Value-level `$` is select-only.

`Into` identifiers: `source.identifier ?? 'S.Into'`; variant statics have no
identifier, so pass `{ identifier }` as the annotations argument when a label
matters.

## 7. Cell patterns (existing, follow them)

- Output projection: `const selection = {...} as const; export const XSummary: Models.Selection.SchemaOf<typeof Models.X, typeof selection> = Models.X.$(selection);`
  (`cells/Email/models/Email.projection.ts`).
- Derived domain model with renames/overrides:
  `const PageSchema = Models.Page.into({ id: true, createdAt: S.Date, versions: Tree.Schema(...), communityId: Models.Page.fields.communityID }, { encodeKeys: { communityId: 'communityID' } }); export class PageClass extends PageSchema {}`
  (`cells/Page/models/Page.model.ts:30-52`).
- RPC payload with data-side fields: `class Payload extends Models.X.create.Into<Payload>()({ displayName: true, content: Models.Y.Content })`;
  update: `Models.X.update.Into<Payload>()({ id: Models.X.fields.id, displayName: true })`
  (`cells/DynamicWorkflow/api/procedures/{create,update}.spec.ts`, `cells/Email/api/procedures/{create,save}.spec.ts`).
  Identity-only payloads: `S.ClassPlus` of `fields.id`/`fields.revision`.
- Writes: raw `data` with relation stubs `{ community: { id } }`, or
  `data: Models.X.createMany.make({...})` to get constructor defaults. CAS:
  `prisma.x.project(P).update({ cas: { expectedRevision }, data, where })`.
- Reads: `prisma.x.project(P).findFirst({ where })` → `Option`.
- Operations gate: `Cell.use(Authentication).use(Authorization.any(perm)).useVisibility('public')`;
  plugins read `Cell.CurrentInput.communityID`.

## 8. Verification locations

| Question | Where the answer is |
| --- | --- |
| Enriched input/result type for model M | `parts/prisma/src/prisma.generated.source/client/models/M.ts` (after `vpr @parts/prisma#generate`) |
| Generated facade for M | `parts/prisma/src/prisma.generated.source/schema/models/M.ts` |
| Combinator semantics | `libs/effect-prisma/src/schema/Model/field.ts`, `schemas/date.ts`, `__tests__/Model.test.ts`, `__tests__/Model.selection.test.ts` |
| Generator rules | `libs/effect-prisma/CONTRIBUTING.md`, `src/generator/source-adapters/effect.ts`, `src/generator/enrich.ts`, `src/generator/artifacts/schema/facade.ts` |
| Library fixture (canonical pairing of PSL and TS) | `libs/effect-prisma/generator/__tests__/e2e/fixture/prisma/{schema.prisma,AuthoredModels.ts}` and its `__generated_oracle__` |
| Effect semantics | the installed package: `readlink -f parts/prisma/node_modules/effect` (a pnpm store path), then `src/Schema.ts` (constructor defaults: "applied only during make*"; `optional` = `optionalKey(UndefinedOr)`), `src/unstable/schema/VariantSchema.ts` (`Overrideable`, `extract`, `Class`) |
