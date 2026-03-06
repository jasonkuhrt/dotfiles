## flat-over-nested

Prefer flat conditional type formatting when cases are mutually exclusive. Each top-level condition starts at the same indentation. This enables commenting out individual cases without breaking syntax.

### Correct

```typescript
type Result<$T> = $T extends string ? 'string'
  : $T extends number ? 'number'
  // $T extends boolean                  ? 'boolean' :  // <- Can comment out
  : $T extends undefined ? 'undefined'
  : 'unknown' // <- Final else, aligned
```

### Incorrect

Nested when flat would work — harder to comment out individual cases

```typescript
type Result<$T> = $T extends string ? 'string'
  : $T extends number ? 'number'
    : $T extends boolean ? 'boolean'
      : $T extends undefined ? 'undefined'
        : 'unknown'
```

## commentable-cases

Conditional type cases must be individually commentable without breaking syntax. Place `:` at end of line for each case so any case can be commented out.

### Correct

```typescript
type Result<$T> =
  $T extends string    ? 'string'     :
  $T extends number    ? 'number'     :
  // $T extends boolean ? 'boolean' :    // <- safely commented out
  $T extends undefined ? 'undefined'  :
  'unknown'
```

### Incorrect

Can't comment out middle case — `:` placement makes it syntactically dependent

```typescript
type Result<$T> = $T extends string
  ? 'string'
  : $T extends number
  ? 'number'
  : $T extends boolean
  ? 'boolean'
  : 'unknown'
```

## nested-only-when-required

Only use nested conditional type formatting when the logic is inherently nested — one condition inside another. Do not nest mutually exclusive top-level cases.

### Correct

```typescript
// Nested: inner condition depends on outer match
type DeepCheck<$S> = $S extends `${infer __c__}${infer __rest__}` ? string extends __rest__ ? number
  : __rest__ extends '' ? 1
  : __rest__ extends `${infer __c2__}${infer __r2__}` ? string extends __r2__ ? number
    : __r2__ extends '' ? 2
    : never
  : never
  : 0
```

### Incorrect

```typescript
// Using nested indentation for mutually exclusive cases — use flat pattern instead
type Result<$T> = $T extends string ? 'string'
  : $T extends number ? 'number'
    : $T extends boolean ? 'boolean'
      : 'unknown'
```

## dprint-ignore-for-alignment

Use `//dprint-ignore` before conditional types that rely on `?`/`:` alignment. Without it, the formatter will break the intentional alignment.

### Correct

```typescript
//dprint-ignore
type LengthSlow<$S, $Acc> = $S extends `${string}${string}${string}${string}${infer __r__}`
  ? string extends __r__ // Inner ternary (nested logic)
    ? number
  : LengthSlow<__r__, [...$Acc, 0, 0, 0, 0]> // <- : at end
  : $S extends `${string}${string}${string}${infer __r__}` // <- Back to base
    ? string extends __r__ ? number
    : [...$Acc, 0, 0, 0]['length'] // <- : at end
  : $Acc['length'] // <- Final else
```

### Incorrect

```typescript
// Missing dprint-ignore — formatter will break alignment
type LengthSlow<$S, $Acc> = $S extends `${string}${string}${string}${string}${infer __r__}`
  ? string extends __r__
    ? number
  : LengthSlow<__r__, [...$Acc, 0, 0, 0, 0]>
  : $Acc['length']
```
