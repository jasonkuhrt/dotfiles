# Architecture

```
+-----------------------------------------------------------------+
| PATH order (first wins)                                         |
+-----------------------------------------------------------------+
| ~/.npm-global/bin      <- npm globals (claude, dprint, nx, etc) |
| ~/Library/pnpm         <- pnpm binaries (node, npm, pnpm)      |
| /opt/homebrew/bin      <- brew (fallback node, initial pnpm)    |
+-----------------------------------------------------------------+
```

| Tool     | Manages                         | Location                                  |
| -------- | ------------------------------- | ----------------------------------------- |
| Homebrew | Initial bootstrap (node + pnpm) | `/opt/homebrew/bin`                       |
| pnpm     | Node versions (`pnpm env use`)  | `~/Library/pnpm/nodejs/<ver>`             |
| npm      | Global CLI tools                | `~/.npm-global` (fixed, version-agnostic) |

## Bootstrap flow (fresh machine)

1. `brew install node pnpm` -- initial node + pnpm
2. `pnpm env use --global lts` -- pnpm installs its own node, shadows brew's
3. Install npm globals to `~/.npm-global`

After bootstrap, brew's node is effectively unused (pnpm's comes first in PATH).
