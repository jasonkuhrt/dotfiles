set quiet

dotctl := "DOTFILES_REPO_ROOT=" + justfile_directory() + " dotctl"
lua_paths := "home/.config/nvim/lua home/.config/nvim/local-plugins/file-ops/lua home/.config/nvim/local-plugins/file-ops/tests home/.config/nvim/local-plugins/kit/lua"
file_ops_plugin_path := "home/.config/nvim/local-plugins/file-ops"

[private]
default:
    just --list

up:
    {{ dotctl }} up

# Privileged setup: Touch ID for sudo, display sleep, fish as the login shell
sudo-setup:
    sudo bash scripts/sync-sudo.sh

# Remove symlinks into the repo that the deployment plan no longer contains
prune *args:
    {{ dotctl }} prune {{ args }}

# Regenerate the cached symlink manifest that explain/status read
manifest:
    {{ dotctl }} manifest --write

edit target:
    {{ dotctl }} edit {{ target }}

status:
    {{ dotctl }} status

doctor:
    {{ dotctl }} doctor

explain target:
    {{ dotctl }} explain {{ target }}

macos-default-apps:
    home/.local/bin/duti-sync home/.config/duti.yml

macos-default-apps-check:
    home/.local/bin/duti-sync --check home/.config/duti.yml

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
        # ~/.config/karabiner is a whole-dir symlink into the repo, so comparing contents
        # compares a file with itself; -ef asks whether they really are the same file.
        if [ "$repo_cfg" -ef "$live_cfg" ]; then
            pass "Live Karabiner config is the repo file"
        else
            bad "Live Karabiner config is not the repo file: $live_cfg"
        fi
    else
        bad "Live Karabiner config not found at $live_cfg"
    fi

    if pgrep -f 'Karabiner-Core-Service' >/dev/null; then
        pass "Karabiner core service is running"
    else
        bad "Karabiner core service is not running"
    fi

    if pgrep -f 'Karabiner-Console-User-Server' >/dev/null; then
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

fish-check:
    #!/usr/bin/env bash
    set -euo pipefail

    fish_cfg="$PWD/home/.config/fish/config.fish"
    modules_dir="$PWD/home/.config/fish/modules"
    gco_completion="$PWD/home/.config/fish/completions/gco.fish"

    fish -n "$fish_cfg"
    for module in "$modules_dir"/*.fish; do fish -n "$module"; done
    fish -n "$gco_completion"

    # Load the modules the way config.fish does, without the live config, so one module
    # redefining another's function fails here instead of silently in a shell.
    fish --no-config -c "for f in \"$modules_dir\"/*.fish; source \$f; end; source \"$gco_completion\"
        for fn in gco __dotfiles_git_default_branch __dotfiles_git_guardrail _git_dashboard; functions -q \$fn; or exit 1; end
        test (functions --details git) = \"$modules_dir/git.fish\"; or exit 1
        complete -C 'gco ' >/dev/null; or exit 1
        complete -C 'git learn ' >/dev/null; or exit 1"

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

    modules_dir="$PWD/home/.config/fish/modules"
    for module in "$modules_dir"/*.fish; do fish -n "$module"; done

    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT
    cd "$tmpdir"

    git init -b main >/dev/null 2>&1
    git config user.name test
    git config user.email test@example.com
    git commit --allow-empty -m init >/dev/null 2>&1
    git switch -c feature/test >/dev/null 2>&1

    # Load every module the way config.fish does, without the live config, so a module
    # shadowing the wrapper fails here. The dashboard is stubbed: this checks dispatch.
    load="for f in \"$modules_dir\"/*.fish; source \$f; end; function _git_dashboard; echo DASHBOARD; end"
    guarded() { DOTFILES_GIT_GUARDRAILS_FORCE=1 fish --no-config -c "$load; $1" 2>&1 || true; }
    expect_blocked() {
        local out; out="$(guarded "$1")"
        printf '%s\n' "$out" | grep -qF "Blocked: \`git $2\` is disabled" || { printf 'FAIL: not blocked: %s\n%s\n' "$1" "$out" >&2; exit 1; }
        printf '%s\n' "$out"
    }
    expect_allowed() {
        local out; out="$(guarded "$1")"
        if printf '%s\n' "$out" | grep -qF 'Blocked:'; then printf 'FAIL: blocked: %s\n%s\n' "$1" "$out" >&2; exit 1; fi
    }

    [ "$(fish --no-config -c "$load; functions --details git")" = "$modules_dir/git.fish" ]
    [ "$(guarded 'git')" = "DASHBOARD" ]

    expect_blocked 'git checkout main' checkout | grep -qF 'git switch main'
    expect_blocked 'git -C . checkout main' checkout >/dev/null
    expect_blocked 'git -c core.pager=cat --no-pager checkout main' checkout >/dev/null
    expect_blocked 'git push --force origin feature/test' 'push --force' | grep -qF 'git pf origin feature/test'
    expect_blocked 'git push -f origin feature/test' 'push --force' >/dev/null
    expect_blocked 'git push -fu origin feature/test' 'push --force' | grep -qF 'git push --force-with-lease -u origin feature/test'
    expect_blocked 'git push origin +feature/test' 'push --force' | grep -qF 'git push --force-with-lease origin feature/test'
    expect_blocked 'git -C . push --force origin feature/test' 'push --force' >/dev/null
    expect_blocked 'git reset --hard HEAD~1' 'reset --hard' | grep -qF 'git reset --soft HEAD~1'
    expect_blocked 'git -C . reset --hard HEAD' 'reset --hard' >/dev/null

    expect_allowed 'git push --force-with-lease origin feature/test'
    expect_allowed 'git -c color.ui=never --no-pager log --oneline -1'
    expect_allowed 'git reset --soft HEAD'
    expect_allowed 'git switch -q main'

    # The escape hatch and non-interactive shells run git unguarded.
    [ "$(guarded 'command git checkout -q feature/test; command git branch --show-current')" = "feature/test" ]
    [ "$(fish --no-config -c "$load; git checkout -q main; command git branch --show-current")" = "main" ]

    printf 'PASS: git-guardrail-check\n'

git-maintenance-check:
    #!/usr/bin/env bash
    set -euo pipefail

    # The script resolves the repo through git, which canonicalizes symlinks. Do the same,
    # or the comparison below fails whenever just runs through the ~/dotfiles symlink.
    repo_root="$(git rev-parse --show-toplevel)"
    script="$repo_root/scripts/setup/after/onchange/15-git-maintenance.sh"
    fake_launchctl="$repo_root/scripts/tests/fake-launchctl.sh"

    bash -n "$script"
    bash -n "$fake_launchctl"

    tmp_home="$(mktemp -d)"
    trap 'rm -rf "$tmp_home"' EXIT

    # `git maintenance start` bootstraps launchd jobs in the real user domain. Give it a
    # stub: otherwise this check re-registers org.git-scm.git.* against this temp HOME and
    # leaves the user's jobs pointing at plists that vanish with it.
    mkdir -p "$tmp_home/bin"
    cp "$fake_launchctl" "$tmp_home/bin/launchctl"
    chmod +x "$tmp_home/bin/launchctl"
    launchctl_log="$tmp_home/launchctl.log"

    HOME="$tmp_home" DOTFILES_ROOT="$repo_root" PATH="$tmp_home/bin:$PATH" \
        LAUNCHCTL_TEST_LOG="$launchctl_log" bash "$script" >/dev/null

    registered_repo="$(git config --file "$tmp_home/.config/git/local.gitconfig" --get-all maintenance.repo)"
    [ "$registered_repo" = "$repo_root" ]

    # The stub handled the scheduling, not the real launchctl.
    [ -s "$launchctl_log" ]

    # The user's own jobs still point at their own plists.
    for label in hourly daily weekly; do
        loaded="$(launchctl print "gui/$(id -u)/org.git-scm.git.$label" 2>/dev/null | awk '/^[[:space:]]*path = /{print $3; exit}')"
        case "$loaded" in
            ""|"$HOME/Library/LaunchAgents/org.git-scm.git.$label.plist") ;;
            *) printf 'FAIL: org.git-scm.git.%s points at %s\n' "$label" "$loaded" >&2; exit 1 ;;
        esac
    done

    printf 'PASS: git-maintenance-check\n'

git-dx-check: fish-check git-learn-check git-guardrail-check git-maintenance-check
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

hooks-install:
    git-hooks install

hooks-status:
    git-hooks status

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

gh-extensions-sync:
    DOTFILES_ROOT={{ justfile_directory() }} bash scripts/setup/after/onchange/21-gh-extensions.sh

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
    shan {{ args }}

[private]
transcript-dump *args:
    shan transcript dump {{ args }}

[private]
transcript-analyze *args:
    shan transcript analyze {{ args }}

[private]
task-dump *args:
    shan task dump {{ args }}

[private]
task-open *args:
    shan task open {{ args }}

browser-probe := "research/browser-native-host-prototype/host/agent-browser-host.ts"

browser-probe-serve:
    bun {{ browser-probe }} serve

browser-probe-status:
    bun {{ browser-probe }} status

browser-probe-snapshot:
    bun {{ browser-probe }} snapshot

browser-probe-locate selector:
    bun {{ browser-probe }} locate "{{ selector }}"

browser-probe-navigate url:
    bun {{ browser-probe }} navigate "{{ url }}"

browser-probe-click selector:
    bun {{ browser-probe }} click "{{ selector }}"

browser-probe-fill selector text:
    bun {{ browser-probe }} fill "{{ selector }}" "{{ text }}"

browser-probe-native-click selector:
    bun {{ browser-probe }} native-click "{{ selector }}"

browser-probe-native-type text:
    bun {{ browser-probe }} native-type "{{ text }}"
