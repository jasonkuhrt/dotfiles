set quiet

# ─────────────────────────────────────────────────────────
# Dotfiles command runner
# ─────────────────────────────────────────────────────────

# List available recipes
default:
    just --list

# ─────────────────────────────────────────────────────────
# Chezmoi
# ─────────────────────────────────────────────────────────

# Apply dotfiles (preview with --dry-run)
apply *args:
    chezmoi apply -v {{ args }}

# Preview changes without applying
diff:
    chezmoi diff

# Check system health
doctor:
    chezmoi doctor

# Detect drift between source and target
verify:
    chezmoi verify

# Capture external changes back to source (e.g. after Fisher modifies fish_plugins)
re-add *args:
    chezmoi re-add {{ args }}

# Edit a config's source file by its target path
edit target:
    chezmoi edit {{ target }}

# Update from remote + apply
update:
    chezmoi update

# List all managed files
managed:
    chezmoi managed

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
