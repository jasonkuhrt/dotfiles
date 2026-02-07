## dollar-prefix-type-params

Type parameters in type aliases and interfaces use `$` prefix. Functions use `$` prefix matching the value parameter name.

### Correct

```typescript
type Transform<$Input> = $Input extends string ? number : boolean
interface Container<$T> {
  value: $T
}
const process = <$value>(value: $value): $value => value
function map<$item, $result>(item: $item, fn: ($item: $item) => $result): $result
```

### Incorrect

```typescript
type Transform<T> = T extends string ? number : boolean
interface Container<T> {
  value: T
}
const process = <T>(value: T): T => value
```

## type-guard-underscore-suffix

Type guard functions add `_` suffix to the type parameter to avoid conflict with the narrowed type in the return position.

### Correct

```typescript
function isString<$value_>(value: $value_): value is $value_ & string
```

### Incorrect

```typescript
// $value conflicts with the narrowed type
function isString<$value>(value: $value): value is $value & string
```

## generic-return-convention

When a type parameter is NOT mapped to a value parameter (e.g. generic factory returns), use `$T` style since there's no value name to mirror.

### Correct

```typescript
function create<$T>(): $T
function empty<$T>(): Array<$T>
```

### Incorrect

```typescript
// Using value-mirrored name when there's no value parameter to mirror
function create<$result>(): $result
```

## utility-internal-triple-underscore

Type parameters with `___` prefix are implementation details — internal parameters not meant for external callers. Typically used for computed defaults.

### Correct

```typescript
type Utility<$T, ___Internal = SomeDefault<$T>> = ___Internal extends string ? $T : never
```

### Incorrect

```typescript
// Internal param looks like a public API parameter
type Utility<$T, $Internal = SomeDefault<$T>> = $Internal extends string ? $T : never
```

## mapped-type-iterator-names

Mapped types use specific single-letter iterators: `k` (key) for objects, `i` (index) for tuples/arrays.

### Correct

```typescript
type Mapped<$T> = { [k in keyof $T]: Transform<$T[k]> }
type TupleMapped<$T> = { [i in keyof $T]: Transform<$T[i]> }
```

### Incorrect

```typescript
type Mapped<$T> = { [K in keyof $T]: Transform<$T[K]> }
type TupleMapped<$T> = { [P in keyof $T]: Transform<$T[P]> }
```

## infer-clause-double-underscore

Infer clauses use `__lowercase__` pattern with double underscores.

### Correct

```typescript
type ElementOf<$T> = $T extends Array<infer __element__> ? __element__ : never
```

### Incorrect

```typescript
type ElementOf<$T> = $T extends Array<infer Element> ? Element : never
type ElementOf<$T> = $T extends Array<infer U> ? U : never
```

## type-param-defaults-widest

Default type parameters to their widest possible variant. This keeps constraint sites clean — callers don't need to pass `any` for every unused parameter.

### Correct

```typescript
type ParserContext<
  $Schema = Schema | undefined,
  $SDDM = any,
  $TypeHooks = never,
> = {
  schema: $Schema
  sddm: $SDDM
  hooks: $TypeHooks
}

// Clean constraint — no need to specify defaults
function parse<$Context extends ParserContext>(ctx: $Context): void
```

### Incorrect

```typescript
// No defaults — forces callers to specify all params
type ParserContext<$Schema, $SDDM, $TypeHooks> = {
  schema: $Schema
  sddm: $SDDM
  hooks: $TypeHooks
}

// Cluttered constraint — must specify all params
function parse<$Context extends ParserContext<any, any, any>>(ctx: $Context): void
```
