# How It Works

`sync` creates symlinks from your home directory to this repo (selective files, not whole directories):

| System Location                       | Dotfiles Source               |
| ------------------------------------- | ----------------------------- |
| __Claude Code__                       |                               |
| `~/.claude/CLAUDE.md`                 | `./claude/CLAUDE.md`          |
| `~/.claude/settings.json`             | _(not synced, see below)_     |
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
| `~/.config/bat/config`                | `./bat/config`                |
| `~/.config/dprint/dprint.json`        | `./dprint/dprint.json`        |
| `~/.config/starship.toml`             | `./starship/starship.toml`    |
| `~/.config/gh/config.yml`             | `./gh/config.yml`             |
| `~/.config/git/ignore`                | `./git/ignore`                |
| `~/.config/libra/config.json`         | `./libra/config.json`         |
| `~/.config/vim/.vimrc`                | `./vim/vimrc`                 |
| `~/.ssh/config`                       | `./ssh/config`                |
| `~/.gitconfig`                        | `./git/.gitconfig`            |
| `~/.npmrc`                            | `./npmrc`                     |

## Notes

* __Browser sync__ — automatic via Google login (Chrome) and iCloud (Safari)
* __Keyboard settings__ — sync sets fast key repeat via `defaults`, but requires logout/login to take effect
