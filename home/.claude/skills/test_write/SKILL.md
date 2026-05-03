---
name: "test:write"
description: >-
  Write or update TypeScript tests, including regression, property, snapshot,
  type-level, and Effect-service tests. Use when the user asks to write, add,
  fix, update, or strengthen tests; add a regression; improve coverage; or add
  snapshot/property/type tests, or when code changes require test changes as part
  of a larger task. Covers @kitz/test builder patterns, Test.property,
  Effect-layer-backed tests, file organization, and what to test vs skip.
---

# Writing Tests

## What to Test

Test the **public interface**, not internals. If it's not exported, it shouldn't have
its own test block. Internal helpers get covered indirectly through the exports that
use them.

For each public export, test:
- Happy path with representative inputs
- Edge cases: empty strings, zero, null/undefined (where applicable), single-element arrays, boundary values
- Error paths: invalid inputs, missing required fields, out-of-range values
- For overloaded/curried functions: test each calling convention

## File Organization

| Pattern | When |
|---------|------|
| `foo.test.ts` alongside `foo.ts` | Default — colocated tests |
| `__tests__/foo.test.ts` | If the project uses a test directory convention |
| `foo.test-d.ts` | Type-level assertions only |

Check the project's existing test files before creating new ones — match the convention already in use.

## @kitz/test — Table-Driven Builder

When `@kitz/test` is available, prefer `Test.on()` for pure function tables with good
type inference. For other situations:

- `Test.describe(...)` for generic-mode tests, grouped snapshots, or custom assertions
- `Test.property(...)` for property-based tests wrapped in repo-standard naming
- `.layer(...)` / `.layerEach(...)` with `.testEffect(...)` for Effect-returning or service-backed tests

### Core Pattern

One `Test.on()` chain per export. One `.test()` call ends the chain:

```typescript
import { Test } from '@kitz/test'
import { Math } from './_.js'

Test.on(Math.add).casesInput([1, 2], [0, 0]).test()
Test.on(Math.subtract).casesInput([5, 3], [0, 0]).test()
```

### Choosing `.on()` Strategy

| Situation | Strategy |
|-----------|----------|
| `.on(fn)` gives good type inference | Use directly |
| Minor issue (optional params, complex inference) | `.on((x) => fn(x))` anon wrapper |
| Types still broken | `.inputType<T>().outputType<U>()` |
| No function, custom logic | `.describe()` chain with custom `.test()` |

### Choosing Case Format

| Situation | Method |
|-----------|--------|
| Default (snapshots) | `.casesInput(x, y, z)` |
| Need grouping | `.describeInputs('name', [x, y])` |
| Trivial pure fn | `.cases([[input], expected], ...)` |
| Transform result before snapshot | `.test(({ result }) => transform(result))` |

### Examples

**Grouped snapshots:**
```typescript
Test.on(parseVersion)
  .describeInputs('valid semver', ['1.2.3', '0.0.1', '10.20.30'])
  .describeInputs('with prerelease', ['1.0.0-alpha', '1.0.0-beta.1'])
  .describeInputs('invalid', ['bad', ''])
  .test()
```

**Explicit outputs (trivial pure fns only):**
```typescript
Test.on(add)
  // dprint-ignore
  .cases([[2, 3], 5], [[0, 0], 0], [[-1, 1], 0])
  .test()
```

**Transform before snapshot:**
```typescript
Test.describe('addPattern')
  .on(Gitignore.addPattern)
  .casesInput([Gitignore.empty, 'node_modules/'], [decode('foo/\n'), 'bar/'])
  .test(({ result }) => encode(result))
```

**Reference point pattern** — verify curried variants match the main function:
```typescript
Test.on(Str.Visual.take).casesInput(['hello world', 5], ['hi', 10]).test()

test('takeOn/takeWith match take', () => {
  const expected = Str.Visual.take('hello world', 5)
  expect(Str.Visual.takeOn('hello world')(5)).toBe(expected)
  expect(Str.Visual.takeWith(5)('hello world')).toBe(expected)
})
```

**Config methods:**
`.only()` · `.skip()` · `.skip('reason')` · `.skipIf(() => bool)` · `.concurrent()` · `.tags(['tag'])`
`.snapshots({ arguments: false })` · `.snapshotSchemas([Schema])` · `.snapshotSerializer((v, ctx) => str)`

**Don'ts:**
- Don't use separate `.test()` blocks — chain them
- Don't use `.cases([[x]], [[y]])` for snapshot-only — use `.casesInput(x, y)`
- Don't pass `undefined` as input — spreads as `fn(undefined)`, wrong for no-arg fns
- Don't add extra vitest `describe` around `Test.on()` just to group one case table — use `Test.describe(...)` or builder `.describe(...)` for structure

For `.onSetup()`, `.snapshotSchemas()`, describe callback form, nested describe
strategies, and when raw vitest is acceptable, see `references/advanced.md`.

## Effect and Async Tests

If the code depends on runtime services (time, randomness, env, filesystem, git, HTTP,
child process, network), test through Effect services and layers — not module mocks or
global patching.

### Effect v4 Service Pattern

Services use `ServiceMap.Service`, not `Context.Tag` or `Effect.Tag`:

```typescript
import { Effect, Layer, ServiceMap } from 'effect'

// Define service
class Database extends ServiceMap.Service<Database, {
  readonly query: (sql: string) => Effect.Effect<string>
}>()('Database') {}

// Create layer (curried form)
const DatabaseTest = Layer.succeed(Database)({
  query: (sql) => Effect.succeed(`mock: ${sql}`),
})

// Test with layer
it('queries database', async () => {
  const program = Effect.gen(function* () {
    const db = yield* Database
    return yield* db.query('SELECT 1')
  })
  const result = await Effect.runPromise(program.pipe(Effect.provide(DatabaseTest)))
  expect(result).toBe('mock: SELECT 1')
})
```

Compose layers with `Layer.mergeAll(layerA, layerB)`.

### With @kitz/test Builder

```typescript
Test.describe('Database query')
  .layer(Layer.mergeAll(DatabaseTest, LoggerTest))
  .testEffect('returns results', () =>
    Effect.gen(function* () {
      const db = yield* Database
      return yield* db.query('SELECT 1')
    })
  )
```

Use `.layer(...)` for a layer shared across all cases, `.layerEach(...)` for a fresh
layer per test case.

### Prefer

- `Test.layer(...)` / `Test.layerEach(...)` with `.testEffect(...)` when using `@kitz/test`
- Memory or test layers that preserve the real contract shape and failure modes
- `Effect.runPromise(...)` / `Effect.runPromiseExit(...)` in raw vitest
- `fc.asyncProperty(...)` for async invariants

### Avoid

- `vi.mock(...)` for dependencies that already have an Effect service boundary
- `Layer.succeed(Tag, value)` — use curried form `Layer.succeed(Tag)(value)`
- Mutating globals when a service exists
- Testing only `Live` when a `Memory` or test layer would isolate the contract more precisely

## Raw Vitest Structure

When `@kitz/test` is not available or the test doesn't fit table-driven format:

```typescript
describe('parseVersion', () => {
  it('parses valid semver', () => { ... })
  it('rejects invalid strings', () => { ... })
})
```

Prefer `it.each` for 3+ cases with the same shape:
```typescript
it.each([
  ['1.2.3', { major: 1, minor: 2, patch: 3 }],
  ['0.0.1', { major: 0, minor: 0, patch: 1 }],
])('parses %s', (input, expected) => {
  expect(parseVersion(input)).toEqual(expected)
})
```

## Property-Based Tests with fast-check

Use `fc.assert(fc.property(...))` when:
- The input space is large (strings, numbers, arrays)
- There's a relationship between functions to verify (see test:review)
- You need confidence in edge cases you can't enumerate

```typescript
import * as fc from 'fast-check'

it('encode/decode roundtrip', () => {
  fc.assert(fc.property(fc.string(), (s) => {
    expect(decode(encode(s))).toBe(s)
  }))
})
```

Keep generators **broad**. Don't filter out "weird" inputs — those find bugs.

Common arbitraries:
- `fc.string()` — includes empty, unicode, whitespace
- `fc.integer()` — includes negative and zero
- `fc.array(fc.string())` — includes empty arrays
- `fc.record({ key: fc.string() })` — objects matching a shape
- `fc.oneof(fc.constant('a'), fc.constant('b'))` — union/enum values

Or with `@kitz/test`:
```typescript
Test.property('roundtrip', fc.string(), (s) => {
  expect(decode(encode(s))).toBe(s)
})
```

### Schema-Derived Arbitraries

Effect v4 includes `Arbitrary.make` which derives fast-check arbitraries directly from
Schema definitions — no manual arbitrary construction needed:

```typescript
import { Arbitrary, Schema as S } from 'effect'
import * as fc from 'fast-check'

const User = S.Struct({ name: S.String, age: S.Int.pipe(S.between(0, 150)) })

// Derives fc.Arbitrary<{ name: string; age: number }> with correct constraints
const userArb = Arbitrary.make(User)

it('roundtrip', () => {
  fc.assert(fc.property(userArb, (user) => {
    expect(S.decodeSync(User)(S.encodeSync(User)(user))).toEqual(user)
  }))
})
```

This respects Schema refinements (min/max, patterns, integer vs float), unions,
template literals, optionals, and recursive types. Always prefer `Arbitrary.make(schema)`
over hand-written `fc.record(...)` when a Schema exists — it guarantees the arbitrary
matches the actual type constraints.

### Property Tests with Effect Programs

`Test.property` is sync-only. For Effect-returning properties, use raw fast-check
`asyncProperty` with `Effect.runPromise`:

```typescript
it('service roundtrip', async () => {
  await fc.assert(fc.asyncProperty(fc.string(), async (input) => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const svc = yield* MyService
        const encoded = yield* svc.encode(input)
        return yield* svc.decode(encoded)
      }).pipe(Effect.provide(MyServiceTest))
    )
    expect(result).toBe(input)
  }))
})
```

Key considerations:
- Each fast-check iteration runs the full Effect program including layer construction.
  Use `Layer.mergeAll` outside the property and `Effect.provide` inside — the layer is
  memoized by default so construction cost is paid once.
- When a property fails, fast-check shrinks by re-running. If your Effect program has
  side effects (writes, mutations), shrinking re-executes them. Use memory/test layers
  that are safe to re-run.
- fast-check's default 100 iterations is fine for pure Effect programs. For programs
  with real I/O behind live layers, consider `{ numRuns: 20 }` to keep test time sane.

## Snapshot Tests

Use for complex output where hand-writing expected values is tedious:
```typescript
it('formats error report', () => {
  expect(formatReport(sampleErrors)).toMatchSnapshot()
})
```

Update snapshots deliberately (`--update-snapshots`), never blindly. Pair broad
snapshots with targeted semantic assertions when failure localization matters.

## Performance Gates

- **Local:** gate on `mean` — robust to OS jitter
- **CI:** gate on `p99` — controlled environment, tail latency matters
- Set local thresholds at 3-5x observed mean

## Type Assertions

```typescript
import { Assert } from '@kitz/assert'

Assert.exact.ofAs<string>().on(value) // Value-level (preferred)

// In .test-d.ts files
type _pass = Assert.exact.of<string, string>
// @ts-expect-error
type _fail = Assert.exact.of<string, number>
```

Include both positive and negative type cases. Ensure `@ts-expect-error` is precise
enough that unrelated type failures don't accidentally satisfy it.

## What NOT to Test

- Implementation details (private functions, internal state shape)
- Framework behavior (don't test that `Array.map` works)
- Trivial getters/setters with no logic
- Third-party library behavior (test your integration, not their code)

## Checklist

```
[ ] Every public export has at least one test
[ ] Edge cases covered (empty, zero, boundary, unicode where relevant)
[ ] Property tests for functions with large input spaces
[ ] Effect-service code tested through layers, not module mocks
[ ] Test names describe behavior, not implementation
[ ] No test depends on execution order or shared mutable state
[ ] Performance gates use mean locally, p99 on CI
```

After writing or modifying tests, apply `test:review` to audit for weak assertions,
missing cross-API relationships, narrowed invariants, and unrealistic service setup.

For flaky async tests that use arbitrary `sleep`/`setTimeout` delays, see the
`condition-based-waiting.md` reference in `superpowers:systematic-debugging` — it
provides a `waitFor<T>` polling pattern that replaces brittle timeouts with
condition-based assertions.
