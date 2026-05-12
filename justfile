set quiet

dotctl := "DOTFILES_REPO_ROOT=" + justfile_directory() + " dotctl"
lua_paths := "home/.config/nvim/lua home/.config/nvim/local-plugins/cmux-nav/lua home/.config/nvim/local-plugins/cmux-nav/tests home/.config/nvim/local-plugins/file-ops/lua home/.config/nvim/local-plugins/file-ops/tests home/.config/nvim/local-plugins/kit/lua"
cmux_nav_plugin_path := "home/.config/nvim/local-plugins/cmux-nav"
cmd_ux_blocklist_path := "home/.config/nvim/cmd-ux-command-blocklist.txt"
cmd_ux_plugin_path := "home/.config/nvim/local-plugins/cmd-ux"
file_ops_plugin_path := "home/.config/nvim/local-plugins/file-ops"

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

# Sync VS Code extensions from scripts/data/vscode-extensions.txt manifest.
# Installs anything missing; skips already-installed; loudly warns on local
# (jasonkuhrt.*) extensions which need manual builds.
vscode-extensions-sync:
    DOTFILES_ROOT="$PWD" bash scripts/setup/after/once/15-vscode-extensions.sh

# Export current VS Code extensions to the manifest. Run after installing
# new extensions to keep the dotfiles canonical list in sync.
vscode-extensions-export:
    code --list-extensions | sort > scripts/data/vscode-extensions.txt
    @printf 'Wrote scripts/data/vscode-extensions.txt (%s extensions)\n' "$(wc -l < scripts/data/vscode-extensions.txt | tr -d ' ')"

# Build key-binder-glimpse's menus.json from the user's KeyBinder config
# (~/.config/key-binder/config.ts). Runs the IR → MenusFile transform and
# writes ~/.config/key-binder-glimpse/menus.json. Run after editing
# config.ts to refresh the picker data the VS Code extension reads.
glimpse-build:
    cd ~/projects/jasonkuhrt/key-binder-glimpse && bun run build-menus

# Headless smoke check: config loads, IR is non-empty, transform produces a
# valid MenusFile, every context has items, warnings stay below threshold.
# Cheap (no VS Code, no GUI). Closes the verification gap that would have
# caught the obsidian schema drift before it reached production.
glimpse-smoke:
    cd ~/projects/jasonkuhrt/key-binder-glimpse && bun run smoke

# The "done" gate for key-binder-glimpse: unit tests + typecheck + smoke.
# Nothing is "done" without this passing. Includes the lua semantic test
# (B1) which exercises the patch against a vscode-neovim mock — the test
# that would have caught the __keyBinderGlimpsePatched bug.
glimpse-done:
    cd ~/projects/jasonkuhrt/key-binder-glimpse && bun run done

# Tier 3 real-VS-Code launch test for key-binder-glimpse. Downloads VS
# Code (cached after first run), pre-installs vscode-neovim, runs mocha
# inside the launched extension host. Slow (~30s first run, ~1s after);
# kept separate from `glimpse-done` so the fast gate stays fast. Run
# this before publication or after touching activation/manifest code.
glimpse-tier3:
    cd ~/projects/jasonkuhrt/key-binder-glimpse && bun run test:electron

# Legacy fallback: build menus.json from nvim's keymap registry directly,
# without going through KeyBinder. Useful only for diagnosing whether a
# missing chord is a KeyBinder config gap or a problem in the picker.
glimpse-build-from-nvim:
    #!/usr/bin/env bash
    set -euo pipefail
    err_log="$(mktemp)"
    trap 'rm -f "$err_log"' EXIT
    nvim --headless \
        -c "lua dofile('scripts/build-glimpse-menus.lua')" \
        2> "$err_log" &
    nvim_pid=$!
    ( sleep 20 && kill $nvim_pid 2>/dev/null ) &
    timeout_pid=$!
    wait $nvim_pid 2>/dev/null || true
    kill $timeout_pid 2>/dev/null || true
    if [ -s "$err_log" ]; then
        printf 'Errors during build:\n' >&2
        cat "$err_log" >&2
    fi

# Headless smoke test of nvim config. Verifies init.lua + lazy + plugins load
# cleanly with no errors on stderr. Exits 0 on success, 1 on errors.
# Note: only tests terminal mode (vim.g.vscode unset). VS Code mode requires
# vscode-neovim's runtime; verify interactively in VS Code.
nvim-smoke:
    #!/usr/bin/env bash
    set -euo pipefail

    err_log="$(mktemp)"
    trap 'rm -f "$err_log"' EXIT

    # Boot nvim, register VeryLazy autocmd to quit once plugins are loaded,
    # capture stderr separately. Timeout via background kill in case something hangs.
    nvim --headless \
        -c "lua vim.api.nvim_create_autocmd('User', {pattern='VeryLazy', once=true, callback=function() vim.cmd('qa') end})" \
        > /dev/null 2> "$err_log" &
    nvim_pid=$!
    ( sleep 15 && kill $nvim_pid 2>/dev/null ) &
    timeout_pid=$!
    wait $nvim_pid 2>/dev/null || true
    kill $timeout_pid 2>/dev/null || true

    if grep -qiE "(error|fail|^E[0-9]+:)" "$err_log"; then
        printf 'FAIL: errors during nvim load:\n' >&2
        cat "$err_log" >&2
        exit 1
    fi

    printf 'PASS: nvim config loads cleanly (terminal mode)\n'

cmux-mode-check:
    #!/usr/bin/env bash
    set -euo pipefail

    helper="$PWD/home/.local/libexec/cmux/cmux-mode"
    ghostty_cfg="$PWD/home/.config/ghostty/config"
    karabiner_cfg="$PWD/home/.config/karabiner/karabiner.json"

    bash -n "$helper"
    python3 -m json.tool "$karabiner_cfg" >/dev/null
    grep -q '^confirm-close-surface      = true$' "$ghostty_cfg"
    grep -q 'shift+ctrl+alt+cmd+h=goto_split:left' "$ghostty_cfg"
    grep -q 'shift+ctrl+alt+cmd+z=toggle_split_zoom' "$ghostty_cfg"
    grep -q 'shift+ctrl+alt+cmd+x=close_surface' "$ghostty_cfg"

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT
    log="$tmpdir/cmux.log"
    state="$tmpdir/state.json"
    workspace_state="$tmpdir/workspace.txt"
    osalog="$tmpdir/osascript.log"
    fake_cmux="$tmpdir/cmux"
    fake_osascript="$tmpdir/osascript"

    cp "$PWD/scripts/tests/fake-cmux.sh" "$fake_cmux"
    chmod +x "$fake_cmux"

    printf '%s\n' \
      '#!/usr/bin/env bash' \
      'set -euo pipefail' \
      'cat > "${CMUX_MODE_TEST_OSASCRIPT_LOG:?}"' > "$fake_osascript"
    chmod +x "$fake_osascript"

    printf 'workspace:1\n' > "$workspace_state"

    CMUX_MODE_CMUX_BIN="$fake_cmux" \
    CMUX_MODE_OSASCRIPT_BIN="$fake_osascript" \
    CMUX_MODE_TEST_OSASCRIPT_LOG="$osalog" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_TEST_WORKSPACES_STATE="$workspace_state" \
    "$helper" enter

    CMUX_MODE_CMUX_BIN="$fake_cmux" \
    CMUX_MODE_OSASCRIPT_BIN="$fake_osascript" \
    CMUX_MODE_TEST_OSASCRIPT_LOG="$osalog" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_TEST_WORKSPACES_STATE="$workspace_state" \
    "$helper" action focus-left

    CMUX_MODE_CMUX_BIN="$fake_cmux" \
    CMUX_MODE_OSASCRIPT_BIN="$fake_osascript" \
    CMUX_MODE_TEST_OSASCRIPT_LOG="$osalog" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_TEST_WORKSPACES_STATE="$workspace_state" \
    "$helper" workspace-next

    CMUX_MODE_CMUX_BIN="$fake_cmux" \
    CMUX_MODE_OSASCRIPT_BIN="$fake_osascript" \
    CMUX_MODE_TEST_OSASCRIPT_LOG="$osalog" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CC_CMUX_TEST_WORKSPACES_STATE="$workspace_state" \
    "$helper" exit

    grep -q '^set-status keyboard cmux --icon keyboard --color #0A84FF$' "$log"
    grep -q '^--json current-workspace$' "$log"
    grep -q '^--json list-workspaces$' "$log"
    grep -q '^select-workspace --workspace workspace:2$' "$log"
    grep -q '^clear-status keyboard --workspace workspace:1$' "$log"
    grep -q '^set-status keyboard cmux --icon keyboard --color #0A84FF --workspace workspace:2$' "$log"
    grep -q '^clear-status keyboard$' "$log"
    grep -q 'keystroke "h" using {command down, control down, option down, shift down}' "$osalog"

    printf 'PASS: cmux-mode-check\n'

cmux-upstream-audit:
    #!/usr/bin/env bash
    set -euo pipefail

    repo="${CMUX_REPO_PATH:-$HOME/repo-references/cmux}"
    if [ ! -d "$repo/.git" ]; then
        printf 'FAIL: cmux repo not found at %s\n' "$repo" >&2
        exit 1
    fi

    printf 'Local checkout: %s\n' "$repo"
    git -C "$repo" remote -v
    git -C "$repo" status --short --branch

    fork_json="$(gh repo view jasonkuhrt/cmux --json nameWithOwner,isFork,parent,url 2>/dev/null || true)"
    if [ -n "$fork_json" ]; then
        printf 'GitHub fork: %s\n' "$(
            printf '%s' "$fork_json" | jq -r '.url + " (isFork=" + (.isFork | tostring) + ", parent=" + (.parent.nameWithOwner // "none") + ")"'
        )"
    else
        printf 'GitHub fork: none\n'
    fi

    query_issue() {
        local number="$1"
        gh api graphql \
            -f owner='manaflow-ai' \
            -f name='cmux' \
            -F number="$number" \
            -f query='query($owner:String!,$name:String!,$number:Int!){ repository(owner:$owner,name:$name){ issue(number:$number){ number title state url timelineItems(first:100,itemTypes:[CROSS_REFERENCED_EVENT]){ nodes{ ... on CrossReferencedEvent { source { __typename ... on PullRequest { number title state isDraft url repository { nameWithOwner } } } } } } } } }'
    }

    for issue in 1900 1418 1884 1200 1472 2319; do
        payload="$(query_issue "$issue")"
        title="$(printf '%s' "$payload" | jq -r '.data.repository.issue.title')"
        state="$(printf '%s' "$payload" | jq -r '.data.repository.issue.state')"
        url="$(printf '%s' "$payload" | jq -r '.data.repository.issue.url')"
        printf '\n#%s %s [%s]\n%s\n' "$issue" "$title" "$state" "$url"
        linked="$(printf '%s' "$payload" | jq -r '.data.repository.issue.timelineItems.nodes[]? | select(.source.__typename == "PullRequest") | "- PR #\(.source.number) \(.source.title) [\(.source.state)\(if .source.isDraft then ", draft" else "" end)] \(.source.url)"')"
        if [ -n "$linked" ]; then
            printf '%s\n' "$linked"
        else
            printf 'No linked PRs\n'
        fi
    done

karabiner-check:
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

    repo_cfg="$PWD/home/.config/karabiner/karabiner.json"
    live_cfg="$HOME/.config/karabiner/karabiner.json"
    log_file="$HOME/.local/share/karabiner/log/console_user_server.log"

    if python3 -m json.tool "$repo_cfg" >/dev/null 2>&1; then
        pass "Repo Karabiner config is valid JSON"
    else
        bad "Repo Karabiner config is invalid JSON: $repo_cfg"
    fi

    if [ -f "$live_cfg" ]; then
        if cmp -s "$repo_cfg" "$live_cfg"; then
            pass "Live Karabiner config matches repo config"
        else
            bad "Live Karabiner config differs from repo config"
        fi
    else
        bad "Live Karabiner config not found at $live_cfg"
    fi

    if pgrep -f 'Karabiner-Core-Service' >/dev/null; then
        pass "Karabiner core service is running"
    else
        bad "Karabiner core service is not running"
    fi

    if pgrep -f 'karabiner_console_user_server' >/dev/null; then
        pass "Karabiner console user server is running"
    else
        bad "Karabiner console user server is not running"
    fi

    if pgrep -f 'Karabiner-DriverKit-VirtualHIDDevice' >/dev/null; then
        pass "Karabiner virtual HID driver is running"
    else
        bad "Karabiner virtual HID driver is not running"
    fi

    if ! command -v karabiner_cli >/dev/null 2>&1; then
        bad "karabiner_cli not found"
    else
        profile="$(karabiner_cli --show-current-profile-name 2>/dev/null || true)"
        if [ -n "$profile" ]; then
            pass "Karabiner current profile is '$profile'"
        else
            bad "Karabiner CLI could not read the current profile"
        fi

        devices_json="$(karabiner_cli --list-connected-devices 2>/dev/null || true)"
        if [ -n "$devices_json" ] && printf '%s' "$devices_json" | jq empty >/dev/null 2>&1; then
            device_count="$(printf '%s' "$devices_json" | jq 'length')"
            if [ "$device_count" -gt 0 ]; then
                pass "Karabiner CLI reports $device_count connected device(s)"
            else
                warn "Karabiner CLI reports zero connected devices"
            fi

            builtin_ok="$(printf '%s' "$devices_json" | jq -r 'any(.[]?; (.is_built_in_keyboard // false) == true)' 2>/dev/null || true)"
            if [ "$builtin_ok" = "true" ]; then
                pass "Karabiner CLI sees a built-in keyboard"
            else
                warn "Karabiner CLI does not currently report a built-in keyboard"
            fi
        else
            warn "Karabiner CLI could not return connected devices"
        fi
    fi

    active_rule_ok="$(jq -r '
      any(
        .profiles[]? | select(.selected == true);
        any(
          .complex_modifications.rules[]?;
          .description == "Raycast Ctrl+J/K menu navigation"
        )
      )
    ' "$live_cfg" 2>/dev/null || true)"
    if [ "$active_rule_ok" = "true" ]; then
        pass "Selected Karabiner profile contains the Raycast Ctrl+J/K rule"
    else
        bad "Selected Karabiner profile is missing the Raycast Ctrl+J/K rule"
    fi

    if [ -f "$log_file" ]; then
        session_log="$(awk '
            /\[info\] \[console_user_server\] version / { start = NR }
            { lines[NR] = $0 }
            END {
                if (start == 0) {
                    start = 1
                }
                for (i = start; i <= NR; i++) {
                    print lines[i]
                }
            }
        ' "$log_file")"
        if printf '%s\n' "$session_log" | rg -q 'connect_failed|Permission denied'; then
            warn "Current Karabiner console session contains connection errors"
        else
            pass "Current Karabiner console session is free of connection errors"
        fi
    else
        warn "Karabiner console log not found at $log_file"
    fi

    if [ "$fail" -ne 0 ]; then
        printf "\nResult: FAIL\n"
        exit 1
    fi

    printf "\nResult: PASS\n"

karabiner-reload:
    #!/usr/bin/env bash
    set -euo pipefail

    app="/Applications/Karabiner-Elements.app"

    if [ ! -d "$app" ]; then
        printf 'Karabiner-Elements.app not found at %s\n' "$app" >&2
        exit 1
    fi

    open -a "$app"
    sleep 2

    if command -v karabiner_cli >/dev/null 2>&1; then
        profile="$(karabiner_cli --show-current-profile-name 2>/dev/null || true)"
        if [ -n "$profile" ]; then
            karabiner_cli --select-profile "$profile" >/dev/null 2>&1 || true
            printf 'Re-selected Karabiner profile: %s\n' "$profile"
        else
            printf 'Karabiner is open, but current profile could not be read yet\n'
        fi
    fi

    just karabiner-check

karabiner-log:
    #!/usr/bin/env bash
    set -euo pipefail

    log_file="$HOME/.local/share/karabiner/log/console_user_server.log"

    if [ ! -f "$log_file" ]; then
        printf 'Karabiner console log not found at %s\n' "$log_file" >&2
        exit 1
    fi

    tail -n "${LINES:-80}" "$log_file"

raycast-nav-check:
    #!/usr/bin/env bash
    set -euo pipefail

    karabiner_cfg="$PWD/home/.config/karabiner/karabiner.json"

    python3 -m json.tool "$karabiner_cfg" >/dev/null

    rule_ok=$(jq -r '
      any(
        .profiles[]?;
        any(
          .complex_modifications.rules[]?;
          .description == "Raycast Ctrl+J/K menu navigation"
          and (.manipulators | length) == 2
          and any(
            .manipulators[]?;
            .from.key_code == "j"
            and .from.modifiers.mandatory == ["control"]
            and .to == [{"key_code":"down_arrow"}]
            and any(.conditions[]?; .type == "frontmost_application_if" and .bundle_identifiers == ["^com\\.raycast\\.macos$"])
          )
          and any(
            .manipulators[]?;
            .from.key_code == "k"
            and .from.modifiers.mandatory == ["control"]
            and .to == [{"key_code":"up_arrow"}]
            and any(.conditions[]?; .type == "frontmost_application_if" and .bundle_identifiers == ["^com\\.raycast\\.macos$"])
          )
        )
      )
    ' "$karabiner_cfg")

    if [ "$rule_ok" != "true" ]; then
        printf 'FAIL: Raycast Ctrl+J/K rule missing or malformed in %s\n' "$karabiner_cfg" >&2
        exit 1
    fi

    printf 'PASS: raycast-nav-check\n'

claude-dispatch-check:
    #!/usr/bin/env bash
    set -euo pipefail

    script="$PWD/home/.claude/skills/dispatch/dispatch.sh"

    bash -n "$script"

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT

    log="$tmpdir/cmux.log"
    state="$tmpdir/state.json"
    workspace_state="$tmpdir/workspace.txt"
    prompt="$tmpdir/prompt.txt"
    home_dir="$tmpdir/home"
    fake_cmux="$tmpdir/cmux"
    fake_claude="$tmpdir/claude"

    cp "$PWD/scripts/tests/fake-cmux.sh" "$fake_cmux"
    chmod +x "$fake_cmux"
    mkdir -p /tmp/myapp

    printf '%s\n' 'Fix the flaky tests.' > "$prompt"
    printf 'workspace:1\n' > "$workspace_state"

    printf '%s\n' \
      '#!/usr/bin/env bash' \
      'set -euo pipefail' \
      'printf "%s\n" "$*" >> "${FAKE_CLAUDE_LOG:?}"' > "$fake_claude"
    chmod +x "$fake_claude"

    output="$(
        PATH="$tmpdir:$PATH" \
        FAKE_CLAUDE_LOG="$tmpdir/claude.log" \
        DISPATCH_READY_SLEEP_SECS=0 \
        CC_CMUX_TEST_LOG="$log" \
        CC_CMUX_TEST_STATE="$state" \
        CC_CMUX_TEST_WORKSPACES_STATE="$workspace_state" \
        CMUX_WORKSPACE_ID=workspace:1 \
        "$script" "fix-tests" "$prompt" /tmp/myapp
    )"

    printf '%s\n' "$output" | grep -Eq '^Dispatched: workspace-one › fix-tests \(resume: claude --resume [0-9a-f-]+\)$'
    grep -q '^list-workspaces$' "$log"
    grep -q '^list-status --workspace workspace:1$' "$log"
    grep -q '^set-status dispatch-group ● --icon circle.fill --color #FF6B6B --workspace workspace:1$' "$log"
    grep -q '^new-workspace --name workspace-one › fix-tests --cwd /tmp/myapp$' "$log"
    grep -q '^--json --id-format both tree --workspace workspace:60$' "$log"
    python3 -c 'import pathlib, sys; data = pathlib.Path(sys.argv[1]).read_text(); needle = "send --workspace workspace:60 --surface surface:7 \x03"; needle in data or (_ for _ in ()).throw(SystemExit("missing Ctrl-C priming send"))' "$log"
    grep -Eq '^send --workspace workspace:60 --surface surface:7 bash /.*/dispatch-fix-tests\.[A-Za-z0-9]+/launch\.sh$' "$log"
    grep -q '^send-key --workspace workspace:60 --surface surface:7 enter$' "$log"
    grep -q '^set-status dispatch-group ● --icon circle.fill --color #FF6B6B --workspace workspace:60$' "$log"
    grep -q '^set-status dispatch-origin ↑ workspace-one --icon arrow.up.circle --color #FF6B6B --workspace workspace:60$' "$log"
    grep -q '^reorder-workspace --workspace workspace:60 --after workspace:1$' "$log"

    launcher_path="$(python3 -c 'import pathlib, re, sys; data = pathlib.Path(sys.argv[1]).read_text(); match = re.search(r"^send --workspace workspace:60 --surface surface:7 bash (/.*/dispatch-fix-tests\.[A-Za-z0-9]+/launch\.sh)$", data, re.M); match or (_ for _ in ()).throw(SystemExit("missing launcher send")); print(match.group(1))' "$log")"
    session_id="$(printf '%s\n' "$output" | sed -nE 's/^Dispatched: .* \(resume: claude --resume ([0-9a-f-]+)\)$/\1/p')"
    [ -n "$session_id" ]

    PATH="$tmpdir:$PATH" \
    FAKE_CLAUDE_LOG="$tmpdir/claude.log" \
    "$launcher_path"

    grep -Eq "^--session-id ${session_id} --name fix-tests -- Fix the flaky tests\.$" "$tmpdir/claude.log"
    [ ! -e "$launcher_path" ]

    printf 'PASS: claude-dispatch-check\n'

cmux-zmx-check:
    #!/usr/bin/env bash
    set -euo pipefail

    helper="$PWD/home/.local/libexec/cmux/cmux-zmx-enter"
    ghostty_cfg="$PWD/home/.config/ghostty/config"

    bash -n "$helper"
    grep -q '^command = direct:/Users/jasonkuhrt/.local/libexec/cmux/cmux-zmx-enter$' "$ghostty_cfg"

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT

    cp "$PWD/scripts/tests/fake-cmux.sh" "$tmpdir/cmux"
    cp "$PWD/scripts/tests/fake-zmx.sh" "$tmpdir/zmx"
    chmod +x "$tmpdir/cmux" "$tmpdir/zmx"

    printf '%s\n' '#!/usr/bin/env bash' "printf 'shell:%s\\n' \"\$*\"" > "$tmpdir/fake-shell"
    chmod +x "$tmpdir/fake-shell"

    shell_output="$(
        CMUX_ZMX_SHELL_BIN="$tmpdir/fake-shell" \
        "$helper"
    )"
    printf '%s\n' "$shell_output" | grep -q '^shell:-l$'

    log="$tmpdir/zmx.log"
    state_dir="$tmpdir/state"
    session_file="$tmpdir/session.json"
    cmux_log="$tmpdir/cmux.log"
    cmux_state="$tmpdir/cmux-state.json"
    mkdir -p "$state_dir"

    printf '%s\n' '{"windows":[{"workspaces":[{"panes":[{"surfaces":[{"id":"77777777-7777-7777-7777-777777777777","type":"terminal"}]}]}]}]}' > "$session_file"

    CMUX_WORKSPACE_ID=workspace:1 \
    CMUX_SURFACE_ID=surface:7 \
    CMUX_ZMX_CMUX_BIN="$tmpdir/cmux" \
    CMUX_ZMX_ZMX_BIN="$tmpdir/zmx" \
    CMUX_ZMX_SHELL_BIN="$tmpdir/fake-shell" \
    CMUX_ZMX_TEST_LOG="$log" \
    CMUX_ZMX_SESSION_FILE="$session_file" \
    CMUX_ZMX_STATE_DIR="$state_dir" \
    CMUX_ZMX_CLEANUP_RETRIES=1 \
    CMUX_ZMX_CLEANUP_SLEEP_SECS=0 \
    CC_CMUX_TEST_LOG="$cmux_log" \
    CC_CMUX_TEST_STATE="$cmux_state" \
    "$helper"

    grep -q '^attach cmux-surface-77777777-7777-7777-7777-777777777777 ' "$log"
    ! grep -q '^kill ' "$log"
    grep -q '"session_name": "cmux-surface-77777777-7777-7777-7777-777777777777"' \
        "$state_dir/surfaces/77777777-7777-7777-7777-777777777777.json"

    : > "$log"
    printf '%s\n' '{"windows":[{"workspaces":[{"panes":[{"surfaces":[{"id":"11111111-1111-1111-1111-111111111111","type":"terminal"}]}]}]}]}' > "$session_file"

    CMUX_WORKSPACE_ID=workspace:1 \
    CMUX_SURFACE_ID=surface:7 \
    CMUX_ZMX_CMUX_BIN="$tmpdir/cmux" \
    CMUX_ZMX_ZMX_BIN="$tmpdir/zmx" \
    CMUX_ZMX_SHELL_BIN="$tmpdir/fake-shell" \
    CMUX_ZMX_TEST_LOG="$log" \
    CMUX_ZMX_SESSION_FILE="$session_file" \
    CMUX_ZMX_STATE_DIR="$state_dir" \
    CMUX_ZMX_CLEANUP_RETRIES=1 \
    CMUX_ZMX_CLEANUP_SLEEP_SECS=0 \
    CC_CMUX_TEST_LOG="$cmux_log" \
    CC_CMUX_TEST_STATE="$cmux_state" \
    "$helper"

    grep -q '^attach cmux-surface-77777777-7777-7777-7777-777777777777 ' "$log"
    grep -q '^kill cmux-surface-77777777-7777-7777-7777-777777777777$' "$log"

    printf 'PASS: cmux-zmx-check\n'

fish-check:
    #!/usr/bin/env bash
    set -euo pipefail

    fish_cfg="$PWD/home/.config/fish/config.fish"
    git_checkout_guardrail="$PWD/home/.config/fish/modules/git-checkout-guardrail.fish"
    git_shortcuts="$PWD/home/.config/fish/modules/git-shortcuts.fish"
    git_learn_completions="$PWD/home/.config/fish/modules/git-learn-completions.fish"
    gco_completion="$PWD/home/.config/fish/completions/gco.fish"

    fish -n "$fish_cfg"
    fish -n "$git_checkout_guardrail"
    fish -n "$git_shortcuts"
    fish -n "$git_learn_completions"
    fish -n "$gco_completion"

    fish -c "source \"$git_checkout_guardrail\"; source \"$git_shortcuts\"; source \"$git_learn_completions\"; source \"$gco_completion\"; functions -q gco; functions -q git; test -n \"(__dotfiles_git_default_branch)\"; complete -C 'gco ' >/dev/null; complete -C 'git learn ' >/dev/null"

    printf 'PASS: fish-check\n'

git-learn-check:
    #!/usr/bin/env bash
    set -euo pipefail

    git_learn="$PWD/home/.local/bin/git-learn"
    git_cheat="$PWD/home/.local/bin/git-cheat"

    bash -n "$git_learn"
    bash -n "$git_cheat"

    PATH="$PWD/home/.local/bin:$PATH" git learn overview >/dev/null
    PATH="$PWD/home/.local/bin:$PATH" git learn switch >/dev/null
    PATH="$PWD/home/.local/bin:$PATH" git learn force >/dev/null
    PATH="$PWD/home/.local/bin:$PATH" git cheat config >/dev/null

    printf 'PASS: git-learn-check\n'

git-guardrail-check:
    #!/usr/bin/env bash
    set -euo pipefail

    repo_root="$PWD"
    guardrail="$repo_root/home/.config/fish/modules/git-checkout-guardrail.fish"

    fish -n "$guardrail"

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT
    cd "$tmpdir"

    git init -b main >/dev/null 2>&1
    git config user.name test
    git config user.email test@example.com
    git commit --allow-empty -m init >/dev/null 2>&1
    git switch -c feature/test >/dev/null 2>&1

    blocked_output="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; git checkout main" 2>&1 || true)"
    printf '%s\n' "$blocked_output" | grep -q 'Blocked: `git checkout` is disabled'
    printf '%s\n' "$blocked_output" | grep -q 'git switch main'
    printf '%s\n' "$blocked_output" | grep -q 'Escape hatch: command git checkout'

    current_branch="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; command git checkout main >/dev/null; command git branch --show-current")"
    [ "$current_branch" = "main" ]

    blocked_output="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; git push --force origin feature/test" 2>&1 || true)"
    printf '%s\n' "$blocked_output" | grep -q 'Blocked: `git push --force` is disabled'
    printf '%s\n' "$blocked_output" | grep -q 'git push --force-with-lease origin feature/test'
    printf '%s\n' "$blocked_output" | grep -q 'git pf origin feature/test'

    escape_output="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; command git push --force origin feature/test" 2>&1 || true)"
    printf '%s\n' "$escape_output" | grep -qv 'Blocked: `git push --force` is disabled'

    blocked_output="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; git reset --hard HEAD~1" 2>&1 || true)"
    printf '%s\n' "$blocked_output" | grep -q 'Blocked: `git reset --hard` is disabled'
    printf '%s\n' "$blocked_output" | grep -q 'git reset --soft HEAD~1'
    printf '%s\n' "$blocked_output" | grep -q 'git reflog'

    escape_output="$(DOTFILES_GIT_GUARDRAILS_FORCE=1 fish -c "source \"$guardrail\"; command git reset --hard HEAD >/dev/null; command git rev-parse --verify HEAD" 2>&1 || true)"
    printf '%s\n' "$escape_output" | grep -qv 'Blocked: `git reset --hard` is disabled'

    printf 'PASS: git-guardrail-check\n'

git-maintenance-check:
    #!/usr/bin/env bash
    set -euo pipefail

    repo_root="$PWD"
    script="$repo_root/scripts/setup/after/onchange/15-git-maintenance.sh"

    bash -n "$script"

    tmp_home="$(mktemp -d)"
    trap 'rm -rf "$tmp_home"' EXIT

    HOME="$tmp_home" DOTFILES_ROOT="$repo_root" bash "$script" >/dev/null

    registered_repo="$(git config --file "$tmp_home/.config/git/local.gitconfig" --get-all maintenance.repo)"
    [ "$registered_repo" = "$repo_root" ]

    printf 'PASS: git-maintenance-check\n'

git-worktree-guard-check:
    bash scripts/tests/git-worktree-guard-check.sh

git-agent-blocking-check:
    #!/usr/bin/env bash
    set -euo pipefail

    just --justfile /Users/jasonkuhrt/projects/jasonkuhrt/git-agent/justfile check

git-dx-check: fish-check git-learn-check git-worktree-guard-check git-guardrail-check git-maintenance-check
    @true

codex2-check:
    #!/usr/bin/env bash
    set -euo pipefail

    wrapper="$PWD/home/.local/bin/codex2"
    syncer="$PWD/home/.local/libexec/codex/codex-tab-sync"
    fake_codex="$PWD/scripts/tests/fake-codex.sh"

    bash -n "$wrapper"
    bash -n "$syncer"
    bash -n "$fake_codex"

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT

    cmux="$tmpdir/cmux"
    cp "$PWD/scripts/tests/fake-cmux.sh" "$cmux"
    chmod +x "$cmux"

    log="$tmpdir/cmux.log"
    state="$tmpdir/state.json"
    argv_log="$tmpdir/codex.argv"
    touch "$log" "$state"

    code_home="$tmpdir/codex-home"
    mkdir -p "$code_home/log" "$code_home/shell_snapshots" "$code_home/sessions/2026/03/09"
    : > "$code_home/log/codex-tui.log"
    : > "$code_home/session_index.jsonl"

    wait_for_log() {
        local pattern="$1"
        local attempt
        for attempt in $(seq 1 20); do
            if grep -q "$pattern" "$log"; then
                return 0
            fi
            sleep 0.1
        done
        printf 'missing log pattern: %s\n' "$pattern" >&2
        cat "$log" >&2
        return 1
    }

    CODEX2_REAL_BIN="$fake_codex" \
    CODEX2_CODEX_HOME="$code_home" \
    CODEX2_TEST_MODE=new \
    CODEX2_TEST_SESSION_ID=019cfeed-0000-7000-8000-000000000001 \
    CODEX2_TEST_CWD="$PWD" \
    CODEX2_TEST_INITIAL_TITLE="Start topic" \
    CODEX2_TEST_RENAMED_TITLE="Renamed topic" \
    CODEX2_TEST_ARGV_LOG="$argv_log" \
    CC_CMUX_CMUX_BIN="$cmux" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CMUX_WORKSPACE_ID=workspace:1 \
    CMUX_SURFACE_ID=surface:7 \
    "$wrapper" >/dev/null 2>&1

    grep -q '^--dangerously-bypass-approvals-and-sandbox$' "$argv_log"
    wait_for_log 'rename-tab --workspace workspace:1 --surface surface:7 --title Start topic'
    wait_for_log 'rename-tab --workspace workspace:1 --surface surface:7 --title Renamed topic'

    : > "$log"
    : > "$code_home/log/codex-tui.log"
    : > "$code_home/session_index.jsonl"

    resume_id="019cfeed-0000-7000-8000-000000000002"
    printf '{"timestamp":"2026-03-09T20:30:00Z","type":"session_meta","payload":{"id":"%s","cwd":"%s"}}\n' "$resume_id" "$PWD" \
        > "$code_home/sessions/2026/03/09/test-$resume_id.jsonl"
    touch "$code_home/shell_snapshots/$resume_id.sh"
    printf '{"id":"%s","thread_name":"Existing topic","updated_at":"2026-03-09T20:30:00Z"}\n' "$resume_id" \
        >> "$code_home/session_index.jsonl"

    CODEX2_REAL_BIN="$fake_codex" \
    CODEX2_CODEX_HOME="$code_home" \
    CODEX2_TEST_MODE=resume \
    CODEX2_TEST_SESSION_ID="$resume_id" \
    CODEX2_TEST_CWD="$PWD" \
    CODEX2_TEST_RENAMED_TITLE="Resume renamed" \
    CODEX2_TEST_ARGV_LOG="$argv_log" \
    CC_CMUX_CMUX_BIN="$cmux" \
    CC_CMUX_TEST_LOG="$log" \
    CC_CMUX_TEST_STATE="$state" \
    CMUX_WORKSPACE_ID=workspace:1 \
    CMUX_SURFACE_ID=surface:7 \
    "$wrapper" resume --last >/dev/null 2>&1

    grep -q '^--dangerously-bypass-approvals-and-sandbox$' "$argv_log"
    wait_for_log 'rename-tab --workspace workspace:1 --surface surface:7 --title Existing topic'
    wait_for_log 'rename-tab --workspace workspace:1 --surface surface:7 --title Resume renamed'

    printf 'PASS: codex2-check\n'

claude-settings-apply:
    #!/usr/bin/env bash
    set -euo pipefail

    source="$PWD/home/.claude/settings.json"
    modifier="$PWD/home/.claude/settings.json.modify"
    target="$HOME/.claude/settings.json"
    tmpfile="$(mktemp)"
    trap 'rm -f "$tmpfile"' EXIT

    mkdir -p "$HOME/.claude"

    if [ -f "$target" ]; then
        current="$(cat "$target")"
    else
        current='{}'
    fi

    printf '%s' "$current" \
        | DOTCTL_SOURCE="$source" bash "$modifier" > "$tmpfile"

    jq empty "$tmpfile" >/dev/null
    mv "$tmpfile" "$target"
    printf 'Updated %s\n' "$target"

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
        -c "lua require('plenary.test_harness').test_directory('$plugin_root/tests/plenary', { minimal_init = '$plugin_root/tests/minimal_init.lua', sequential = true, timeout = 120000 })"

cmd-ux-test-loop runs='3':
    #!/usr/bin/env bash
    set -euo pipefail

    failures=0
    runs="{{ runs }}"

    for i in $(seq 1 "$runs"); do
        printf 'run %d/%d: cmd-ux-test\n' "$i" "$runs"
        if ! just --justfile "$PWD/justfile" cmd-ux-test; then
            failures=$((failures + 1))
        fi
    done

    if [ "$failures" -gt 0 ]; then
        printf 'FAIL: %d/%d runs failed for cmd-ux-test\n' "$failures" "$runs" >&2
        exit 1
    fi

    printf 'PASS: %d/%d runs passed for cmd-ux-test\n' "$runs" "$runs"

cmd-ux-test-spec spec:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ cmd_ux_plugin_path }}"
    plenary="${PLENARY_PATH:-$HOME/.local/share/nvim/lazy/plenary.nvim}"
    cache_dir="$(mktemp -d)"
    spec_dir="$(mktemp -d)"
    state_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir" "$spec_dir" "$state_dir"' EXIT

    if [ ! -d "$plenary" ]; then
        printf 'FAIL: plenary.nvim not found at %s\n' "$plenary" >&2
        exit 1
    fi

    spec_path="$plugin_root/tests/plenary/{{ spec }}"
    if [ ! -f "$spec_path" ]; then
        printf 'FAIL: spec not found at %s\n' "$spec_path" >&2
        exit 1
    fi

    printf 'dofile([[%s]])\n' "$spec_path" > "$spec_dir/$(basename "$spec_path")"

    CMD_UX_TEST=1 XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" XDG_STATE_HOME="$state_dir" nvim --headless -u NONE \
        --cmd "set runtimepath^=$plenary" \
        -c "lua require('plenary.test_harness').test_directory('$spec_dir', { minimal_init = '$plugin_root/tests/minimal_init.lua', sequential = true, timeout = 120000 })"

cmd-ux-test-spec-loop spec runs='20':
    #!/usr/bin/env bash
    set -euo pipefail

    failures=0
    runs="{{ runs }}"

    for i in $(seq 1 "$runs"); do
        printf 'run %d/%d: %s\n' "$i" "$runs" "{{ spec }}"
        if ! just --justfile "$PWD/justfile" cmd-ux-test-spec "{{ spec }}"; then
            failures=$((failures + 1))
        fi
    done

    if [ "$failures" -gt 0 ]; then
        printf 'FAIL: %d/%d runs failed for %s\n' "$failures" "$runs" "{{ spec }}" >&2
        exit 1
    fi

    printf 'PASS: %d/%d runs passed for %s\n' "$runs" "$runs" "{{ spec }}"

cmux-nav-test:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ cmux_nav_plugin_path }}"
    plenary="${PLENARY_PATH:-$HOME/.local/share/nvim/lazy/plenary.nvim}"
    cache_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir"' EXIT

    if [ ! -d "$plenary" ]; then
        printf 'FAIL: plenary.nvim not found at %s\n' "$plenary" >&2
        exit 1
    fi

    XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" nvim --headless -u NONE \
        --cmd "set runtimepath^=$plenary" \
        -c "lua require('plenary.test_harness').test_directory('$plugin_root/tests/plenary', { minimal_init = '$plugin_root/tests/minimal_init.lua', sequential = true })"

file-ops-test:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ file_ops_plugin_path }}"
    plenary="${PLENARY_PATH:-$HOME/.local/share/nvim/lazy/plenary.nvim}"
    cache_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir"' EXIT

    if [ ! -d "$plenary" ]; then
        printf 'FAIL: plenary.nvim not found at %s\n' "$plenary" >&2
        exit 1
    fi

    XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" nvim --headless -u NONE \
        --cmd "set runtimepath^=$plenary" \
        -c "lua require('plenary.test_harness').test_directory('$plugin_root/tests/plenary', { minimal_init = '$plugin_root/tests/minimal_init.lua', sequential = true })"

cmd-ux-bench:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ cmd_ux_plugin_path }}"
    cache_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir"' EXIT

    CMD_UX_TEST=1 XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" nvim --headless -u NONE \
        -c "lua dofile('$plugin_root/tests/minimal_init.lua')" \
        -c "lua dofile('$plugin_root/tests/benchmarks/index_bench.lua')"

cmd-ux-bench-finder:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_root="$PWD/{{ cmd_ux_plugin_path }}"
    cache_dir="$(mktemp -d)"
    trap 'rm -rf "$cache_dir"' EXIT

    CMD_UX_TEST=1 XDG_CONFIG_HOME="$PWD/home/.config" XDG_CACHE_HOME="$cache_dir" nvim --headless -u NONE \
        -c "lua dofile('$plugin_root/tests/minimal_init.lua')" \
        -c "lua dofile('$plugin_root/tests/benchmarks/finder_bench.lua')"

cmd-ux-proof-wq-regression:
    #!/usr/bin/env bash
    set -euo pipefail

    plugin_rel="{{ cmd_ux_plugin_path }}"
    plenary="${PLENARY_PATH:-$HOME/.local/share/nvim/lazy/plenary.nvim}"
    baseline_dir="$(mktemp -d /tmp/cmdux-retro-XXXXXX)"
    current_cache="$(mktemp -d)"
    baseline_cache="$(mktemp -d)"
    script="$(mktemp /tmp/cmdux-retro-script-XXXXXX.lua)"

    cleanup() {
        git worktree remove --force "$baseline_dir" >/dev/null 2>&1 || rm -rf "$baseline_dir"
        rm -rf "$current_cache" "$baseline_cache" "$script"
    }
    trap cleanup EXIT

    if [ ! -d "$plenary" ]; then
        printf 'FAIL: plenary.nvim not found at %s\n' "$plenary" >&2
        exit 1
    fi

    printf '%s\n' \
        'local plugin_root = assert(vim.env.CMD_UX_PLUGIN_ROOT, "CMD_UX_PLUGIN_ROOT is required")' \
        'dofile(plugin_root .. "/tests/minimal_init.lua")' \
        '' \
        'local core = require("cmd_ux.core")' \
        'local index = require("cmd_ux.index")' \
        'local semantic_search_ok, semantic_search = pcall(require, "cmd_ux.lib.semantic_search")' \
        'local helpers = require("tests.plenary.helpers")' \
        '' \
        'local uv = vim.uv or vim.loop' \
        '' \
        'local function elapsed_ms(started)' \
        '  return (uv.hrtime() - started) / 1e6' \
        'end' \
        '' \
        'local function labels(items)' \
        '  return vim.tbl_map(function(item)' \
        '    return item.label' \
        '  end, items)' \
        'end' \
        '' \
        'helpers.ensure_setup()' \
        '' \
        'local original_list_uis = vim.api.nvim_list_uis' \
        'local original_schedule_warm = semantic_search_ok and semantic_search.schedule_warm or nil' \
        'local scheduled = 0' \
        '' \
        '---@diagnostic disable-next-line: duplicate-set-field' \
        'vim.api.nvim_list_uis = function()' \
        '  return { { chan = 1 } }' \
        'end' \
        'if semantic_search_ok then' \
        '  ---@diagnostic disable-next-line: duplicate-set-field' \
        '  semantic_search.schedule_warm = function()' \
        '    scheduled = scheduled + 1' \
        '  end' \
        'end' \
        '' \
        'local wq_started = uv.hrtime()' \
        'local wq_state = core.resolve_line("wq")' \
        'local wq_ms = elapsed_ms(wq_started)' \
        '' \
        'local root_started = uv.hrtime()' \
        'local root_items = type(index.search_frontier) == "function" and index.search_frontier("w") or {}' \
        'local root_ms = elapsed_ms(root_started)' \
        'local root_labels = labels(root_items)' \
        '' \
        'vim.api.nvim_list_uis = original_list_uis' \
        'if semantic_search_ok then' \
        '  semantic_search.schedule_warm = original_schedule_warm' \
        'end' \
        '' \
        'print(' \
        '  ("wq ms=%.3f frontier=%d kind=%s provider=%s executable=%s"):format(' \
        '    wq_ms,' \
        '    #wq_state.frontier,' \
        '    wq_state.kind,' \
        '    wq_state.provider,' \
        '    tostring(wq_state.executable)' \
        '  )' \
        ')' \
        'print(' \
        '  ("root-w ms=%.3f scheduled=%s matches=%d has_wq=%s has_write=%s"):format(' \
        '    root_ms,' \
        '    (semantic_search_ok and type(index.search_frontier) == "function") and tostring(scheduled) or "unsupported",' \
        '    #root_labels,' \
        '    tostring(vim.tbl_contains(root_labels, "wq")),' \
        '    tostring(vim.tbl_contains(root_labels, "write"))' \
        '  )' \
        ')' \
        >"$script"

    git worktree add --detach "$baseline_dir" HEAD >/dev/null

    run_probe() {
        local repo_root="$1"
        local cache_dir="$2"
        local label="$3"

        (
            cd "$repo_root"
            CMD_UX_TEST=1 \
            CMD_UX_PLUGIN_ROOT="$repo_root/$plugin_rel" \
            XDG_CONFIG_HOME="$repo_root/home/.config" \
            XDG_CACHE_HOME="$cache_dir" \
            nvim --headless -u NONE \
                --cmd "set runtimepath^=$plenary" \
                -c "lua dofile('$script')" \
                -c "qa!"
        ) 2>&1 | sed "s/^/$label /"
    }

    run_probe "$PWD" "$current_cache" "working-tree:"
    printf '\n'
    run_probe "$baseline_dir" "$baseline_cache" "head:"

hooks-install:
    bash scripts/git-hooks/install-pre-commit.sh

hooks-uninstall:
    bash scripts/git-hooks/uninstall-pre-commit.sh

hooks-status:
    bash scripts/git-hooks/pre-commit-status.sh

nix-darwin-sandbox-readme:
    cat sandbox/nix-darwin-macos/README.md

nix-darwin-sandbox-check:
    #!/usr/bin/env bash
    set -euo pipefail

    sandbox="$PWD/sandbox/nix-darwin-macos"
    host="$(scutil --get LocalHostName 2>/dev/null || echo "unknown-host")"

    printf 'sandbox: %s\n' "$sandbox"
    printf 'local-hostname: %s\n' "$host"

    if ! command -v nix >/dev/null 2>&1; then
        printf 'nix: not installed\n'
        printf 'next: install nix, then run `nix flake show ./sandbox/nix-darwin-macos`\n'
        exit 0
    fi

    nix --extra-experimental-features "nix-command flakes" flake show "$sandbox"

    if [ "$host" != "Jasons-MacBook-Pro-M5" ]; then
        printf 'note: flake output is keyed to Jasons-MacBook-Pro-M5; rename sandbox host before switch if needed\n'
    fi

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

agentsview-install:
    DOTFILES_ROOT={{ justfile_directory() }} bash scripts/setup/after/onchange/19-agentsview.sh

agentsview-version:
    #!/usr/bin/env bash
    set -euo pipefail

    printf 'Pinned: %s\n' "$(tr -d '[:space:]' < scripts/data/agentsview-version.txt)"
    if [ -x "$HOME/.local/share/agentsview/bin/agentsview" ]; then
        "$HOME/.local/share/agentsview/bin/agentsview" version
    else
        printf 'Installed: not installed\n'
    fi

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
