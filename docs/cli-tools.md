# CLI Tools Reference

Quick reference for the CLI tools used by this setup. Most come from the Brewfile; a few are built into macOS.

## Shell Abbreviations

Interactive Fish abbreviations expand classic commands to modern replacements. Scripts are unaffected (abbreviations only fire in interactive mode):

| Type | Expands to | Why |
|---|---|---|
| `ls` | `lsd` | Icons, git integration |
| `cat` | `bat` | Syntax highlighting, paging |
| `grep` | `rg` | Fast, .gitignore-aware |
| `find` | `fd` | Simpler syntax, fast |
| `top` | `btm` | Graphical resource monitor |
| `du` | `dust` | Visual disk usage bars |
| `diff` | `difft` | Structural diff (understands syntax) |
| `vim` | `nvim` | Neovim |

Full list in `home/dot_config/fish/config.fish`.

## Tools Reference

| Category    | Tool         | What it does                          | Example                                         |
| ----------- | ------------ | ------------------------------------- | ----------------------------------------------- |
| **Files**   | `bat`        | Cat with syntax highlighting          | `bat file.ts`                                   |
| Files       | `difft`      | Syntax-aware diff (understands code)  | `difft old.ts new.ts`                           |
| Files       | `fd`         | Simpler find, respects .gitignore     | `fd "\.ts$"`                                    |
| Files       | `lsd`        | Ls with icons, colors, tree view      | `lsd -la` or `lsd --tree`                       |
| Files       | `rg`         | Fast grep (ripgrep)                   | `rg "TODO"`, `rg -t ts "import"`               |
| Files       | `sd`         | Simpler sed                           | `sd 'foo' 'bar' file.txt`                       |
| Files       | `tree`       | Directory tree view                   | `tree -L 2`                                     |
| Files       | `unar`       | Universal archive extractor           | `unar file.zip`, `unar file.tar.gz`             |
| Files       | `yazi`       | Terminal file manager (Rust, previews)| `yazi`, `yazi /path/to/dir`                      |
| Files       | `7z`         | 7-Zip archive tool                    | `7z x archive.7z`, `7z a out.7z dir/`           |
| **Logs**    | `lnav`       | Log navigator (search, filter, SQL)   | `lnav app.log`, `less +F` for quick             |
| Logs        | `multitail`  | Tail multiple files in split view     | `multitail file1.log file2.log`                 |
| **Monitor** | `btm`        | Modern system monitor (replaces top)  | `btm`                                           |
| Monitor     | `dust`       | Visual du with bars                   | `dust`, `dust -d 2`                             |
| Monitor     | `duf`        | Modern df with colors                 | `duf`                                           |
| Monitor     | `procs`      | Modern ps with colors/tree            | `procs`, `procs --tree`                         |
| Monitor     | `watch`      | Run command repeatedly                | `watch -n 2 'kubectl get pods'`                 |
| Monitor     | `watchman`   | Watch files for changes               | (used by tools like Jest)                       |
| **Network** | `doggo`      | Colorized dig/DNS lookup              | `doggo example.com`, `doggo MX gmail.com`       |
| Network     | `gping`      | Ping with live graph                  | `gping google.com cloudflare.com`               |
| Network     | `networkQuality` | Built-in macOS network speed/quality test | `networkQuality`                           |
| Network     | `xh`         | Colorized curl alternative            | `xh GET api.example.com/users`                  |
| **Data**    | `fx`         | Interactive JSON viewer               | `cat data.json \| fx`                           |
| Data        | `jq`         | JSON processor (query, transform)     | `cat data.json \| jq '.users[0].name'`          |
| Data        | `yj`         | Convert between YAML/JSON/TOML        | `yj < config.yaml > config.json`                |
| **Search**  | `fzf`        | Fuzzy finder for anything             | `ctrl+r` (history), `vim $(fzf)`                |
| Search      | `tldr`       | Simplified man pages via `tlrc`       | `tldr tar`, `tldr git rebase`                   |
| Search      | `z` (zoxide) | Jump to frecent directories           | `z proj` → `~/projects`                         |
| **Git**     | `gh`         | GitHub CLI (PRs, issues, repos)       | `gh pr create`, `gh issue list`                 |
| Git         | `git learn`  | Custom Git modernization coach        | `git learn switch`, `git cheat config`          |
| AI          | `codex2`     | Codex wrapper with cmux tab sync      | `codex2`, `codex2 resume --last`                |
| Git         | `git-crypt`  | Encrypt files in git transparently    | `git-crypt init`                                |
| Git         | `git-delta`  | Better git diffs                      | (auto via gitconfig)                            |
| Git         | `lazygit`    | Terminal UI for git                   | `lazygit`                                       |
| Git         | `onefetch`   | Git repo stats (neofetch for repos)   | `onefetch` (run in any repo)                    |
| Git         | `pre-commit` | Git hooks framework                   | `pre-commit install`                            |
| AI          | `agentsview` | Browse and search local agent sessions | `agentsview`, `just agentsview-install`         |
| **Dev**     | `deno`       | Secure JS/TS runtime                  | `deno run script.ts`                            |
| Dev         | `dprint`     | Fast code formatter                   | `dprint fmt`                                    |
| Dev         | `hyperfine`  | Benchmark CLI commands                | `hyperfine 'fd . -e ts' 'find . -name "*.ts"'` |
| Dev         | `just`       | Command runner for the dotfiles UX    | `just up`, `just status`                        |
| Dev         | `neovim`     | Editor                                | `nvim file.ts`                                  |
| Dev         | `node`       | Node.js runtime                       | `node script.js`                                |
| Dev         | `pnpm`       | Fast Node package manager             | `pnpm install`, `pnpm add -D pkg`              |
| Dev         | `uv`         | Fast Python package manager           | `uv pip install pkg`, `uvx ruff`                |
| **Shell**   | `direnv`     | Auto-load .envrc per directory        | `echo 'export API_KEY=xxx' > .envrc`            |
| Shell       | `fish`       | Modern shell with autosuggestions     | (default shell)                                 |
| Shell       | `gum`        | Pretty shell script UI components     | `gum choose "opt1" "opt2"`                      |
| Shell       | `shellcheck` | Lint shell scripts                    | `shellcheck script.sh`                          |
| Shell       | `shfmt`      | Format shell scripts                  | `shfmt -w script.sh`                            |
| Shell       | `starship`   | Cross-shell prompt                    | config: `~/.config/starship.toml`               |
| Shell       | `up`         | Interactive piping (Ultimate Plumber) | `cat file \| up`                                |
| Shell       | `zmx`        | Persistent terminal sessions          | `zmx attach dotfiles`                           |
| Shell       | `zsm`        | TUI manager for zmx sessions          | `zsm`                                           |
| **Media**   | `ffmpeg`     | Audio/video processing Swiss Army knife | `ffmpeg -i in.mp4 out.gif`                    |
| **Docs**    | `glow`       | Render markdown in terminal           | `glow README.md`                                |
| Docs        | `pandoc`     | Convert between doc formats           | `pandoc doc.md -o doc.pdf`                      |
| **Email**   | `himalaya`   | Read/send email from CLI              | `himalaya list`                                 |
| Email       | `imapfilter` | Server-side email filtering           | (see config)                                    |
| Email       | `mbsync`     | Sync IMAP to local Maildir            | `mbsync -a`                                     |
| Email       | `notmuch`    | Index and search email                | `notmuch search tag:inbox`                      |
| **Messages** | `imsg`      | Messages.app CLI (read, watch, send)  | `imsg watch --json`, `imsg history --chat-id 1` |
| **Passwords** | `apw`      | CLI for Apple Passwords (iCloud Keychain) | `apw pw list authentication.td.com` — see [apw notes](#apw-apple-passwords-cli) |
| **macOS**   | `dockutil`   | Manage Dock programmatically          | `dockutil --add /Applications/App.app`          |
| macOS       | `mas`        | Mac App Store CLI                     | `mas install 497799835` (Xcode)                 |
| **Info**    | `cal`        | 3-month calendar view                 | `cal`                                           |
| Info        | `fastfetch`  | Fast system info overview             | `fastfetch`                                     |
| Info        | `weather`    | Terminal weather forecast             | `weather` (Montreal) or `weather Tokyo`         |

## Git Guardrails

In interactive Fish, dangerous legacy Git commands are intentionally blocked:

- `git checkout`
- `git push --force`
- `git reset --hard`

Use the modern replacements instead:

- `gco` or `git switch`
- `git pf` or `git push --force-with-lease`
- `git restore`, `git reset --soft`, `git revert`, `git reflog`

If you truly need the raw command, bypass the Fish wrapper with `command git ...`.

## apw (Apple Passwords CLI)

[bendews/apw](https://github.com/bendews/apw) provides CLI access to Apple Passwords (iCloud Keychain). It runs a local daemon that communicates with the macOS Passwords helper binary.

### Status: Broken on macOS 15.4+

As of macOS 15.4, Apple added XProtect rules that block the Passwords helper binary from being called by unsigned applications. The `apw auth` command hangs indefinitely because the helper exits immediately under XProtect enforcement.

- **Issue:** [bendews/apw#10](https://github.com/bendews/apw/issues/10) — "`apw auth` does not work on Mac OS 15.4"
- **Root cause:** Apple's XProtect anti-malware framework now restricts execution of the Passwords helper to signed/allowlisted applications. The same restriction broke the iCloud Passwords browser extension in unsigned browsers (e.g. Zen Browser).
- **Maintainer status:** Considering Apple Developer signing ($150 AUD) and requesting allowlist inclusion, but has not done so yet. No timeline.
- **Workaround:** None that preserves system security. Disabling SIP works but is not acceptable.

### Watch for

- A new `apw` release that includes Apple code signing — this would likely resolve the XProtect block
- Changes to [bendews/apw#10](https://github.com/bendews/apw/issues/10) comments
- macOS updates that may change XProtect behavior (one user on 15.7.1 reported it spontaneously started working, cause unknown)

### Usage (when working)

```bash
brew services start bendews/tap/apw   # start daemon (auto-starts on boot)
apw auth                               # authenticate (Touch ID / password, once per boot)
apw pw list authentication.td.com      # query password as JSON
apw pw                                 # interactive password browser
apw otp                                # interactive OTP browser
```

### Interim alternative

Use the macOS `security` CLI with the local login keychain (not iCloud Keychain):

```bash
# Store a credential (one-time)
security add-internet-password -s "authentication.td.com" -a "rosekuhrt" -w "<password>" -l "TD"

# Retrieve it
security find-internet-password -s "authentication.td.com" -w
```

This does not sync with iCloud Keychain — password changes in the Passwords app must be manually re-added.
