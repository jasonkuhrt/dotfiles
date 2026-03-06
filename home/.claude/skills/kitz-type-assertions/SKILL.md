---
name: type-assertions
description: Use when writing type-level tests, .test-d.ts files, or asserting TypeScript types with @kitz/assert.
---

# Type Assertions

Keywords: ts-expect-error, type-level testing, type equality, .test-d.ts, @kitz/assert

Conventions are defined as checks in `~/.claude/checks/kitz.quality.md`. Run `/review @kitz` to evaluate.

## Import

```typescript
import { Assert } from '@kitz/assert'
```

## Builder Pattern

Assertions use a fluent builder: `Assert.<relator>.<matcher>(expected).<setting>().on(actual)`

### Relators (Required First)

| Relator  | Meaning                     |
| -------- | --------------------------- |
| `.exact` | Types must be identical     |
| `.equiv` | Bidirectional assignability |
| `.sub`   | Actual extends expected     |

### Unary Matchers (No Expected Type)

```typescript
Assert.exact.any.on(value) // value is any
Assert.exact.unknown.on(value) // value is unknown
Assert.exact.never.on(value) // value is never
Assert.exact.empty.on(value) // value is {}
```

### Binary Matchers

```typescript
// Value-level
Assert.exact.of(expected).on(actual)

// Type-level only
Assert.exact.ofAs<Expected>().onAs<Actual>()

// Shorthand matchers
Assert.exact.string.on(value)
Assert.exact.number.on(value)
Assert.exact.boolean.on(value)
Assert.exact.bigint.on(value)
Assert.exact.symbol.on(value)
Assert.exact.null.on(value)
Assert.exact.undefined.on(value)
Assert.exact.void.on(value)
Assert.exact.object.on(value)
Assert.exact.function.on(value)
```

### Settings (Optional)

```typescript
// Negate assertion
Assert.exact.of(string).not.on(value) // value is NOT string

// Control type inference
Assert.exact.of(expected).inferNarrow().on(actual) // narrow inference
Assert.exact.of(expected).inferWide().on(actual) // wide inference
Assert.exact.of(expected).inferAuto().on(actual) // default
```

### Extractors

```typescript
// Extract return type
Assert.exact.string.returned.on(fn) // ReturnType<fn> is string

// Extract awaited type
Assert.exact.string.awaited.on(promise) // Awaited<promise> is string

// Extract parameters
Assert.exact.of([string, number]).parameters.on(fn)

// Extract array element
Assert.exact.string.array.on(arr) // arr is string[]
```
