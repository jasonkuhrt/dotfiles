# dotfiles

**Step 1:** Install Xcode CLI tools (click "Install" in popup, wait for completion)

```sh
xcode-select --install
```

**Step 2:** Clone and sync

```sh
mkdir -p ~/projects/jasonkuhrt
git clone https://github.com/jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
cd ~/projects/jasonkuhrt/dotfiles && ./sync
```

## How it works

`sync` creates symlinks from your home directory to this repo (selective files, not whole directories):

| System Location                       | Dotfiles Source               |
| ------------------------------------- | ----------------------------- |
| **Claude Code**                       |                               |
| `~/.claude/CLAUDE.md`                 | `./claude/CLAUDE.md`          |
| `~/.claude/settings.json`             | `./claude/settings.json`      |
| `~/.claude/commands/`                 | `./claude/commands/`          |
| `~/.claude/rules/`                    | `./claude/rules/`             |
| **Zed**                               |                               |
| `~/.config/zed/settings.json`         | `./zed/settings.json`         |
| `~/.config/zed/keymap.json`           | `./zed/keymap.json`           |
| `~/.config/zed/tasks.json`            | `./zed/tasks.json`            |
| `~/.config/zed/snippets/`             | `./zed/snippets/`             |
| `~/.config/zed/toggle-chore-files.sh` | `./zed/toggle-chore-files.sh` |
| **Ghostty**                           |                               |
| `~/.config/ghostty/config`            | `./ghostty/config`            |
| **Neovim**                            |                               |
| `~/.config/nvim/init.vim`             | `./nvim/init.vim`             |
| **Fish**                              |                               |
| `~/.config/fish/config.fish`          | `./fish/config.fish`          |
| `~/.config/fish/fish_plugins`         | `./fish/fish_plugins`         |
| **Email**                             |                               |
| `~/.mbsyncrc`                         | `./email/mbsyncrc`            |
| `~/.imapfilter/config.lua`            | `./email/imapfilter.lua`      |
| `~/.config/himalaya/config.toml`      | `./email/himalaya.toml`       |
| `~/.config/notmuch/default/config`    | `./email/notmuch.config`      |
| **Dock**                              |                               |
| _(configured via `./dock/apps.txt`)_  |                               |
| **Other**                             |                               |
| `~/.config/dprint/dprint.json`        | `./dprint/dprint.json`        |
| `~/.config/gh/config.yml`             | `./gh/config.yml`             |
| `~/.config/git/ignore`                | `./git/ignore`                |
| `~/.config/libra/config.json`         | `./libra/config.json`         |
| `~/.config/vim/.vimrc`                | `./vim/vimrc`                 |
| `~/.ssh/config`                       | `./ssh/config`                |
| `~/.gitconfig`                        | `./git/.gitconfig`            |
| `~/.npmrc`                            | `./npmrc`                     |

**Edits are live.** Since these are symlinks, editing any file here immediately affects your system.

Re-run `./sync` when:

- New packages added to `Brewfile`
- New features added to `sync`

## Tips

- Use `./sync` not `sync` — there's a system `/bin/sync` command that shadows it

## Node Package Management

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ PATH order (first wins)                                         │
├─────────────────────────────────────────────────────────────────┤
│ ~/.npm-global/bin      ← npm globals (claude, dprint, nx, etc) │
│ ~/Library/pnpm         ← pnpm binaries (node, npm, pnpm)       │
│ /opt/homebrew/bin      ← brew (fallback node, initial pnpm)    │
└─────────────────────────────────────────────────────────────────┘
```

### Why this setup?

| Tool     | Manages                         | Location                                  |
| -------- | ------------------------------- | ----------------------------------------- |
| Homebrew | Initial bootstrap (node + pnpm) | `/opt/homebrew/bin`                       |
| pnpm     | Node versions (`pnpm env use`)  | `~/Library/pnpm/nodejs/<ver>`             |
| npm      | Global CLI tools                | `~/.npm-global` (fixed, version-agnostic) |

**Key insight**: npm globals are installed to a fixed location (`~/.npm-global`) independent of which node version pnpm is using. This means `pnpm env use 22` won't break your global tools.

### Bootstrap flow (fresh machine)

1. `brew install node pnpm` — initial node + pnpm
2. `pnpm env use --global lts` — pnpm installs its own node, shadows brew's
3. `./sync` — installs npm globals to `~/.npm-global`

After bootstrap, brew's node is effectively unused (pnpm's comes first in PATH).

### npx fallback chain

```
npx <cmd>  →  local node_modules  →  ~/.npm-global  →  downloads
```

This is why we use npm (not pnpm) for globals — `npx` checks npm's global dir.

## Manual Setup (after sync)

Things that can't be fully automated:

### 1. Fish secrets

Edit [fish/config.secrets.fish](fish/config.secrets.fish) (created from template by sync, gitignored) with your tokens.

### 2. macOS Settings

**Caps Lock → Ctrl**

```sh
open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
```

- Click **Keyboard Shortcuts...** button (right side)
- Select **Modifier Keys** in left sidebar
- Change **Caps Lock** dropdown to **Control**
- Click **Done**

**Spotlight shortcut** (disable to free Cmd+Space for Raycast)

```sh
open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
```

- Click **Keyboard Shortcuts...** button (right side)
- Select **Spotlight** in left sidebar
- Uncheck **Show Spotlight search**

**Auto-login** (optional, less secure)

```sh
open "x-apple.systempreferences:com.apple.Users-Groups-Settings.extension"
```

- Click **Login Options** (bottom of user list)
- Set **Automatic login** to your user

### 3. GitHub

```sh
# Authenticate CLI
gh auth login

# Generate SSH key (if missing) and add to GitHub
ssh-keygen -t ed25519 -C "jasonkuhrt@me.com"
gh ssh-key add ~/.ssh/id_ed25519.pub
```

### 4. Raycast hotkey

```sh
open -a Raycast
```

- Press **Cmd+,** to open preferences
- Go to **Extensions** tab (left sidebar)
- Set **Raycast Hotkey** to **Cmd+Space**

### 5. Wispr Flow

Download from [wispr.com](https://www.wispr.com/) (not in Homebrew).

### 6. Email password

Generate an [iCloud app-specific password](https://appleid.apple.com/account/manage), then:

```sh
security add-generic-password -s 'mbsync-icloud' -a 'jasonkuhrt@me.com' -w 'YOUR_APP_PASSWORD'
```

---

**Note:** Browser sync happens automatically — Chrome via Google login, Safari via iCloud.

## Claude Code Resources

**Docs & Guides**

- https://docs.claude.com/en/docs/claude-code/overview
- https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- https://agents.md/

**Curated Lists**

- https://github.com/hesreallyhim/awesome-claude-code
- https://claudecodecommands.directory/
- https://github.com/ComposioHQ/awesome-claude-skills

**MCPs**

- https://modelcontextprotocol.io
- https://glama.ai/mcp
- https://ref.tools/
- https://github.com/oraios/serena

**Tools**

- https://wisprflow.ai/
- https://github.com/sirmalloc/ccstatusline
- `npx ccusage@latest`

**Examples & Workflows**

- https://github.com/anthropics/skills/tree/main
- https://github.com/anthropics/claude-code-action
- https://github.com/OneRedOak/claude-code-workflows

**Community**

- https://github.com/obra/superpowers - worth watching (issues, PRs, discussions) as it's become a hub attracting users of various AI coding tools sharing bleeding-edge techniques
- https://github.com/scopecraft/command

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

**Top Repositories** (by stars)

- [mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles) - 31k stars, legendary `.macos` defaults script
- [holman/dotfiles](https://github.com/holman/dotfiles) - 7.6k stars, topical organization pattern
- [paulirish/dotfiles](https://github.com/paulirish/dotfiles) - 4.3k stars, fish shell focus

**Curated Lists**

- [awesome-dotfiles](https://github.com/webpro/awesome-dotfiles) - Comprehensive resource list
- [dotfiles.github.io](https://dotfiles.github.io/) - Community tutorials and inspiration

**Management Tools**

- [chezmoi](https://github.com/twpayne/chezmoi) - 17k stars, multi-machine, templating, secrets
- [yadm](https://github.com/yadm-dev/yadm) - 6k stars, git-based with encryption
