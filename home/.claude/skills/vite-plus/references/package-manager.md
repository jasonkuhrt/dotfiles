# Dependencies And Binaries

Installed docs: `node_modules/vite-plus/docs/guide/install.md`,
`guide/vpx.md`, and the package-manager section of `guide/env.md`.

## Discover The Surface

Plain `vp --help` lists only `install` under package-manager commands. The
expanded help lists the rest:

```bash
vp --help --expand-help
vp <command> --help
```

The global binary also has top-level `list`/`ls` and `rebuild`; from a
workspace shell use `vp pm list` and `vp pm rebuild`.

## Dependency Commands

`vp` delegates to the project's package manager (selection order: `guide/env.md`).
Flags checked against Vite+ 0.3.1 help:

```bash
vp install [--frozen-lockfile] [--lockfile-only] [--filter <pattern>] [-w]
vp add <pkg> [-D] [-E] [--filter <pattern>] [-w] [--save-catalog]
vp remove <pkg> [--filter <pattern>] [-r] [-w]
vp update [<pkg>] [-L] [-r] [--filter <pattern>] [--no-save]
vp dedupe [--check]
vp outdated [-r] [--format table|list|json]
vp why <pkg> [-r] [--json]
vp info <pkg> [<field>] [--json]
vp link [<pkg|dir>]
vp unlink [-r]
```

- `vp install <pkg>` adds packages, like `vp add`.
- Aliases: `install` `i`; `remove` `rm`, `un`, `uninstall`; `update` `up`;
  `why` `explain`; `info` `view`, `show`; `link` `ln`.
- Repository policy (exact pins, catalogs) outranks these defaults.

`vp pm <command>` forwards what Vite+ does not normalize, including `ci`,
`approve-builds`, `patch`/`patch-commit`, `pack`, `list`, `publish`, `stage`,
`owner`, `cache`, `config`, `token`, `audit`, `dist-tag`, `rebuild` and `fund`.

## Running Binaries

| Need                                                   | Command                         |
| ------------------------------------------------------ | ------------------------------- |
| A binary from local deps, downloaded when missing      | `vpx <pkg[@version]> [args...]` |
| A binary from this project's `node_modules/.bin`       | `vp exec <command> [args...]`   |
| A one-off package that is never added as a dependency  | `vp dlx <pkg> [args...]`        |

- `vpx` runs through `vp dlx` when given `pkg@version`, `-p` or `-c`. Both
  take `-p/--package`, `-c/--shell-mode` and `-s/--silent`.
- `vp exec` runs in the current directory when no selector is given. With
  `--filter`, `-r`, `-t` or `-w` it runs once per selected package, from that
  package's directory. More flags: `-c`, `--parallel`, `--reverse`,
  `--resume-from <pkg>`, `--report-summary`.
- A `vp exec --filter` that matches nothing warns and exits 0;
  `--fail-if-no-match` makes it exit 1.
- Do not use `vp exec` for a package's script or task (use
  `vpr <pkg>#<task>`), or to reach a binary the owning package does not
  declare.

## Missing `vp`

If `vp` itself is not installed, report it. Do not fall back to the raw
package manager.
