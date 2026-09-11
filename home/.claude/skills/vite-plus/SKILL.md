---
name: vite-plus
description: Use when running, choosing, debugging, or documenting Vite+ `vp`, `vpr` or `vpx` commands — tests, lint, fmt, check, build, pack, dev, `vp run` tasks and their cache hits or misses, workspace filters, argument forwarding, dependency commands, `vp env` runtimes, git hooks and staged checks, scaffolding or migration, CI setup, or agent rules in a Vite+ project; also when a filtered `vp run` did nothing, a task never replays, or `vp env` says it is only available in the global CLI.
---

# Vite+

Vite+ puts Vite, Vitest, Oxlint, Oxfmt, tsdown, Rolldown and Vite Task behind
one CLI, `vp`. The installed release is the authority: its `--help` output and
the docs bundled at `node_modules/vite-plus/docs/` describe that exact version.
This skill routes to them and records verified behavior they leave out. It was
checked against Vite+ 0.3.1. When it disagrees with the installed help or docs,
follow them and fix this skill.

## Evidence First

```bash
vp toolchain              # active Vite+ release and bundled tool versions
vp --help --expand-help   # every local command, including package-manager ones
vp <command> --help       # flags for the installed version
type -a vp                # which vp answers
```

Two CLIs answer to `vp`. The global binary adds `env`, `node`, `upgrade` and
`implode`; the workspace-local CLI (`node_modules/.bin/vp`) rejects `vp env`. A
missing command in a workspace shell is PATH evidence, not version evidence
(`references/env-runtime.md`).

Docs to read, under `node_modules/vite-plus/docs/`:

| Question                                        | Page                                                          |
| ----------------------------------------------- | ------------------------------------------------------------- |
| Built-in command or same-named script           | `guide/run.md`, `guide/troubleshooting.md`                    |
| `vp run`, filters, `dependsOn`, concurrency     | `guide/run.md`, `config/run.md`                               |
| Cache hits and misses, `input`, `output`, `env` | `guide/cache.md`, `guide/automatic-data-tracking.md`          |
| CI setup, task cache in CI                      | `guide/ci.md`, `guide/github-actions-cache.md`                |
| Root config, `-C`, `defaultPackage`             | `guide/monorepo.md`, `config/index.md`                        |
| Test, lint, fmt, check, build, pack, dev        | `guide/<command>.md`, plus `config/<command>.md` if present   |
| Dependencies, `vpx`, `vp exec`, `vp dlx`        | `guide/install.md`, `guide/vpx.md`                            |
| Git hooks, staged checks                        | `guide/commit-hooks.md`, `config/staged.md`                   |
| Node.js and package-manager versions            | `guide/env.md`                                                |
| Create, migrate, upgrade                        | `guide/create.md`, `guide/migrate.md`, `guide/upgrade.md`     |

## Choose The Surface

`vp <command>` runs a built-in tool. `vp run <name>` (or `vpr`) runs a
`vite.config.ts` task or a `package.json` script. A script never replaces a
built-in: with `"dev": "astro dev"`, `vp dev` still starts Vite and
`vp run dev` starts Astro.

- Direct tool work (a path, one test file or case, `list`, `watch`, `--fix`,
  debugging) uses the domain command.
- A task that owns prerequisites, env, caching or a different tool runs as
  `vpr <pkg>#<task>`. Read the task before choosing.

| Work                                    | Command                                                       |
| --------------------------------------- | ------------------------------------------------------------- |
| Tests                                   | `vp test run`, `watch`, `list`, `related`                     |
| Lint, format, both plus type checks     | `vp lint`, `vp fmt` (`vp format`), `vp check`                 |
| Vite app                                | `vp dev`, `vp build`, `vp preview`                            |
| Library or executable                   | `vp pack`                                                     |
| Task or script                          | `vp run <task>`, `vpr <pkg>#<task>`                           |
| Task cache                              | `vp cache clean`                                              |
| Dependencies                            | `vp install`, `add`, `remove`, `update`, `vp pm <command>`    |
| Binaries                                | `vpx`, `vp exec`, `vp dlx`                                    |
| Git hooks, staged checks, agent files   | `vp hooks`, `vp staged`, `vp config`                          |
| Node.js and package-manager versions    | `vp env`, `vp node` (global binary)                           |
| Scaffold, migrate, update Vite+         | `vp create`, `vp migrate`, `vp upgrade`                       |
| Tool versions                           | `vp toolchain`                                                |

In a Vite+ project, do not run `vitest`, `oxlint`, `oxfmt`, `vite`, `tsdown` or
the package manager directly, and make scripts call the `vp` form
(`"test": "vp test run"`). A raw tool is an escape hatch only after
`vp <command> --help` shows the operation is missing; say so where you use it.

## Verified Traps

Each was reproduced on Vite+ 0.3.1 or read in its source. Details:
`references/run-cache.md`.

- `vp run <pkg>#<task>` with a package name that matches nothing prints nothing
  and exits 0, even with `--fail-if-no-match`; that flag covers `--filter`
  only. An unknown task in an existing package does fail. Confirm the output
  names the task you meant.
- `vp run` flags go before the task specifier; everything after it is passed to
  the task. Write `vpr -v @scope/app#test`, not `vpr @scope/app#test -v`.
- `-t` cannot be combined with `-r` or `--filter`.
- A nested `vp run` inside a command is inlined, but isolated from its siblings,
  so a shared prerequisite can run twice, even concurrently. Only `dependsOn`
  deduplicates.
- A cache hit restores the files the task wrote unless `output` says otherwise.
  `output: []` restores nothing and still replays the log.
- Tasks receive `CI`, `GITHUB_*`, `RUNNER_*`, `NODE_OPTIONS`, `VP_*`, `*_TOKEN`
  and more without any config, so listing them in `untrackedEnv` does nothing.
  Color variables are withheld and `FORCE_COLOR=1` is set.
- A task that runs plain `vp build` needs no `input`, `output` or `env`; Vite
  reports them itself.
- Inside a task, `vp test` gets `run` prepended, so it never starts watch mode
  unless a subcommand or watch flag says so.
- `vp check` runs type checks only with `lint.options.typeCheck` and type-aware
  rules only with `lint.options.typeAware`. tsgolint does not support a
  tsconfig `baseUrl`; when `vp migrate` cannot remove it, both stay off.
- `vp lint` prints nothing on a clean run, and with
  `--no-error-on-unmatched-pattern` a run that matched no files looks the same.
  Add `--format=github` when the file count is the proof. In GitHub Actions,
  oxlint switches to the GitHub reporter by itself.
- A bare `--` before a Vitest file filter stops the filter from applying:
  `vp test list --filesOnly -- <file>` lists other files too.
- `vp dev`, `vp build`, `vp preview` and `vp pack` at a workspace root pick a
  package, or exit 1 in a non-interactive shell. Use `vp -C <dir> <command>`.
- `VP_GIT_HOOKS=0` skips hooks. `VITE_GIT_HOOKS` is the legacy name.

## Tests

- From the workspace root: `vp test run --project <name> <filter>`. From the
  package directory: `vp test run <filter>`. A positional filter matches every
  test file whose path contains it; `-t <pattern>` filters by test name.
- `--root` changes Vitest's root. Follow the repository's rule before using it
  to target a package; Heartbeat forbids it.
- When a package `test` task owns generation or cached verdicts, run it as
  `vpr <pkg>#test`. Use `vp test` directly for one file, one case, `list` or
  `watch` once those prerequisites exist.

## References

- `references/run-cache.md`: package selection, task config, graphs, caching,
  tracking, environment, CI task cache.
- `references/package-manager.md`: dependency commands, `vpx`, `vp exec`,
  `vp dlx`, `vp pm`.
- `references/staged-config.md`: `vp hooks`, `vp config`, `vp staged`, agent
  instruction files.
- `references/pack.md`: `vp pack` targeting, package-quality flags,
  executables.
- `references/create-migrate.md`: templates, local generators, `vp migrate`.
- `references/env-runtime.md`: `vp env`, runtime and package-manager
  resolution, CI runtime.

## Answering

A `vp` recommendation names the surface (domain command or task), gives the
exact command, says in one sentence what it targets, and cites the help line,
doc page or config it rests on. Before sending it, check that:

- the installed help or docs back every flag and behavior it claims;
- flags sit before the task specifier, and arguments after it are meant for the
  task;
- the run output rules out a selector that matched nothing;
- cache claims account for task or script, `env` and `untrackedEnv`, `input`
  and `output`, and what file tracking can observe;
- a task that computes a diff fingerprints its base, head and dirty state, or
  receives its selection from outside (`references/run-cache.md`).
