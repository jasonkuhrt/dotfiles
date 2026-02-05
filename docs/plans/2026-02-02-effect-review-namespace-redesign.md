# Effect Code Review — Full Rewrite

> __For Claude:__ This replaces the entire content of `~/.claude/skills/effect_review/SKILL.md` (after the frontmatter).

1. __Terminology__

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

2. __Data Types__
   Every data type MUST use the Effect equivalent. Native types only at serialization boundaries (`Schema.Array`, `Schema.Record`, `Schema.optional`), function parameters accepting plain arrays for ergonomics (convert internally), or static const lookups with fixed keys (enum-to-value mappings).

   | Native                        | Effect                                    | Notes                                           |
   | ----------------------------- | ----------------------------------------- | ----------------------------------------------- |
   | `Map`, `ReadonlyMap`          | `HashMap`                                 | Structural equality, O(1) lookup                |
   | `Record<K,V>` as data map     | `HashMap`                                 | Native `Record` only for `Schema.*` wire format |
   | `Set`, `ReadonlySet`          | `HashSet`                                 |                                                 |
   | `Date`, `string` (dates)      | `DateTime.Utc` or `DateTime.Zoned`        | `Schema.DateTimeUtc` at boundaries              |
   | `number` (timestamps)         | `DateTime.Utc`                            |                                                 |
   | `string` (durations)          | `Duration`                                |                                                 |
   | `T \| null`, `T \| undefined` | `Option`                                  |                                                 |
   | Prefix-keyed lookups          | `Trie`                                    | Hierarchical keys (paths, routes)               |
   | Ordered key ranges            | `RedBlackTree` or `SortedMap`/`SortedSet` | Numeric/date ranges                             |
   | Raw discriminated unions      | `Data.TaggedEnum`                         | Derives constructors, `$is`, `$match`           |

   1. Wrong example
   ```typescript
   const index: Map<string, Entry> = new Map()
   const created: Date = new Date()
   const result: User | undefined = users.get(id)
   ```
   2. Correct example
   ```typescript
   const index: HashMap.HashMap<string, Entry> = HashMap.empty()
   const created: DateTime.Utc = DateTime.unsafeNow()
   const result: Option.Option<User> = HashMap.get(users, id)
   ```

3. __Tagged Unions__
   Discriminated unions MUST use `Data.TaggedEnum` — never raw TS unions with manual discriminants. For unions defined with `Schema.TaggedClass` + `Schema.Union` (§7), the union already has `_tag` dispatch — this section covers non-Schema unions.
   * `Data.taggedEnum<T>()` provides constructors, `$is`, `$match`
   * `$match` instead of `switch` — compiler-enforced exhaustiveness, no fallthrough
   * `$is("Variant")` for filtering/type guards — returns narrowed arrays
   * Construct via derived constructors — never raw object literals

   1. Wrong example
   ```typescript
   type Patch = { op: "add"; url: string; name: string } | { op: "remove"; url: string }
   const patch: Patch = { op: "add", url: "https://x.com", name: "X" }
   switch (patch.op) {
     case "add": ...
     case "remove": ...
   }
   ```
   2. Correct example
   ```typescript
   type Patch = Data.TaggedEnum<{
     Add: { readonly url: string; readonly name: string }
     Remove: { readonly url: string }
   }>
   const { Add, Remove, $is, $match } = Data.taggedEnum<Patch>()
   const patch = Add({ url: 'https://x.com', name: 'X' })
   $match(patch, {
     Add: (p) => console.log(p.name),
     Remove: (p) => console.log(p.url),
   })
   const adds = patches.filter($is('Add'))
   ```

4. __Namespace Ownership__
   Every domain concept needs qualified access at call sites. `is(x)` is meaningless. `Order.is(x)` is self-describing. The question: who creates the namespace — the producer or the consumer?

   * __4a. Schema scope — class statics vs. module scope__
     A domain concept's operations (predicates, factories, derived data) live in one of two equivalent places — semantically identical, different scopes:

     | Class statics                  | Module-scope exports                       |
     | ------------------------------ | ------------------------------------------ |
     | `static is = Schema.is(Order)` | `export const is = Schema.is(OrderSchema)` |
     | `static make(...)`             | `export const make = (...)`                |
     | `get derivedField()`           | `export const derivedField = (...)`        |

     __Default:__ Class statics — use whenever the class can be the consumer's entry point.
     __Fallback:__ Module-scope exports — use only when the class cannot be the top-level export (e.g., combinators or custom transforms wrap the base schema, making the consumer-facing schema a composed value rather than the class itself).

   * __4b. Namespace side — producer vs. consumer__
     * __Producer-side — class statics (inherent):__ The class IS the namespace. Consumers use named imports.
       1. Wrong example
       ```typescript
       import * as Domain from './domain/__.js'
       Domain.Order.is(x) // redundant namespace over a class that already IS one
       ```
       2. Correct example
       ```typescript
       // Producer: order.ts
       export class Order extends Schema.TaggedClass<Order>('Order')('Order', {
         amount: Schema.Number,
       }) {
         static is = Schema.is(Order)
       }
       // Consumer:
       import { Order } from "./domain/__.js"
       Order.is(x)
       Order.make({...})
       ```
     * __Producer-side — barrel re-export:__ Barrel wraps a module's flat exports under a name. Consumers use named imports from the barrel.
       1. Correct example
       ```typescript
       // Producer: billing/__.ts
       export * as Billing from './billing.js'
       // Consumer:
       import { Billing } from "./billing/__.js"
       Billing.createInvoice(...)
       ```
     * __Consumer-side — namespace import:__ Consumer creates the namespace. Every consumer must independently use the same name.
       1. Wrong example
       ```typescript
       import * as BillingService from './billing.js' // one file
       import * as Bill from './billing.js' // another file
       ```
       2. Correct example
       ```typescript
       import * as Billing from "./billing.js"
       Billing.createInvoice(...)
       ```
     * __Summary matrix:__

       |                   | __Class statics__                                              | __Module-scope exports__                                                                 |
       | ----------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
       | __Producer-side__ | Inherent — class IS the namespace. Consumer uses named import. | Barrel re-export: `export * as X from "./x.js"`. Consumer uses named import from barrel. |
       | __Consumer-side__ | Redundant — adds a layer over a namespace that already exists. | Namespace import: `import * as X from "./x.js"`. Every consumer must use same name.      |

     * __Trade-off:__ Producer-side is done once, enforced centrally. Consumer-side is duplicated at every import site, consistency by convention.

   * __4c. Directory organization — domain vs. grouping__
     When a directory has a barrel, the directory name determines import style.
     * __Domain directory__ — name represents a problem-space concept. PascalCase form becomes the namespace. Same producer-vs-consumer choice applies:
       1. Correct example — producer-side
       ```typescript
       // billing/__.ts
       export * as Billing from "./index.js"
       // Consumer:
       import { Billing } from "./billing/__.js"
       Billing.createInvoice(...)
       ```
       2. Correct example — consumer-side
       ```typescript
       // billing/__.ts
       export { createInvoice, cancelInvoice } from "./billing.js"
       // Consumer:
       import * as Billing from "./billing/__.js"
       Billing.createInvoice(...)
       ```
     * __Grouping directory__ — name describes non-domain organizational criterion. Named imports — contents that own their namespaces are imported directly:
       1. Wrong example
       ```typescript
       import * as Models from './models/__.js'
       Models.Order.is(x) // "Models" adds no domain meaning
       ```
       2. Correct example
       ```typescript
       import { Customer, Invoice, Order } from './models/__.js'
       Order.is(x)
       ```

   * __4d. Diagnostic__
     When reviewing an import:
     * [ ] Does the namespace prefix add domain meaning at the call site? If `Prefix.symbol(...)` reads as a domain statement → namespace correct. If implementation noise → named imports.
     * [ ] Does the producer already own the namespace? If class statics or barrel re-export exist → consumer-side namespace is redundant → named imports.
     * [ ] Does the consumer-side namespace name match filename/directory? No term mappings.
     * [ ] Is the directory domain or grouping? Domain name at call site → namespace. Housekeeping name → named imports.

5. __Pattern Quality__
   * __5a.__ `pipe` or generator style consistently — not mixing ad-hoc
     1. Wrong example
     ```typescript
     const result = pipe(
       Effect.gen(function* () { ... }),
       Effect.map((x) => x.value),
     )
     ```
     2. Correct example — generator style for sequential effectful code
     ```typescript
     Effect.gen(function*() {
       const user = yield* getUser(id)
       const order = yield* createOrder(user)
       return order
     })
     ```
     3. Correct example — pipe style for transformations
     ```typescript
     pipe(
       users,
       Array.filter((u) => u.active),
       Array.map((u) => u.email),
     )
     ```
   * __5b.__ Effect Array combinators — not native array methods
     1. Wrong example
     ```typescript
     items.reduce((acc, i) => { ... }, {})
     items.filter((i) => i.active)
     items.flatMap((i) => i.children)
     ```
     2. Correct example
     ```typescript
     Array.groupBy(items, (i) => i.category)
     Array.partition(items, (i) => i.active)
     Array.flatMap(items, (i) => i.children)
     ```
   * __5c.__ `Option` combinators — not null checks
     `T | undefined` from `Schema.optional` fields should be wrapped at first access: `Option.fromNullable(value)`. Domain logic uses `Option` combinators, not null checks.
     1. Wrong example
     ```typescript
     result !== null ? transform(result) : fallback
     if (!tree.other) return []  // null check on Schema.optional field
     tree.other ?? fallback
     ```
     2. Correct example
     ```typescript
     Option.match(result, { onNone: () => fallback, onSome: (v) => transform(v) })
     Option.getOrElse(result, () => fallback)
     pipe(Option.fromNullable(tree.other), Option.getOrElse(() => []))
     ```
   * __5d.__ `HashMap.get` returns `Option` — propagate, don't unwrap
     1. Wrong example
     ```typescript
     pipe(HashMap.get(map, key), Option.getOrThrow)
     ```
     2. Correct example
     ```typescript
     pipe(HashMap.get(map, key), Option.map((v) => v.name))
     ```
   * __5e.__ `Order.mapInput` for derived orderings — not raw comparators
     1. Wrong example
     ```typescript
     const byDate = (a: Item, b: Item) => a.createdAt.getTime() - b.createdAt.getTime()
     ```
     2. Correct example
     ```typescript
     const byDate = Order.mapInput(Order.Date, (item: Item) => item.createdAt)
     ```

6. __Error Handling__
   * __6a.__ Typed errors with `Data.TaggedError` or `Schema.TaggedError` — never `Error` base class in Effect signatures
     1. Wrong example
     ```typescript
     const getUser = (id: string): Effect.Effect<User, Error> => ...
     ```
     2. Correct example
     ```typescript
     class NotFoundError extends Data.TaggedError("NotFoundError")<{
       readonly id: string
     }> {}
     const getUser = (id: string): Effect.Effect<User, NotFoundError> => ...
     ```
   * __6b.__ `Effect.catchTag` for selective error recovery
     1. Wrong example
     ```typescript
     pipe(
       getUser(id),
       Effect.catchAll((e) => {
         if (e instanceof NotFoundError) return Effect.succeed(defaultUser)
         return Effect.fail(e)
       }),
     )
     ```
     2. Correct example
     ```typescript
     pipe(
       getUser(id),
       Effect.catchTag('NotFoundError', (e) => Effect.succeed(defaultUser)),
     )
     ```

7. __Schema Patterns__
   Schema patterns govern how domain concepts are defined and composed. See §4a for when to use class statics vs. module-scope exports.
   * __7a. Operations — what belongs on the concept__
     Whether using class statics or module-scope exports (§4a), the same operations belong:
     * __Do:__ `is` predicate (always, no exceptions), factory (`make`), data-derived fields, orderings, comparisons, derivations over the concept's own data
     * __Don't:__ Business logic, side effects, service calls. Freestanding duplicates of operations the concept already provides.
     1. Wrong example — freestanding duplicate
     ```typescript
     const isOrder = Schema.is(Order) // put it on the class: Order.is
     ```
     2. Wrong example — business logic on the class
     ```typescript
     export class Order extends ... {
       sendConfirmation() { ... }  // belongs in a service
     }
     ```
     3. Correct example
     ```typescript
     export class Order extends S.TaggedClass<Order>('Order')('Order', {
       amount: S.Number,
       createdAt: S.DateTimeUtc,
     }) {
       static is = S.is(Order)
       get isRecent() {
         return DateTime.lessThan(Duration.days(30))(DateTime.now(), this.createdAt)
       }
     }
     ```
   * __7b. Always TaggedClass__
     Always `TaggedClass`, never `Class`. The `_tag` field provides:
     * Runtime identity for `Schema.Union` dispatch
     * Meaningful `.is()` predicates — without `_tag`, `.is()` degrades to `instanceof`-only checking
     * Forward-compatibility — any concept can join a union later without refactoring
     * Compatibility with `$match` and `$is` from `Data.TaggedEnum`
     1. Wrong example
     ```typescript
     value._tag === 'Order' // use Order.is(value)
     value instanceof Order // breaks across serialization boundaries
     ```
     2. Correct example
     ```typescript
     export class Order extends Schema.TaggedClass<Order>('Order')('Order', { ... }) {}
     Order.is(value)
     ```
   * __7c. Construction and enums__
     * __Construction:__ `.make()` — stable API across class statics and module-scope exports. `new` only works with class statics and breaks if refactored to module-scope.
       1. Wrong example
       ```typescript
       new Order({ amount: 100 })
       ```
       2. Correct example
       ```typescript
       Order.make({ amount: 100 })
       ```
     * __Enums:__ `as const` required — without it, literal types widen to `string`.
       1. Wrong example
       ```typescript
       Schema.Enums({ active: 'active', inactive: 'inactive' })
       ```
       2. Correct example
       ```typescript
       Schema.Enums({ active: 'active', inactive: 'inactive' } as const)
       MyEnum.enums.active
       ```
   * __7d. File organization and import style__
     Schemas can live one-per-file, grouped under a directory, or in a single file — whatever matches the domain's natural boundaries. Co-locate what's mutually defined, separate what's independent. `Schema.suspend()` handles circular references across files (§7e).
     Import style follows from §4 (Namespace Ownership):
     * [ ] Is the directory domain or grouping? (§4c) — Domain → namespace. Grouping → named imports.
     * [ ] Do the classes own their namespaces? (§4a) — If classes have statics, they ARE namespaces → named imports.
     1. Wrong example
     ```typescript
     import * as Models from './models/__.js'
     Models.Order.is(x)
     ```
     2. Correct example
     ```typescript
     import { Invoice, Order } from './models/__.js'
     Order.is(x)
     ```
   * __7e. Schema.suspend() for recursive references__
     `suspend()` defers schema evaluation to break circular references — self-referencing or cross-file circular imports.
     * Always annotate the return type: `(): S.Schema<Type, Encoded>`
     * Self-references need `as any` — class isn't fully defined during its own body evaluation
     * When `Encoded` differs from `Type`, forward-declare an `interface` for the Encoded form before the class
     1. Wrong example
     ```typescript
     children: S.Array(S.suspend(() => Tree as any))
     ```
     2. Correct example
     ```typescript
     children: S.Array(S.suspend((): S.Schema<Tree, TreeEncoded> => Tree as any))
     ```
