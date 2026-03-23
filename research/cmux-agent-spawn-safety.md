# cmux Agent Spawn Safety

How Claude Code launches background agents in cmux, why commands get corrupted, and what to fix.

## Status: Issues Filed Upstream (2026-03-21)

Two root causes identified. Source-level fix exists — cmux's V2 API already supports `initial_command` (starts the terminal process directly, bypasses the shell). The CLI just doesn't pass it. Issues filed.

**Snapshot:** cmux 0.62.2 (2026-03-14). Source at `~/repo-references/cmux` synced to head (PR ~#1860). Last checked: 2026-03-21.

## Problem Statement

When Claude Code spawns a background agent (Agent tool with `run_in_background: true`), it creates a new terminal pane and types the `claude` command into it. If the user is typing at that moment, their keystrokes corrupt the command — e.g. `claude` becomes `placd`.

This happens multiple times per session for heavy agent-team users.

## Root Causes

### Root Cause 1: Fish Vi-Mode Eats Characters (PRIMARY, DETERMINISTIC)

**Severity:** Critical. Happens every time, regardless of user typing.

Fish shell is configured with `fish_vi_key_bindings`, which starts the command line in **normal mode** (`[N]`). When cmux sends text via `cmux send` (or `--command` flags, which use the same send-text mechanism), the first characters are interpreted as **vi normal-mode keystrokes**, not text input.

Example: sending `echo hello`:

- `e` = vi: move to end of word
- `c` = vi: change operator (waits for motion)
- `h` = vi: motion left (completes change — enters insert mode)
- `o hello` = typed as text in insert mode
- Result: command becomes `o hello` instead of `echo hello`

**Verified experimentally:** Even with a 5-second delay after shell startup, the command is still corrupted. The shell is fully initialized — it's just in normal mode.

**Fix:** Send `Ctrl-C` (`\x03`) before any command text. This resets the shell to a clean prompt in insert mode, regardless of current state (vi normal, vi insert, emacs, pending operator, completions menu, stray keystrokes from focus-steal).

```bash
cmux send --workspace "$ws" --surface "$surface" $'\003'
cmux send --workspace "$ws" --surface "$surface" "YOUR_COMMAND_HERE\n"
```

**Why `Ctrl-C` over `Escape+i`:** An adversarial review identified that `Escape` followed by `i` within the shell's escape delay window (~300ms in fish 3.3+) could theoretically be interpreted as `Alt-i`. Empirical testing on this system showed `Escape+i` working (likely because `Alt-i` is unbound in fish vi-normal, so fish falls back to processing them separately). However, `Ctrl-C` is strictly more robust: it's processed at the TTY line discipline level (kernel, not shell), has no timing dependencies, and is mode-agnostic across all shells. The only downside is an extra blank prompt line in the terminal history — invisible for agent spawning.

### Root Cause 2: Focus Stealing During Split Creation (SECONDARY, PROBABILISTIC)

**Severity:** Medium. Only triggers when user is actively typing during agent spawn.

The Claude Code tmux shim (`~/.local/libexec/claude/cmux/tmux`) translates `tmux split-window` into:

1. `cmux new-surface` — creates a new tab in the current workspace
2. `cmux drag-surface-to-split` — drags tab into a split pane (**steals focus!**)
3. `cmux focus-pane` — attempts to restore focus (race condition)
4. (Later) `tmux send-keys` — types the claude command into the new surface

Between steps 2 and 3, the user's keystrokes go to the **new** surface. These characters end up in the terminal input buffer, and when `send-keys` fires in step 4, the command text appends after the garbage.

The shim already has a FIXME acknowledging this:

```
# FIXME: Workaround -- drag-surface-to-split steals focus and has no --no-focus flag.
```

**Fix:** Use `cmux new-workspace` instead of `new-surface` + `drag-to-split`. Workspaces appear in the sidebar without stealing focus. This is exactly what the dispatch skill already does (see "Why workspaces, not surfaces" in the skill docs).

## Architecture: How Agent Spawning Works

### The tmux shim layer

Claude Code speaks the tmux protocol. cmux provides a shim at `~/.local/libexec/claude/cmux/tmux` that translates tmux commands to cmux CLI calls.

```
Claude Code binary
    ↓ tmux split-window -h -P -F '#{pane_id}'
cmux tmux shim (bash)
    ↓ cmux new-surface + cmux drag-surface-to-split
cmux app (native)
    ↓ creates terminal tab, drags to split pane
Ghostty terminal
    ↓ starts user's default shell (fish)
Fish shell (vi-mode, normal mode)
    ↓ waiting for input in [N] mode

Claude Code binary
    ↓ tmux send-keys -t %<pane_id> "claude --session-id ..." Enter
cmux tmux shim
    ↓ cmux send --surface <id> "claude --session-id ..."
Fish shell
    ↓ receives text, interprets first chars as vi commands
```

### The dispatch skill (contrast)

The dispatch skill (`~/.claude/skills/dispatch/SKILL.md`) avoids both problems partially:

1. Uses `cmux new-workspace --command` instead of split-window — **no focus stealing**
2. But `--command` also uses send-text semantics internally — **still vulnerable to vi-mode**
3. It works by accident because `bash '/tmp/dispatch-xxx.sh'` is resilient to partial corruption: if `bash` becomes `sh`, the script still runs (valid shebang). But this is fragile.

### cmux command delivery mechanism

**All** command execution in cmux uses the send-text path. There is no native "start terminal with command" API:

| cmux API                  | Mechanism                 | Vi-safe?            | Focus-safe?       |
| ------------------------- | ------------------------- | ------------------- | ----------------- |
| `new-workspace --command` | 500ms delay + `send_text` | No                  | Yes               |
| `respawn-pane --command`  | `send_text`               | No                  | N/A               |
| `send`                    | Direct `send_text`        | No                  | N/A               |
| `send-key`                | Direct key event          | Yes (explicit keys) | N/A               |
| `new-surface`             | No command option         | N/A                 | No (steals focus) |
| `new-split`               | No command option         | N/A                 | Inherits focus?   |

## Fix Matrix

### Immediate: Patch tmux shim's `flush_pending_text` (USER-SIDE)

Send `Ctrl-C` before text to reset shell state. **Scoped to new surfaces only** — track which surfaces were just created by `cmd_split_window` and only apply the reset for those.

```bash
# Track surfaces created by split-window
_NEWLY_CREATED_SURFACES=()

# In cmd_split_window(), after creating the surface:
_NEWLY_CREATED_SURFACES+=("${new_surface_id}")

# In flush_pending_text():
flush_pending_text() {
    local surface_ref="$1"
    local pending="$2"
    if [[ -n "${pending}" ]]; then
        # Vi-mode safety: Ctrl-C resets to clean insert-mode prompt (new surfaces only)
        for created in "${_NEWLY_CREATED_SURFACES[@]}"; do
            if [[ "${created}" == "${surface_ref}" ]]; then
                "${cmux_bin}" send --workspace "$(current_workspace_ref)" --surface "${surface_ref}" $'\003'
                # Remove from tracking — only reset once per surface
                _NEWLY_CREATED_SURFACES=("${_NEWLY_CREATED_SURFACES[@]/$created/}")
                break
            fi
        done
        "${cmux_bin}" send --workspace "$(current_workspace_ref)" --surface "${surface_ref}" "${pending}"
    fi
}
```

**Trade-off:** 1 extra `cmux send` call per new surface (first send only). `Ctrl-C` is harmless: in emacs mode, it cancels the empty line (no-op). In vi normal/insert mode, it resets to a clean insert-mode prompt. Adds a blank prompt line to terminal history — invisible for agent spawning.

**Why scoped:** The adversarial review identified that an unscoped fix would inject `\x03` into ANY `send-keys` target, including running programs (vim, htop, etc.). Scoping to surfaces created by `cmd_split_window` prevents this.

### Immediate: Patch dispatch skill (USER-SIDE)

Replace `--command` (which uses 500ms delay + send-text) with explicit `Ctrl-C` + send:

```bash
# Before:
ws_id=$(cmux new-workspace --command "bash '${launcher}'" 2>&1 | awk '{print $2}')

# After: create workspace, wait for shell, Ctrl-C reset, send command
ws_id=$(cmux new-workspace 2>&1 | awk '{print $2}')
sleep 3  # wait for shell init (nesia greeting, fish config)
tree=$(cmux tree --workspace "$ws_id" 2>&1)
surface=$(echo "$tree" | grep -oE 'surface:[0-9a-fA-F-]+' | head -1)
cmux send --workspace "$ws_id" --surface "$surface" $'\003'
cmux send --workspace "$ws_id" --surface "$surface" "bash '${launcher}'\n"
```

### Medium-term: cmux adds `--no-focus` to `new-surface` (UPSTREAM)

**Tracked:** [manaflow-ai/cmux#1418](https://github.com/manaflow-ai/cmux/issues/1418) (OPEN)

This would let the tmux shim create surfaces without focus stealing:

```bash
cmux new-surface --no-focus --workspace "$ws"
```

### Medium-term: cmux adds native initial command (UPSTREAM)

**Tracked:** [manaflow-ai/cmux#549](https://github.com/manaflow-ai/cmux/issues/549) (OPEN)

Instead of send-text semantics, pass the command to Ghostty's `command` config so the terminal process starts as `bash -c "your command"` rather than `fish` + send-text:

```bash
cmux new-workspace --initial-command "claude --session-id abc123 ..."
# Terminal starts: bash -c "claude --session-id abc123 ..."
# No fish, no vi-mode, no send-text race
```

### Long-term: cmux native agent teams support (UPSTREAM)

**Tracked:** [manaflow-ai/cmux#123](https://github.com/manaflow-ai/cmux/issues/123) (OPEN)

cmux registers as a Claude Code teammate display provider. Claude Code creates teammates via cmux-native API instead of the tmux shim layer.

## Fork Strategy (Preferred Path)

User is prepared to maintain a fork or run nightly. This eliminates the need for shim-level hacks and enables source-level fixes that are clean enough to upstream.

### Repo: `manaflow-ai/cmux`

- **Language:** Swift (Xcode project, `GhosttyTabs.xcodeproj`)
- **Key files:**
  - `Sources/TerminalController.swift` — socket command handler, has 70+ `DispatchQueue.main.sync` calls for CLI commands
  - `Sources/TabManager.swift` — workspace/tab creation, focus management
  - `Sources/Workspace.swift` — workspace model
  - `CLI/cmux.swift` — CLI argument parsing
- **Test infra:** Python scripts in `tests_v2/`, XCTest in `cmuxTests/`
- **Build:** `xcodebuild -project GhosttyTabs.xcodeproj -scheme cmux -configuration Debug`
- **Size:** ~110MB repo

### Fork Change 1: `--initial-command` (eliminates vi-mode and send-text entirely)

**The real fix.** Add a flag that passes the command to Ghostty's process spawn config instead of send-text. The terminal starts `bash -c "your command"` as its process, bypassing the user's shell entirely.

**Where to change:**

1. `CLI/cmux.swift` — add `--initial-command` flag to `new-workspace` and `new-surface`
2. `Sources/TerminalController.swift` — in the `workspace.create` handler, pass command to `GhosttyTerminalView` as a `command` config override
3. `Sources/TabManager.swift` — thread the command through `addTab()` → surface creation

**Why this is clean:**

- Ghostty already supports per-surface `command` config (it's how Ghostty launches shells — `command = /opt/homebrew/bin/fish`)
- No timing races, no send-text, no vi-mode, no shell startup delay
- The terminal process IS the command, not "shell + type command into shell"
- Matches how tmux `split-window "command"` works natively

**Test case:** Extend `tests_v2/test_cli_new_workspace_command_queue.py`:

```python
# Current test uses send-text (echo TOKEN > marker), breaks with fish vi-mode.
# New test: --initial-command should bypass shell entirely.
cmd_text = f"bash -c 'echo {token} > {marker}'"
proc, elapsed = _run_cli(cli, ["new-workspace", "--initial-command", cmd_text])
# Assert marker exists, content matches, focus not stolen
```

### Fork Change 2: `--no-focus` on `new-surface` and `drag-surface-to-split`

**Tracked upstream:** [#1418](https://github.com/manaflow-ai/cmux/issues/1418)

**Where to change:**

1. `Sources/TerminalController.swift` — in `surface.create` and `surface.drag_to_split` handlers, accept a `focus` parameter (default `true`)
2. `Sources/TabManager.swift` — thread the `select` parameter through surface creation
3. `CLI/cmux.swift` — add `--no-focus` / `--focus <bool>` flag

**Prior art in the codebase:** `move-surface` already has `--focus <true|false>`. Same pattern.

### Fork Change 3: `--command` vi-mode safety (quick win, even without Change 1)

If Change 1 is too invasive as a first PR, fix `--command` to handle vi-mode shells:

**Where to change:** `Sources/TerminalController.swift` — in the `workspace.create` handler where `--command` schedules a delayed send-text:

1. Before sending the command text, send `Escape` key event
2. Prepend `i` to the command text
3. Or better: detect if the surface's shell is in vi-mode and only then prefix

### Upstreaming Plan

All three changes are clean, bounded, and testable. Propose as separate PRs:

1. **PR 1:** `--no-focus` on `new-surface` (smallest, most likely to merge, resolves #1418)
2. **PR 2:** `--initial-command` on `new-workspace`/`new-surface` (medium, new feature, high value)
3. **PR 3:** Vi-mode safety in `--command` send-text path (smallest code change, but band-aid)

If upstream is slow, maintain as a fork branch that rebases on `main` weekly. The changes are isolated enough that merge conflicts should be rare.

### Fork Maintenance

```bash
# Initial setup
gh repo fork manaflow-ai/cmux --clone
cd cmux
git remote add upstream https://github.com/manaflow-ai/cmux.git

# Weekly sync
git fetch upstream
git rebase upstream/main
# Build and test
xcodebuild -project GhosttyTabs.xcodeproj -scheme cmux -configuration Debug -destination 'platform=macOS' build

# Install fork build
cp ~/Library/Developer/Xcode/DerivedData/GhosttyTabs-*/Build/Products/Debug/cmux /usr/local/bin/cmux-fork
```

## Related cmux Issues

| Issue                                                    | Title                                         | Status | Relevance                                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [#846](https://github.com/manaflow-ai/cmux/issues/846)   | Vi mode: comprehensive improvement plan       | OPEN   | Copy-mode vi, not shell vi-mode. But shows vi awareness.                                                                                         |
| [#1418](https://github.com/manaflow-ai/cmux/issues/1418) | new-surface: add --no-focus flag              | OPEN   | **Direct fix for focus stealing.**                                                                                                               |
| [#140](https://github.com/manaflow-ai/cmux/issues/140)   | CLI commands should not change focus state    | OPEN   | Broader policy: CLI = side-effect-free control plane.                                                                                            |
| [#123](https://github.com/manaflow-ai/cmux/issues/123)   | Native Claude Code agent teams in split panes | OPEN   | Eliminates tmux shim entirely for agent spawning.                                                                                                |
| [#1472](https://github.com/manaflow-ai/cmux/issues/1472) | Background workspaces have dead PTYs          | OPEN   | **BLOCKER for workspace approach.** If dead PTYs hit dispatch, agents silently fail to launch. Investigate before relying on workspace spawning. |
| [#549](https://github.com/manaflow-ai/cmux/issues/549)   | Native auto-run commands via .cmux.json       | OPEN   | Would provide native initial-command support.                                                                                                    |
| [#1900](https://github.com/manaflow-ai/cmux/issues/1900) | **`--command` should use `initial_command` API** | OPEN   | **THE FIX.** V2 `workspace.create` already accepts `initial_command`, threads it to `surfaceConfig.command`. CLI skips it, uses `send_text` instead. Filed 2026-03-21. |
| [#1901](https://github.com/manaflow-ai/cmux/issues/1901) | **`drag-surface-to-split` V1 routing bug**    | OPEN   | **Fixes split pane failures.** V1 handler uses `selectedTabId` (focused workspace). V2 uses explicit `workspace_id`. CLI still routes through V1. Filed 2026-03-21. |
| [#260](https://github.com/manaflow-ai/cmux/pull/260)     | Stop focus stealing in socket CLI             | MERGED | Partially addressed focus policy. `drag-surface-to-split` still steals.                                                                          |
| [#121](https://github.com/manaflow-ai/cmux/pull/121)     | Add --command flag to new-workspace           | MERGED | Uses send-text. Vi-mode vulnerable. #1900 is the fix.                                                                                            |

## Related Claude Code Issues

| Area               | Detail                                               |
| ------------------ | ---------------------------------------------------- |
| tmux shim location | `~/.local/libexec/claude/cmux/tmux`                  |
| Claude wrapper     | `~/.local/libexec/claude/bin/claude`                 |
| Teammate env var   | `CLAUDE_CODE_TEAMMATE_COMMAND`                       |
| Agent spawn flow   | `split-window` → `send-keys` (2-step, race-prone)    |
| Shim debug logging | `CC_CMUX_DEBUG=1` → `~/.cache/cc-cmux/tmux-shim.log` |

## Experimental Results

All tests performed 2026-03-20 on cmux 0.62.2 with fish 3.x + `fish_vi_key_bindings`.

| Test                                        | Command | Result                             | Root Cause                                     |
| ------------------------------------------- | ------- | ---------------------------------- | ---------------------------------------------- |
| `new-workspace --command "echo X > /tmp/t"` | `echo`  | `o X > /tmp/t` (fails)             | Vi-mode: `ech` interpreted as vi commands      |
| `respawn-pane --command "bash /tmp/t.sh"`   | `bash`  | `sh /tmp/t.sh` (silent change)     | Vi-mode: `ba` = back + append. NOT resilience. |
| 5s delay + `cmux send "echo X"`             | `echo`  | `o X` (fails)                      | Vi-mode: not a timing issue                    |
| `send-key escape` + `send "iecho X\n"`      | `echo`  | `echo X` (SUCCESS)                 | Vi-mode bypassed by entering insert mode first |
| `Ctrl-C` + `send "echo X\n"`                | `echo`  | `echo X` (SUCCESS)                 | Ctrl-C resets to insert mode, no timing deps   |
| `Ctrl-C` (no sleep) + `send "echo X\n"`     | `echo`  | `echo X` (SUCCESS)                 | Works even without delay between Ctrl-C + text |
| `new-workspace` (no --command)              | N/A     | Focus stays on caller workspace    | Workspaces don't auto-focus                    |
| tmux shim `split-window`                    | N/A     | Focus briefly stolen then restored | `drag-surface-to-split` steals focus           |

## Action Items

### Done

1. **Filed [#1900](https://github.com/manaflow-ai/cmux/issues/1900)** — `--command` should use `initial_command` API (the real fix, 2-line CLI change, backend already supports it)
2. **Filed [#1901](https://github.com/manaflow-ai/cmux/issues/1901)** — `drag-surface-to-split` V1 routing bug (causes "Surface not found" when user is in a different workspace)
3. **Patched tmux shim** — `cmux new-split` replaces broken `drag-surface-to-split`; `i` prefix on new surfaces for vi-mode safety. Stopgap.

### Next

4. **Restart cmux** to clear dead PTY state from testing, then verify shim patch e2e.
5. **Monitor #1900 and #1901** for upstream response. If slow, fork and submit PRs — both changes are small and verified against source.
6. **Update dispatch skill** to use `initial_command` once #1900 lands (or fork). Currently uses `--command` which still goes through send_text.

### Track

7. Monitor #1418 (--no-focus), #123 (native agent teams), #1472 (dead PTYs) for upstream resolution.
8. Monitor cmux releases > 0.62.2.

## Decision Log

| Date       | Decision                                          | Rationale                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-03-20 | Vi-mode identified as primary root cause          | Deterministic, always triggers, explains "echo→o" pattern. 5s delay test proved it's not a timing race.                                                                                                                                                          |
| 2026-03-20 | Workspace > Surface for agent spawning            | Surfaces steal focus (even with attempted restore). Workspaces don't. Dispatch skill already made this call.                                                                                                                                                     |
| 2026-03-20 | `Escape` + `i` prefix is the correct fix          | Works regardless of shell mode (vi normal, vi insert, emacs). Escape is harmless in emacs mode. `i` enters insert or is typed as text.                                                                                                                           |
| 2026-03-20 | Fork/nightly path preferred over shim hacks       | User prepared to maintain fork. Source-level `--initial-command` eliminates entire problem class — no send-text, no vi-mode, no timing. Shim patches are stopgaps.                                                                                               |
| 2026-03-20 | Upstream test blind spot identified               | `test_cli_new_workspace_command_queue.py` uses `echo TOKEN > file` — works in bash, breaks in fish vi-mode. Good reproduction case for upstream issue.                                                                                                           |
| 2026-03-20 | `Ctrl-C` over `Escape+i` (adversarial review)     | Headless review flagged escape delay risk: `Esc`+`i` within 300ms = `Alt-i`. Empirically disproven on this system (unbound `Alt-i` falls back), but `Ctrl-C` is strictly more robust: TTY-level, no timing deps, mode-agnostic. Adopted as recommended approach. |
| 2026-03-20 | Fix must be scoped to new surfaces only           | Adversarial review: unscoped `Ctrl-C` in `flush_pending_text` would inject `\x03` into running programs (vim, htop). Track created surfaces, only reset once per surface.                                                                                        |
| 2026-03-20 | #1472 upgraded to BLOCKER                         | Adversarial review: if background workspaces have dead PTYs, dispatch skill's workspace approach silently fails. Must investigate before relying on workspace spawning.                                                                                          |
| 2026-03-20 | Dispatch "resilience" is false                    | `bash` → `sh` is not resilience — it's a silent behavior change. On macOS, `/bin/sh` is zsh-in-POSIX-mode, so bash-isms like `[[` happen to work. On Linux it would fail.                                                                                        |
| 2026-03-20 | Bracketed paste fails in vi normal mode           | `\e[200~...\e[201~` bytes hit vi parser directly in normal mode. BP only works in insert/readline mode. `~` at end toggled case — confirming bytes pass through cmux but fish doesn't process them as paste.                                                     |
| 2026-03-20 | `cmux new-split` replaces `drag-surface-to-split` | `drag-surface-to-split` broken ("Surface not found"). `cmux new-split right` is atomic, works. Shim updated.                                                                                                                                                     |
| 2026-03-20 | `i` prefix is the deployed shim fix               | Prefix `i` to text on new surfaces. Enters insert mode from vi normal. Scoped via marker files. Verified on clean state. E2E blocked by #1472 dead PTYs — needs cmux restart.                                                                                    |
| 2026-03-20 | Divergent agents: shell should not be in path     | Product: decouple lifecycle/observation/interaction. Unix: 7 approaches tested, bracketed paste fails, FIFO and fish_mode_prompt hook viable. Core insight: terminal = viewport, not execution engine.                                                             |
| 2026-03-21 | `initial_command` already exists in cmux backend  | `ghostty_surface_config_s.command` (ghostty.h:447) → `GhosttyTerminalView.initialCommand` → `TerminalPanel` → `Workspace` → `TabManager.addWorkspace` → V2 `workspace.create` handler reads `initial_command` param. The entire pipeline works. CLI just doesn't pass it. |
| 2026-03-21 | Filed #1900 and #1901 upstream                    | #1900: CLI should pass `initial_command` instead of `send_text` (2-line fix). #1901: `drag-surface-to-split` V1 routing uses `selectedTabId` instead of explicit workspace (causes cross-workspace failures).                                                      |
| 2026-03-21 | cmux `send_text` uses Ghostty key events, not PTY | `sendSocketText` → `sendTextEvent` → `sendKeyEvent(keycode:0, text:)`. Regular text is Ghostty keyboard events. Control chars (`\n`→Return, `\x1B`→Escape, `\x03`→Ctrl-C) become explicit key events. Fish vi-mode processes all of these through its key handler. |
