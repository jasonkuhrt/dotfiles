# Effect Review Quality Checks

## effect-data-types

Use Effect data types instead of native equivalents. Native types only at serialization boundaries (`Schema.Array`, `Schema.Record`, `Schema.optional`), function parameters accepting plain arrays for ergonomics, or static const lookups with fixed keys.

| Native | Effect |
|--------|--------|
| `Map`, `ReadonlyMap` | `HashMap` |
| `Record<K,V>` as data map | `HashMap` |
| `Set`, `ReadonlySet` | `HashSet` |
| `Date`, `string` (dates) | `DateTime.Utc` or `DateTime.Zoned` |
| `T \| null`, `T \| undefined` | `Option` |
| Raw discriminated unions | `Data.TaggedEnum` |

### Correct

```typescript
const index: HashMap.HashMap<string, Entry> = HashMap.empty()
const created: DateTime.Utc = DateTime.unsafeNow()
const result: Option.Option<User> = HashMap.get(users, id)
```

### Incorrect

```typescript
const index: Map<string, Entry> = new Map()
const created: Date = new Date()
const result: User | undefined = users.get(id)
```

## tagged-enum-over-raw-unions

Discriminated unions MUST use `Data.TaggedEnum` — never raw TS unions with manual discriminants. Use `$match` instead of `switch` for compiler-enforced exhaustiveness.

### Correct

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
```

### Incorrect

```typescript
type Patch = { op: "add"; url: string; name: string } | { op: "remove"; url: string }
const patch: Patch = { op: "add", url: "https://x.com", name: "X" }
switch (patch.op) {
  case "add": ...
  case "remove": ...
}
```

## grouping-directory-named-imports

Grouping directories (organizing by tool/layer/convention, not domain concepts) use named imports. The directory name is housekeeping, not a domain namespace.

### Correct

```typescript
// schema/ is a grouping directory (organizes Schema-defined classes)
import { Customer, Invoice, Order } from './models/__.js'
Order.is(x)
```

### Incorrect

```typescript
// "Models" or "Schema" adds no domain meaning at call site
import * as Models from './models/__.js'
Models.Order.is(x)
```

## class-statics-named-import

When a class has statics (`.is()`, `.make()`), it IS the namespace. Don't add a redundant namespace layer over it.

### Correct

```typescript
import { Order } from "./domain/__.js"
Order.is(x)
Order.make({...})
```

### Incorrect

```typescript
import * as Domain from './domain/__.js'
Domain.Order.is(x) // redundant namespace over a class that already IS one
```

## pipe-vs-generator-consistency

Use `pipe` or generator style consistently — not mixing ad-hoc. Generator for sequential effectful code, pipe for transformations.

### Correct

```typescript
// Generator for sequential effects
Effect.gen(function*() {
  const user = yield* getUser(id)
  const order = yield* createOrder(user)
  return order
})

// Pipe for transformations
pipe(
  users,
  Array.filter((u) => u.active),
  Array.map((u) => u.email),
)
```

### Incorrect

```typescript
// Mixing: pipe wrapping a generator with additional map
const result = pipe(
  Effect.gen(function* () { ... }),
  Effect.map((x) => x.value),
)
```

## effect-array-combinators

Use Effect Array combinators instead of native array methods.

### Correct

```typescript
Array.groupBy(items, (i) => i.category)
Array.partition(items, (i) => i.active)
Array.flatMap(items, (i) => i.children)
```

### Incorrect

```typescript
items.reduce((acc, i) => { ... }, {})
items.filter((i) => i.active)
items.flatMap((i) => i.children)
```

## option-combinators-not-null-checks

Use `Option` combinators instead of null checks. `T | undefined` from `Schema.optional` should be wrapped at first access with `Option.fromNullable()`.

### Correct

```typescript
Option.match(result, { onNone: () => fallback, onSome: (v) => transform(v) })
Option.getOrElse(result, () => fallback)
pipe(Option.fromNullable(tree.other), Option.getOrElse(() => []))
```

### Incorrect

```typescript
result !== null ? transform(result) : fallback
if (!tree.other) return []  // null check on Schema.optional field
tree.other ?? fallback
```

## hashmap-get-propagate-option

`HashMap.get` returns `Option` — propagate it, don't unwrap immediately.

### Correct

```typescript
pipe(HashMap.get(map, key), Option.map((v) => v.name))
```

### Incorrect

```typescript
pipe(HashMap.get(map, key), Option.getOrThrow)
```

## order-mapinput-for-orderings

Use `Order.mapInput` for derived orderings instead of raw comparator functions.

### Correct

```typescript
const byDate = Order.mapInput(Order.Date, (item: Item) => item.createdAt)
```

### Incorrect

```typescript
const byDate = (a: Item, b: Item) => a.createdAt.getTime() - b.createdAt.getTime()
```

## typed-errors-tagged

Use `Data.TaggedError` or `Schema.TaggedError` for typed errors — never `Error` base class in Effect signatures.

### Correct

```typescript
class NotFoundError extends Data.TaggedError("NotFoundError")<{
  readonly id: string
}> {}
const getUser = (id: string): Effect.Effect<User, NotFoundError> => ...
```

### Incorrect

```typescript
const getUser = (id: string): Effect.Effect<User, Error> => ...
```

## catchtag-for-selective-recovery

Use `Effect.catchTag` for selective error recovery instead of `catchAll` with type checks.

### Correct

```typescript
pipe(
  getUser(id),
  Effect.catchTag('NotFoundError', (e) => Effect.succeed(defaultUser)),
)
```

### Incorrect

```typescript
pipe(
  getUser(id),
  Effect.catchAll((e) => {
    if (e instanceof NotFoundError) return Effect.succeed(defaultUser)
    return Effect.fail(e)
  }),
)
```

## schema-always-taggedclass

Always use `TaggedClass`, never `Class`. The `_tag` field provides runtime identity for `Schema.Union` dispatch and meaningful `.is()` predicates.

### Correct

```typescript
export class Order extends Schema.TaggedClass<Order>('Order')('Order', { ... }) {}
Order.is(value)
```

### Incorrect

```typescript
value._tag === 'Order' // use Order.is(value)
value instanceof Order // breaks across serialization boundaries
```

## schema-make-not-new

Use `.make()` for construction — stable API across class statics and module-scope exports. `new` only works with class statics and breaks if refactored.

### Correct

```typescript
Order.make({ amount: 100 })
```

### Incorrect

```typescript
new Order({ amount: 100 })
```

## schema-enums-as-const

`Schema.Enums` requires `as const` — without it, literal types widen to `string`.

### Correct

```typescript
Schema.Enums({ active: 'active', inactive: 'inactive' } as const)
MyEnum.enums.active
```

### Incorrect

```typescript
Schema.Enums({ active: 'active', inactive: 'inactive' })
```

## schema-suspend-typed

`Schema.suspend()` for recursive references must always annotate the return type. Self-references need `as any`.

### Correct

```typescript
children: S.Array(S.suspend((): S.Schema<Tree, TreeEncoded> => Tree as any))
```

### Incorrect

```typescript
children: S.Array(S.suspend(() => Tree as any))
```

## is-predicate-on-class

Every domain concept needs an `is` predicate. Place it on the class as a static, not as a freestanding duplicate.

### Correct

```typescript
export class Order extends S.TaggedClass<Order>('Order')('Order', {
  amount: S.Number,
}) {
  static is = S.is(Order)
}
```

### Incorrect

```typescript
const isOrder = Schema.is(Order) // put it on the class: Order.is
```
