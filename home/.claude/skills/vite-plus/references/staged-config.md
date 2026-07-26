# Vite+ Staged Checks And Config

## Contents

- `vp config`
- `vp staged`
- Hook flags
- Agent integration caveats

## `vp config`

`vp config` configures hooks and agent integration for the current project:

```bash
vp config
vp config --hooks-dir .vite-hooks
VITE_GIT_HOOKS=0 vp config
```

It reads staged-file rules from `vite.config.ts#staged`. `VITE_GIT_HOOKS=0`
skips hook installation.

Because `vp config` can edit agent, hook, and editor files, inspect installed
help and existing repo rules before running it in a mature repository.

## `vp staged`

`vp staged` runs staged-file tasks from the same `staged` config:

```bash
vp staged --help
vp staged --fail-on-changes
vp staged --diff HEAD~1 --diff-filter ACMR
vp staged --hide-unstaged
vp staged --hide-partially-staged
vp staged --no-stash
vp staged --revert
vp staged --relative
vp staged --concurrent false
```

Use `--fail-on-changes` when hooks or CI should fail if staged tasks modify
tracked files. Use `--hide-unstaged` or `--hide-partially-staged` when the
check must operate only on the selected diff.

## Agent Integration Caveats

Installed Vite+ may ship an upstream `AGENTS.md` template. Treat it as template
text. Verify commands against installed help before copying them. The workspace
JS CLI still lacks the `env` family; use the global binary for `vp env` probes.
