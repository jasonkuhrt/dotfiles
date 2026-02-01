set quiet

# ─────────────────────────────────────────────────────────
# Dotfiles command runner
# ─────────────────────────────────────────────────────────

# List available recipes
default:
    just --list

# ─────────────────────────────────────────────────────────
# Sync
# ─────────────────────────────────────────────────────────

# Sync dotfiles (symlinks, brew, configs)
sync *args:
    ./sync {{ args }}

# Sync with verbose output
sync-verbose:
    ./sync --verbose

# Run pending migrations then sync
migrate:
    ./sync --migrate

# Run pending migrations only (no sync)
migrate-only:
    ./sync --migrate-only

# ─────────────────────────────────────────────────────────
# Brew
# ─────────────────────────────────────────────────────────

# Install/update Homebrew packages from Brewfile
brew:
    brew bundle --file=Brewfile

# Show what's missing from Brewfile
brew-check:
    brew bundle check --file=Brewfile --verbose || true

# Clean up packages not in Brewfile
brew-cleanup:
    brew bundle cleanup --file=Brewfile

# ─────────────────────────────────────────────────────────
# Go tools (no Homebrew tap available)
# ─────────────────────────────────────────────────────────

# Install/update lazybeads TUI for beads
install-lazybeads:
    cd /tmp && rm -rf lazybeads && git clone --depth 1 https://github.com/codegangsta/lazybeads.git && cd lazybeads && go install .

# ─────────────────────────────────────────────────────────
# Shan (Claude Code tooling)
# ─────────────────────────────────────────────────────────

# Show shan help
shan:
    bun packages/shan/src/bin/shan.ts

# Dump session transcript as Markdown
transcript-dump *args:
    bun packages/shan/src/bin/shan.ts transcript dump {{ args }}

# Analyze session context consumption
transcript-analyze *args:
    bun packages/shan/src/bin/shan.ts transcript analyze {{ args }}

# Dump task list as JSON (or --md for Markdown)
task-dump *args:
    bun packages/shan/src/bin/shan.ts task dump {{ args }}

# Open task list in editor
task-open *args:
    bun packages/shan/src/bin/shan.ts task open {{ args }}

# ─────────────────────────────────────────────────────────
# Research
# ─────────────────────────────────────────────────────────

# List current research files
research-list:
    ./claude/skills/research/research.sh list

# Create new research file
research-new topic:
    ./claude/skills/research/research.sh new {{ topic }}

# Archive research files older than 30 days
research-cleanup:
    ./claude/skills/research/research.sh cleanup

# ─────────────────────────────────────────────────────────
# Edit
# ─────────────────────────────────────────────────────────

# Open Brewfile in editor
edit-brew:
    $EDITOR Brewfile

# Open fish config in editor
edit-fish:
    $EDITOR fish/config.fish

# Open git config in editor
edit-git:
    $EDITOR git/.gitconfig

# Open Zed settings in editor
edit-zed:
    $EDITOR zed/settings.json

# Open Ghostty config in editor
edit-ghostty:
    $EDITOR ghostty/config

# Open starship config in editor
edit-starship:
    $EDITOR starship/starship.toml

# Open tmux config in editor
edit-tmux:
    $EDITOR tmux/.tmux.conf
