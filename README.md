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

```
# Claude Code
~/.claude/CLAUDE.md           →  ./claude/CLAUDE.md
~/.claude/settings.json       →  ./claude/settings.json
~/.claude/commands/           →  ./claude/commands/
~/.claude/rules/              →  ./claude/rules/

# Zed
~/.config/zed/settings.json        →  ./zed/settings.json
~/.config/zed/keymap.json          →  ./zed/keymap.json
~/.config/zed/tasks.json           →  ./zed/tasks.json
~/.config/zed/snippets/            →  ./zed/snippets/
~/.config/zed/dprint-wrapper.sh    →  ./zed/dprint-wrapper.sh
~/.config/zed/toggle-chore-files.sh →  ./zed/toggle-chore-files.sh

# Ghostty
~/.config/ghostty/config      →  ./ghostty/config

# Neovim
~/.config/nvim/init.vim       →  ./nvim/init.vim

# Fish
~/.config/fish/config.fish    →  ./fish/config.fish
~/.config/fish/fish_plugins   →  ./fish/fish_plugins

# Email
~/.mbsyncrc                        →  ./email/mbsyncrc
~/.imapfilter/config.lua           →  ./email/imapfilter.lua
~/.config/himalaya/config.toml     →  ./email/himalaya.toml
~/.config/notmuch/default/config   →  ./email/notmuch.config

# Dock
# ./dock/apps.txt defines apps to add (empty = clean dock)

# Other
~/.config/dprint.json         →  ./dprint/dprint.json
~/.config/gh/config.yml       →  ./gh/config.yml
~/.config/git/ignore          →  ./git/ignore
~/.config/libra/config.json   →  ./libra/config.json
~/.config/vim/.vimrc          →  ./vim/vimrc
~/.ssh/config                 →  ./ssh/config
~/.gitconfig                  →  ./git/.gitconfig
~/.npmrc                      →  ./npmrc
```

**Edits are live.** Since these are symlinks, editing any file here immediately affects your system.

Re-run `./sync` when:
- New packages added to `Brewfile`
- New features added to `sync`

## Tips

- Use `./sync` not `sync` — there's a system `/bin/sync` command that shadows it

## Notes

### Why global Node packages use npm instead of pnpm

Global packages use npm so `npx` fallback works (local → npm global → download). pnpm is still used for project dependencies. See `node-packages` plugin skill for details.

## Manual Setup (after sync)

Things that can't be fully automated:

1. **Fish secrets**: Edit [fish/config.secrets.fish](fish/config.secrets.fish) (created from template by sync, gitignored) with your tokens
2. **macOS Settings**:
   - **Caps Lock → Ctrl**: Keyboard Shortcuts > Modifier Keys
     ```sh
     open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
     ```
   - **Spotlight shortcut**: Keyboard Shortcuts > Spotlight > uncheck "Show Spotlight search"
     ```sh
     open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
     ```
   - **Auto-login** (optional, less secure): Login Options > Automatic login
     ```sh
     open "x-apple.systempreferences:com.apple.Users-Groups-Settings.extension"
     ```
3. **GitHub**:
   - **CLI auth**: Authenticate with GitHub
     ```sh
     gh auth login
     ```
   - **SSH key**: Generate if missing, add to GitHub
     ```sh
     ssh-keygen -t ed25519 -C "jasonkuhrt@me.com"
     gh ssh-key add ~/.ssh/id_ed25519.pub
     ```
4. **Raycast hotkey**: Set Cmd+Space in Raycast preferences (after disabling Spotlight's shortcut)
5. **Wispr Flow**: Download from [wispr.com](https://www.wispr.com/) (not in Homebrew)
6. **Email password**: Add iCloud app-specific password to keychain:
   ```sh
   security add-generic-password -s 'mbsync-icloud' -a 'jasonkuhrt@me.com' -w 'YOUR_APP_PASSWORD'
   ```

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

### Modern Unix Replacements

| Tool | Replaces | What it does | Example |
|------|----------|--------------|---------|
| `bat` | `cat` | Syntax highlighting, line numbers, git integration | `bat file.ts` |
| `fd` | `find` | Simpler syntax, respects .gitignore, faster | `fd "\.ts$"` |
| `ag` | `grep` | Fast code search, respects .gitignore | `ag "TODO" --ts` |
| `lsd` | `ls` | Icons, colors, tree view, git status | `lsd -la` or `lsd --tree` |
| `xh` | `curl` | Colorized output, simpler syntax | `xh GET api.example.com/users` |
| `btm` | `top`/`htop` | Modern system monitor with graphs | `btm` |
| `git-delta` | `diff` | Side-by-side diffs, syntax highlighting | (auto via gitconfig) |

### Search & Navigation

| Tool | What it does | Example |
|------|--------------|---------|
| `fzf` | Fuzzy finder for anything | `ctrl+r` (history), `vim $(fzf)` |
| `z` | Jump to frecent directories | `z proj` → `~/projects` |
| `tree` | Directory tree view | `tree -L 2` |
| `tldr` | Simplified man pages with examples | `tldr tar`, `tldr git rebase` |

### JSON/YAML/Data

| Tool | What it does | Example |
|------|--------------|---------|
| `jq` | JSON processor (query, transform) | `cat data.json \| jq '.users[0].name'` |
| `fx` | Interactive JSON viewer | `cat data.json \| fx` |
| `yj` | Convert between YAML/JSON/TOML | `yj < config.yaml > config.json` |

### Shell & Scripts

| Tool | What it does | Example |
|------|--------------|---------|
| `fish` | Modern shell with autosuggestions | (default shell) |
| `direnv` | Auto-load .envrc per directory | `echo 'export API_KEY=xxx' > .envrc && direnv allow` |
| `shellcheck` | Lint shell scripts | `shellcheck script.sh` |
| `shfmt` | Format shell scripts | `shfmt -w script.sh` |
| `gum` | Pretty shell script UI components | `gum choose "opt1" "opt2"` |
| `up` | Interactive piping (Ultimate Plumber) | `cat file \| up` (build pipeline interactively) |

### Git & GitHub

| Tool | What it does | Example |
|------|--------------|---------|
| `gh` | GitHub CLI (PRs, issues, repos) | `gh pr create`, `gh issue list` |
| `lazygit` | Terminal UI for git (visual staging, commits) | `lazygit` |
| `git-delta` | Better git diffs | (auto via gitconfig) |
| `git-crypt` | Encrypt files in git transparently | `git-crypt init && git-crypt add-gpg-user` |
| `pre-commit` | Git hooks framework | `pre-commit install` |

### Document & Markdown

| Tool | What it does | Example |
|------|--------------|---------|
| `glow` | Render markdown in terminal | `glow README.md` |
| `mdcat` | Render markdown (alternative) | `mdcat README.md` |
| `pandoc` | Convert between doc formats | `pandoc doc.md -o doc.pdf` |

### Development

| Tool | What it does | Example |
|------|--------------|---------|
| `node` | Node.js runtime | `node script.js` |
| `pnpm` | Fast Node package manager | `pnpm install`, `pnpm add -D pkg` |
| `deno` | Secure JS/TS runtime | `deno run script.ts` |
| `uv` | Fast Python package manager | `uv pip install pkg`, `uvx ruff` |
| `dprint` | Fast code formatter | `dprint fmt` |
| `neovim` | Editor | `nvim file.ts` |
| `hyperfine` | Benchmark CLI commands | `hyperfine 'fd . -e ts' 'find . -name "*.ts"'` |

### System & macOS

| Tool | What it does | Example |
|------|--------------|---------|
| `mas` | Mac App Store CLI | `mas install 497799835` (Xcode) |
| `dockutil` | Manage Dock programmatically | `dockutil --add /Applications/App.app` |
| `watch` | Run command repeatedly | `watch -n 2 'kubectl get pods'` |
| `watchman` | Watch files for changes | (used by tools like Jest) |

### Email (CLI-based workflow)

| Tool | What it does |
|------|--------------|
| `mbsync` (isync) | Sync IMAP to local Maildir |
| `notmuch` | Index and search email |
| `himalaya` | Read/send email from CLI |
| `imapfilter` | Server-side email filtering |

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
