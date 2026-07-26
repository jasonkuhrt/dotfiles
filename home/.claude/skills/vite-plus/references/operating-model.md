# Vite+ Operating Model

Load this reference when the task involves `vp run`, Vite Task caching, CI
workflow design, package-script migration, workspace filters, affected/diff
workflows, or writing project agent rules.

## 1. Command Suite, Not Script Runner

Vite+ has two classes of command surfaces:

- Domain commands: `vp test`, `vp lint`, `vp fmt`, `vp check`, `vp build`,
  `vp pack`, `vp dev`, `vp preview`, `vp staged`.
- Task runner: `vp run`, which executes `package.json` scripts and configured
  Vite Tasks.

Do not default to `vp run` just because a package script exists. Pick the
surface that owns the operation.

Built-ins cannot be overwritten by package scripts:

- `vp build` is Vite+'s built-in build command.
- `vp test` is Vite+'s built-in Vitest command.
- `vp run build` runs a package `build` script.
- `vp run test` runs a package `test` script.

That distinction is the core Vite+ agent rule.

## 2. Why Raw Tool CLIs Are Wrong By Default

Vite+ is the project toolchain boundary. Direct raw CLIs bypass that boundary.

Avoid:

```bash
vitest run
oxlint src
oxfmt --check src
vite build
tsdown
vp install
vpr @scope/app#build
```

Prefer:

```bash
vp test run
vp lint src
vp fmt --check src
vp build
vp pack
vp install
vpr @scope/app#build
```

Reasons:

- Vite+ docs direct projects to put test/lint/fmt/pack configuration into
  `vite.config.ts` blocks.
- Vite+ wraps and pins the toolchain versions it supports.
- `vp check` composes Oxfmt, Oxlint, and tsgolint in one command.
- `vp lint` is where type-aware/type-check lint integration belongs.
- `vp test` is where Vite+ test config, root/config/project selection, and
  non-watch default semantics belong.
- `vp migrate` rewrites scripts/imports/config toward the Vite+ surface.
- `vp install`, `vp add`, `vp remove`, and the other package-manager commands
  delegate to the project's pinned package manager; `vp pm <subcommand>`
  forwards anything Vite+ does not normalize (see
  `references/package-manager.md`).
- Agents can inspect `vp <domain> --help`; raw tool CLIs create a second
  command language and invite stale examples.

Allowed escape hatches:

- Debugging the underlying tool itself.
- A temporary migration step before Vite+ config exists.
- A package script with deliberate orchestration that Vite+ cannot express.

When using an escape hatch, name it as such.

## 3. `vp run` Planning Model

`vp run` has three stages:

1. Package selection.
2. Task/script selection inside selected packages.
3. Execution graph planning, including package dependency order and explicit
   `dependsOn` edges.

Package selection:

```bash
vp run build                         # package containing cwd
vp run -w build                      # workspace root package
vp run -r build                      # every workspace package with build
vp run -t build                      # current package plus dependencies
vpr @scope/app#build                 # selected package script/task
```

Use `vpr <package>#<script-or-task>` for agent and CI package script/task
commands so package targeting is explicit in one token.

A `<pkg>#<task>` specifier or `--filter <pattern>` that matches no package exits
0 by default; add `--fail-if-no-match` to exit non-zero instead. In 0.2.x this
works on both `vp run` and `vp exec` (verified: exit 1 on no match). An unknown
task inside an existing package fails loudly. Confirm a filtered run actually
executed before trusting the exit code.

Package filtering is for `vp run`, not for domain commands. Domain commands use
their own target model:

```bash
vp test run --root packages/app src/foo.test.ts
vp lint packages/app/src
vp fmt --check packages/app/src
vp build apps/web
```

## 4. Argument Forwarding

For `vp run`, flags before the task name belong to `vp run`; tokens after the
task name are forwarded to the task process.

```bash
vpr @scope/app#test

# The reporter flag is forwarded to the selected task.
vpr @scope/app#test --reporter verbose
```

Do not put debug/control flags after the task name unless the underlying task
should receive them:

```bash
vpr -v @scope/app#test               # verbose summary from vpr
vpr @scope/app#test -v               # -v forwarded to test script
```

Bare `--` is not a universal "make this safer" marker. In Vitest file targeting,
it can become part of the underlying command and stop the file filter from
filtering.

## 5. Vite Task Definitions

Configured tasks live under `run.tasks` in `vite.config.ts`.

Use a task when you need:

- A stable CI entrypoint.
- Dependency ordering through `dependsOn`.
- Cross-package task dependencies with `package#task`.
- Cache controls.
- Fingerprinted env controls.
- Explicit input/output controls.
- A package-root-relative `cwd`.

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

Important: command arrays are sequential commands, not argv tokens.

```ts
tasks: {
  check: ['vp lint', 'vp build'];
} // correct
tasks: {
  check: ['vp', 'build'];
} // wrong
```

Task names cannot overlap between `vite.config.ts` and `package.json`.

Pre/post scripts are enabled by default for package scripts: running `test` can
also run `pretest` and `posttest` if present, unless `run.enablePrePostScripts`
is disabled.

## 6. Cache Enablement

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

## 7. Cache Key And Replay Model

When a cached task succeeds, Vite Task stores stdout/stderr and cache metadata.
On the next run it checks:

- additional args passed to the task
- fingerprinted env vars
- input files

On a hit, Vite Task replays terminal output and does not run the process.

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

## 8. Automatic File Tracking

Default `input` is automatic. Vite Task observes what the process reads.

It tracks:

- files opened by the process
- missing-file probes
- directory listings

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

Do not cache tasks that read/write their own inputs or whose correctness depends
on hidden process state Vite Task cannot observe.

## 9. Environment Model

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

## 10. CI Design

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

## 11. Agent Review Checklist

Before finalizing a Vite+ command or rule, ask:

- Did I inspect `vp --help` and the relevant `vp <domain> --help`?
- Am I using a domain command for direct domain work?
- If using `vp run`, can I explain why this is package-script/task orchestration?
- Are `vp run` flags before the task name?
- Are task args after the task name intentionally passed through?
- Did I avoid bare `--` before Vitest file filters?
- Did I use `vpr <package>#<script-or-task>` for package script/task selection?
- Did I distinguish domain targeting from package selection?
- Did I avoid raw `vitest`, `oxlint`, `oxfmt`, `vite`, or `tsdown`?
- Did I avoid raw package-manager binaries in favor of
  `vp` package-manager commands?
- If a package filter or `<pkg>#` specifier was used, did I account for the
  silent exit-0 no-match behavior?
- If caching matters, did I identify scripts vs tasks, env, input, output, and
  whether automatic tracking can see the real dependency?
- If affected/diff work matters, did I identify the diff base and cache
  fingerprint?
