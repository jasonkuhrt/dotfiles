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

# QA Fn toggle + Wispr Flow hotkey integration (macOS)
fn-wispr-qa:
    #!/usr/bin/env bash
    set -euo pipefail

    fail=0

    pass() {
        printf "PASS: %s\n" "$1"
    }

    warn() {
        printf "WARN: %s\n" "$1"
    }

    bad() {
        printf "FAIL: %s\n" "$1"
        fail=1
    }

    fn_state=$(defaults read -g com.apple.keyboard.fnState 2>/dev/null || true)
    if [ "$fn_state" = "1" ]; then
        pass "macOS uses F1..F12 as standard function keys (fnState=1)"
    else
        bad "macOS fnState expected 1, got '${fn_state:-unset}'"
    fi

    fn_usage=$(defaults read com.apple.HIToolbox AppleFnUsageType 2>/dev/null || true)
    if [ "$fn_usage" = "3" ]; then
        pass "Fn/Globe key press behavior is disabled (AppleFnUsageType=3)"
    else
        bad "AppleFnUsageType expected 3, got '${fn_usage:-unset}'"
    fi

    if ! command -v karabiner_cli >/dev/null 2>&1; then
        bad "karabiner_cli not found"
    else
        if karabiner_cli --show-current-profile-name >/dev/null 2>&1; then
            pass "Karabiner CLI is reachable"
        else
            bad "Karabiner CLI is not reachable"
        fi

        karabiner_cfg="$HOME/.config/karabiner/karabiner.json"
        rule_ok=$(jq -r '
          any(
            .profiles[]?;
            any(
              .complex_modifications.rules[]?;
              .description == "Tap fn to toggle sticky fn; hold fn for normal fn behavior"
            )
          )
        ' "$karabiner_cfg" 2>/dev/null || true)
        if [ "$rule_ok" = "true" ]; then
            pass "Karabiner fn toggle rule is present"
        else
            bad "Karabiner fn toggle rule is missing from $karabiner_cfg"
        fi

        devices_json=$(karabiner_cli --list-connected-devices 2>/dev/null || true)
        builtin_ok=$(printf "%s" "$devices_json" | jq -r 'any(.[]?; (.is_built_in_keyboard // false) == true)' 2>/dev/null || true)
        virtual_ok=$(printf "%s" "$devices_json" | jq -r 'any(.[]?; (.device_identifiers.is_virtual_device // false) == true and ((.product // "") | test("VirtualHIDKeyboard")))' 2>/dev/null || true)
        if [ "$builtin_ok" = "true" ]; then
            pass "Karabiner sees built-in keyboard"
        else
            bad "Karabiner does not report built-in keyboard"
        fi
        if [ "$virtual_ok" = "true" ]; then
            pass "Karabiner virtual HID keyboard is connected"
        else
            bad "Karabiner virtual HID keyboard is not connected"
        fi

        fkeys_state=$(karabiner_cli --list-system-variables 2>/dev/null | jq -r '.["system.use_fkeys_as_standard_function_keys"] // empty' || true)
        if [ "$fkeys_state" = "true" ]; then
            pass "Karabiner system variable confirms standard F-key mode"
        else
            bad "Karabiner system variable system.use_fkeys_as_standard_function_keys is not true"
        fi
    fi

    wispr_cfg="$HOME/Library/Application Support/Wispr Flow/config.json"
    if [ ! -f "$wispr_cfg" ]; then
        bad "Wispr Flow config not found at $wispr_cfg"
    elif ! command -v jq >/dev/null 2>&1; then
        bad "jq not found; cannot validate Wispr config"
    else
        popo_user=$(jq -r '.prefs.user.shortcuts // {} | to_entries[]? | select(.value=="popo") | .key' "$wispr_cfg" | head -n 1)
        popo_cache=$(jq -r '.prefs.cache.splitKeybinds // [] | map(select(.value=="popo") | .shortcut[0]) | .[0] // empty' "$wispr_cfg")
        ptt_user=$(jq -r '.prefs.user.shortcuts // {} | to_entries[]? | select(.value=="ptt") | .key' "$wispr_cfg" | head -n 1)
        ptt_cache=$(jq -r '.prefs.cache.splitKeybinds // [] | map(select(.value=="ptt") | .shortcut[0]) | .[0] // empty' "$wispr_cfg")
        if [ "$popo_user" = "100" ] && [ "$popo_cache" = "100" ] && [ "$ptt_user" = "101" ] && [ "$ptt_cache" = "101" ]; then
            pass "Wispr Flow shortcuts are F8=toggle(popo) and F9=press/hold(ptt) in user+cache configs"
        else
            bad "Wispr Flow expected F8=popo(100) and F9=ptt(101), got popo user='${popo_user:-unset}' cache='${popo_cache:-unset}' ptt user='${ptt_user:-unset}' cache='${ptt_cache:-unset}'"
        fi

        acc_perm=$(jq -r '.prefs.permissions[]? | select(.name=="accessibility") | .granted' "$wispr_cfg" | head -n 1)
        mic_perm=$(jq -r '.prefs.permissions[]? | select(.name=="microphone") | .granted' "$wispr_cfg" | head -n 1)
        if [ "$acc_perm" = "true" ]; then
            pass "Wispr accessibility permission is granted (config state)"
        else
            bad "Wispr accessibility permission is not granted (config state)"
        fi
        if [ "$mic_perm" = "true" ]; then
            pass "Wispr microphone permission is granted (config state)"
        else
            bad "Wispr microphone permission is not granted (config state)"
        fi
    fi

    if pgrep -f "Wispr Flow\\.app/Contents/MacOS/Wispr Flow" >/dev/null; then
        pass "Wispr Flow process is running"
    else
        warn "Wispr Flow process is not running (hotkey cannot be exercised live)"
    fi

    if [ "$fail" -ne 0 ]; then
        printf "\nResult: FAIL\n"
        exit 1
    fi

    printf "\nResult: PASS\n"

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
