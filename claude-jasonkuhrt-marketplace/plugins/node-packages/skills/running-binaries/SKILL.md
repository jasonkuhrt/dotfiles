---
name: running-binaries
description: How to run Node.js package binaries with npm/pnpm/npx. Use when installing global packages, running CLI tools, or configuring editor formatters.
---

# Running Binaries

## CRITICAL

**DO NOT assume pnpm and npm CLIs are equivalent for running binaries.**

The matrix is complex and getting it wrong causes subtle failures.

## The Matrix

### Running binaries (exec commands)

| Command | In project (has package.json) | Outside project |
|---------|-------------------------------|-----------------|
| `npx <pkg>` | local node_modules → npm global → downloads | downloads (slow) |
| `pnpm exec <pkg>` | local node_modules → pnpm global | **FAILS** with `ERR_PNPM_RECURSIVE_EXEC_NO_PACKAGE` |
| `pnpm dlx <pkg>` | downloads to temp (ignores local) | downloads to temp |
| Direct `<pkg>` | uses PATH | uses PATH |

### Key insight: npx finds pnpm-installed LOCAL packages

`npx` checks `node_modules/.bin/` regardless of which package manager installed them. So in a pnpm project, `npx dprint` finds the local dprint.

### Key insight: npx does NOT find pnpm GLOBAL packages

npx only checks npm's global location, not pnpm's:
- npm global: `$(npm root -g)/../bin/`
- pnpm global: `~/Library/pnpm/` (macOS)

These are different directories. npx ignores pnpm globals.

## Recommendations

### For global packages you run via npx

**Use npm for global installs**, not pnpm:

```bash
# Good: npx will find this
npm install -g dprint

# Bad: npx won't find this outside projects
pnpm add -g dprint
```

This gives you npx's fallback chain: local → npm global → download

### For global packages you run directly

Either works - both add to PATH:

```bash
npm install -g <pkg>
# or
pnpm add -g <pkg>
```

Then call directly: `dprint fmt ...`

### For editor/tool integration (Zed, VSCode, etc.)

**Option A: Direct PATH call (simplest)**
```json
{
  "command": "dprint",
  "arguments": ["fmt", "--stdin", "markdown"]
}
```
Works if package is in PATH (from any global install).

**Option B: npx for local-first with fallback**
```json
{
  "command": "npx",
  "arguments": ["dprint", "fmt", "--stdin", "markdown"]
}
```
Uses local version if in project, downloads otherwise.

**Option C: Wrapper script for local-first without download**

When you want local → global (no download), use a wrapper:

```bash
#!/bin/bash
# Check for local binary first
if [[ -x "./node_modules/.bin/$1" ]]; then
  exec "./node_modules/.bin/$@"
fi
# Fall back to global (in PATH)
exec "$@"
```

## Common mistakes

### Mistake: Assuming pnpm exec works everywhere

```bash
# In project: works
cd my-project && pnpm exec dprint --version

# Outside project: FAILS
cd /tmp && pnpm exec dprint --version
# ERR_PNPM_RECURSIVE_EXEC_NO_PACKAGE
```

### Mistake: Assuming pnpx = npx

`pnpx` (alias for `pnpm dlx`) always downloads to temp. It does NOT check local or global.

```bash
# npx: checks local first
npx dprint --version  # → uses local 0.50.2

# pnpx: downloads fresh
pnpx dprint --version  # → downloads latest, ignores local
```

### Mistake: Using pnpm globals with npx

```bash
pnpm add -g dprint  # Installs to ~/Library/pnpm/
npx dprint          # Won't find it, downloads instead
```

## Summary table

| Goal | Solution |
|------|----------|
| Run local package in project | `npx <pkg>` or `pnpm exec <pkg>` |
| Run global package anywhere | Install with `npm -g`, run with `npx` or directly |
| Local-first, global fallback, no download | Wrapper script |
| Editor formatter (simple) | Direct call via PATH |
| Editor formatter (local-preferred) | Wrapper script |

## References

- [pnpm exec docs](https://pnpm.io/cli/exec)
- [pnpm dlx docs](https://pnpm.io/cli/dlx)
- [pnpm issue #6030](https://github.com/pnpm/pnpm/issues/6030) - exec fails outside workspaces
- [pnpm issue #8635](https://github.com/pnpm/pnpm/issues/8635) - exec/dlx fallback behavior
