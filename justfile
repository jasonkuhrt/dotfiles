set quiet

# ─────────────────────────────────────────────────────────
# Dotfiles command runner
# ─────────────────────────────────────────────────────────

# List available recipes
default:
    just --list

# ─────────────────────────────────────────────────────────
# Core workflow
# ─────────────────────────────────────────────────────────

# Full sync: commit, pull, push, apply
sync:
    #!/usr/bin/env bash
    set -e
    if [ -n "$(git status --porcelain)" ]; then
        echo "── Committing changes ──"
        git add -A
        git commit -v
    fi
    echo "── Git sync ──"
    git pull --rebase
    git push
    echo "── Applying dotfiles ──"
    chezmoi apply -v

# Apply dotfiles (preview with --dry-run)
apply *args:
    chezmoi apply -v {{ args }}

# Preview changes without applying
diff:
    chezmoi diff

# ─────────────────────────────────────────────────────────
# Inspection
# ─────────────────────────────────────────────────────────

# Check system health
doctor:
    chezmoi doctor

# Detect drift between source and target
verify:
    chezmoi verify

# List all managed files
managed:
    chezmoi managed

# Find files in ~/.config NOT managed by chezmoi
unmanaged:
    chezmoi unmanaged --path-style=absolute ~/.config

# ─────────────────────────────────────────────────────────
# Editing
# ─────────────────────────────────────────────────────────

# Edit a config's source file by its target path
edit target:
    chezmoi edit {{ target }}

# Capture external changes back to source (e.g. after Fisher modifies fish_plugins)
re-add *args:
    chezmoi re-add {{ args }}

# Update from remote + apply
update:
    chezmoi update

# ─────────────────────────────────────────────────────────
# Brew
# ─────────────────────────────────────────────────────────

# Install/update Homebrew packages from Brewfile
brew:
    brew bundle --file=$(chezmoi source-path)/Brewfile

# Show what's missing from Brewfile
brew-check:
    brew bundle check --file=$(chezmoi source-path)/Brewfile --verbose || true

# Clean up packages not in Brewfile
brew-cleanup:
    brew bundle cleanup --file=$(chezmoi source-path)/Brewfile

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
