# Kitz Quality Checks

## no-vitest-describe-wrapping

Never wrap `Test.on()` or `Test.describe()` in Vitest `describe` blocks — they create their own describe blocks internally.

### Correct

```typescript
Test.on(add)
  .cases(
    [[2, 3], 5],
    [[-1, 1], 0],
  )
  .test()
```

### Incorrect

```typescript
describe('add', () => {
  Test.on(add)
    .cases(
      [[2, 3], 5],
      [[-1, 1], 0],
    )
    .test()
})
```

## prefer-function-mode

Use `Test.on(fn)` (function mode) when testing a single function. Types are inferred from the function signature — `Test.describe()` is for custom types or grouping multiple concerns.

### Correct

```typescript
// Testing a single function — use function mode
Test.on(parseValue)
  .cases(
    [['42']],
    [['hello']],
  )
  .test()
```

### Incorrect

```typescript
// Unnecessary describe mode for a single function
Test.describe('parseValue')
  .inputType<[string]>()
  .outputType<ParsedValue>()
  .cases(
    [['42'], expected1],
    [['hello'], expected2],
  )
  .test(({ input, output }) => {
    expect(parseValue(...input)).toEqual(output)
  })
```

## describe-nesting-separator

Use `>` separator for nested describe names, not `/` or `.` or deeply nested blocks.

### Correct

```typescript
Test.describe('String > uppercase', [
  ['hello', 'HELLO'],
])
  .describe('String > lowercase', [
    ['HELLO', 'hello'],
  ])
  .test(({ input, output }) => { ... })
```

### Incorrect

```typescript
Test.describe('String / uppercase', [ ... ])
Test.describe('String.uppercase', [ ... ])
```

## prefer-value-level-assertions

In `.test.ts` files, always use value-level assertions (`Assert.exact.of(expected).on(actual)`) — they report ALL failures simultaneously. Reserve type-level only (`Assert.exact.ofAs<Expected>().onAs<Actual>()`) for `.test-d.ts` files where no runtime values exist.

### Correct

```typescript
// .test.ts — value-level
test('types', () => {
  const value = getValue()
  Assert.exact.string.on(value)
  Assert.exact.of({ a: 1 }).on(obj)
})

// .test-d.ts — type-level is fine here
Assert.exact.ofAs<string>().onAs<string>()
```

### Incorrect

```typescript
// .test.ts — type-level only, short-circuits on first error
test('types', () => {
  Assert.exact.ofAs<string>().onAs<typeof value>()
  Assert.exact.ofAs<number>().onAs<typeof count>()
})
```

## no-type-assertions-in-test-blocks

Never use type-level only assertions (like `type _ = Assert.exact.of<A, B>`) inside `test()` blocks — they short-circuit on the first error, hiding subsequent failures.

### Correct

```typescript
test('types', () => {
  Assert.exact.string.on(value)
  Assert.exact.of({ a: 1 }).on(obj)
})
```

### Incorrect

```typescript
test('bad', () => {
  type _ = Assert.exact.of<string, number> // short-circuits
})
```
