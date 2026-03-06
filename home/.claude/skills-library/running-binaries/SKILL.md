---
name: running-binaries
description: Use when installing global packages, running CLI tools with npm/pnpm/npx, or configuring editor formatters.
---

# Running Binaries

## CRITICAL

__DO NOT assume pnpm and npm CLIs are equivalent for running binaries.__

The matrix is complex and getting it wrong causes subtle failures.

### npm globals must be decoupled from pnpm node versions

pnpm manages node versions via `pnpm env use`. If npm globals are installed to pnpm's node directory, switching node versions breaks your global tools (claude-code, dprint, etc. vanish).

__Solution__: Set npm prefix to a fixed location:

```
# .npmrc
prefix=~/.npm-global
```

This keeps globals at `~/.npm-global/bin/` regardless of which node version pnpm is using.

## References

* [Architecture](./reference/architecture.md) -- PATH order, tool locations, bootstrap flow
* [Resolution Matrix](./reference/resolution-matrix.md) -- exec commands, npx vs pnpm exec, common mistakes, recommendations
