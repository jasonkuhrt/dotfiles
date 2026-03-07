# Symlink Platform

`packages/dotctl/` is the local control plane that makes the symlink-first model operational on macOS.

## Lane Model

- `trueDir`: whole-directory symlinks backed by `symlink-roots/`
- `fileSymlink`: normal managed targets expected to be symlinked file-by-file
- `special`: managed targets that are not safe or meaningful to heal as symlinks

Current active `trueDir` roots:

- `~/.config/bat`
- `~/.config/direnv`
- `~/.config/dprint`
- `~/.config/ghostty`
- `~/.config/git`
- `~/.config/lazygit`
- `~/.config/libra`
- `~/.config/lsd`
- `~/.config/nvim`
- `~/.config/ripgrep`
- `~/.claude/checks`
- `~/.claude/commands`
- `~/.claude/rules`
- `~/.claude/schemas`

## Public UX

- `just up`: the only convergent mutation command
- `just edit <target>`: open the correct backing file
- `just status`: one-screen machine health
- `just doctor`: deeper drift and prerequisite checks
- `just explain <target>`: lane, source path, expected shape, capture policy

Normal content edits to existing files in the `trueDir` and `fileSymlink` lanes are live immediately. `just up` is for convergence, new files, renames, lifecycle scripts, and `special`-lane work.

## Runtime State

`dotctl` stores local machine state under `~/.local/state/dotfiles-symlink/`:

- `manifest.json`: cached expectation of which managed files should be symlinks
- `health.json`: latest healer run summary
- `captures.json`: history of live-to-source captures
- `backups/`: pre-heal and cutover safety copies

## Heal Policy

`fileSymlink` targets have explicit policy:

- `capture`: back up live and source, refresh the managed source, then restore symlink shape
- `relinkOnly`: back up, discard live bytes, restore source symlink shape
- `ignore`: report drift but do not mutate it automatically

The current default is `capture` for the file-symlink lane because most of this repo’s home-dir config is tool-authored and meant to sync across machines.

## Promotion Rubric

Only promote a path into `trueDir` when all of these are true:

- the target is a directory, not a single file
- the subtree is plain target-shaped, not full of manager-specific metadata prefixes
- git is the intended semantic source of truth
- unmanaged runtime spill inside the subtree is acceptable or already excluded

That is why `~/.config/dprint` is now `trueDir`, while `~/.config/starship.toml` remains a file-symlink target and `~/.config/nvim` now follows the same whole-root true-dir model.
