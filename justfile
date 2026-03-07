set quiet

dotctl := "DOTFILES_REPO_ROOT=" + justfile_directory() + " dotctl"
lua_paths := "home/.config/nvim/lua home/.config/nvim/local-plugins/cmd-ux/lua home/.config/nvim/local-plugins/cmd-ux/tests home/.config/nvim/local-plugins/kit/lua"
cmd_ux_blocklist_path := "home/.config/nvim/cmd-ux-command-blocklist.txt"
cmd_ux_plugin_path := "home/.config/nvim/local-plugins/cmd-ux"

[private]
default:
    just --list

up:
    {{ dotctl }} up

edit target:
    {{ dotctl }} edit {{ target }}

status:
    {{ dotctl }} status

doctor:
    {{ dotctl }} doctor

explain target:
    {{ dotctl }} explain {{ target }}

lua-check: lua-lint lua-lsp-check lua-fmt-check

lua-lint:
    selene {{ lua_paths }}

lua-ci:
    bash scripts/ci/lua-ci.sh

lua-check-staged:
    bash scripts/git-hooks/check-staged-lua.sh

lua-lsp-check:
    lua-language-server --check . --configpath .luarc.json --checklevel=Warning

lua-fmt-check:
    stylua --check {{ lua_paths }}

lua-fmt:
    stylua {{ lua_paths }}

claude-cmux-check:
    #!/usr/bin/env bash
    set -euo pipefail

    wrapper="$PWD/home/.local/libexec/claude/bin/claude"
    shim="$PWD/home/.local/libexec/claude/cmux/tmux"
    fish_cfg="$PWD/home/.config/fish/config.fish"

    bash -n "$wrapper"
    bash -n "$shim"
    fish -n "$fish_cfg"

    if [ "$(CLAUDE_REAL_BIN=/bin/echo "$wrapper" alpha beta)" != "alpha beta" ]; then
        printf 'FAIL: wrapper pass-through outside cmux\n' >&2
        exit 1
    fi

    env_output="$(
        CMUX_WORKSPACE_ID=workspace:1 \
        CMUX_SURFACE_ID=77777777-7777-7777-7777-777777777777 \
        CLAUDE_REAL_BIN=/usr/bin/env \
        "$wrapper"
    )"
    printf '%s\n' "$env_output" | grep -q '^TMUX=cmux$'
    printf '%s\n' "$env_output" | grep -q '^TMUX_PANE=%77777777-7777-7777-7777-777777777777$'
    printf '%s\n' "$env_output" | grep -q '^CC_CMUX_WORKSPACE_ID=workspace:1$'
    printf '%s\n' "$env_output" | grep -q '^CC_CMUX_SURFACE_ID=77777777-7777-7777-7777-777777777777$'

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT
    log="$tmpdir/cmux.log"
    state="$tmpdir/state.json"

    cp "$PWD/scripts/tests/fake-cmux.sh" "$tmpdir/cmux"
    chmod +x "$tmpdir/cmux"

    pane_id="$(
        CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
        CC_CMUX_TEST_LOG="$log" \
        CC_CMUX_TEST_STATE="$state" \
        CC_CMUX_WORKSPACE_ID=workspace:1 \
        CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
        "$shim" display-message -p '#{pane_id}'
    )"
    [ "$pane_id" = "%11111111-1111-1111-1111-111111111111" ]

    new_pane="$(
        CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
        CC_CMUX_TEST_LOG="$log" \
        CC_CMUX_TEST_STATE="$state" \
        CC_CMUX_WORKSPACE_ID=workspace:1 \
        CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
        "$shim" split-window -h -t %11111111-1111-1111-1111-111111111111 -P -F '#{pane_id}'
    )"
    [ "$new_pane" = "%22222222-2222-2222-2222-222222222222" ]

    list_output="$(
        CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
        CC_CMUX_TEST_LOG="$log" \
        CC_CMUX_TEST_STATE="$state" \
        CC_CMUX_WORKSPACE_ID=workspace:1 \
        CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
        "$shim" list-panes -F '#{pane_id}'
    )"
    [ "$list_output" = "$(printf '%%11111111-1111-1111-1111-111111111111\n%%22222222-2222-2222-2222-222222222222')" ]

    CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_WORKSPACE_ID=workspace:1 \
    CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
    "$shim" send-keys -t %22222222-2222-2222-2222-222222222222 "echo hi" Enter

    CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_WORKSPACE_ID=workspace:1 \
    CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
    "$shim" select-pane -t %22222222-2222-2222-2222-222222222222

    CC_CMUX_CMUX_BIN="$tmpdir/cmux" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_WORKSPACE_ID=workspace:1 \
    CC_CMUX_SURFACE_ID=11111111-1111-1111-1111-111111111111 \
    "$shim" kill-pane -t %22222222-2222-2222-2222-222222222222

    grep -q 'send --workspace workspace:1 --surface 22222222-2222-2222-2222-222222222222 echo hi' "$log"
    grep -q 'send-key --workspace workspace:1 --surface 22222222-2222-2222-2222-222222222222 enter' "$log"
    grep -q 'focus-pane --workspace workspace:1 --pane pane-22222222' "$log"
    grep -q 'close-surface --workspace workspace:1 --surface 22222222-2222-2222-2222-222222222222' "$log"

    printf 'PASS: claude-cmux-check\n'

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

cmd-ux-test:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ cmd_ux_plugin_path }}"
    plenary="${PLENARY_PATH:-$HOME/.local/share/nvim/lazy/plenary.nvim}"
    cache_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir"' EXIT

    if [ ! -d "$plenary" ]; then
        printf 'FAIL: plenary.nvim not found at %s\n' "$plenary" >&2
        exit 1
    fi

    CMD_UX_TEST=1 XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" nvim --headless -u NONE \
        --cmd "set runtimepath^=$plenary" \
        -c "lua require('plenary.test_harness').test_directory('$plugin_root/tests/plenary', { minimal_init = '$plugin_root/tests/minimal_init.lua', sequential = true })"

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
brew:
    brew bundle --file=scripts/data/Brewfile

[private]
brew-check:
    brew bundle check --file=scripts/data/Brewfile --verbose || true

[private]
brew-cleanup:
    brew bundle cleanup --file=scripts/data/Brewfile

[private]
shan *args:
    bun x @jasonkuhrt/shan {{ args }}

[private]
transcript-dump *args:
    bun x @jasonkuhrt/shan transcript dump {{ args }}

[private]
transcript-analyze *args:
    bun x @jasonkuhrt/shan transcript analyze {{ args }}

[private]
task-dump *args:
    bun x @jasonkuhrt/shan task dump {{ args }}

[private]
task-open *args:
    bun x @jasonkuhrt/shan task open {{ args }}
