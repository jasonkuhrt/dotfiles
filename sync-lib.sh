#!/bin/bash
# Shared utilities for sync scripts
# Source this file: source "$(dirname "$0")/sync-lib.sh"

# ─────────────────────────────────────────────────────────────
# Colors
# ─────────────────────────────────────────────────────────────

RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
BLUE=$'\033[0;34m'
MAGENTA=$'\033[0;35m'
CYAN=$'\033[0;36m'
DIM=$'\033[2m'
BOLD=$'\033[1m'
RESET=$'\033[0m'

# ─────────────────────────────────────────────────────────────
# Symbols
# ─────────────────────────────────────────────────────────────

CHECK="${GREEN}✓${RESET}"
ARROW="${CYAN}→${RESET}"
SKIP="${DIM}○${RESET}"
WARN="${YELLOW}!${RESET}"

# ─────────────────────────────────────────────────────────────
# Output helpers
# ─────────────────────────────────────────────────────────────

header() {
    printf "\n"
    printf "${BOLD}${MAGENTA}▸ %s${RESET}\n" "$1"
    printf "${DIM}─────────────────────────────────────────${RESET}\n"
}

task() {
    printf "  ${CHECK} %s\n" "$1"
}

skip() {
    printf "  ${SKIP} ${DIM}%s (already configured)${RESET}\n" "$1"
}

info() {
    printf "  ${ARROW} %s\n" "$1"
}

warn() {
    printf "  ${WARN} ${YELLOW}%s${RESET}\n" "$1"
}

# ─────────────────────────────────────────────────────────────
# Utility functions
# ─────────────────────────────────────────────────────────────

# Check if command exists
has_cmd() {
    command -v "$1" &> /dev/null
}

# Symlink a file, skip if already correct
# Safety: warns and skips if dest is a real file with content (prevents data loss)
link_file() {
    local src="$1"
    local dest="$2"
    local name="${3:-$(basename "$dest")}"

    if [ -L "$dest" ] && [ "$(readlink "$dest")" = "$src" ]; then
        skip "$name"
        return 0
    fi

    # Safety check: don't overwrite real files with content
    if [ -f "$dest" ] && [ ! -L "$dest" ] && [ -s "$dest" ]; then
        warn "$name: $dest exists with content, skipping (backup and remove to sync)"
        return 1
    fi

    mkdir -p "$(dirname "$dest")"
    ln -sf "$src" "$dest"
    task "$name ${DIM}${ARROW} $dest${RESET}"
}

# Symlink a subdirectory within a parent (for selective dir syncing)
link_subdir() {
    local src="$1"
    local dest="$2"
    local name="${3:-$(basename "$dest")}"

    if [ -L "$dest" ] && [ "$(readlink "$dest")" = "$src" ]; then
        skip "$name"
        return 0
    fi

    # Remove existing dir/file if not a correct symlink
    if [ -e "$dest" ] || [ -L "$dest" ]; then
        rm -rf "$dest"
    fi

    ln -s "$src" "$dest"
    task "$name ${DIM}${ARROW} $dest${RESET}"
}

# Ensure file exists, create if missing
ensure_file() {
    local path="$1"
    local desc="${2:-$(basename "$path")}"

    if [ -f "$path" ]; then
        skip "$desc"
    else
        touch "$path"
        task "Created $desc"
    fi
}

# Ensure line is in file (grep check, append if missing)
ensure_in_file() {
    local pattern="$1"
    local file="$2"
    local add_cmd="$3"
    local desc="$4"

    if grep -q "$pattern" "$file" 2>/dev/null; then
        skip "$desc"
    else
        mkdir -p "$(dirname "$file")"
        eval "$add_cmd"
        task "$desc"
    fi
}

# Install packages from a list file
# Usage: install_from_list "file" "check_cmd" "install_cmd"
# - check_cmd: command to test if installed (use $item for package name, empty = always install)
# - install_cmd: command to install (use $item for package name)
install_from_list() {
    local file="$1"
    local check_cmd="$2"
    local install_cmd="$3"

    while IFS= read -r item || [ -n "$item" ]; do
        [[ "$item" =~ ^#.*$ || -z "$item" ]] && continue
        if [ -n "$check_cmd" ] && eval "$check_cmd" &>/dev/null; then
            skip "$item"
        else
            eval "$install_cmd" &>/dev/null && task "$item" || warn "Failed to install $item"
        fi
    done < "$file"
}

# Ensure a directory exists as a real directory (not a symlink)
# Migrates from old directory-symlink approach if needed
ensure_real_dir() {
    local dest="$1"
    local src_if_symlinked="$2"  # The dotfiles path it might be symlinked to

    if [ -L "$dest" ]; then
        local target
        target="$(readlink "$dest")"
        if [ "$target" = "$src_if_symlinked" ]; then
            info "Migrating $dest from directory symlink..."
            # It's symlinked to our dotfiles - migrate to real directory
            rm "$dest"
            mkdir -p "$dest"
            # Copy non-config files back (runtime files that shouldn't be in dotfiles)
            # These will be overwritten by symlinks for config files
            if [ -d "$src_if_symlinked" ]; then
                cp -a "$src_if_symlinked"/* "$dest"/ 2>/dev/null || true
            fi
        else
            # Symlinked somewhere else - remove and create fresh
            rm "$dest"
            mkdir -p "$dest"
        fi
    elif [ ! -d "$dest" ]; then
        mkdir -p "$dest"
    fi
}

# Run a command, log output, show only on verbose or error
# Requires: LOG_FILE and VERBOSE variables to be set
# Usage: run_logged "description" command args...
run_logged() {
    local desc="$1"
    shift
    local output
    local exit_code

    echo "=== $desc ===" >> "$LOG_FILE"
    echo "Command: $*" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"

    if $VERBOSE; then
        # Verbose: show output live, also log it
        "$@" 2>&1 | tee -a "$LOG_FILE"
        exit_code=${PIPESTATUS[0]}
    else
        # Quiet: capture output, only show on error
        output=$("$@" 2>&1) || exit_code=$?
        exit_code=${exit_code:-0}
        echo "$output" >> "$LOG_FILE"
        if [ $exit_code -ne 0 ]; then
            printf "%s\n" "$output"
        fi
    fi

    echo "" >> "$LOG_FILE"
    return $exit_code
}

# macOS defaults helper - check and set
# Usage: set_default "domain" "key" "type" "value" "description"
# Returns: sets DEFAULTS_CHANGED=true if value was changed
set_default() {
    local domain="$1"
    local key="$2"
    local type="$3"
    local value="$4"
    local desc="$5"

    local current
    current=$(defaults read "$domain" "$key" 2>/dev/null || echo "")

    if [ "$current" = "$value" ]; then
        skip "$desc"
    else
        defaults write "$domain" "$key" "$type" "$value"
        task "$desc"
        DEFAULTS_CHANGED=true
    fi
}
