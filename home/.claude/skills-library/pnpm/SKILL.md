---
name: pnpm
description: Use when running pnpm commands, configuring workspaces, or executing parallel scripts.
---

# pnpm

## Environment

Use `pnpm runtime` for Node version management (not nvm): `pnpm runtime set node lts -g` sets the
global node. `pnpm env` is deprecated in pnpm 12.

## Parallel Scripts

**CRITICAL:** To run multiple scripts in parallel, use pattern matching:

```bash
pnpm run '/pattern/'
```

Example: `pnpm run '/docs:dev:.*/'` runs all matching scripts concurrently.

**NEVER use `--parallel` flag** - it's only for workspace packages, not for running multiple scripts in a single package.
