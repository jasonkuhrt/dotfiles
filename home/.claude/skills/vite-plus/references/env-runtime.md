# `vp env` — Node runtime management

Full installed guide: `node_modules/vite-plus/docs/guide/env.md`. Read it
before making semantic claims; this file is the operational digest.

## The `env` family lives in the GLOBAL binary

`vp` has two CLI surfaces, and only one of them has `env`:

| Surface                | Path                                               | Has `env` family?                               |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------- |
| Global native binary   | `~/.vite-plus/bin/vp` (`VP_HOME/bin`)              | Yes — owns runtime management                   |
| Workspace-local JS CLI | `node_modules/.bin/vp` (vite-plus npm package bin) | No — `vp env` reports `Command 'env' not found` |

In a workspace shell, bare `vp` often resolves to `node_modules/.bin/vp`
(workspace bins get PATH-prepended by direnv setups, manifest scripts, and
CI's expose-workspace-binaries step). A `Command 'env' not found` from that
surface is **PATH evidence, not version evidence** — never conclude the
installed vite-plus version lacks `vp env` from a workspace-shell probe.

Probe the global binary explicitly:

```bash
~/.vite-plus/bin/vp env current
~/.vite-plus/bin/vp env --help
```

Shell integration note: `vp` may also be a shell function (from
`~/.vite-plus/env`) that special-cases `vp env use` to eval its output into
the current session. `type -a vp` shows the full resolution chain.

## Resolution Model

- **Managed mode (default):** `node`, `npm`, `npx` shims in `VP_HOME/bin`
  resolve through Vite+ to the right Node version for the current project.
  When `package.json#packageManager` is set, matching package-manager shims
  use that exact version. `vp env off` switches to system-first mode.
- **Project runtime source:** Vite+ 0.2 resolves `.node-version`, then
  `package.json#devEngines.runtime`, then `package.json#engines.node`, then the
  global default/latest LTS. Pick ONE of these as the project's canonical pin and
  don't mix them — e.g. if the project pins via `devEngines.runtime`, don't also
  add `.node-version`.
- **Session override:** `vp env use <version>` for the current shell
  session. **CI path is first-class:** without shell init, `vp env use`
  writes a session file under `VP_HOME` so later shim calls in the same job
  resolve the selected version.
- **Storage:** runtimes live under `~/.vite-plus/js_runtime/node/<version>/`;
  override the root with `VP_HOME`; mirror with `VP_NODE_DIST_MIRROR`.

## Inspect before claiming

```bash
~/.vite-plus/bin/vp env current        # resolved version + source + tool paths
~/.vite-plus/bin/vp env doctor         # environment diagnostics
~/.vite-plus/bin/vp env which node     # which binary a shim will use
```

`vp env current` names the source and exact tool paths. `vp env current --json`
reports the resolved `"source"` — confirm it matches the project's intended pin
(`.node-version` / `devEngines.runtime` / `engines.node`).

## CI wiring

Use `voidzero-dev/setup-vp` with `node-version-file: package.json` (or the
project's chosen pin source). setup-vp resolves the runtime, installs the global
binary, PATH-prepends `VP_HOME/bin`, then runs `vp env use <resolved version>` —
so the job's `node`/`npm`/`npx` resolve to the project pin end to end. Do not add
bespoke Node provisioning (`setup-node`, manual downloads) next to it.
