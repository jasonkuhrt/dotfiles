set quiet

lua_paths := "symlink-roots/config/nvim/lua home/dot_config/nvim/local-plugins/cmd-ux/lua"
cmd_ux_blocklist_path := "home/dot_config/nvim/cmd-ux-command-blocklist.txt"

[private]
default:
    just --list

up:
    bun packages/dotctl/src/bin/dotctl.ts up

edit target:
    bun packages/dotctl/src/bin/dotctl.ts edit {{ target }}

status:
    bun packages/dotctl/src/bin/dotctl.ts status

doctor:
    bun packages/dotctl/src/bin/dotctl.ts doctor

explain target:
    bun packages/dotctl/src/bin/dotctl.ts explain {{ target }}

lua-check: lua-lint lua-lsp-check lua-fmt-check

lua-lint:
    selene {{ lua_paths }}

lua-check-staged:
    bash scripts/git-hooks/check-staged-lua.sh

lua-lsp-check:
    lua-language-server --check . --configpath .luarc.json --checklevel=Warning

lua-fmt-check:
    stylua --check {{ lua_paths }}

lua-fmt:
    stylua {{ lua_paths }}

cmd-ux-blocklist-check:
    #!/usr/bin/env bash
    set -euo pipefail

    path="{{ cmd_ux_blocklist_path }}"
    extracted="$(mktemp)"
    trap 'rm -f "$extracted"' EXIT

    awk '
      /^[[:space:]]*($|#)/ { next }
      {
        if ($0 ~ /[[:space:]]/) {
          printf "FAIL: %s:%d: expected one exact command per line with no whitespace: %s\n", FILENAME, NR, $0 > "/dev/stderr"
          failed = 1
          next
        }
        if (seen[$0]++) {
          printf "FAIL: %s:%d: duplicate command: %s\n", FILENAME, NR, $0 > "/dev/stderr"
          failed = 1
        }
        print $0
      }
      END {
        exit failed
      }
    ' "$path" > "$extracted"

    if ! diff -u "$extracted" <(LC_ALL=C sort "$extracted") >/dev/null; then
        printf 'FAIL: %s: commands must be sorted ascending (ignoring comments and blank lines)\n' "$path" >&2
        exit 1
    fi

    printf 'PASS: %s\n' "$path"

hooks-install:
    bash scripts/git-hooks/install-pre-commit.sh

hooks-uninstall:
    bash scripts/git-hooks/uninstall-pre-commit.sh

hooks-status:
    bash scripts/git-hooks/pre-commit-status.sh

[private]
sync:
    #!/usr/bin/env bash
    set -euo pipefail
    printf 'Use `git pull --rebase` and then `just up`.\n' >&2
    exit 1

[private]
apply *args:
    chezmoi apply --mode symlink -v {{ args }}

[private]
diff:
    chezmoi diff

[private]
chezmoi-doctor:
    chezmoi doctor

[private]
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

[private]
verify:
    chezmoi verify

[private]
managed:
    chezmoi managed

[private]
unmanaged:
    chezmoi unmanaged --path-style=absolute ~/.config

[private]
re-add *args:
    chezmoi re-add {{ args }}

[private]
update:
    chezmoi update

[private]
brew:
    brew bundle --file=$(chezmoi source-path)/Brewfile

[private]
brew-check:
    brew bundle check --file=$(chezmoi source-path)/Brewfile --verbose || true

[private]
brew-cleanup:
    brew bundle cleanup --file=$(chezmoi source-path)/Brewfile

[private]
install-lazybeads:
    cd /tmp && rm -rf lazybeads && git clone --depth 1 https://github.com/codegangsta/lazybeads.git && cd lazybeads && go install .

[private]
shan:
    bun packages/shan/src/bin/shan.ts

[private]
transcript-dump *args:
    bun packages/shan/src/bin/shan.ts transcript dump {{ args }}

[private]
transcript-analyze *args:
    bun packages/shan/src/bin/shan.ts transcript analyze {{ args }}

[private]
task-dump *args:
    bun packages/shan/src/bin/shan.ts task dump {{ args }}

[private]
task-open *args:
    bun packages/shan/src/bin/shan.ts task open {{ args }}
