## no-ts-enums

TypeScript enums generate runtime objects with bidirectional mappings and don't work well with tree-shaking. Use `as const` objects or tagged unions instead.

### Correct

```typescript
const Status = {
  Active: 'active',
  Inactive: 'inactive',
} as const

type Status = (typeof Status)[keyof typeof Status]
```

### Incorrect

```typescript
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}
```

## esm-only-no-cjs

Always use ESM modules. CJS (`require`, `module.exports`) is forbidden.

### Correct

```typescript
import { readFile } from 'fs/promises'
export const helper = () => { ... }
```

### Incorrect

```typescript
const { readFile } = require('fs/promises')
module.exports = { helper }
```

## no-function-overloads

Never use TypeScript function overloads. Use generic conditional return types instead — they're more composable, don't duplicate parameter lists, and work with arrow functions.

### Correct

```typescript
async function deleteUser<C extends QueryChecks | undefined = undefined>(
  params: { userID: string; checks?: C }
): Promise<
  C extends { errorOnNotFound: false } ? User | null : User
> { ... }
```

### Incorrect

```typescript
async function deleteUser(params: { userID: string; checks: { errorOnNotFound: false } }): Promise<User | null>;
async function deleteUser(params: { userID: string; checks?: QueryChecks }): Promise<User>;
async function deleteUser(params: { userID: string; checks?: QueryChecks }): Promise<User | null> { ... }
```

## no-input-casting

Never cast function inputs or parameters. Type errors on inputs reveal real bugs — fix the root cause instead of silencing the compiler.

### Correct

```typescript
// Fix the upstream type so the call site is naturally correct
Ef.runPromise(effect)
```

### Incorrect

```typescript
Ef.runPromise(effect as Ef.Effect<A, never, never>)
```

## simple-output-casting

When casting outputs for complex conditional return types, use simple `as any`. Never use `as unknown as ComplexType<T>` chains.

### Correct

```typescript
return Ef.gen(() => input as any) as any
```

### Incorrect

```typescript
return Ef.gen(
  () => input as Generator<any, any, any>,
) as unknown as NormalizeResult<T>
```

## prefer-unknown-over-any

Use `unknown` instead of `any` for untyped values. `unknown` forces explicit narrowing before use, catching bugs at compile time.

### Correct

```typescript
const parse = (input: unknown): Config => {
  if (typeof input !== 'object' || input === null) throw new Error('invalid')
  return input as Config
}
```

### Incorrect

```typescript
const parse = (input: any): Config => {
  return input
}
```
