---
name: vite-plus
description: Expert workflow for Vite+ and the `vp` CLI. Use when choosing, running, debugging, or documenting `vp` commands; working with `vp test`, `vp lint`, `vp fmt`, `vp check`, `vp build`, `vp pack`, `vp run`, Vite Task caching, workspace filters, package scripts, CI task routing, argument forwarding, package-manager delegation (`vp install`, `vp add`, `vp exec`, `vp dlx`), or agent rules for Vite+ projects.
---

# Vite+

## Prime Directive

Treat Vite+ as a command suite with domain-specific front doors. Do not reduce
it to a package-script runner.

Before proposing `vp run`, inspect the command surface:

```bash
vp --help
vp <domain> --help
```

Use the globally installed `vp` binary directly on developer machines. In CI,
the setup action puts the workspace `node_modules/.bin` directory on PATH so
jobs still invoke the same bare `vp ...` command shape.

Load the matching reference before giving final guidance:

- `references/operating-model.md` — operating model, CI design, agent rules
- `references/run-cache.md` — `vp run` planning, filters, Vite Task caching
- `references/package-manager.md` — dependency commands, `vp exec`, `vp dlx`, `vp pm`
- `references/staged-config.md` — `vp staged`, `vp config`, commit hooks
- `references/pack.md` — library bundling and package-quality validation
- `references/create-migrate.md` — scaffolding and migration
- `references/env-runtime.md` — `vp env`, Node runtime management, global-vs-local CLI surfaces

## Command Surface Decision

Choose the command surface in this order.

1. If the work is a first-class Vite+ domain, use the domain command.
2. If the work is package-script orchestration or a configured Vite Task, use
   `vp run`.
3. If both can run, prefer the surface that directly names the domain you are
   operating on.

| Work                                                                 | Preferred surface                                                                          | Targeting model                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Vitest run, watch, list, related tests, reporters, test file filters | `vp test ...`                                                                              | Vitest/Vite+ flags: `--root`, `--config`, `--project`, paths, file filters |
| Oxlint linting                                                       | `vp lint ...`                                                                              | Oxlint flags and `PATH...`                                                 |
| Oxfmt formatting                                                     | `vp fmt ...` or `vp format ...`                                                            | Oxfmt flags and `PATH...`                                                  |
| Combined static check                                                | `vp check ...`                                                                             | `PATHS...`, `--fix`, `--no-fmt`, `--no-lint`                               |
| Vite app build                                                       | `vp build ...`                                                                             | Vite build flags and optional root                                         |
| Library/package bundling                                             | `vp pack ...`                                                                              | tsdown/Vite+ pack flags                                                    |
| Dev server                                                           | `vp dev ...`                                                                               | Vite dev flags/root                                                        |
| Preview server                                                       | `vp preview ...`                                                                           | Vite preview flags/root                                                    |
| Staged-file checks                                                   | `vp staged ...`                                                                            | Vite+ staged config                                                        |
| Package manifest script                                              | `vp run <script>`                                                                          | Package selection flags and task args                                      |
| Configured Vite Task                                                 | `vp run <task>`                                                                            | Package selection flags, dependency graph, task cache                      |
| Project dependency command                                           | `vp exec [selection] [command ...]`                                                        | exec package-selection flags, selected-package cwd, and command argv        |
| One-off registry binary                                              | `vp dlx <pkg> ...`                                                                         | registry package name and argv                                             |
| Dependency management                                                | `vp install` / `vp add` / `vp remove` / `vp update` / `vp outdated` / `vp why` / `vp info` | package-manager delegation flags                                           |
| Node runtime management (versions, pins, shims)                      | `vp env ...` / `vp node ...`                                                               | global native binary only — see `references/env-runtime.md`                |

Do not route through package scripts just because a script exists. Ask:

- Is this direct domain work that `vp <domain>` owns?
- Or is this a package manifest/configured task that deliberately composes
  commands, env, outputs, cache behavior, or package-specific setup?

## Do Not Bypass Vite+

In a Vite+ project, do not run `vitest`, `oxlint`, `oxfmt`, `vite`, or
`tsdown` directly, and do not invoke package-manager binaries when a `vp`
command exists. `vp` detects and delegates to the
project's pinned package manager; `vp pm <subcommand>` is the explicit
forwarding surface for package-manager subcommands Vite+ does not normalize
(see `references/package-manager.md`).

Use Vite+ because it is the project toolchain boundary:

- It exposes one command surface for agents and humans to inspect with
  `vp <domain> --help`.
- It routes through Vite+'s pinned tool versions and wrappers.
- It reads Vite+ config blocks such as `test`, `lint`, `fmt`, `check`, `build`,
  `pack`, and `run` from `vite.config.ts`.
- It preserves the Vite+ migration contract: split tool configs and raw tool
  scripts should collapse into `vp` domain commands.
- It makes command-surface mistakes visible. `vp test` and `vp run test` are
  intentionally different commands.

Direct underlying CLIs are escape hatches only. Use one only after verifying
that the installed `vp <domain>` command cannot express the operation, and say
why in the final answer or code comment. Keeping a raw CLI in a package script
is also an escape hatch; prefer `"test": "vp test run"`, `"lint": "vp lint"`,
`"fmt": "vp fmt"`, and `"build": "vp build"` unless the script is deliberate
orchestration around the domain command.

## Evidence Routine

Vite+ is moving quickly. Build command claims from the installed version first.

Use this minimum evidence routine before making semantic claims:

```bash
vp --help
vp <command> --help
vp --version
```

`vp` has TWO CLI surfaces, and bare `vp` in a workspace shell may resolve to
either: the global native binary (`~/.vite-plus/bin/vp`, owns the `env`
runtime-management family) or the workspace-local JS CLI
(`node_modules/.bin/vp`, no `env` family). A `Command '<x>' not found` from a
workspace shell is PATH evidence, not version evidence — before claiming a
command does not exist in the installed version, probe the global binary
explicitly (`~/.vite-plus/bin/vp <command> --help`) and check resolution with
`type -a vp`.

If behavior materially affects architecture, CI, caching, or agent rules, also
inspect local installed docs and source artifacts:

```bash
node -e "console.log(require('./node_modules/vite-plus/package.json').version)"
ls node_modules/vite-plus/docs
sed -n '1,160p' node_modules/vite-plus/AGENTS.md
```

If the installed package only has built output and the behavior depends on
parser/filter/cache internals, inspect the official source repositories or
official docs for the exact installed version. Do not infer command semantics
from stale examples, package-manager habit, or another task runner.

## Domain Commands

### Test

Use `vp test` for direct Vitest operations: targeted files, list-mode probes,
reporters, Vitest flags, watch mode, changed tests, projects, and config/root
selection.

Do not use the direct `vitest` CLI in repo scripts, CI, or agent commands.
Package scripts that exist only to expose Vitest should call `vp test run`, not
`vitest run`. Keep direct `vitest` imports in test source and Vitest config
files; this rule is about command execution, not test APIs.

From repository root:

```bash
vp test run --root <package-dir> <package-relative-test-file>
vp test list --filesOnly --root <package-dir> <package-relative-test-file>
```

From inside the package directory:

```bash
vp test run <package-relative-test-file>
vp test list --filesOnly <package-relative-test-file>
```

Do not put a bare `--` before Vitest file filters:

```bash
# Wrong: the separator reaches Vitest/Vite+ and can make the file filter stop filtering.
vp test list --filesOnly --root tools/example -- __tests__/unit.test.ts

# Right.
vp test list --filesOnly --root tools/example __tests__/unit.test.ts
```

Use `vpr <pkg>#test ...` only when you intentionally need that
package's `test` manifest script rather than the direct Vitest domain command.

When instructing another agent (or writing docs/prompts) to run a package's
tests, give the domain form — `vp test run --project <vitest-project-name>`
or `vp test run --root <package-dir>` — never `vp run <pkg>#test` /
`vpr <pkg>#test`. Routing tests through the script runner hides Vitest
targeting flags, skips list-mode probes, and teaches the wrong surface.

### Lint

Use `vp lint` for direct Oxlint work:

```bash
vp lint <path-or-dir>
vp lint --type-aware --format=unix --no-error-on-unmatched-pattern <path-or-dir>
vp lint --fix <path-or-dir>
```

Do not wrap simple path linting in `vp run` unless the package script
intentionally adds behavior that the lint domain command does not express.

Do not run `oxlint` directly. `vp lint` is the Vite+ linter front door and is
where Vite+ lint config and type-aware/type-check integration belong.

### Format

Use `vp fmt` or `vp format` for direct Oxfmt work:

```bash
vp fmt --check <path-or-dir>
vp fmt --write <path-or-dir>
vp format --list-different <path-or-dir>
```

Prefer `vp fmt --check` for read-only verification and `vp fmt --write` for
intentional formatting edits.

Do not run `oxfmt` directly. `vp fmt` is the Vite+ formatter front door and is
where Vite+ format config belongs.

### Check

Use `vp check` for combined format, lint, and type-check validation:

```bash
vp check
vp check --fix <paths>
vp check --no-fmt <paths>
vp check --no-lint <paths>
```

Use package or repo policy to decide whether broad `vp check` is allowed. For
targeted agent loops, pass paths.

Do not rebuild `vp check` manually as separate raw CLI calls. It exists to make
format, lint, and type-check validation one Vite+ operation.

### Build And Pack

Use `vp build` for direct Vite application builds:

```bash
vp build <root>
vp build <root> --mode production
```

Use `vp pack` for library/standalone artifact bundling:

```bash
vp pack
vp pack --root <dir> --dts
vp pack --workspace --filter <name-or-regex>
```

Use `vpr <pkg>#build` instead when the package manifest `build`
script encodes necessary env, config files, modes, generated setup, or multiple
commands.

## `vp run`

Use `vp run` for package manifest scripts and Vite Task tasks.

Correct shapes:

```bash
vp run -w <root-task>
vp run <task>
vp run -r <task>
vp run -t <task>
vpr <pkg>#<script-or-task>
```

Package selection belongs in the `package#script-or-task` token. Arguments
after that token belong to the underlying task process:

```bash
vpr @scope/app#test

# `--reporter verbose` is passed to the package script/task.
vpr @scope/app#test --reporter verbose
```

Keep `vp run` debug flags before the task name:

```bash
# Right: vpr receives -v.
vpr -v @scope/app#test

# Wrong: -v is forwarded to the task process.
vpr @scope/app#test -v
```

`vp run build` means "run `build` in the current package." It is not a
workspace-wide build. Use `vp run -r build` for every workspace package.

A `<pkg>#<task>` specifier or `--filter <pattern>` that matches no package exits
0 by default; add `--fail-if-no-match` to exit non-zero instead. In 0.2.x this
works on both `vp run` and `vp exec` (verified: exit 1 on no match). An unknown
task inside an existing package fails loudly. After any filtered run, confirm the
task actually executed before trusting the exit code.

### Task Definitions

Use configured Vite Tasks when workflow semantics matter. A task can encode:

- command string or command string array
- dependency ordering through `dependsOn`
- package cross-references through `package#task`
- cache policy through `cache`
- fingerprinted env through `env`
- passed-but-unfingerprinted env through `untrackedEnv`
- input tracking through `input`
- output archiving through `output`
- task working directory through `cwd`

Command strings are shell commands. Command arrays are sequential commands, not
argv token arrays:

```ts
// Right.
tasks: {
  check: ['vp lint', 'vp build'];
}

// Wrong: runs command `vp`, then command `build`.
tasks: {
  check: ['vp', 'build'];
}
```

Task names cannot overlap between `vite.config.ts` and `package.json`. If the
operation needs cache/env/input/output/dependsOn control, move it to a Vite
Task. If the operation is a simple direct domain operation, call the domain
command instead of adding a package script.

## Vite Task Caching

Apply cache reasoning only to commands run through `vp run`.

Caching lifecycle:

1. `vp run` selects a package script or configured task.
2. If caching is enabled for that selected command, the task runner computes a
   cache key from the command, task args, fingerprinted env, and inputs.
3. With default `input`, Vite Task observes the process's file reads. That
   includes normal file reads, missing-file probes, and directory listings.
4. On a hit, Vite Task replays cached stdout/stderr. It does not run the
   process.
5. On a miss, Vite Task runs the process. Only a successful run can update the
   cache.

Cache enablement:

- Configured Vite Tasks are cached by default.
- `package.json` scripts are not cached by default.
- `run.cache.tasks` defaults to `true`.
- `run.cache.scripts` defaults to `false`.
- `--cache` enables task/script caching for an invocation.
- `--no-cache` disables task/script caching for an invocation.
- A task-level `cache: false` is a hard opt-out.

Automatic file tracking:

- Normal reads invalidate when the file content changes.
- Missing-file probes invalidate if the missing file appears later.
- Directory listings invalidate when files are added or removed in that
  directory.
- Broad globs and broad test discovery can make cache keys too sensitive.
- Tool cache files such as `.tsbuildinfo`, `coverage`, `target`, or generated
  output may need `input` exclusions.
- A task that reads and writes the same tracked input is not safe to cache.

Env and outputs:

- By default, Vite Task runs in a clean environment with only common variables
  passed through.
- `env` variables are passed to the process and included in the cache
  fingerprint.
- `untrackedEnv` variables are passed to the process but not fingerprinted.
- Use `untrackedEnv` for execution tuning knobs that do not affect correctness
  or output content, such as TypeScript checker/builder counts, worker counts,
  concurrency limits, log modes, reporter modes, or CI-only display controls.
  Never put those knobs in `env` merely because the command reads them.
- Only terminal output is replayed by default.
- Produced files are restored only when task `output` globs are configured.
- Use `{ pattern, base: 'workspace' }` when input/output paths are workspace
  relative rather than package relative.

Never assume:

- `vp test`, `vp lint`, or `vp fmt` are Vite Task cached.
- A cache hit restored `dist`, generated files, type build info, screenshots,
  or any other output file.
- A diff/affected task is safe to cache unless the diff base and relevant env
  are fingerprinted or the task is uncached.

For CI, persist `node_modules/.vite/task-cache` as the Vite Task cache store.
When a `vp run` task owns generated files or tool build artifacts, model those
files with task `output` globs instead of adding a separate artifact cache.

## Workspace Filters And Targeting

Do not mix targeting models.

Domain command targeting:

```bash
vp test run --root packages/foo src/foo.test.ts
vp lint packages/foo/src
vp fmt --check packages/foo/src
vp build apps/web
```

Task-runner package targeting:

```bash
vpr @scope/foo#build
vpr ./packages/foo#docs
```

Use `-r` for all packages. Use `-t` for current package plus transitive
dependencies. Use `-w` for the workspace root. Do not combine incompatible
selection styles unless `vp run --help` for the installed version says they are
valid together.

## CI And Repeatable Workflows

Encode repeatable repo workflows as Vite Task tasks when the workflow needs
task graph ordering, cache policy, env/input/output control, or one stable CI
entrypoint.

Good task candidates:

- affected lint/test/typecheck lanes
- package quality gates
- generated-doc checks
- multi-command release checks
- workspace-recursive build/test orchestration

Do not invent package scripts merely to expose a domain command. If the domain
command directly expresses the work, call it directly.

For affected/diff workflows, identify what computes the diff base. Vite+ package
filters are package selectors, not a complete affected-PR planner by themselves.
If a repo has a custom affected tool, make its base revision and env part of the
task cache story.

## Anti-Patterns

Replace these reflexes immediately:

```bash
# Wrong: direct Vitest CLI in a package script.
"test": "vitest run"

# Better: package script still exists, but routes through Vite+.
"test": "vp test run"

# Wrong: direct Oxlint/Oxfmt CLI scripts.
"lint": "oxlint src"
"fmt": "oxfmt --check src"

# Better: route through Vite+ domain commands.
"lint": "vp lint src"
"fmt": "vp fmt --check src"

# Vite+ package-manager and task surfaces.
vp install
vp add -D some-package
vpr @scope/pkg#build

# Domain command for direct Vitest file targeting.
vp test run --root packages/pkg src/foo.test.ts

# Wrong: bare separator before a Vitest file filter.
vp test list --filesOnly --root packages/pkg -- src/foo.test.ts

# Better: positional file filter.
vp test list --filesOnly --root packages/pkg src/foo.test.ts

# Wrong: script-runner route for running a package's tests.
vp run '@scope/pkg#test'
vpr @scope/pkg#test

# Better: the test domain command.
vp test run --project @scope/pkg

# Wrong: package script route for direct linting.
vpr @scope/pkg#lint src/foo.ts

# Better: lint domain.
vp lint packages/pkg/src/foo.ts

# Wrong: assuming current-package build is recursive.
vp run build

# Better, if the task really is every package's build script.
vp run -r build
```

## Response Shape

When answering a `vp` command question, include:

1. The chosen surface: domain command or task runner.
2. The exact command.
3. One sentence explaining the targeting model.
4. Any verified caveat from `--help`, installed docs, or local config.

Example:

```text
Use the test domain command:

vp test run --root tools/oxlint-plugins __tests__/e2e/vite-plus-command-surface.test.ts

That targets Vitest through Vite+'s test surface; `--root` selects the package
root and the test file remains a Vitest positional filter.
```
