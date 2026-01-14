# Library Standards Plugin

Enforces library structure conventions for TypeScript projects using the `_.ts`/`__.ts` namespace pattern.

## Features

### Hooks

* __validate-namespace-module__: Validates `_.ts` files after edits
* __validate-barrel-module__: Validates `__.ts` files after edits

### Skills

* __creating-libraries__: Guides creation of new libraries with correct structure
* __auditing-libraries__: Audits existing libraries for convention violations

## Conventions Enforced

See `~/.claude/docs/conventions/` for full documentation:

* `namespace-module.md` - Core `_.ts`/`__.ts` pattern (abstract)
* `library-local.md` - Local library context (`src/lib/`)
* `library-package.md` - Package-level context

## Key Rules

1. `_.ts` (Namespace Module) must either:
   * Export namespace from barrel: `export * as Name from './__.js'`
   * Export from single implementation: `export * as Name from './<name>.js'`

2. `__.ts` (Barrel Module) must:
   * Only contain re-exports from code modules
   * Never import from `_.ts`

3. Code modules cannot import from own `_.ts` or `__.ts`

4. Test files (`_.test.ts`) import only from `_.ts`
