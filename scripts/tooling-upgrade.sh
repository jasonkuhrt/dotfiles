#!/bin/bash
# Upgrade every tool on this Mac, one package manager or self-updater at a time.
#
# A step that fails is reported at the end and the rest still run.
# Casks that update themselves (auto_updates) are left to their own updaters,
# so a running app is never replaced under itself.
# msgvault's own updater installs a new release and restarts its daemon; a dev
# build from main at or past the latest release is kept.

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"
eval "$(/opt/homebrew/bin/brew shellenv)"
export MAS_NO_AUTO_INDEX=1

failed=()

step() {
    local name=$1
    shift
    header "$name"
    if "$@"; then
        task "$name"
    else
        warn "$name failed"
        failed+=("$name")
    fi
}

homebrew() {
    brew update --quiet && brew upgrade --formula && brew upgrade --cask
}

npm_globals() {
    local name packages=()
    while IFS= read -r name; do
        packages+=("$name@latest")
    done < <(npm outdated --global --json 2>/dev/null | jq -r 'keys[]')
    [ ${#packages[@]} -eq 0 ] && return 0
    npm install --global "${packages[@]}"
}

bun_globals() {
    (cd "$HOME/.bun/install/global" && bun update)
}

cargo_crates() {
    # Registry crates only; git and local-path installs are pinned on purpose.
    local crate
    for crate in $(cargo install --list | awk '/^[a-z].*:$/ && !/\(/ {print $1}'); do
        cargo install --locked "$crate" || return 1
    done
}

plannotator_binary() {
    # The binary only: the full installer rewrites every agent's hooks.
    local installer
    installer=$(mktemp)
    curl -fsSL https://plannotator.ai/install.sh -o "$installer" &&
        bash "$installer" --minimal
    local status=$?
    rm -f "$installer"
    return $status
}

msgvault_upgrade() {
    # A dev build reads as v0.23.0-93-gf2b96b09: its base tag is the release it builds on.
    local installed latest
    installed=$(msgvault version | awk 'NR==1 {print $2}')
    latest=$(gh release view --repo kenn-io/msgvault --json tagName --jq .tagName)
    [ "${installed%%-*}" = "$latest" ] && return 0
    # A release can migrate the archive's schema, so snapshot it first.
    msgvault backup create --repo "$HOME/.local/state/msgvault-backups" --tag "pre-$latest" &&
        msgvault update --yes --force
}

step "Homebrew" homebrew
if [ -n "$(mas list 2>/dev/null)" ]; then
    step "App Store" mas upgrade
else
    # Spotlight indexing is off (just sudo-setup), and mas finds apps through it.
    header "App Store"
    printf "  %s mas sees no apps with Spotlight off; the App Store's own automatic updates cover them\n" "$SKIP"
fi
step "uv tools" uv tool upgrade --all
step "npm globals" npm_globals
step "pnpm" "$HOME/Library/pnpm/bin/pnpm" self-update
step "bun globals" bun_globals
step "Cargo crates" cargo_crates
step "gh extensions" gh extension upgrade --all

for cli in claude codex amp grok browse blacksmith; do
    has_cmd "$cli" && step "$cli" "$cli" update </dev/null
done

step "plannotator" plannotator_binary
step "1Password CLI" bash "$DOTFILES_ROOT/scripts/setup/after/20-1password-cli.sh" --update
step "Calendar driver" "$HOME/.local/bin/CheICalMCP" --self-update
step "fish plugins" bash "$DOTFILES_ROOT/scripts/setup/after/07-fisher-plugins.sh"
step "dprint plugins" bash "$DOTFILES_ROOT/scripts/setup/after/11-dprint-update.sh"

step "msgvault" msgvault_upgrade

header "Installed outside the Brewfile"
# Without --force this only lists them: add each to the Brewfile or uninstall it.
undeclared=$(brew bundle cleanup --file="$DOTFILES_ROOT/scripts/data/Brewfile" 2>/dev/null |
    grep -v '^Run ')
if [ -n "$undeclared" ]; then
    printf '%s\n' "$undeclared"
else
    task "none"
fi

header "Summary"
if [ ${#failed[@]} -eq 0 ]; then
    task "every step succeeded"
else
    warn "failed: ${failed[*]}"
    exit 1
fi
