# dotfiles

1. **Install Xcode CLI tools**
   ```sh
   xcode-select --install
   ```
   Click "Install" in popup, wait for completion.

2. **Clone and sync**
   ```sh
   mkdir -p ~/projects/jasonkuhrt
   git clone https://github.com/jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
   cd ~/projects/jasonkuhrt/dotfiles && ./sync
   ```

3. **[Complete manual setup](docs/manual-setup.md)** — GitHub auth, email, macOS settings

## Tips

* Use `./sync` not `sync` — there's a system `/bin/sync` command that shadows it
* **Edits are live** — since these are symlinks, editing any file here immediately affects your system
* **Re-run `./sync` when:**
  * new packages added to `Brewfile`
  * new features added to `sync`
* **Fisher plugin removals** — `fisher update` handles removals, but some plugins (e.g. tide) leave behind universal variables in `~/.config/fish/fish_variables` that need manual cleanup
* **Modern Unix abbreviations** — typing `ls`, `cat`, `grep`, etc. expands to modern replacements (`lsd`, `bat`, `rg`). Only in interactive mode, scripts unaffected. See `fish/config.fish` for full list

## Documentation

| Doc | What |
|-----|------|
| [How it works](docs/how-it-works.md) | Symlink mapping (what goes where) |
| [Node setup](docs/node-setup.md) | Node/pnpm/npm architecture |
| [Manual setup](docs/manual-setup.md) | Post-sync configuration steps |
| [CLI tools](docs/cli-tools.md) | Reference for installed tools |
| [Known limitations](docs/known-limitations.md) | Bugs, workarounds, TODOs |
| [Inspiration](docs/inspiration.md) | Other dotfiles & resources |
