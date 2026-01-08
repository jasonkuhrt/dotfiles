# Local Library Conventions

Extends [Namespace Module Pattern](./namespace-module.md) for package-internal libraries.

## Purpose

Local libraries are internal to a package - not published for external consumption. They provide encapsulation and separation of concerns within a package while following patterns that would allow extraction to a standalone package if needed.

## Location

```
<package>/
└── src/
    └── lib/
        └── <library-name>/
            ├── _.ts
            ├── __.ts (if multiple files)
            ├── *.ts (code modules)
            └── _.test.ts
```

## Configuration

### Package.json Imports

Add subpath imports for each library:

```json
{
  "imports": {
    "#~/*": "./build/*",
    "#<name>": "./build/lib/<name>/_.js"
  }
}
```

* `#~/*` — Standard entry allowing imports from package root
* `#<name>` — Per-library entry (kebab-case)

### TSConfig Paths

Mirror the package.json imports for TypeScript:

```json
{
  "compilerOptions": {
    "paths": {
      "#~/*": ["src/*"],
      "#<name>": ["src/lib/<name>/_.ts"]
    }
  }
}
```

## Consumer Rules

### Within the Package

Import via subpath, never relative:

```typescript
// ✅ CORRECT
import { Parser } from '#parser'

// ❌ WRONG
import { Parser } from '../../parser/_.js'
import { Parser } from '../lib/parser/_.js'
```

### Cross-Library Imports

Libraries import other libraries via subpaths:

```typescript
// In src/lib/compiler/compiler.ts
import { Optimizer } from '#optimizer'
import { Parser } from '#parser'
```

### Sibling Imports Within Library

Code modules import siblings via relative paths:

```typescript
// In src/lib/parser/lexer.ts
import { Token } from './tokenizer.js'
import { helpers } from './utils/helpers.js'
```

## Example

### Directory Structure

```
src/lib/parser/
├── _.ts                  # Namespace module
├── _.test.ts             # Public API tests
├── _.test.fixture.ts     # Test fixtures
├── __.ts                 # Barrel module
├── tokenizer.ts          # Tokenization
├── lexer.ts              # Lexical analysis
├── ast.ts                # AST building
└── utils/
    └── helpers.ts        # Internal utilities
```

### File Contents

___.ts__:

```typescript
export * as Parser from './__.js'
```

____.ts__:

```typescript
export { type AST, buildAST, type Node } from './ast.js'
export { lex, type Lexeme } from './lexer.js'
export { type Token, tokenize } from './tokenizer.js'
```

__package.json__ (partial):

```json
{
  "imports": {
    "#~/*": "./build/*",
    "#parser": "./build/lib/parser/_.js"
  }
}
```

__tsconfig.json__ (partial):

```json
{
  "compilerOptions": {
    "paths": {
      "#~/*": ["src/*"],
      "#parser": ["src/lib/parser/_.ts"]
    }
  }
}
```

### Consumer Usage

```typescript
// In src/app/compiler.ts
import { Parser } from '#parser'

const tokens = Parser.tokenize(source)
const ast = Parser.buildAST(Parser.lex(tokens))
```

## Checklist

* [ ] Library in `src/lib/<name>/`
* [ ] Has `_.ts` namespace module
* [ ] Has `__.ts` if multiple implementation files
* [ ] Package.json has `#<name>` import entry
* [ ] TSConfig has matching path entry
* [ ] All consumers use subpath imports
* [ ] Code modules use relative sibling imports
