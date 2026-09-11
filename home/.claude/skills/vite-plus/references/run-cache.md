# `vp run` And Vite Task Caching

Installed docs: `node_modules/vite-plus/docs/guide/run.md`, `config/run.md`,
`guide/cache.md`, `guide/automatic-data-tracking.md`,
`guide/github-actions-cache.md`. Checked on Vite+ 0.3.1, which pins vite-task
`d05b1dc`.

## Selecting Packages

```bash
vp run build                    # the package containing the current directory
vp run -r build                 # every package that defines it, in dependency order
vp run -t @my/app#build         # the package and its transitive dependencies
vp run -w build                 # the workspace root package
vp run --filter "@my/*" build   # pnpm filter syntax
vpr @my/app#build               # one package; vpr is vp run
```

- Filters: name or glob, `./dir`, `{dir}`, `pkg...` (with dependencies),
  `...pkg` (with dependents), `pkg^...` (dependencies only), `!pkg`. Several
  `--filter` flags form a union; exclusions apply last.
- `-t` cannot be combined with `-r` or `--filter`
  (`crates/vt_workspace/src/package_filter.rs:218-222`).
- Without a task name, `vp run` opens an interactive selector.

A selection that matches nothing:

| Selection                               | Default           | With `--fail-if-no-match` |
| --------------------------------------- | ----------------- | ------------------------- |
| `--filter` matching no package          | message, exit 0   | error, exit 1             |
| `<pkg>#<task>` with an unknown package  | no output, exit 0 | no output, exit 0         |
| `<pkg>#<task>` with an unknown task     | error, exit 1     | error, exit 1             |

Run control: `-v` (execution summary), `--last-details` (the previous run's
summary), `--log interleaved|labeled|grouped`, `--concurrency-limit <n>`
(default 4, or `VP_RUN_CONCURRENCY_LIMIT`; the flag wins), `--parallel`
(ignores ordering, unlimited unless limited), `--ignore-depends-on`, `--cache`,
`--no-cache`.

Flags before the task specifier belong to `vp run`; everything after it is
passed to the task command.

## Task Definitions

Tasks live under `run.tasks` in a package's `vite.config.ts`. A name cannot be
both a task and a `package.json` script.

```ts
tasks: {
  build: 'vp build',                // shorthand
  check: ['vp lint', 'vp build'],   // two commands, in order
  deploy: {
    command: 'deploy-script --prod',
    dependsOn: ['build', '@my/core#build', { task: 'build', from: 'dependencies' }],
    cache: false,
  },
}
```

- An array runs its commands in order, like `&&`. It is not an argv list:
  `['vp', 'build']` runs `vp`, then `build`.
- Object fields: `command`, `dependsOn`, `cache`, `env`, `untrackedEnv`,
  `input`, `output`, `cwd` (relative to the package root).
- `{ task, from }` runs `task` in each direct dependency that defines it;
  `from` takes `dependencies`, `devDependencies`, `peerDependencies`, or an
  array of them.
- `&&` chains and arrays split into independently cached sub-tasks.
- `run.enablePrePostScripts` (root config only, default `true`) runs
  `preX`/`postX` scripts around script `X`.

### `dependsOn` Or Nested `vp run`

`dependsOn` builds one flat graph, so a task shared by several dependents runs
once. A `vp run` inside a command is expanded into tasks (flat output,
per-sub-task caching), but each nested invocation is isolated from its
siblings, like nested `pnpm run`: two nested runs that both need a prerequisite
both execute it, possibly at the same time
([vite-task#323](https://github.com/voidzero-dev/vite-task/issues/323#issuecomment-4242689629)).
Put shared prerequisites in `dependsOn`. A root `vp run -r <task>` that would
include itself is pruned.

## Cache Enablement And Keys

- Tasks are cached by default; scripts are not. Precedence: a task's
  `cache: false`, then `--cache` or `--no-cache`, then the root `run.cache`
  (`boolean` or `{ tasks, scripts }`, default `{ tasks: true, scripts: false }`).
- A task hits when its command and arguments, fingerprinted env and inputs are
  unchanged. A hit replays the terminal output, restores output files and skips
  the command. Only exit code 0 saves an entry.
- A miss prints its reason: `'src/x.ts' modified`, `env 'NODE_ENV' changed`,
  `args changed`.
- Entries are content-based: the same command over the same inputs shares one
  entry across tasks and scripts.
- The store is `node_modules/.vite/task-cache` at the workspace root.
  `vp cache clean` deletes it. Entries are never evicted by age or size.

Built-in commands inside a task are rewritten to direct tool calls
(`packages/cli/binding/src/cli/resolver.rs` in v0.3.1):

- `vp lint` becomes `node <lint JS entry> …`, with `-c <vite config>` added
  when the config has a `lint` block, and fingerprints `OXLINT_TSGOLINT_PATH`.
- `vp fmt` becomes `node <fmt JS entry> …`, with `-c <vite config>` added when
  the config has a `fmt` block.
- `vp test` becomes `node <test JS entry> run …`. `run` is added unless a
  subcommand, help, watch flag or `--run` is present.
- `vp build` becomes `node <vite JS entry> build …` and reports its own
  tracking.

## Input And Output Tracking

- `input` defaults to `[{ auto: true }]`: files the command reads, missing
  files it probes, and directories it lists. `output` defaults to the files the
  command writes.
- Entries: package-relative globs, `!` exclusions, `{ auto: true }`, and
  `{ pattern, base: 'package' | 'workspace' }` (`base` is required).
- A list without `{ auto: true }` replaces tracking, so it must name the full
  set. `input: []` keys only on command and env. `output: []` restores nothing
  but still replays the log.
- `vp build` reports `VITE_*`, `NODE_ENV`, its outputs and temp-path
  exclusions; do not repeat them. Other tools can report through
  `@voidzero-dev/vite-task-client`.
- Exclude files the task itself rewrites (build info, tool caches, generated
  output) from `input`, or the next run misses. Adding or removing a file in a
  listed directory invalidates too, so broad scans make broad keys.

```ts
input: [{ auto: true }, '!**/*.tsbuildinfo', '!dist/**'],
output: [{ auto: true }, '!*.tsbuildinfo'],
```

## Environment

Tasks run in a cleaned environment. Vite Task passes these without
fingerprinting them (`crates/vt_graph/src/config/mod.rs:398-481`); the docs
list only some:

- system: `HOME`, `USER`, `TZ`, `LANG`, `SHELL`, `PWD`, `PATH`, `TMP`, `TEMP`,
  `DISPLAY`, and XDG, library-path and Windows system variables;
- Node.js: `NODE_OPTIONS`, `COREPACK_*`, `NPM_CONFIG_STORE_DIR`, `PNPM_HOME`;
- CI and platforms: `CI`, `GITHUB_*`, `RUNNER_*`, `VERCEL`, `VERCEL_*`,
  `NEXT_*`, `DOCKER_*`, `BUILDKIT_*`, `COMPOSE_*`, `PLAYWRIGHT_*`;
- editors: `VSCODE_*`, `JB_IDE_*`, `ELECTRON_RUN_AS_NODE`;
- `VP_*` and every `*_TOKEN`.

Color variables (`FORCE_COLOR`, `NO_COLOR`, `COLORTERM`, `TERM`,
`TERM_PROGRAM`) are withheld unless listed; `FORCE_COLOR=1` is set when nothing
provides it.

- `env` passes a variable and fingerprints it; `untrackedEnv` only passes it.
  Both accept `PREFIX_*` and `!NAME`.
- Execution knobs that do not change the result (worker counts, concurrency,
  reporter or log modes) belong in `untrackedEnv`:

```ts
tasks: {
  test: {
    command: 'vp test run --maxWorkers "${TEST_WORKERS:-4}"',
    untrackedEnv: ['TEST_WORKERS'],
  },
}
```

## Tasks That Compute A Diff

A task that resolves a diff must fingerprint its base, head, dirty and index
state and relevant environment, or stay uncached. Alternatively, resolve the
scope outside the cached task and hand execution a canonical selection that
contains every behavior-relevant input. Fingerprint that selection and the
sources it consumes; discovery commit IDs stop mattering once they no longer
affect execution. For large selections, write a stable workspace-relative file
that the cached process reads, so file tracking fingerprints its bytes without
argv limits, and do not exclude that file from inputs.

## CI

- Use `voidzero-dev/setup-vp` pinned to an exact release or commit SHA; the
  `v1` tag no longer receives updates. On GitHub Actions it sets up Node.js and
  the package manager, and `cache: true` caches package-manager data.
- Reusing task results across CI runs is experimental and needs its own cache
  step. First prove an immediate local second run hits. Restore
  `node_modules/.vite/task-cache` after `vp install`, with a per-run key and an
  OS and architecture restore prefix:

```yaml
key: vite-task-${{ runner.os }}-${{ runner.arch }}-${{ github.run_id }}-${{ github.run_attempt }}
restore-keys: |
  vite-task-${{ runner.os }}-${{ runner.arch }}-
```

- Keep task inputs, lockfiles included, out of that key; Vite Task fingerprints
  them. Weigh restore and save time against the time saved, and manage size at
  the Actions cache layer.
- In CI, run the same `vp run` commands developers use, such as
  `vp run -t @my/app#build`; call domain commands directly for direct tool work.
