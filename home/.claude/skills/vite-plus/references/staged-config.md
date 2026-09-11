# Hooks, Staged Checks And Agent Files

Installed docs: `node_modules/vite-plus/docs/guide/commit-hooks.md`,
`config/staged.md`, and the staged section of `guide/troubleshooting.md`.

## Git Hook Dispatcher

```bash
vp hooks status                      # preference, core.hooksPath, dispatcher
vp hooks enable [--hooks-dir <dir>]  # install or refresh <dir>/_ and set core.hooksPath
vp hooks disable                     # remove it and remember the choice in local git config
```

- Project hook scripts such as `.vite-hooks/pre-commit` are committed. The
  generated `<hooks-dir>/_` directory is not.
- `enable` and `disable` never touch project hook scripts or the `staged`
  block.
- `VP_GIT_HOOKS=0` makes installed hooks exit immediately and stops lifecycle
  scripts (`prepare`, `postinstall`) from reinstalling the dispatcher.
  `HUSKY=0` works the same. `VITE_GIT_HOOKS` is the old name, still honored
  for backwards compatibility.
- Every hook first sources `~/.config/vite-plus/hooks-init.sh` when it exists;
  export `VP_GIT_HOOKS=0` there to disable hooks for a whole machine.

## `vp config`

`vp config` installs the dispatcher (unless `vp hooks disable` ran in this
clone) and updates coding-agent instruction files.

```bash
vp config --no-hooks --no-agent      # skip both steps
vp config --hooks-dir .vite-hooks    # default: .vite-hooks, or the last dir used in this clone
```

## Agent Instruction Files

`vp config --agent`, `vp create --agent <name>` and `vp migrate --agent <name>`
write the official Vite+ block (between `<!--VITE PLUS START-->` and
`<!--VITE PLUS END-->`, sourced from `node_modules/vite-plus/AGENTS.md`) into
`AGENTS.md`, `CLAUDE.md` and similar files. It is a short generic template. In
a repository with its own agent rules, pass `--no-agent` or review the diff.

## `vp staged`

`vp staged` runs the `staged` block of `vite.config.ts`, which maps globs to
commands, for example `'*.{js,ts,tsx}': 'vp check --fix'`. The project-owned
pre-commit hook calls it.

```bash
vp staged --fail-on-changes            # exit 1 when tasks modify tracked files
vp staged --diff HEAD~1 --diff-filter ACMR
vp staged --hide-unstaged              # or --hide-partially-staged
vp staged --revert                     # restore the original state on errors
vp staged --continue-on-error --verbose
```

Other flags: `--no-stash`, `--relative`, `--cwd <path>`, `-p/--concurrent`,
`--no-concurrent`, `--allow-empty`, `-q/--quiet`, `-d/--debug`.

When a hook does not run: `vp hooks status`, then confirm the `staged` block
exists, the pre-commit script calls `vp staged`, and `VP_GIT_HOOKS=0` is not
set.
