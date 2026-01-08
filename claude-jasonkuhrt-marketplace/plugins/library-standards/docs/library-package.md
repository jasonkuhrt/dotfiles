# Package Library Conventions

Extends [Namespace Module Pattern](./namespace-module.md) for packages where the package IS the library.

## Purpose

When a package's primary purpose is to expose a single library (or small set of exports), the namespace module pattern applies at the package root level rather than in `src/lib/`.

## Single Export Package

The entire package exposes one namespace.

### Location

```
<package>/
├── package.json
├── tsconfig.json
└── src/
    ├── _.ts              # Namespace module
    ├── _.test.ts         # Public API tests
    ├── __.ts             # Barrel (if multiple files)
    └── *.ts              # Code modules
```

### Package.json Exports

```json
{
  "name": "@scope/my-lib",
  "exports": {
    ".": {
      "default": "./build/_.js"
    }
  }
}
```

### Namespace Naming

The namespace name is the PascalCase version of the package name:
- `@scope/my-lib` → `MyLib`
- `@kouka/parser` → `Parser`

### Example

**_.ts**:
```typescript
export * as MyLib from './__.js'
```

**Consumer**:
```typescript
import { MyLib } from '@scope/my-lib'

MyLib.create()
const config: MyLib.Config = { ... }
```

## Multi Export Package

When a package has multiple distinct exports.

### Location

```
<package>/
├── package.json
└── src/
    ├── *.ts              # Code modules
    └── exports/
        ├── _.ts          # Main export namespace
        ├── _.test.ts     # Main export tests
        ├── __.ts         # Main export barrel
        ├── foo.ts        # Additional export
        ├── foo__.ts      # Barrel for foo (if needed)
        └── bar/
            ├── _.ts      # Nested namespace export
            └── qux.ts    # Nested plain export
```

### Package.json Exports

```json
{
  "exports": {
    ".": {
      "default": "./build/exports/_.js"
    },
    "./foo": {
      "default": "./build/exports/foo.js"
    },
    "./bar": {
      "default": "./build/exports/bar/_.js"
    },
    "./bar/qux": {
      "default": "./build/exports/bar/qux.js"
    }
  }
}
```

### Export File Rules

| File | Maps To | Notes |
|------|---------|-------|
| `_.ts` | Parent path | Namespace module |
| `__.ts` | (internal) | Barrel for `_.ts` |
| `index.ts` | Parent path | Plain export (not namespace) |
| `<name>.ts` | `./<name>` | Plain export |
| `<name>__.ts` | (internal) | Barrel for `<name>.ts` |

**Invalid states**:
- Both `index.ts` and `_.ts` in same directory
- Both `<name>.ts` and `<name>_.ts` in same directory

### Consumer Usage

```typescript
// Main namespace export
import { MyLib } from '@scope/my-lib'

// Additional exports
import { foo } from '@scope/my-lib/foo'
import { Bar } from '@scope/my-lib/bar'
import { qux } from '@scope/my-lib/bar/qux'
```

## Monorepo Module Pattern

For monorepos where each package contains multiple modules (like `@kouka/core`).

### Location

```
packages/<pkg>/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts          # Re-exports all modules
    └── <module>/
        ├── _.ts          # Module namespace
        ├── _.test.ts     # Module tests
        ├── __.ts         # Barrel (if multiple files)
        └── *.ts          # Code modules
```

### Package.json

```json
{
  "name": "@kouka/core",
  "imports": {
    "#<module>": "./build/<module>/_.js",
    "#<module>/*": "./build/<module>/*.js"
  },
  "exports": {
    ".": "./build/index.js",
    "./<module>": "./build/<module>/__.js"
  }
}
```

### TSConfig Paths

```json
{
  "compilerOptions": {
    "paths": {
      "#<module>": ["src/<module>/_.ts"],
      "#<module>/*": ["src/<module>/*.ts"]
    }
  }
}
```

### Internal Imports

Within the package, use `#` subpath imports:

```typescript
// In src/compiler/compiler.ts
import { Arr } from '#arr'
import { Str } from '#str'
```

### External Consumers

Import via package exports:

```typescript
import { Arr, Str, Fn } from '@kouka/core'
// or individual modules
import { Arr } from '@kouka/core/arr'
```

## Checklist

### Single Export
- [ ] `_.ts` at `src/_.ts`
- [ ] Package exports `.` pointing to `./build/_.js`
- [ ] Namespace matches PascalCase package name

### Multi Export
- [ ] Export files in `src/exports/`
- [ ] Each namespace export has `_.ts`
- [ ] Package exports match file structure
- [ ] No conflicting `index.ts` + `_.ts`

### Monorepo Module
- [ ] Each module in `src/<module>/`
- [ ] Package.json has `#<module>` imports
- [ ] TSConfig has matching paths
- [ ] Package exports individual modules
