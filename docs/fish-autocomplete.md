# Fish Autocomplete System

Audit and decisions from 2026-03-09.

## Active Stack

- **fzf 0.70** + **patrickf1/fzf.fish** — fuzzy search modes for history, files, git log/status, processes, variables
- **zoxide** — frecency-based smart cd (replaced jethrokuan/z)
- **fd** — file finder used by fzf (replaced ag for `FZF_DEFAULT_COMMAND`)
- **Fish 4.5** native completions — fuzzy subsequence matching for options (`--fb` matches `--foobar`)

## Key Bindings (fzf.fish)

| Binding | Mode | Action |
|---------|------|--------|
| `Ctrl+R` | History | Fuzzy search shell history with preview |
| `Ctrl+Alt+F` | Files | Search files via fd with bat preview |
| `Ctrl+Alt+L` | Git Log | Search commit history |
| `Ctrl+Alt+S` | Git Status | Search changed files |
| `Ctrl+Alt+P` | Processes | Search and kill processes |
| `Ctrl+V` | Variables | Search shell variables |

## Decisions

### Done

1. **fzf.fish bindings after vi mode** — `fish_vi_key_bindings` replaces all bindings, so `fzf_configure_bindings` must be called after it in config.fish
2. **fd over ag for FZF_DEFAULT_COMMAND** — ag is a content searcher being misused as a file lister; fd is purpose-built, faster, respects .gitignore
3. **zoxide over jethrokuan/z** — Rust-based, cross-shell, actively maintained, smarter ranking, auto-prunes deleted dirs. Database imported via `zoxide import --from z`
4. **Dropped ag from Brewfile** — ripgrep covers all content search; ag was only used for the fzf hack

### Not Now

- **Atuin** (shell history database with cross-machine sync) — Overkill for single-machine use. fzf history search is sufficient. Revisit if working across multiple machines or wanting directory/exit-code filtering in history search.
- **Carapace** (universal completion engine, 1000+ CLIs) — Fish 4.5 native completions are excellent. Evaluate if hitting completion gaps for specific tools. The bridging feature (use bash/zsh completions in fish) is the main draw.
- **Amazon Q Developer CLI** (ex-Fig autocomplete) — IDE-style completions for 500+ CLIs. Requires AWS account, not widely adopted in power-user community. Fish native + fzf.fish covers most use cases.
- **navi** (interactive cheatsheets via fzf) — Nice complement but low priority. tldr/tlrc already provides command examples.
