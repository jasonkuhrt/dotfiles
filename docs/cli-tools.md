# CLI Tools Reference

Quick reference for all the tools installed via Brewfile. Forget what something does? Check here.

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
| **Logs**    | `lnav`       | Log navigator (search, filter, SQL)   | `lnav app.log`, `less +F` for quick             |
| Logs        | `multitail`  | Tail multiple files in split view     | `multitail file1.log file2.log`                 |
| **Monitor** | `btm`        | Modern system monitor (replaces top)  | `btm`                                           |
| Monitor     | `dust`       | Visual du with bars                   | `dust`, `dust -d 2`                             |
| Monitor     | `duf`        | Modern df with colors                 | `duf`                                           |
| Monitor     | `kilar`      | Interactive port/process manager      | `kilar` (TUI), `kilar -p 3000`                  |
| Monitor     | `procs`      | Modern ps with colors/tree            | `procs`, `procs --tree`                         |
| Monitor     | `watch`      | Run command repeatedly                | `watch -n 2 'kubectl get pods'`                 |
| Monitor     | `watchman`   | Watch files for changes               | (used by tools like Jest)                       |
| **Network** | `doggo`      | Colorized dig/DNS lookup              | `doggo example.com`, `doggo MX gmail.com`       |
| Network     | `gping`      | Ping with live graph                  | `gping google.com cloudflare.com`               |
| Network     | `speedtest`  | Internet speed test                   | `speedtest`                                     |
| Network     | `xh`         | Colorized curl alternative            | `xh GET api.example.com/users`                  |
| **Data**    | `fx`         | Interactive JSON viewer               | `cat data.json \| fx`                           |
| Data        | `jq`         | JSON processor (query, transform)     | `cat data.json \| jq '.users[0].name'`          |
| Data        | `yj`         | Convert between YAML/JSON/TOML        | `yj < config.yaml > config.json`                |
| **Search**  | `fzf`        | Fuzzy finder for anything             | `ctrl+r` (history), `vim $(fzf)`                |
| Search      | `tldr`       | Simplified man pages with examples    | `tldr tar`, `tldr git rebase`                   |
| Search      | `z`          | Jump to frecent directories           | `z proj` → `~/projects`                         |
| **Git**     | `gh`         | GitHub CLI (PRs, issues, repos)       | `gh pr create`, `gh issue list`                 |
| Git         | `git-crypt`  | Encrypt files in git transparently    | `git-crypt init`                                |
| Git         | `git-delta`  | Better git diffs                      | (auto via gitconfig)                            |
| Git         | `lazygit`    | Terminal UI for git                   | `lazygit`                                       |
| Git         | `onefetch`   | Git repo stats (neofetch for repos)   | `onefetch` (run in any repo)                    |
| Git         | `pre-commit` | Git hooks framework                   | `pre-commit install`                            |
| **Dev**     | `deno`       | Secure JS/TS runtime                  | `deno run script.ts`                            |
| Dev         | `dprint`     | Fast code formatter                   | `dprint fmt`                                    |
| Dev         | `hyperfine`  | Benchmark CLI commands                | `hyperfine 'fd . -e ts' 'find . -name "*.ts"'` |
| Dev         | `just`       | Command runner (modern make)          | `just --list`, `just sync`                      |
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
| **Docs**    | `glow`       | Render markdown in terminal           | `glow README.md`                                |
| Docs        | `mdcat`      | Render markdown (alternative)         | `mdcat README.md`                               |
| Docs        | `pandoc`     | Convert between doc formats           | `pandoc doc.md -o doc.pdf`                      |
| **Email**   | `himalaya`   | Read/send email from CLI              | `himalaya list`                                 |
| Email       | `imapfilter` | Server-side email filtering           | (see config)                                    |
| Email       | `mbsync`     | Sync IMAP to local Maildir            | `mbsync -a`                                     |
| Email       | `notmuch`    | Index and search email                | `notmuch search tag:inbox`                      |
| **macOS**   | `dockutil`   | Manage Dock programmatically          | `dockutil --add /Applications/App.app`          |
| macOS       | `mas`        | Mac App Store CLI                     | `mas install 497799835` (Xcode)                 |
| **Info**    | `cal`        | 3-month calendar view                 | `cal`                                           |
| Info        | `neofetch`   | System info with ASCII art            | `neofetch`                                      |
| Info        | `weather`    | Terminal weather forecast             | `weather` (Montreal) or `weather Tokyo`         |
