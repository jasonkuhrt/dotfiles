# Vite Task, `vp run`, Filters, And Cache

## Contents

- `vp run` planning model
- Argument forwarding
- Workspace filters
- Task definitions
- Cache enablement
- Cache key and replay
- Automatic file tracking
- Environment model
- CI design

## `vp run` Planning Model

`vp run` has three stages:

1. Package selection.
2. Task/script selection inside selected packages.
3. Execution graph planning, including package dependency order and explicit
   `dependsOn` edges.

Package selection examples:

```bash
vp run build                                      # package containing cwd
vp run -w build                                   # workspace root package
vp run -r build                                   # every workspace package with build
vp run -t build                                   # current package plus dependencies
vpr @scope/app#build                              # selected package script/task
```

Running `vp run` without a task name opens an interactive task selector.
Agents should avoid that in unattended workflows; choose an explicit task.

A `<pkg>#<task>` specifier or `--filter <pattern>` that matches no package exits
0 by default; add `--fail-if-no-match` to exit non-zero instead. In 0.2.x this
works on both `vp run` and `vp exec` (verified: exit 1 on no match). An unknown
task inside an existing package fails loudly. Confirm a filtered run actually
executed before trusting the exit code.

Useful control/debug flags:

```bash
vp run --last-details
vpr --log grouped @scope/app#test
vp run --concurrency-limit 2 -r build
vpr --ignore-depends-on @scope/app#build
vp run --parallel -r build
```

`--parallel` disables dependency ordering and makes concurrency unlimited unless
`--concurrency-limit` is also set. Use it only when order is irrelevant.

## Argument Forwarding

For `vp run`, flags before the task name belong to `vp run`; tokens after the
task name are forwarded to the task process.

```bash
vpr @scope/app#test
vpr @scope/app#test --reporter verbose
```

Do not put debug/control flags after the task name unless the underlying task
should receive them:

```bash
vpr -v @scope/app#test
vpr @scope/app#test -v
```

Bare `--` is not a universal safety marker. In Vitest file targeting, it can
become part of the underlying command and stop the file filter from filtering.

## Workspace Filters

Package filtering is for `vp run`, not for domain commands. Domain commands use
their own target model:

```bash
vp test run --root packages/app src/foo.test.ts
vp lint packages/app/src
vp fmt --check packages/app/src
vp build apps/web
```

Task-runner package targeting:

```bash
vpr @scope/foo#build
vpr ./packages/foo#docs
```

Use `-r` for all packages, `-t` for current package plus transitive
dependencies, and `-w` for the workspace root.

Multiple `--filter` flags are unioned, and exclusion filters apply after
inclusions. `{dir}` has traversal suffix support. `<pattern>...` selects a
package and its dependencies; `...<pattern>` selects a package and its
dependents; `<pattern>^...` selects dependencies only.

## Task Definitions

Configured tasks live under `run.tasks` in `vite.config.ts`.

Use a task when you need:

- Stable CI entrypoint.
- Dependency ordering through `dependsOn`.
- Cross-package task dependencies with `package#task`.
- Cache controls.
- Fingerprinted env controls.
- Explicit input/output controls.
- Package-root-relative `cwd`.

Task definition forms:

```ts
tasks: {
  build: 'vp build',
  check: ['vp lint', 'vp build'],
  deploy: {
    command: 'deploy-script --prod',
    dependsOn: ['build', 'test'],
    env: ['NODE_ENV'],
    output: ['dist/**'],
  },
}
```

Command arrays are sequential commands, not argv tokens:

```ts
tasks: {
  check: ['vp lint', 'vp build'];
} // correct
tasks: {
  check: ['vp', 'build'];
} // wrong
```

Task names cannot overlap between `vite.config.ts` and `package.json`. Inspect
both `package.json#scripts` and `vite.config.ts#run.tasks` before proposing a
task name.

Commands joined with `&&`, and command arrays, are split into independently
cached sub-tasks. Nested `vp run` calls are inlined into the task graph. A root
recursive task that would call itself is pruned rather than executed forever.

Pre/post scripts are enabled by default for package scripts unless
`run.enablePrePostScripts` is disabled in the workspace root config.

## Cache Enablement

Caching only applies to `vp run` execution.

Defaults:

- Configured Vite Tasks: cached by default.
- Package scripts: not cached by default.
- `run.cache.tasks`: default `true`.
- `run.cache.scripts`: default `false`.

Override order:

1. Per-task `cache: false` is final.
2. CLI flags `--cache` / `--no-cache`.
3. Workspace `run.cache`.

Use `--cache` carefully on package scripts. It can be correct for pure scripts,
but unsafe for scripts whose inputs/env/outputs are not modeled.

## Cache Key And Replay

When a cached task succeeds, Vite Task stores stdout/stderr and cache metadata.
On the next run it checks:

- Additional args passed to the task.
- Fingerprinted env vars.
- Input files.

On a hit, Vite Task replays terminal output and does not run the process.

Cache entries are content-keyed, so identical command strings share hits across
tasks, scripts, and compound-command sub-tasks. Cache misses print the reason
(`'src/x.ts' modified`, `env changed`, `args changed`) — read it before
assuming the cache is broken. `vp cache clean` clears the store at
`node_modules/.vite/task-cache`.

By default, produced files are not restored. Configure `output` globs for file
archiving:

```ts
tasks: {
  build: {
    command: 'vp build',
    output: ['dist/**'],
  },
}
```

Use workspace-based output patterns for artifacts outside the package:

```ts
output: [{ pattern: 'shared-artifacts/**', base: 'workspace' }];
```

## Automatic File Tracking

Default `input` is automatic. Vite Task observes what the process reads.

It tracks:

- files opened by the process
- missing-file probes
- directory listings

Treat this as observed process-input tracking. Files written by the command are
not automatically restored from cache; produced files require `output` globs.

Implications:

- If a missing imported file appears later, the cache invalidates.
- If a directory was listed by test discovery or globbing, adding/removing files
  in that directory can invalidate the cache.
- Broad scans make broad cache keys.
- Tool caches and generated outputs can create noisy invalidation.

Shape cache inputs deliberately:

```ts
input: [{ auto: true }, '!**/*.tsbuildinfo', '!dist/**'];
input: ['src/**/*.ts', 'vite.config.ts'];
input: [{ pattern: 'shared-config/**', base: 'workspace' }];
input: []; // no file tracking; cache only by command/env
```

Do not cache tasks that read/write their own inputs or whose correctness
depends on hidden process state Vite Task cannot observe.

## Environment Model

Tasks run in a clean environment. Only common variables are passed through by
default. Other variables are neither visible to the task nor fingerprinted.

Use `env` when the variable affects output/correctness:

```ts
env: ['NODE_ENV', 'VITE_*', 'GITHUB_SHA'];
```

Use `untrackedEnv` when the variable must be visible but should not invalidate
the cache:

```ts
untrackedEnv: ['CI', 'GITHUB_ACTIONS'];
```

Use `untrackedEnv` for execution tuning knobs that do not affect correctness or
output content. Examples include TypeScript checker/builder counts, worker
counts, concurrency limits, log modes, reporter modes, and CI-only display
controls. Do not put these in `env` merely because the command reads them:

```ts
tasks: {
  'check:types': {
    command:
      'tsc --build ./tsconfig.json --pretty false --checkers "${HB_TSC_CHECKERS:-2}" --builders "${HB_TSC_BUILDERS:-1}"',
    untrackedEnv: ['HB_TSC_CHECKERS', 'HB_TSC_BUILDERS'],
  },
}
```

Affected/diff tasks must fingerprint their base selection state or be uncached:

```ts
env: ['AFFECTED_SINCE', 'GITHUB_BASE_REF', 'GITHUB_SHA'];
```

## CI Design

Prefer domain commands directly for direct domain work:

```yaml
run: vp lint packages/foo/src
run: vp test run --root packages/foo src/foo.test.ts
run: vp fmt --check packages/foo/src
```

Prefer configured Vite Tasks for repeatable lanes:

```yaml
run: vp run -w affected:test
run: vp run -w check:package-quality
run: vp run -r build
```

Persist `node_modules/.vite/task-cache` as Vite Task's task-result cache. Do
not confuse it with artifact caches. If a `vp run` task needs generated files,
declarations, screenshots, or build outputs restored, configure task `output`
for those files.

Official Vite+ CI setup uses `voidzero-dev/setup-vp`, then `vp install`, then
domain commands or `vp run` tasks. A setup action typically exposes the
workspace binary on PATH so CI runs bare `vp ...`; verify the project's adopted
surface before changing CI.
