---
name: fast-feedback-development
description: "Implement, fix, or refactor code through the fastest sound feedback loop: exact-case targeting, hot runner reuse, explicit runtime/type separation, invalidation-aware gates, and one authoritative assurance pass. Use for substantial coding work where repeated broad or cold validation would dominate delivery time."
---

# Fast Feedback Development

Optimize time-to-correct-signal, not merely command duration.

## Establish the feedback topology

Before editing, discover from repository instructions and current configuration:

- the behavior being changed and its closest executable oracle;
- the runner's project, file, group, and case selectors;
- whether runtime tests implicitly start a typechecker, browser, database, code generator, or global setup;
- the authoritative static, package, integration, E2E, and CI gates;
- which gates require explicit user permission.

Do not assume a command named `test` is scoped. Inspect the resolved runner configuration when its cost or coverage is unclear.

## Use the narrowest sufficient oracle

Default to this order and widen only when the narrower level cannot disprove the current implementation hypothesis:

1. exact named test case;
2. exact suite or case group;
3. exact test file in one explicit project/environment;
4. affected package or runner project;
5. related or affected tests;
6. full repository gate.

This is a semantic widening ladder, not a choice of one flag. Retain every independent selector available: an exact Vitest case normally also carries its exact project and file.

Filter all available dimensions together. A file filter without a project filter may still initialize multiple projects; a case filter without a file filter may still discover the repository.

Keep the selected test semantically representative. Do not replace an integration contract with a cheap unit assertion merely to reduce latency.

## Keep the loop hot

- Start one targeted watch or dev process and reuse it across coherent edits.
- Reuse an existing live process after interruption or context compaction instead of starting a duplicate.
- Make a coherent batch, observe its nearest oracle, fix the concrete failure, and continue.
- Avoid concurrently running CPU-heavy typechecks, builds, browser suites, or duplicate watchers.
- Stop processes that no longer contribute feedback.

Selected tests still pay the cost of importing and collecting their file. Shared setup, environment startup, and dependency transforms remain part of that floor. If this dominates, profile that boundary rather than widening the run.

## Separate runtime and static feedback

Treat runtime and type behavior as separate channels unless the repository has proven that their combined hot loop is faster.

- During runtime-focused editing, disable an implicitly enabled test-runner typecheck pool when a separate authoritative static gate exists.
- When developing a type-level contract, target its exact file and keep the typechecker/watch process hot.
- Assume TypeScript checking is program-granular: a case or file selector often narrows error reporting, not the compiler program.
- A selected test containing no type assertions can still pay full package-program compilation if the typecheck pool is enabled.
- Re-enable or run the repository's authoritative static gate after a type-affecting batch and in terminal assurance. Never substitute a narrowed test-runner typecheck for that gate unless repository policy explicitly defines it as authoritative.

For a repository where the slow defaults repeatedly cause misuse, prefer a named `feedback:*` task surface over teaching every agent a collection of disabling flags:

- `feedback:test`: runtime tests only; require an explicit project and exact file, optionally narrowed further by case or group, and fail closed when either required selector is omitted;
- `feedback:test:watch`: the same runtime-only selection in a persistent process;
- `feedback:lint`: non-type-aware rules over explicit file paths and fail closed when omitted;
- `feedback:check`: formatting plus non-type-aware lint over explicit file paths.

The `feedback:` prefix means “inner-loop signal, not an assurance gate.” Keep these tasks out of CI and terminal verification. Standard test, type, lint, check, build, and E2E tasks retain their full semantics.

## Track invalidation

Maintain a small internal ledger of gates already passed at the current code epoch. An edit invalidates only gates whose behavior or input closure it can affect.

Examples:

- a test-description typo invalidates collection, not application behavior;
- a CSS-only edit invalidates its visual/browser oracle, not a server contract suite;
- a shared schema edit invalidates runtime consumers, static contracts, and persistence boundaries.

Do not rerun a passed broad gate after every local correction. Resume from the earliest genuinely invalidated gate.

## Finish with authoritative assurance

Once the implementation candidate is coherent:

1. format once;
2. run the smallest complete runtime set covering the changed behavior, batching compatible projects in one process;
3. run the authoritative static/type gate once if invalidated;
4. run required package, build, integration, E2E, visual, and CI gates in dependency order;
5. stop at any explicit manual-QA, push, or external-action approval boundary.

If a late fix lands, restart at the earliest invalidated gate rather than restarting the whole sequence reflexively.

Use one bounded review at a meaningful implementation gate. Address concrete findings and continue; do not create reviewer-on-reviewer loops.

## Vite+ and Vitest repositories

When the repository uses Vite+, load `$vite-plus` and use the workspace runner directly. Do not wrap it in another package manager.

Prefer the repository's named feedback task when present:

```sh
vpr feedback:test --project '<project>' '<package-relative-test-file>' -t '<anchored case or suite regexp>'
```

Otherwise use the equivalent runner command directly:

```sh
vp test watch --project '<project>' '<package-relative-test-file>' -t '<anchored case or suite regexp>' --typecheck.enabled=false
```

Use `vp test run` with the same selectors for a one-shot checkpoint. Omit `--typecheck.enabled=false` only when the typecheck pool is the active oracle or repository policy requires the combined run.

Before accepting a performance configuration or dependency upgrade:

- measure cold and warm runs of the real target workload;
- separate wrapper/setup, discovery, transform/import, typecheck, test-body, browser, and teardown time;
- prefer supported stable versions and sound task caches;
- benchmark experimental module caches, worker/pool changes, and prereleases rather than assuming they help;
- reject optimizations that weaken isolation, test semantics, or the final assurance gate.
