# Vite+ Package Manager And Binary Surfaces

## Contents

- Evidence routine
- Dependency commands
- Inspection and maintenance commands
- `vp dlx`
- `vp exec`
- `vp pm`
- Bootstrap caveat

## Evidence Routine

For package-manager work, use expanded help:

```bash
vp --help --expand-help
vp <command> --help
```

Plain `vp --help` may omit implemented package-manager commands.

## Dependency Commands

`vp install`, `vp add`, `vp remove`, and `vp update` delegate through the
package manager declared by the project and expose workspace filters:

```bash
vp install
vp install --frozen-lockfile
vp install --filter <pattern>
vp install -w
vp add -D <package>
vp add --filter <package-or-dir> <dependency>
vp add --save-catalog <dependency>
vp remove --filter <package-or-dir> <dependency>
vp remove -r <dependency>
vp update -r --filter <package-or-dir> <dependency>
vp update --latest <dependency>
```

Use the repo's package-management policy when it is stricter than generic
Vite+ guidance.

## Inspection And Maintenance Commands

Expanded help exposes additional normalized package-manager commands:

```bash
vp dedupe --check
vp dedupe
vp outdated -r --format json
vp why -r <package>
vp info <package>
vp info <package> version --json
vp link <dir>
vp unlink <package>
vp unlink -r <package>
```

Aliases include:

- `remove`: `rm`, `un`, `uninstall`
- `update`: `up`
- `why`: `explain`
- `info`: `view`, `show`
- `link`: `ln`

## `vp dlx`

Use `vp dlx` for one-off registry package binaries:

```bash
vp dlx <package> <args>
vp dlx --package <name> <command> <args>
vp dlx --shell-mode '<command>'
```

Do not teach a reflexive bare `--` here; installed help models arguments as
`<ARGS>...`.

## `vp exec`

Use `vp exec` for genuine local dependency-bin execution:

```bash
vp exec node --version
vp exec --filter @scope/app local-bin --flag
vp exec --filter @scope/app -- local-bin --flag
vp exec -r -- local-bin --flag
vp exec -c 'local-bin --flag && another-bin'
```

`vp exec` is `vp exec [OPTIONS] [COMMAND]...`; there is no separate `<bin>`
parameter. The first command token is the executable, and the remaining tokens
are its argv. A `--` separator is optional when the command starts with a normal
token, but use it as an explicit boundary in generated commands or when the
forwarded command could be parsed as a `vp exec` option.

`vp exec` supports package selection through exec-specific filters.
Without a package selector, the command runs in the caller's current directory.
With `--filter`, `-r`, `-t`, or `-w`, the command runs once per selected package
from that package's directory.

In 0.2.x, `vp exec --fail-if-no-match` exits non-zero when a filter matches no
package (verified: exit 1) — the earlier exit-0 bug is fixed. Do not use
`vp exec` as the package script/task route; use `vpr <package>#<script-or-task>`
for that.

Do not use `vp exec` when a Vite+ domain command exists. Do not use it to
bypass repo dependency ownership rules; verify the owning package declares the
bin dependency in the correct manifest.

## `vp pm`

Use `vp pm <command>` as the explicit package-manager forwarding surface for
subcommands that Vite+ does not normalize:

```bash
vp pm list
vp pm publish
vp pm audit
vp pm config get registry
vp pm cache
vp pm stage list
```

`vp pm` exposes registry, publish, owner, token, audit, cache, rebuild, funding,
and staged-publishing surfaces.

## Bootstrap Caveat

`vp install` is the Vite+ dependency command. If the global `vp` binary itself
is unavailable, surface that bootstrap problem to the user instead of working
around the repo hook layer with a raw package-manager binary. Return to bare
`vp ...` immediately after the user repairs the missing global binary.
