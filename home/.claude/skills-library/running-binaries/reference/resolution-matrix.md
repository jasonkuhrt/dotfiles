# Binary Resolution Matrix

## Running binaries (exec commands)

| Command           | In project (has package.json)               | Outside project                                     |
| ----------------- | ------------------------------------------- | --------------------------------------------------- |
| `npx <pkg>`       | local node_modules -> npm global -> downloads | npm global -> downloads                              |
| `pnpm exec <pkg>` | local node_modules -> pnpm global            | __FAILS__ with `ERR_PNPM_RECURSIVE_EXEC_NO_PACKAGE` |
| `pnpm dlx <pkg>`  | downloads to temp (ignores local)           | downloads to temp                                   |
| Direct `<pkg>`    | uses PATH                                   | uses PATH                                           |

## Key insight: npx finds pnpm-installed LOCAL packages

`npx` checks `node_modules/.bin/` regardless of which package manager installed them. So in a pnpm project, `npx dprint` finds the local dprint.

## Key insight: npx uses npm's global prefix

npx reads npm's config (`~/.npmrc`) to find globals. With `prefix=~/.npm-global`, npx checks there:

```
npx <cmd>  ->  local node_modules  ->  ~/.npm-global  ->  downloads
```

This is why we use npm (not pnpm) for globals.

## Recommendations

### For global packages

__Use npm with a fixed prefix__:

```bash
# .npmrc sets prefix=~/.npm-global
npm install -g dprint

# Now works everywhere:
npx dprint --version    # finds ~/.npm-global/bin/dprint
dprint --version        # finds via PATH
```

### For editor/tool integration (Zed, VSCode, etc.)

__Option A: npx (recommended)__

```json
{
  "command": "npx",
  "arguments": ["dprint", "fmt", "--stdin", "markdown"]
}
```

Uses local version if in project, falls back to npm global, downloads if needed.

__Option B: Direct PATH call__

```json
{
  "command": "dprint",
  "arguments": ["fmt", "--stdin", "markdown"]
}
```

Works if package is in PATH.

## Common mistakes

### Mistake: npm globals tied to pnpm node version

```bash
# Without fixed prefix, npm installs to pnpm's node directory:
npm install -g dprint  # -> ~/Library/pnpm/nodejs/24.12.0/lib/...

pnpm env use 22        # switch node version
dprint --version       # ERROR: not found (it's in 24.12.0 dir)
```

__Fix__: Set `prefix=~/.npm-global` in .npmrc

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
npx dprint --version   # -> checks local, then global, then downloads
pnpx dprint --version  # -> always downloads (ignores local/global)
```

## Summary table

| Goal                                 | Solution                                          |
| ------------------------------------ | ------------------------------------------------- |
| Run local package in project         | `npx <pkg>` or `pnpm exec <pkg>`                  |
| Run global package anywhere          | Install with `npm -g`, run with `npx` or directly |
| Globals survive node version changes | Set `prefix=~/.npm-global` in .npmrc              |
| Editor formatter                     | `npx <pkg>` (works everywhere)                    |

## References

* [pnpm exec docs](https://pnpm.io/cli/exec)
* [pnpm dlx docs](https://pnpm.io/cli/dlx)
* [pnpm issue #6030](https://github.com/pnpm/pnpm/issues/6030) - exec fails outside workspaces
* [npm prefix config](https://docs.npmjs.com/cli/v10/using-npm/config#prefix)
