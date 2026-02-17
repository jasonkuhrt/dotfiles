---
name: package-manager
description: Use when resolving merge conflicts in lock files, choosing between workspace root deps vs overrides, or aligning dependency versions across monorepo packages.
---

# Package Manager

## Lock File Conflict Resolution

**NEVER use git checkout tricks** to resolve lock file conflicts. This discards dependency intent from the other branch.

```bash
# WRONG - discards the other branch's dependency changes
git checkout --theirs package-lock.json && npm install
git checkout --ours pnpm-lock.yaml && pnpm install
```

Instead, regenerate the lock file from the merged `package.json`:

| Manager | Command |
|---------|---------|
| npm | `npm install --package-lock-only` |
| pnpm | `pnpm install --lockfile-only` |
| yarn | `yarn install --mode update-lockfile` |

These commands resolve the lock file from the merged dependency declarations without modifying `node_modules`.

## Monorepo: Overrides vs Root Deps

Runtime dependencies belong in each package's own `package.json`, not at the workspace root. Each package must be self-contained for extraction, publishing, and `pnpm deploy`.

### When to Use Each Approach

| Use case | Solution |
|----------|----------|
| Runtime deps (react, lodash) | Declare in each package, override for version alignment |
| Type defs (@types/*) | Root devDeps (dev-only, hoisting is fine) |
| Tooling (typescript, prettier) | Root devDeps (shared workspace tooling) |

### Overrides for Version Alignment

Use overrides when transitive or peer deps pull in conflicting versions:

```jsonc
// npm (package.json)
{ "overrides": { "@types/react": "$@types/react" } }

// pnpm (package.json)
{ "pnpm": { "overrides": { "@types/react": "$@types/react" } } }

// yarn (package.json)
{ "resolutions": { "@types/react": "$@types/react" } }
```

The `$` syntax pins the override to the version declared in the root `package.json`, keeping a single source of truth.
