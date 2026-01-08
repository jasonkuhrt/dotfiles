# dotfiles

```sh
git clone https://github.com/jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
~/projects/jasonkuhrt/dotfiles/bin/sync
```

## How it works

`bin/sync` creates symlinks from your home directory to this repo (selective files, not whole directories):

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

Re-run `bin/sync` when:
- New packages added to `Brewfile`
- New features added to `bin/sync`

## Manual Setup (after sync)

Things that can't be fully automated:

1. **Fish secrets**: Add API keys/tokens to `~/.config/fish/config.secrets.fish` (gitignored):
   ```fish
   set -gx GITHUB_PERSONAL_ACCESS_TOKEN 'ghp_...'
   ```
2. **Caps Lock → Ctrl**: System Settings > Keyboard > Keyboard Shortcuts > Modifier Keys
3. **GitHub CLI**: Authenticate with GitHub
   ```sh
   gh auth login
   ```
4. **SSH key**: Generate if missing, add to GitHub
   ```sh
   ssh-keygen -t ed25519 -C "jasonkuhrt@me.com"
   gh ssh-key add ~/.ssh/id_ed25519.pub
   ```
5. **Raycast hotkey**: Set Cmd+Space in Raycast preferences (after disabling Spotlight's shortcut)
6. **Spotlight shortcut**: System Settings > Keyboard > Keyboard Shortcuts > Spotlight > uncheck "Show Spotlight search"
7. **Wispr Flow**: Download from [wispr.com](https://www.wispr.com/) (not in Homebrew)
8. **Browser sync**: Chrome syncs via Google login, Safari syncs via iCloud
9. **Auto-login** (optional, less secure): System Settings > Users & Groups > Login Options > Automatic login
10. **Email password**: Add iCloud app-specific password to keychain:
   ```sh
   security add-generic-password -s 'mbsync-icloud' -a 'jasonkuhrt@me.com' -w 'YOUR_APP_PASSWORD'
   ```

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
- https://github.com/scopecraft/command
