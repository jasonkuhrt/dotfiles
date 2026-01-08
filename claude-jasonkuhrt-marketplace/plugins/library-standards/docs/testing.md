# Testing Conventions

This document outlines testing conventions for modern table-driven testing patterns using Kit's `Test` API.

## Table-Driven Testing with Kit's Test API

### Primary Pattern

Use Kit's `Test.on()` builder pattern for all table-driven tests instead of nested describe blocks:

```typescript
// ✅ Good - Test.on() with function
// dprint-ignore
Test.on(parseValue)
  .cases(
    [['hello'],  'HELLO'],
    [[''],       ''],
  )
  .test()

// ❌ Bad - Unnecessary nested describe blocks
describe('parseValue', () => {
  describe('when input is valid', () => {
    test('returns uppercase', () => {
      expect(parseValue('hello')).toBe('HELLO')
    })
  })
})
```

### Builder Pattern: Function Mode vs Generic Mode

Kit's Test API provides two modes:

#### Function Mode - `Test.on(fn)`

For testing specific functions. Preferred when testing a single function.

```typescript
// Basic usage with tuple format
// dprint-ignore
Test.on(add)
  .cases(
    [[2, 3],  5],
    [[5, 5],  10],
  )
  .test()

// Named cases
// dprint-ignore
Test.on(add)
  .cases(
    ['positive numbers',  [2, 3],   5],
    ['negative numbers',  [-1, -2], -3],
  )
  .test()

// Organized with nested describe blocks
// dprint-ignore
Test.on(multiply)
  .casesIn('basic')(
    [[2, 3],  6],
    [[5, 5],  25],
  )
  .casesIn('edge cases')(
    [[0, 0],  0],
    [[1, 0],  0],
  )
  .test()
```

#### Generic Mode - `Test.describe()`

For complex scenarios where you need custom validation logic.

```typescript
// Using object format with i/o convention
// dprint-ignore
Test.describe('addition')
  .on(add)
  .cases(
    { n: 'positive', i: [2, 3], o: 5 },
    { n: 'negative', i: [-1, -2], o: -3 },
  )
  .test()

// Custom types without function
// dprint-ignore
Test.describe('email validation')
  .i<string>()      // Input type
  .o<boolean>()     // Output type
  .cases(
    { n: 'valid', i: 'user@example.com', o: true },
    { n: 'invalid', i: 'no-at-sign', o: false }
  )
  .test((input, expected) => {
    const result = isValidEmail(input)
    expect(result).toBe(expected)
  })
```

**Case Format Convention**:

**Tuple Format** (for function mode):
```typescript
[[arg1, arg2], expected]              // Basic case
['name', [arg1, arg2], expected]      // Named case
[[arg1, arg2]]                        // Snapshot test (no expected)
```

**Object Format** (for generic mode):
```typescript
{ n: 'name', i: input, o: expected }
{ n: 'name', i: input, o: expected, skip: true }
{ n: 'name', todo: 'Not implemented yet' }
```

### Nested Describe Syntax with ' > '

Use the ` > ` separator in describe names to automatically create nested describe blocks:

```typescript
// Creates nested describe blocks: describe('Transform', () => describe('String', ...))
Test.describe('Transform > String')
  .i<string>()
  .o<string>()
  .cases(['hello', 'HELLO'])
  .test()

// Shares the 'Transform' describe block with the above
Test.describe('Transform > Number')
  .i<number>()
  .o<number>()
  .cases([42, 42])
  .test()

// Results in:
// Transform
//   String (1 test)
//   Number (1 test)

// Supports deeper nesting
Test.describe('API > Users > Create')
  .i<{ name: string }>()
  .o<{ id: number; name: string }>()
  .cases([{ name: 'Alice' }, { id: 1, name: 'Alice' }])
  .test()

// Results in:
// API
//   Users
//     Create (1 test)
```

**Benefits**:
- Organize tests hierarchically without deeply nested builder calls
- Multiple test blocks with the same prefix automatically share outer describe blocks
- Clean test output with proper nesting
- Works with both `Test.describe()` and the `.describe(name, callback)` method

### Matrix Testing

Use `.matrix()` to run test cases across all combinations of parameter values:

```typescript
// Basic matrix - runs each case for every combination
Test.describe('string transform')
  .i<string>()
  .o<string>()
  .matrix({
    uppercase: [true, false],
    prefix: ['', 'pre_'],
  })
  .cases(
    ['hello', 'hello'],
    ['world', 'world'],
  )
  .test(({ input, output, matrix }) => {
    let result = input
    if (matrix.prefix) result = matrix.prefix + result
    if (matrix.uppercase) result = result.toUpperCase()

    let expected = output
    if (matrix.prefix) expected = matrix.prefix + expected
    if (matrix.uppercase) expected = expected.toUpperCase()

    expect(result).toBe(expected)
  })
// Generates 8 tests: 2 cases × 2 uppercase values × 2 prefix values

// Combine matrix with nested describes for organization
Test.describe('Transform > String')
  .i<string>()
  .o<string>()
  .matrix({
    mode: ['strict', 'loose'],
    cache: [true, false],
  })
  .cases(['input', 'expected'])
  .test(({ input, output, matrix }) => {
    const result = transform(input, matrix.mode, matrix.cache)
    expect(result).toBe(output)
  })
// Results in:
// Transform
//   String
//     case 1 [matrix: mode="strict", cache=true]
//     case 1 [matrix: mode="strict", cache=false]
//     case 1 [matrix: mode="loose", cache=true]
//     case 1 [matrix: mode="loose", cache=false]
```

**When to use matrix**:
- Testing behavior across multiple configuration combinations
- Avoiding repetitive test case declarations
- Ensuring all parameter combinations are tested
- Document generation with different options (like SDDM, hoisting)
- Any scenario where you need cartesian product of parameters

**Matrix features**:
- Generates cartesian product of all value arrays
- Matrix values available in test context as `matrix` property
- Test names include matrix values for clarity
- Works with both function mode and generic mode
- Combines with nested describe syntax

## Test Data Organization

### Column Alignment

Place `// dprint-ignore` **above** `Test.on()` or `Test.describe()` to preserve column alignment:

```typescript
// dprint-ignore
Test.on(encode)
  .cases(
    [['simple file',    '/file.txt'      ],  '/file.txt'],
    [['nested path',    '/home/user/doc' ],  '/home/user/doc'],
    [['with spaces',    '/my docs/file'  ],  '/my%20docs/file'],
  )
  .test()
```

### Output Transformation

Use `.o()` to transform expected values before comparison. Useful for reducing boilerplate in test data:

```typescript
// dprint-ignore
Test.on(createUser)
  .o((partial, [name]) => ({ ...defaultUser, name, ...partial }))
  .cases(
    [['Alice'],  { role: 'admin' }],       // Only specify differences
    [['Bob'],    { role: 'user', age: 30 }]
  )
  .test()
```

### Custom Assertions

Provide a custom assertion function to `.test()` when needed:

```typescript
// dprint-ignore
Test.on(match)
  .casesIn('basic')(
    [['hello world', /foo/   ],  Option.none()],
    [['hello world', /hello/ ],  Option.some(['hello'])],
  )
  .test((actual, expected) => {
    if (Option.isNone(expected)) {
      expect(Option.isNone(actual)).toBe(true)
    } else {
      expect(actual).toEqual(expected)
    }
  })
```

## Helper Functions and Aliases

### Top-Level Helpers

Define commonly used functions as constants at the top of test files:

```typescript
import * as FsLoc from './$$.js'

// Decoder aliases - for creating test inputs
const relFile = FsLoc.RelFile.decodeSync
const relDir = FsLoc.RelDir.decodeSync
const absFile = FsLoc.AbsFile.decodeSync
const absDir = FsLoc.AbsDir.decodeSync

// Constructor aliases - for creating expected values
const RelFile = FsLoc.RelFile.make
const RelDir = FsLoc.RelDir.make
const AbsFile = FsLoc.AbsFile.make
const AbsDir = FsLoc.AbsDir.make
const PathAbs = FsLoc.Path.Abs.make
const PathRel = FsLoc.Path.Rel.make
const File = FsLoc.File.make
```

### Naming Convention

- Use **lowercase** for decoder functions that parse strings
- Use **PascalCase** for constructor functions that create objects
- Keep names short and descriptive

## Custom Matchers

### Generalized Equivalence Matcher (Preferred)

**ALWAYS use the generalized `toBeEquivalent` matcher for equivalence checks** with Effect Schema types. This provides a consistent API across the entire codebase:

```typescript
import { Test } from '#test'
import '../test/matchers/$.js'  // Import generalized matchers
import { Schema as S } from 'effect'

// For any Schema with built-in equivalence
const Person = S.Struct({ name: S.String, age: S.Number })
const person1 = { name: 'Alice', age: 30 }
const person2 = { name: 'Alice', age: 30 }

expect(person1).toBeEquivalent(person2, Person)

// For custom equivalence functions
const caseInsensitive = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase()

expect('HELLO').toBeEquivalentWith('hello', caseInsensitive)
```

**Important**: Never create domain-specific equivalence matchers. Always use `toBeEquivalent` with the appropriate schema:

```typescript
// ✅ Good - Using generalized matcher
import * as FsLoc from '#fs-loc'
expect(result).toBeEquivalent(expected.loc, FsLoc.FsLoc)
expect(result).toBeEquivalent(expected.loc, FsLoc.FsLocLoose.LocLoose)

// ❌ Bad - Creating domain-specific equivalence matchers
expect(result).toEqualLoc(expected.loc)  // Don't create these!
expect(result).toEqualLocLoose(expected.loc)  // Use toBeEquivalent instead!
```

### Domain-Specific Property Matchers

**Only create domain-specific matchers for property assertions**, not for equivalence checks. These matchers test specific properties or characteristics of values:

#### When to Create Domain-Specific Matchers

✅ **DO create matchers for**:
- Property checks (e.g., `toBeAbs()`, `toBeFile()`)
- State assertions (e.g., `toBeRoot()`, `toBeWithin()`)
- Transformation checks (e.g., `toEncodeTo()`)

❌ **DON'T create matchers for**:
- Equivalence checks (use `toBeEquivalent` instead)
- Equality comparisons (use `toBeEquivalent` with schemas)

#### File Structure

Create domain-specific property matchers in separate `.test-matchers.ts` files:

```typescript
// $.test-matchers.ts
import { Schema as S } from 'effect'
import { expect } from 'vitest'
import * as FsLoc from './$$.js'

interface FsLocMatchers<R = unknown> {
  // Property assertion matchers - these are good!
  toBeAbs(): R      // Check if absolute path
  toBeRel(): R      // Check if relative path
  toBeFile(): R     // Check if file type
  toBeDir(): R      // Check if directory type
  toBeRoot(): R     // Check if at root
  toEncodeTo(expected: string): R  // Check encoded form

  // DON'T add equivalence matchers - use toBeEquivalent instead!
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeAbs(received: FsLoc.FsLoc) {
    const pass = FsLoc.Groups.Abs.is(received)
    const receivedStr = FsLoc.encodeSync(received)
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${receivedStr} not to be absolute`
          : `Expected ${receivedStr} to be absolute`,
    }
  },
  // ... other property matchers (NOT equivalence matchers)
})
```

### Import Pattern

Import custom matchers at the top of test files:

```typescript
import { Test } from '#test'
import { describe, expect } from 'vitest'
import * as FsLoc from './$$.js'
import './$.test-matchers.js'  // Import custom matchers
```

### Usage Guidelines

**For equivalence/equality**: Always use `toBeEquivalent`:

```typescript
// ✅ Good - Equivalence checks
expect(result).toBeEquivalent(expected.loc, FsLoc.FsLoc)
expect(user1).toBeEquivalent(user2, UserSchema)

// ❌ Bad - Custom equivalence matchers
expect(result).toEqualLoc(expected.loc)  // Don't create these!
```

**For property assertions**: Use domain-specific matchers:

```typescript
// ✅ Good - Property assertions
expect(result).toBeAbs()
expect(result).toBeFile()
expect(result).toEncodeTo('/home/file.txt')

// These are cleaner than the verbose alternatives:
expect(FsLoc.Groups.Abs.is(result)).toBe(true)  // More verbose
expect(FsLoc.Groups.File.is(result)).toBe(true)  // More verbose
expect(FsLoc.encodeSync(result)).toBe('/home/file.txt')  // More verbose
```

## Error Cases and Nullable Values

### Wrapping Nullable Values

Always wrap nullable and boolean values in objects to satisfy the `CaseFilled` interface:

```typescript
// For nullable values
type TestCase = {
  input: string
  expected: { value: ParseResult | null }  // ✅ Wrapped in object
}

// NOT this
type TestCase = {
  input: string
  expectedValue: ParseResult | null  // ❌ Not wrapped
}
```

### Error Testing Patterns

For testing functions that may throw:

```typescript
type TestCase = {
  input: string
  expected: { throws: true } | { value: string }
}

// In test implementation
if ('throws' in expected) {
  expect(() => func(input)).toThrow()
} else {
  const result = func(input)
  expect(result).toBe(expected.value)
}
```

## Complete Example

```typescript
import { Test } from '#test'
import { describe, expect } from 'vitest'
import * as FsLoc from './$$.js'
import './$.test-matchers.js'

// Helper aliases
const relFile = FsLoc.RelFile.decodeSync
const absFile = FsLoc.AbsFile.decodeSync
const absDir = FsLoc.AbsDir.decodeSync

// Using function mode with nested describe blocks
// dprint-ignore
Test.on(FsLoc.AbsFile.decodeSync)
  .casesIn('valid paths')(
    [['simple file in root',  '/file.txt'        ]],
    [['nested path',          '/home/user/doc.pdf']],
  )
  .casesIn('invalid paths')(
    [['relative path',  'file.txt']],  // Will throw
  )
  .test((input) => {
    const result = input.startsWith('/')
      ? FsLoc.AbsFile.decodeSync(input)
      : expect(() => FsLoc.AbsFile.decodeSync(input)).toThrow()

    if (result) {
      expect(result).toBeAbs()
      expect(result).toBeFile()
    }
  })

// Using generic mode for complex validation
// dprint-ignore
Test.describe('toRel')
  .i<{ input: FsLoc.Groups.Abs.Abs; base: FsLoc.AbsDir.AbsDir }>()
  .o<FsLoc.Groups.Rel.Rel>()
  .cases(
    { n: 'file same base',  i: { input: absFile('/home/file.txt'), base: absDir('/home/') }, o: relFile('./file.txt') },
    { n: 'dir same base',   i: { input: absDir('/home/src/'),      base: absDir('/home/') }, o: relFile('./src/') },
  )
  .test(({ input, base }, expected) => {
    const result = FsLoc.toRel(input, base)
    expect(result).toBeRel()
    expect(result).toBeEquivalent(expected, FsLoc.FsLoc)
  })
```

## Migration Guidelines

When updating existing tests to follow these conventions:

1. Replace `Test.Table.suite` or `test.for` with `Test.on()` or `Test.describe()`
2. Use tuple format `[[args], expected]` for function mode
3. Use object format `{ n, i, o }` for generic mode
4. Remove redundant describe blocks that duplicate file path information
5. Use `.casesIn('name')` for organizing tests into nested describe blocks
6. Extract helper functions to top of file
7. Consider creating custom matchers for repeated assertion patterns
8. Add `// dprint-ignore` **above** `Test.on()` or `Test.describe()` for column alignment
9. Use `.test()` with custom assertion when default `Equal.equals` isn't sufficient

## Key Rules

- **READ THE JSDOC** on `Test.describe()` and `Test.on()` for full API details
- Use `// dprint-ignore` ABOVE `Test.on()` or `Test.describe()` for aligned test data
- Use `.casesIn('name')` to create nested describe blocks within a single test builder
- Use ` > ` separator in describe names to create multi-level nested describe blocks across test builders
- Use `.matrix()` to run test cases across all combinations of parameter values
- Chain `.test()` at the end to execute tests
- Default assertion uses Effect's `Equal.equals` for structural equality
- Provide custom assertion function to `.test(fn)` if needed
- Use `.o()` for output transformation when reducing boilerplate
- Matrix values are available as `matrix` property in test context
- Matrix and nested describe features can be combined for organized test suites

## Related Documentation

- [Library Testing Conventions](./library-local.md#testing) - For library-specific test file organization
- Main CLAUDE.md testing section - For general testing principles and type-level testing