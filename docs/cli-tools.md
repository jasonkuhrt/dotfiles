# CLI Tools Reference

Quick reference for all the tools installed via Brewfile. Forget what something does? Check here.

| Category | Tool         | What it does                          | Example                                        |
| -------- | ------------ | ------------------------------------- | ---------------------------------------------- |
| Data     | `fx`         | Interactive JSON viewer               | `cat data.json \| fx`                          |
| Data     | `jq`         | JSON processor (query, transform)     | `cat data.json \| jq '.users[0].name'`         |
| Data     | `yj`         | Convert between YAML/JSON/TOML        | `yj < config.yaml > config.json`               |
| Dev      | `deno`       | Secure JS/TS runtime                  | `deno run script.ts`                           |
| Dev      | `just`       | Command runner (modern make)          | `just --list`, `just sync`                     |
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
| Unix     | `bat`        | Cat with syntax highlighting          | `bat file.ts`                                  |
| Unix     | `btm`        | Modern system monitor (replaces top)  | `btm`                                          |
| Unix     | `difft`      | Syntax-aware diff (understands code)  | `difft old.ts new.ts`                          |
| Unix     | `dog`        | Colorized dig/DNS lookup              | `dog example.com`, `dog MX gmail.com`          |
| Unix     | `duf`        | Modern df with colors                 | `duf`                                          |
| Unix     | `dust`       | Visual du with bars                   | `dust`, `dust -d 2`                            |
| Unix     | `fd`         | Simpler find, respects .gitignore     | `fd "\.ts$"`                                   |
| Unix     | `gping`      | Ping with live graph                  | `gping google.com cloudflare.com`              |
| Unix     | `lsd`        | Ls with icons, colors, tree view      | `lsd -la` or `lsd --tree`                      |
| Unix     | `procs`      | Modern ps with colors/tree            | `procs`, `procs --tree`                        |
| Unix     | `rg`         | Fast grep (ripgrep)                   | `rg "TODO"`, `rg -t ts "import"`               |
| Unix     | `sd`         | Simpler sed                           | `sd 'foo' 'bar' file.txt`                      |
| Unix     | `weather`    | Terminal weather forecast             | `weather` (Montreal) or `weather Tokyo`        |
| Unix     | `xh`         | Colorized curl alternative            | `xh GET api.example.com/users`                 |
| Info     | `cal`        | 3-month calendar view                 | `cal`                                          |
| Info     | `neofetch`   | System info with ASCII art            | `neofetch`                                     |
| Info     | `onefetch`   | Git repo stats (neofetch for repos)   | `onefetch` (run in any repo)                   |
| Info     | `speedtest`  | Internet speed test                   | `speedtest`                                    |
