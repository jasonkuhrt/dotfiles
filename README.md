# dotfiles

Personal system configuration managed by [chezmoi](https://www.chezmoi.io/).

## New Machine Setup

```sh
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply jasonkuhrt/dotfiles
# Paste age key from password manager to ~/.config/chezmoi/key.txt, then:
chezmoi apply
# Complete manual steps: docs/manual-setup.md
```

After bootstrap, `just` is the primary interface. Run `just` for all recipes, `just sync` for the daily driver.

## How to Think About This Repo

chezmoi is a tool that copies files from a source directory into your home directory. This repo's source directory is `home/`. A file at `home/.chezmoiroot` tells chezmoi that, so the repo root can hold non-deployed things like docs and the justfile without them ending up in `$HOME`.

Inside `home/`, files are named with prefixes that tell chezmoi how to deploy them. `dot_gitconfig` becomes `~/.gitconfig`. `private_dot_ssh/config` becomes `~/.ssh/config` with mode 0700. `encrypted_credentials.age` gets decrypted with [age](https://github.com/FiloSottile/age) on deploy. Prefixes compose: `private_dot_aws/encrypted_credentials.age` becomes `~/.aws/credentials` in a private directory, decrypted from age. The full prefix vocabulary is `dot_`, `private_`, `exact_`, `encrypted_`, `executable_`, `symlink_`, and `empty_` — once you know these, you can read the whole repo at a glance. Details in [how-it-works.md](docs/how-it-works.md).

That covers config files. But managing a system also means installing packages, setting macOS defaults, configuring the Dock — things that aren't files. That's what lifecycle scripts handle.

## Lifecycle Scripts

`home/.chezmoiscripts/` has 19 shell scripts that run during `chezmoi apply`. Their filenames encode when and how often they run. `run_once_before_02-homebrew.sh.tmpl` runs once, on a new machine, before chezmoi deploys files — it installs Homebrew. `run_onchange_after_08-macos-defaults.sh.tmpl` re-runs after file deployment whenever the script's content changes — it sets keyboard repeat rate, trackpad speed, and so on.

The interesting ones are scripts that re-run when a *data file* changes, not when the script itself changes. For example, the brew-bundle script has this line in it:

```bash
# Brewfile hash: {{ include "Brewfile" | sha256sum }}
```

chezmoi evaluates that template on every apply. If the hash is different from last time, chezmoi considers the script "changed" and re-runs it. So editing `home/Brewfile` and running `just apply` automatically triggers `brew bundle` — no manual step needed.

## Data Files

Here's the thing that might seem odd at first: the `Brewfile`, `dock/apps.txt`, and `npm/global-packages.txt` all live inside `home/`, but they are NOT deployed to your home directory. They're listed in `.chezmoiignore` to prevent that.

Why put them in `home/` at all? Because of the hash-trigger pattern above. chezmoi's `include` function can only read files that are inside the source directory (`home/`). If the Brewfile lived at the repo root, the script couldn't write `{{ include "Brewfile" | sha256sum }}` — chezmoi wouldn't find it. So these files live in `home/` to be reachable by `include`, and `.chezmoiignore` keeps them from being deployed. It's a pragmatic workaround for a chezmoi limitation.

## Daily Workflow

```sh
just edit ~/.config/fish/config.fish   # opens the source file in $EDITOR
just diff                              # preview what would change
just sync                              # commit + pull + push + apply
```

When external tools modify files chezmoi manages (Fisher updating `fish_plugins`, Lazy.nvim updating `lazy-lock.json`), capture those changes back with `just re-add <file>`. Use `just verify` to check for drift.

## Secrets

Secrets are encrypted at rest with age. The only thing to transfer between machines is the age key at `~/.config/chezmoi/key.txt` (keep it in your password manager). `chezmoi add --encrypt <file>` encrypts a new secret. `chezmoi edit <file>` decrypts, opens your editor, and re-encrypts on save.

## Claude Code Config

Global CC config lives in `home/dot_claude/` and deploys to `~/.claude/`. Subdirectories use `exact_`, which means chezmoi deletes anything at the target that isn't in source — stale skills, rules, and commands get cleaned up automatically.

Project-local CC config for this repo lives in `.claude/` at the repo root, managed by git, invisible to chezmoi.

`~/.claude/settings.json` is not managed by chezmoi — both tools use atomic writes (temp file + rename), so they'd destroy each other's files. CC owns it at runtime.

## Further Reading

- [How it works](docs/how-it-works.md) — naming conventions, script inventory, commands reference
- [Manual setup](docs/manual-setup.md) — post-apply steps (GitHub auth, email, macOS settings)
- [CLI tools](docs/cli-tools.md) — reference for installed tools and shell abbreviations
- [Node setup](docs/node-setup.md) — Node/pnpm/npm toolchain
- [Known limitations](docs/known-limitations.md) — bugs, workarounds, manual intervention
- [Decisions](DECISIONS.md) — architecture decision records
