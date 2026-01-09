# dotfiles

1. __Install Xcode CLI tools__
   ```sh
   xcode-select --install
   ```
   * click "Install" in popup, wait for completion
2. __Clone and sync__
   ```sh
   mkdir -p ~/projects/jasonkuhrt
   git clone https://github.com/jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
   cd ~/projects/jasonkuhrt/dotfiles && ./sync
   ```

## How it works

`sync` creates symlinks from your home directory to this repo (selective files, not whole directories):

| System Location                       | Dotfiles Source               |
| ------------------------------------- | ----------------------------- |
| __Claude Code__                       |                               |
| `~/.claude/CLAUDE.md`                 | `./claude/CLAUDE.md`          |
| `~/.claude/settings.json`             | `./claude/settings.json`      |
| `~/.claude/commands/`                 | `./claude/commands/`          |
| `~/.claude/rules/`                    | `./claude/rules/`             |
| __Zed__                               |                               |
| `~/.config/zed/settings.json`         | `./zed/settings.json`         |
| `~/.config/zed/keymap.json`           | `./zed/keymap.json`           |
| `~/.config/zed/tasks.json`            | `./zed/tasks.json`            |
| `~/.config/zed/snippets/`             | `./zed/snippets/`             |
| `~/.config/zed/toggle-chore-files.sh` | `./zed/toggle-chore-files.sh` |
| __Ghostty__                           |                               |
| `~/.config/ghostty/config`            | `./ghostty/config`            |
| __Neovim__                            |                               |
| `~/.config/nvim/init.vim`             | `./nvim/init.vim`             |
| __Fish__                              |                               |
| `~/.config/fish/config.fish`          | `./fish/config.fish`          |
| `~/.config/fish/fish_plugins`         | `./fish/fish_plugins`         |
| __AWS__                               |                               |
| `~/.aws/config`                       | `./aws/config`                |
| `~/.aws/credentials`                  | `./aws/credentials` (secret)  |
| __Email__                             |                               |
| `~/.mbsyncrc`                         | `./email/mbsyncrc`            |
| `~/.imapfilter/config.lua`            | `./email/imapfilter.lua`      |
| `~/.config/himalaya/config.toml`      | `./email/himalaya.toml`       |
| `~/.config/notmuch/default/config`    | `./email/notmuch.config`      |
| __Dock__                              |                               |
| _(configured via `./dock/apps.txt`)_  |                               |
| __Other__                             |                               |
| `~/.config/dprint/dprint.json`        | `./dprint/dprint.json`        |
| `~/.config/starship.toml`             | `./starship/starship.toml`    |
| `~/.config/gh/config.yml`             | `./gh/config.yml`             |
| `~/.config/git/ignore`                | `./git/ignore`                |
| `~/.config/libra/config.json`         | `./libra/config.json`         |
| `~/.config/vim/.vimrc`                | `./vim/vimrc`                 |
| `~/.ssh/config`                       | `./ssh/config`                |
| `~/.gitconfig`                        | `./git/.gitconfig`            |
| `~/.npmrc`                            | `./npmrc`                     |

## Tips

* Use `./sync` not `sync` — there's a system `/bin/sync` command that shadows it
* __Edits are live__ — since these are symlinks, editing any file here immediately affects your system
* __Re-run `./sync` when:__
  * new packages added to `Brewfile`
  * new features added to `sync`

## Node Package Management

```
┌───────────────────────────────────────────────────────────────┐
│  BOOTSTRAP (./sync)                                           │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Homebrew ───▶ pnpm ───▶ npm ───▶ corepack                    │
│     │           │         │          │                        │
│     ▼           ▼         ▼          ▼                        │
│  pnpm +      LTS node   global    per-project                 │
│  bootstrap   (runtime)  CLI tools pnpm/yarn                   │
│  node                                                         │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  RUNTIME PATH                                                 │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  1st  npm globals ────▶ CLI tools (including corepack)        │
│            │                                                  │
│            ▼                                                  │
│  2nd  pnpm ───────────▶ node + npm (shadows brew)             │
│            │                                                  │
│            ▼                                                  │
│  3rd  Homebrew ───────▶ pnpm (bootstrap only)                 │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  PROJECT-LEVEL                                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  pnpm/yarn ───▶ corepack ───▶ uses version from               │
│                               packageManager field            │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

* __PATH & tool layout__
  ```
  Priority   Tool       Manages               Location
  ────────────────────────────────────────────────────────────────────
  1st        npm        global CLI tools      ~/.npm-global/bin
  2nd        pnpm       node versions         ~/Library/pnpm
  3rd        Homebrew   initial bootstrap     /opt/homebrew/bin
  ```
* __Bootstrap flow__ (handled by `./sync`)
  ```
  ↓   brew install node pnpm       initial node + pnpm
  ↓   pnpm env use --global lts    pnpm installs LTS node, shadows brew's
  ↓   npm install -g ...           globals installed to ~/.npm-global
  ```
  * after sync, brew's node is unused (pnpm's comes first in PATH)
* __npx fallback chain__
  ```
  ↓   local node_modules
  ↓   ~/.npm-global
  ↓   downloads (npx fetches)
  ```
  * this is why we use npm (not pnpm) for globals — npx checks npm's global dir
* __Key insight__
  * npm globals install to `~/.npm-global` independent of node version
  * `pnpm env use 22` won't break your global tools
* __Updating tools__
  | Tool | Command | Why |
  |------|---------|-----|
  | pnpm | `brew upgrade pnpm` | pnpm is installed via Homebrew, not self-managed |
  | node | `pnpm env use --global lts` | pnpm manages node versions |
  * don't use `pnpm self-update` — it conflicts with Homebrew's version tracking
* __Project-specific pnpm/yarn versions__
  * projects may specify `"packageManager": "pnpm@9.x.x"` in package.json
  * corepack handles this automatically (installed and enabled by sync)
  * corepack manages pnpm and yarn; npm is bundled with node separately
* __Pitfall: don't `brew install corepack`__
  * brew's corepack conflicts with brew's pnpm (both install `pnpm` and `pnpx` binaries)
  * use npm global install instead (handled by sync)

## Manual Setup (after sync)

1. __Fish secrets__
   * edit `fish/config.secrets.fish` (created by sync, gitignored) with your tokens
2. __macOS Settings__
   1. __Caps Lock → Ctrl__
      ```sh
      open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
      ```
      * Keyboard Shortcuts → Modifier Keys → change Caps Lock to Control
   2. __Spotlight shortcut__ (free Cmd+Space for Raycast)
      * same pref pane → Keyboard Shortcuts → Spotlight → uncheck "Show Spotlight search"
3. __GitHub__
   1. __Authenticate CLI__
      ```sh
      gh auth login
      ```
   2. __SSH key__ (if needed)
      ```sh
      ssh-keygen -t ed25519 -C "jasonkuhrt@me.com"
      gh ssh-key add ~/.ssh/id_ed25519.pub
      ```
4. __Raycast hotkey__
   ```sh
   open -a Raycast
   ```
   * Cmd+, → Extensions → set hotkey to Cmd+Space
5. __Wispr Flow__
   * download from [wisprflow.ai/downloads](https://wisprflow.ai/downloads) (not in Homebrew)
   * open dmg and drag to Applications
   * launch and sign in (settings sync automatically)
   * grant Accessibility permission when prompted
   * grant Microphone permission when prompted
6. __Email password__
   * generate iCloud app-specific password at appleid.apple.com/account/manage
   ```sh
   security add-generic-password -s 'mbsync-icloud' -a 'jasonkuhrt@me.com' -w 'YOUR_APP_PASSWORD'
   ```
7. __Claude in Chrome__
   * install [Claude extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) from Chrome Web Store
   * sign in with your Claude account
   * pin extension (puzzle icon → thumbtack)
   * run `claude --chrome` or use `/chrome` in existing session
   * requires extension ≥1.0.36, Claude Code ≥2.0.73
   * Google Chrome only (not Brave, Arc, etc.)
8. __Serena MCP__ (semantic code analysis)
   ```sh
   claude mcp add --scope user serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context claude-code --project-from-cwd
   ```
   * requires `uv` (installed via Brewfile)
   * `--context claude-code` disables tools that duplicate Claude Code's built-in ones
   * `--project-from-cwd` auto-activates project based on working directory
9. __iCloud Desktop & Documents__
   ```sh
   open "x-apple.systempreferences:com.apple.preferences.AppleIDPrefPane"
   ```
   * iCloud → iCloud Drive → Options → check "Desktop & Documents Folders"

## Notes

* __Browser sync__ — automatic via Google login (Chrome) and iCloud (Safari)
* __Keyboard settings__ — sync sets fast key repeat via `defaults`, but requires logout/login to take effect

## Claude Code Resources

* __Docs & Guides__
  * https://docs.claude.com/en/docs/claude-code/overview
  * https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
  * https://agents.md/
* __Curated Lists__
  * https://github.com/hesreallyhim/awesome-claude-code
  * https://claudecodecommands.directory/
  * https://github.com/ComposioHQ/awesome-claude-skills
* __MCPs__
  * https://modelcontextprotocol.io
  * https://glama.ai/mcp
  * https://ref.tools/
  * https://github.com/oraios/serena
* __Tools__
  * https://wisprflow.ai/
  * https://github.com/sirmalloc/ccstatusline
  * `npx ccusage@latest`
* __Examples & Workflows__
  * https://github.com/anthropics/skills/tree/main
  * https://github.com/anthropics/claude-code-action
  * https://github.com/OneRedOak/claude-code-workflows
* __Community__
  * https://github.com/obra/superpowers — worth watching (issues, PRs, discussions) as it's become a hub attracting users of various AI coding tools sharing bleeding-edge techniques
  * https://github.com/scopecraft/command

## CLI Tools Reference

Quick reference for all the tools installed via Brewfile. Forget what something does? Check here.

| Category | Tool         | What it does                          | Example                                        |
| -------- | ------------ | ------------------------------------- | ---------------------------------------------- |
| Data     | `fx`         | Interactive JSON viewer               | `cat data.json \| fx`                          |
| Data     | `jq`         | JSON processor (query, transform)     | `cat data.json \| jq '.users[0].name'`         |
| Data     | `yj`         | Convert between YAML/JSON/TOML        | `yj < config.yaml > config.json`               |
| Dev      | `deno`       | Secure JS/TS runtime                  | `deno run script.ts`                           |
| Dev      | `dprint`     | Fast code formatter                   | `dprint fmt`                                   |
| Dev      | `hyperfine`  | Benchmark CLI commands                | `hyperfine 'fd . -e ts' 'find . -name "*.ts"'` |
| Dev      | `neovim`     | Editor                                | `nvim file.ts`                                 |
| Dev      | `node`       | Node.js runtime                       | `node script.js`                               |
| Dev      | `pnpm`       | Fast Node package manager             | `pnpm install`, `pnpm add -D pkg`              |
| Dev      | `uv`         | Fast Python package manager           | `uv pip install pkg`, `uvx ruff`               |
| Docs     | `glow`       | Render markdown in terminal           | `glow README.md`                               |
| Docs     | `mdcat`      | Render markdown (alternative)         | `mdcat README.md`                              |
| Docs     | `pandoc`     | Convert between doc formats           | `pandoc doc.md -o doc.pdf`                     |
| Email    | `himalaya`   | Read/send email from CLI              | `himalaya list`                                |
| Email    | `imapfilter` | Server-side email filtering           | (see config)                                   |
| Email    | `mbsync`     | Sync IMAP to local Maildir            | `mbsync -a`                                    |
| Email    | `notmuch`    | Index and search email                | `notmuch search tag:inbox`                     |
| Git      | `gh`         | GitHub CLI (PRs, issues, repos)       | `gh pr create`, `gh issue list`                |
| Git      | `git-crypt`  | Encrypt files in git transparently    | `git-crypt init`                               |
| Git      | `git-delta`  | Better git diffs                      | (auto via gitconfig)                           |
| Git      | `lazygit`    | Terminal UI for git                   | `lazygit`                                      |
| Git      | `pre-commit` | Git hooks framework                   | `pre-commit install`                           |
| Nav      | `fzf`        | Fuzzy finder for anything             | `ctrl+r` (history), `vim $(fzf)`               |
| Nav      | `tldr`       | Simplified man pages with examples    | `tldr tar`, `tldr git rebase`                  |
| Nav      | `tree`       | Directory tree view                   | `tree -L 2`                                    |
| Nav      | `z`          | Jump to frecent directories           | `z proj` → `~/projects`                        |
| Shell    | `direnv`     | Auto-load .envrc per directory        | `echo 'export API_KEY=xxx' > .envrc`           |
| Shell    | `fish`       | Modern shell with autosuggestions     | (default shell)                                |
| Shell    | `starship`   | Cross-shell prompt                    | config: `~/.config/starship.toml`              |
| Shell    | `gum`        | Pretty shell script UI components     | `gum choose "opt1" "opt2"`                     |
| Shell    | `shellcheck` | Lint shell scripts                    | `shellcheck script.sh`                         |
| Shell    | `shfmt`      | Format shell scripts                  | `shfmt -w script.sh`                           |
| Shell    | `up`         | Interactive piping (Ultimate Plumber) | `cat file \| up`                               |
| System   | `dockutil`   | Manage Dock programmatically          | `dockutil --add /Applications/App.app`         |
| System   | `kilar`      | Interactive port/process manager      | `kilar` (TUI), `kilar -p 3000`                 |
| System   | `mas`        | Mac App Store CLI                     | `mas install 497799835` (Xcode)                |
| System   | `unar`       | Universal archive extractor           | `unar file.zip`, `unar file.tar.gz`            |
| System   | `watch`      | Run command repeatedly                | `watch -n 2 'kubectl get pods'`                |
| System   | `watchman`   | Watch files for changes               | (used by tools like Jest)                      |
| Unix     | `ag`         | Fast code search (replaces grep)      | `ag "TODO" --ts`                               |
| Unix     | `bat`        | Cat with syntax highlighting          | `bat file.ts`                                  |
| Unix     | `btm`        | Modern system monitor (replaces top)  | `btm`                                          |
| Unix     | `fd`         | Simpler find, respects .gitignore     | `fd "\.ts$"`                                   |
| Unix     | `lsd`        | Ls with icons, colors, tree view      | `lsd -la` or `lsd --tree`                      |
| Unix     | `xh`         | Colorized curl alternative            | `xh GET api.example.com/users`                 |

## Dotfiles Inspiration

* __Top Repositories__
  * [mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles) — 31k stars, legendary `.macos` defaults script
  * [holman/dotfiles](https://github.com/holman/dotfiles) — 7.6k stars, topical organization pattern
  * [paulirish/dotfiles](https://github.com/paulirish/dotfiles) — 4.3k stars, fish shell focus
* __Curated Lists__
  * [awesome-dotfiles](https://github.com/webpro/awesome-dotfiles) — comprehensive resource list
  * [dotfiles.github.io](https://dotfiles.github.io/) — community tutorials and inspiration
* __Management Tools__
  * [chezmoi](https://github.com/twpayne/chezmoi) — 17k stars, multi-machine, templating, secrets
  * [yadm](https://github.com/yadm-dev/yadm) — 6k stars, git-based with encryption
