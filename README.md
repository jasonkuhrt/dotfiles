# dotfiles

1. **Install chezmoi and clone**
   ```sh
   sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply jasonkuhrt/dotfiles
   ```

2. **Paste age key** (from password manager) to `~/.config/chezmoi/key.txt`, then re-apply to decrypt secrets:
   ```sh
   chezmoi apply
   ```

3. **[Complete manual setup](docs/manual-setup.md)** — GitHub auth, email, macOS settings

## Tips

* **Preview changes** before applying: `chezmoi diff`
* **Apply dotfiles:** `chezmoi apply -v`
* **Capture external changes** (e.g. Fisher modifying `fish_plugins`): `chezmoi re-add ~/.config/fish/fish_plugins`
* **Edit source by target path:** `chezmoi edit ~/.config/fish/config.fish` (opens source file in `$EDITOR`)
* **Re-run `chezmoi apply` when:**
  * new packages added to `home/Brewfile`
  * new lifecycle scripts added to `home/.chezmoiscripts/`
* **Fisher plugin removals** — `fisher update` handles removals, but some plugins (e.g. tide) leave behind universal variables in `~/.config/fish/fish_variables` that need manual cleanup
* **Modern Unix abbreviations** — typing `ls`, `cat`, `grep`, etc. expands to modern replacements (`lsd`, `bat`, `rg`). Only in interactive mode, scripts unaffected. See `config.fish` for full list

## Documentation

| Doc | What |
|-----|------|
| [How it works](docs/how-it-works.md) | chezmoi source state model |
| [Node setup](docs/node-setup.md) | Node/pnpm/npm architecture |
| [Manual setup](docs/manual-setup.md) | Post-apply configuration steps |
| [CLI tools](docs/cli-tools.md) | Reference for installed tools |
| [Known limitations](docs/known-limitations.md) | Bugs, workarounds, TODOs |
| [Decisions](DECISIONS.md) | Architecture decision records (the "why") |
| [Inspiration](docs/inspiration.md) | Other dotfiles & resources |
