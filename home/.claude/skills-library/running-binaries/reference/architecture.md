# Architecture

```
+-----------------------------------------------------------------+
| PATH order (first wins)                                         |
+-----------------------------------------------------------------+
| ~/.npm-global/bin      <- npm globals (claude, dprint, nx, etc) |
| ~/Library/pnpm/bin     <- pnpm, and pnpm's node runtime shim  |
| /opt/homebrew/bin      <- brew (fallback node, first npm)       |
+-----------------------------------------------------------------+
```

| Tool     | Manages                         | Location                                  |
| -------- | ------------------------------- | ----------------------------------------- |
| Homebrew | Fallback node, fresh-machine npm | `/opt/homebrew/bin`                      |
| pnpm     | Node versions (`pnpm runtime`)  | `~/Library/pnpm/bin` (shim to global runtime) |
| npm      | Global CLI tools                | `~/.npm-global` (fixed, version-agnostic) |

## Bootstrap flow (fresh machine)

1. `curl -fsSL https://get.pnpm.io/install.sh | sh -` -- pnpm (native, needs no node)
2. `pnpm runtime set node lts -g` -- pnpm installs its own node, shadows brew's
3. Install npm globals to `~/.npm-global`

After bootstrap, brew's node is effectively unused (pnpm's comes first in PATH).
