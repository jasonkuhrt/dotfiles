# Shared helpers for chezmoi scripts
# Included by chezmoi scripts via template directive

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

has_cmd() {
    command -v "$1" &> /dev/null
}

# macOS defaults helper - check and set
# Usage: set_default "domain" "key" "type" "value" "description"
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
    fi
}
