# Namespace Module Pattern

The `_.ts`/`__.ts` pattern for organizing TypeScript modules with clean namespace exports.

## Overview

This pattern provides:

* __Clean imports__: Consumers import a single namespace, not individual exports
* __Encapsulation__: Implementation details hidden behind namespace
* __Flexibility__: Works with single or multiple implementation files

## File Naming

| File             | Name                | Purpose                                         |
| ---------------- | ------------------- | ----------------------------------------------- |
| Namespace Module | `_.ts`              | Exports the public namespace                    |
| Barrel Module    | `__.ts`             | Aggregates exports from code modules (optional) |
| Test Module      | `_.test.ts`         | Tests the public API                            |
| Test Fixtures    | `_.test.fixture.ts` | Shared test data                                |

__Why `_`/`__` instead of `$`/`$$`:__

1. __Terminal/Shell Issues__: `$` requires quoting in shell commands (`git add '$.ts'`)
2. __TypeScript Bug__: `$$` files have module resolution issues causing circular dependencies

## Patterns

### Single Implementation File

When you have one implementation file:

```
<library>/
├── _.ts           # export * as Name from './<name>.js'
├── <name>.ts      # Implementation
└── _.test.ts      # Tests
```

__`_.ts`__:

```typescript
export * as Mask from './mask.js'
```

### Multiple Implementation Files

When you have multiple implementation files, add a barrel:

```
<library>/
├── _.ts           # export * as Name from './__.js'
├── __.ts          # Re-exports from all code modules
├── foo.ts         # Implementation
├── bar.ts         # Implementation
└── _.test.ts      # Tests
```

__`_.ts`__:

```typescript
export * as Parser from './__.js'
```

__`__.ts`__:

```typescript
export { type AST, buildAST } from './ast.js'
export { lex, type Lexeme } from './lexer.js'
export { type Token, tokenize } from './tokenizer.js'
```

## Module Rules

### Namespace Module (`_.ts`)

1. __With barrel__: Must contain `export * as <Name> from './__.js'`
2. __Without barrel__: Must contain `export * as <Name> from './<name>.js'`
3. __No imports__: Must not have any import statements
4. __Naming__: `<Name>` is PascalCase of directory name

### Barrel Module (`__.ts`)

1. __Re-exports only__: Only contains `export { ... } from` statements
2. __No imports from `_.ts`__: Would create circular dependency
3. __Local files only__: Exports from `./<file>.js`, never `../` or packages
4. __No value imports__: Use `export { x } from`, not `import { x }; export { x }`

### Code Modules

1. __Reserved names__: Cannot use `_.ts`, `__.ts`, `_.test.ts`, `_.test.fixture.ts`
2. __Sibling imports__: Use relative paths (`./sibling.js`)
3. __No self-reference__: Cannot import from own `_.ts` or `__.ts`
4. __Cross-library__: Use configured import method (subpaths, package names)

| Import From          | Allowed | Method               |
| -------------------- | ------- | -------------------- |
| Sibling code modules | ✅      | `./sibling.js`       |
| Subdirectory modules | ✅      | `./subdir/module.js` |
| Other libraries      | ✅      | Context-dependent    |
| Own `_.ts`           | ❌      | -                    |
| Own `__.ts`          | ❌      | -                    |
| Test modules         | ❌      | -                    |

### Test Module (`_.test.ts`)

1. __Imports from `_.ts` only__: `import { Name } from './_.js'`
2. __Uses namespace__: Never destructures the namespace import
3. __No wrapping describe__: File path provides context

### Test Fixtures (`_.test.fixture.ts`)

1. __Imports from `_.ts` only__
2. __Exports `Fx` namespace__: Always named `Fx`, not library name

```typescript
import { Parser } from './_.js'

export namespace Fx {
  export const sampleInput = '...'
  export const expectedTokens = [...]
}
```

## Consumer Usage

### Import the Namespace

```typescript
// ✅ CORRECT - Import namespace
import { Parser } from '#parser'

Parser.tokenize('...')
const ast: Parser.AST = Parser.buildAST(tokens)
```

### Never Destructure

```typescript
// ❌ WRONG - Destructuring from namespace
import { AST, tokenize } from '#parser'

// ✅ CORRECT - Use namespace
import { Parser } from '#parser'
Parser.tokenize('...')
type MyAST = Parser.AST
```

### Type-Only Imports

```typescript
// ✅ CORRECT
import type { Parser } from '#parser'
type Config = Parser.Config

// ❌ WRONG
import type { Config } from '#parser'
```

### Re-exporting

When re-exporting for a public API:

```typescript
// ✅ CORRECT - Import namespace, re-export items
import { Parser } from '#parser'
export type AST = Parser.AST
export const tokenize = Parser.tokenize

// ❌ WRONG - Destructuring on import
export { AST, tokenize } from '#parser'
```

## Naming Conventions

| Element   | Case       | Example           |
| --------- | ---------- | ----------------- |
| Directory | kebab-case | `my-parser/`      |
| Files     | kebab-case | `token-stream.ts` |
| Namespace | PascalCase | `MyParser`        |

## Glossary

| Term             | Definition                                               |
| ---------------- | -------------------------------------------------------- |
| Namespace Module | `_.ts` - Exports the library namespace                   |
| Barrel Module    | `__.ts` - Aggregates exports from code modules           |
| Code Module      | Implementation file (not `_.ts`, `__.ts`, or test files) |
| Test Module      | `_.test.ts` - Public API tests                           |
| Test Fixture     | `_.test.fixture.ts` - Shared test data                   |
