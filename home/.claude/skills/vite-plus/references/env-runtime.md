# `vp env`: Node.js And Package-Manager Versions

Installed docs: `node_modules/vite-plus/docs/guide/env.md`, `guide/upgrade.md`,
`guide/installer-env-vars.md`.

## Global Binary Only

`vp env`, `vp node`, `vp upgrade` and `vp implode` appear only in the global
`vp`. The workspace-local CLI answers `vp env` with "The `env` command is only
available in the global `vp` CLI"; that is PATH evidence, not a missing
feature.

- Fresh installs keep executables in `~/.local/share/vite-plus/bin` (Windows:
  `%LOCALAPPDATA%\vite-plus\bin`). Existing `~/.vite-plus` installs are not
  moved. `VP_HOME` puts everything under one root.
- `type -a vp` shows which `vp` answers. Shell setup wraps `vp` in a function
  so `vp env use` can change the current shell.

## Resolution

Node.js: the nearest directory, walking up, that declares a version wins.
Within one directory the order is `.node-version`, `devEngines.runtime`,
`engines.node`, `.nvmrc`. With no declaration, Vite+ uses `vp env default`,
then the latest LTS. `vp env doctor` warns when declared sources conflict;
keep one canonical pin.

Package manager: an explicit override, then `VP_PACKAGE_MANAGER` or a session
override, `packageManager`, `devEngines.packageManager`, the lockfile or
manager config, the manager's global default, and finally its latest release.

`vp env on` makes shims always use managed Node.js. `vp env off` prefers the
system Node.js and falls back to managed.

## Inspect

```bash
vp env current --json     # node and package_manager, each with its source
vp env which node
vp env list
vp env list-remote --lts
vp env doctor
vp toolchain --global     # tool versions of the global release
```

## Change

```bash
vp env pin 22 --target node-version   # or dev-engines, package-manager
vp env unpin
vp env use 22 pnpm@10                 # this shell session; --unset clears it
vp env exec --node lts --package-manager pnpm@10 pnpm install
vp node script.js
```

`VP_NODE_DIST_MIRROR` points Node.js downloads at a mirror.

## CI

The `voidzero-dev/setup-vp` GitHub Action installs Vite+, Node.js and the
package manager, so jobs need no separate `setup-node` or package-manager
setup (its GitLab template expects Node.js from the job image). Without shell
initialization, `vp env use` writes a session file that later shim calls in
the same job read.

## pnpm Also Managing Node.js

pnpm can manage `devEngines.runtime` too, so pnpm and Vite+ can download or
select different versions. To let Vite+ own Node.js on pnpm 11+, run
`pnpm config set --global runtimeOnFail ignore`; this also stops pnpm managing
Bun and Deno runtimes.
