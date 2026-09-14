# Terminal & Agent Workflow Clean Slate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the bespoke terminal and agent glue accrued in 2026 and run on the native features of the latest cmux, Claude Code, Codex, Karabiner-Elements, Ghostty and Neovim. Replace nothing by hand that a tool now does itself.

**Architecture:** Most of the custom stack exists to work around gaps that have since closed, and one piece of it — the zmx launch bridge — actively switches off cmux's native Claude integration, including agent auto-resume. The plan first removes that bridge, which restores native behaviour with zero code. It then deletes a dead 25k-line duplicate plugin, then the agent wrappers, then the navigation stack, and finally the pieces that only become removable once cmux 0.64.23 ships. Each phase ends in a verified, committed state. Where the clean slate costs Jason a real capability, a decision gate names it.

**Tech Stack:** cmux 0.64.22 (0.64.23 is tagged but unreleased), Ghostty 1.3.1, Karabiner-Elements 16.3.0, Claude Code 2.1.270, Codex (app-bundled CLI 0.154.0-alpha.6.2), Neovim (HEAD build → stable 0.12.5), fish, `just`, LazyVim, dotctl.

**Spec:** This document is research and plan in one, per Jason's request: § Research is the evidence, § Target End State is the requirement. § Sources lists the raw material.

## Global Constraints

- Repo: `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles`, branch `main`, **public** on GitHub. `home/` deploys into `$HOME` as symlinks (whole-directory unless a `.spread` marker exists). A gitleaks pre-push hook runs; never commit secrets.
- **Other Claude sessions edit this checkout concurrently.** Before editing any file, run helper H2 on it. Never commit someone else's uncommitted hunk. If a file you need has foreign uncommitted changes, stop and ask Jason or that session to land them first.
- Never `git stash`, `git checkout <branch>`, `git switch`, or `git revert` in this worktree. Commit with pathspecs: `git commit -m "…" -- <paths>`.
- Commits are semantic: `type(scope): subject`. `git log` is the style authority.
- Every user-facing capability change, **including removals**, gets `nesia add <category> "<what changed>"`.
- Any repeatable workflow lives in the root `justfile`. Deleting a feature deletes its recipes; leave no recipe pointing at deleted files.
- Lua changes: run `just lua-check` before committing. Don't document raw `selene`/`stylua`/`lua-language-server` commands.
- Install or upgrade tools **the way the tool's current docs say**. Read an installer script before piping it to a shell. `home/.config/fish/config.fish` is a symlink into this repo: an installer that edits `$SHELL`'s rc file would write into tracked source, so redirect it (for POSIX-sh installers: `env SHELL=/bin/sh ENV="$(mktemp)"`) and verify `git diff --quiet -- home/.config/fish/config.fish` afterwards.
- Verify shell-visible changes in a clean login shell with a time limit: `perl -e 'alarm 20; exec @ARGV' env -i HOME="$HOME" PATH=/usr/bin:/bin /opt/homebrew/bin/fish -c '…'`.
- Never write a guard as `cmd | sed … && abort`: a pipeline's status is its last command's, so the guard never fires. Capture output into a variable and test that.
- **cmux crashed four times** on 2026-09-13/14 (§ R9, cause unknown). Until Phase 2 is live and cmux has run a day without crashing, don't script bursts of `cmux` CLI calls. Any step that needs a live cmux interaction is done by Jason, or with his explicit go-ahead.
- **Decision gates** (§ Decision Gates) block the tasks that name them. The listed default is the clean-slate recommendation, **not** approval. Record each answer in the plan (edit the gate row) before executing a gated task.
- Line numbers in this plan were captured at `HEAD ca2298e6`. Where a step edits by line number it pins the file's blob hash. If the hash differs, re-derive the lines with the given `grep` before editing.

---

## Owner's Checklist (do this before Phase 0)

- [ ] Read § Research end to end. Spot-check at least R1, R4 and R6 against their cited sources, and correct this plan inline if anything no longer holds.
- [ ] Put every question in § Decision Gates to Jason, and record his answers in the table.
- [ ] Confirm the cmux 0.64.23 release status: `gh release view v0.64.23 --repo manaflow-ai/cmux`. Phase 6 waits on it.
- [ ] Decide execution mode (subagent-driven or inline) and announce it.

---

## Research

### R1 — The glue switches off native features Jason already has

- **cmux auto-resumes agent sessions natively, on by default.** The schema key `terminal.autoResumeAgentSessions` defaults to `true`: *"Automatically run agent resume commands for restored terminal sessions when cmux reopens after quit."* (`web/data/cmux.schema.json` @ `v0.64.22`).
  - The docs FAQ says: *"cmux restores your windows, workspaces, panes, working directories, and scrollback when you relaunch, and the state survives a full computer restart … Agent sessions like Claude Code, Codex, and OpenCode come back too."* (`web/messages/en.json:747`). The session-restore page covers *"after relaunch or a terminal crash"* (`en.json:1041`).
  - App-reopen gating landed 2026-05-06 (commit `81da286cf9`). It was hardened through 0.64.17–0.64.22: Claude permission mode preserved on restore (0.64.19), Codex/Grok/Pi restore plus duplicate-resume fix (0.64.21), Claude kept on its own account (0.64.22) (`CHANGELOG.md` @ `v0.64.22`).
- **Resume depends on cmux's shell integration recording session IDs** in `~/.cmuxterm/claude-hook-sessions.json` (`CLI/cmux.swift:201`). That file was last written **2026-08-17 11:50**, the day cmux 0.64.22 was installed.
- **Why it stopped:**
  - `home/.config/ghostty/config:55` sets `command = direct:…/cmux-zmx-enter`.
  - cmux skips its managed fish launch whenever a Ghostty `command` exists: `if hasUserGhosttyCommand { return nil }` (`Packages/macOS/CmuxTerminal/Sources/CmuxTerminal/Spawn/TerminalLaunchCommandPolicy.swift:27-32`).
  - zmx then starts plain `fish -l`, so cmux's fish integration (`Resources/shell-integration/fish/config.fish`) never loads. `~/.local/bin/claude` wins on PATH, and none of the 9 running Claude processes carries `CMUX_CLAUDE_PID` (verified 2026-09-14).
  - Only fish is affected: zsh and bash integration arrives through environment variables.
- **Consequently lost since Aug 17:** agent auto-resume, sidebar agent status, notifications, Feed approvals, workspace auto-naming, and `open` routing to the cmux browser.
- **zmx vs native, measured against Jason's goals:** zmx keeps a *running* process alive across a cmux crash but **not** across a reboot; native resume survives both. zmx's one real advantage is that an in-flight command survives a crash. When cmux crashed on 2026-09-13, the tool command then running inside a zmx-hosted Claude session was killed anyway (exit 137).

### R2 — Inventory of bespoke code (accrued 2026)

Counts are `wc -l` at `HEAD ca2298e6`; "first" is the first commit touching the path.

| Path | Lines | First | Last | Verdict |
| --- | ---: | --- | --- | --- |
| `home/.local/libexec/cmux/cmux-zmx-enter` | 146 | 2026-03-15 | 2026-09-14 | delete (P2) |
| `scripts/tests/fake-zmx.sh` | 17 | 2026-03-15 | 2026-03-15 | delete (P2) |
| `home/.config/nvim/local-plugins/cmd-ux/` (85 files) | 24,703 | 2026-03-06 | 2026-07-26 | delete (P3), dead duplicate |
| `home/.config/nvim/cmd-ux-command-blocklist.txt` | 557 | — | — | delete (P3), read by nothing |
| `home/.local/bin/codex2` | 162 | 2026-03-11 | 2026-03-11 | delete (P4) |
| `home/.local/libexec/codex/codex-tab-sync` | 303 | 2026-03-11 | 2026-03-11 | delete (P4) |
| `home/.local/bin/codex` (wrapper) | 4 | 2026-09-11 | 2026-09-11 | gate D6 (P1) |
| `home/.claude/skills-library/dispatch-claude/` | 557 | 2026-06-12 | 2026-06-12 | gate D3 (P4) |
| `home/.claude/skills-library/cmux/` | 473 | 2026-03-11 | 2026-09-14 | gate D4 (P4) |
| `home/.config/karabiner/karabiner.json` drive-mode rules 2-9 | ≈3,850 of 3,927 | 2026-02-17 | 2026-06-01 | gate D1 (P5) |
| `home/.local/libexec/cmux/cmux-mode` | 170 | 2026-03-11 | 2026-09-11 | gate D1 (P5) |
| `home/.config/nvim/local-plugins/cmux-nav/` + `lua/plugins/cmux-nav.lua` | 291 + 78 | 2026-03-11 | 2026-05-03 | gate D1 (P5) |
| `home/.local/bin/cmuxx` | 26 | 2026-03-09 | 2026-09-14 | gate D1/D5 (P5) |
| `home/.config/ghostty/config` Hyper keybinds (lines 74-96) | 23 | 2026-01-08 | 2026-09-11 | gate D1 (P5) |
| `scripts/tests/fake-cmux.sh` | 242 | 2026-03-07 | 2026-03-22 | delete once its consumers are gone (P5) |
| `home/.local/bin/plannotator-browser` + `PLANNOTATOR_BROWSER` | 2 + 2 | 2026-03-20 | 2026-03-20 | delete after 0.64.23 (P6) |
| `link_open.lua` cmux branch, `gprv` cmux branch | ≈30 + ≈12 | 2026-03-05 | 2026-03-08 | delete after 0.64.23 (P6) |
| `image_open.lua` cmux branch | ≈55 | 2026-03-06 | 2026-03-06 | **keep**: no native image-preview CLI in 0.64.22 or 0.64.23 |

`justfile` recipes that exist only for the pieces above:

| Recipe | Lines | Phase |
| --- | ---: | --- |
| `cmux-zmx-check` | 76 | P2 |
| `cmd-ux-blocklist-check`, `cmd-ux-test`, `cmd-ux-test-loop`, `cmd-ux-test-spec`, `cmd-ux-test-spec-loop`, `cmd-ux-bench`, `cmd-ux-bench-finder`, `cmd-ux-proof-wq-regression` | 264 | P3 |
| `codex2-check` | 93 | P4 |
| `claude-dispatch-check`, `cmux-upstream-audit` | 69 + 46 | P4 (D3) |
| `cmux-mode-check`, `cmux-nav-test` | 78 + 18 | P5 (D1) |

`scripts/tests/fake-cmux.sh` consumers today are `cmux-mode-check`, `claude-dispatch-check`, `cmux-zmx-check` and `codex2-check`.

### R3 — Tool versions (2026-09-14)

| Tool | Installed | Latest | Action |
| --- | --- | --- | --- |
| cmux | 0.64.22 | 0.64.22 released; **0.64.23 tagged (`211b8bb`), no GitHub release** | upgrade when released (P6 gate) |
| Karabiner-Elements | 16.3.0 | 16.3.0 | none |
| Ghostty (standalone) | 1.3.1 | 1.3.1 | none. Still used: Claude runs in plain Ghostty windows too |
| Claude Code | 2.1.270 | 2.1.270 | none |
| Codex CLI | app-bundled `0.154.0-alpha.6.2` via wrapper | documented installer / npm / cask | gate D6 (P1) |
| Neovim | `HEAD-492b8c9` (0.13.0-dev) | stable 0.12.5 | move to stable (P1) |
| zmx | 0.5.0 | 0.8.1 | **remove** (P2) |
| zsm | 0.4.0 | 0.5.0 | **remove** (P2) |
| pnpm | 12.4.1 (standalone installer) | 12.4.1 | done (`a36b5273`) |

### R4 — cmux: what is native and what isn't

Source: `~/repo-references/cmux` tag `v0.64.22` = commit `ddd4a01bc`, the installed build. 0.64.23 was read from `refs/remotes/upstream-tags/v0.64.23` (`211b8bb`).

- **Native shortcut actions and their defaults**, as written by cmux into `~/.config/cmux/cmux.json`: `nextSurface` `cmd+shift+]`, `prevSurface` `cmd+shift+[`, `nextSidebarTab` `cmd+ctrl+]`, `prevSidebarTab` `cmd+ctrl+[` (labelled Next/Previous Workspace), `focusLeft/Right/Up/Down` `cmd+opt+arrows`, `splitRight` `cmd+d`, `splitDown` `cmd+shift+d`, `toggleSplitZoom` `cmd+shift+enter`, `closeTab` `cmd+w`, `renameWorkspace` `cmd+shift+r`, `goToWorkspace` `cmd+p`.
- **Not native in 0.64.22:**
  - resize (0.64.23 adds `resizePaneLeft/Right/Up/Down`, default `ctrl+shift+h/j/k/l`, hold to repeat)
  - split left/up (in neither version)
  - any sticky or modal key mode (chords are one-shot two-step only, `en.json:2032`)
  - Neovim edge-crossing
  - an image-preview CLI
- **CLI workspace cycling:** `next-window`/`previous-window` "Switch workspace selection" and wrap around (`CLI/cmux.swift:16936`, `Sources/TabManager.swift:3541,3561`).
- **Process persistence:** none in 0.64.22 (*"cmux does not checkpoint arbitrary live process state"*, `en.json:1621`). 0.64.23 adds opt-in `cmux local-tmux`: it needs a `tmux` binary and doesn't kill sessions on surface close. **Not needed**, given R1.
- **Workspace auto-naming:** `automation.workspaceAutoNaming`, off by default, summarizes the agent's own transcript with `claude -p` / `codex exec` and names the workspace and tab. Manual names always win (`docs/workspace-auto-naming.md` @ `v0.64.22`).
- **`open` routing:** cmux ships `Resources/bin/open`, which routes http(s) to its browser. In 0.64.22 it loses on PATH; 0.64.23's `_cmux_fix_path` (#9781, `124917001f`) fixes that. It also needs the fish integration loaded (Phase 2).
- **Official agent skills:** `skills/cmux/SKILL.md` (*"End-user control of cmux topology and routing"*) plus `cmux-browser`, `cmux-workspace`, `cmux-keyboard-shortcuts`, `cmux-settings`, `cmux-customization`, `cmux-markdown`, among others (`v0.64.22:skills/`). Installed with Vercel's `skills` CLI or `skills.sh` (`en.json:2288-2291`).
- **`cmux.json` is written by cmux itself** through a temp-file rename (`Sources/CmuxConfigActionSaver.swift:235`), which is why `~/.config/cmux` deploys as a whole-directory symlink (`f5e489a6`).

### R5 — zmx bridge anatomy

Source: `~/repo-references/zmx` tags `v0.5.0` and `v0.8.1`; `~/repo-references/zsm` tag `v0.4.0`.

- zmx natively does attach-or-create, runs a login `$SHELL` when given no command, passes a given command to `execvpe` verbatim, and sets `ZMX_SESSION`.
- **zmx has no kill-on-last-client** in either version: every call site passes `shutdown_on_last=false`, and upstream issue #221 is open. Closing a window only detaches (README line 68).
- The bridge's cleanup runs after `zmx attach` returns and has no hangup trap, so it rarely runs. Of 27 `cmux-*` sessions, 17 belong to surfaces that no longer exist (all `clients=0`); two of those still run Claude (pids 23866 and 98305). 18 of 45 state files in `~/.local/state/cmux-zmx/surfaces` point at dead sessions, and nothing reads those files.
- The bridge calls `cmux tree` up to 8 times per new terminal (lines 37-41). cmux already exports the same UUID as `CMUX_SURFACE_ID` (`TerminalSurface+StartupEnvironment.swift:51`; live check: lowercased, it equals `ZMX_SESSION` minus the `cmux-` prefix).
- zmx 0.5.0 exits 0 on every failure, including an over-long name (`main.zig:146-147`); 0.8.0 fixed that. Upgrading 0.5 → 0.8 would kill all live sessions (README line 547 @ `v0.8.1`), which is moot once zmx is removed.
- `zz` misbehaves inside a cmux terminal: `ZMX_SESSION` is already set, so `zmx attach` switches sessions and leaves the current one detached (`main.zig:1651-1661`).

### R6 — Karabiner

- **Drive mode is rules 2-9** of the single profile in `home/.config/karabiner/karabiner.json`:
  - Sticky Ctrl+0 cmux drive mode; Exit; top-level actions; resize prefix; split prefix; workspace prefix.
  - "clears invalid prefixes": 54 manipulators, identical except `from.key_code` (one condition set, one `to`).
  - "swallows unmapped keys": 45 manipulators, identical except `from.key_code`.
  - Rules 0 (Raycast Ctrl+J/K) and 1 (sticky fn) are unrelated and stay.
- **Catch-all matching is documented:** *`"any": "key_code"` … "Combine it with filters such as `variable_if` to disable key events under specific conditions."* Example: `"from": { "any": "key_code", "modifiers": { "optional": ["any"] } }` (https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/any/).
- **Evaluation order is documented:** *"The manipulators are evaluated from the top to the bottom and the input event is manipulated only the first matched manipulator."* (https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-evaluation-priority/).
- There is no generator in the repo; the JSON is maintained by hand. Neither `json.dumps(indent=2)` nor `indent=4` reproduces the file byte-for-byte, so any scripted edit must first land a formatting-only commit.
- `just karabiner-check` asserts only the driver and the Raycast rule; it doesn't depend on drive mode.

### R7 — The in-tree `cmd-ux` copy is a dead predecessor

- Neovim loads the sibling project: `home/.config/nvim/lua/plugins/cmdux.lua` sets `dir = vim.fn.expand("~/projects/jasonkuhrt/cmdux")` and `require("cmdux")`. No plugin spec points at `local-plugins/cmd-ux`.
- The in-tree copy exposes module `cmd_ux`; the sibling exposes the renamed `cmdux`. Commit `48981058` (2026-03-18) is "cmd-ux: evolve plugin and migrate consumers to standalone cmdux repo". The in-tree copy's last touch, `6e7cd869` (2026-07-26), was a repo-wide agent-context doc prune, not feature work. The sibling is clean at `539e7ba` (2026-06-02).
- The sibling reads `stdpath("config") .. "/cmdux-command-blocklist.txt"`, which is tracked and stays. The repo's `cmd-ux-command-blocklist.txt` is read by nothing, yet `just cmd-ux-blocklist-check` validates it.
- Still wired to the dead copy: `justfile:6-7` variables and eight recipes; `.luarc.json:6-8` (`workspace.ignoreDir`); `scripts/git-hooks/check-staged-lua.sh:11`; `scripts/ci/lua-ci.sh` (regex at `:80`, function at `:90-95`, array `:133`, collector `:145-147`, condition `:167`, block `:179-184`); `.github/workflows/lua.yml:15,29,58`; `.claude/CLAUDE.md:14`; `docs/lua-tooling.md:118,140,144-145` (the last two also cite a `symlink-roots/` layout that no longer exists).

### R8 — Agent wrappers

- **`codex2`** always adds `--dangerously-bypass-approvals-and-sandbox` and starts `codex-tab-sync`, which tails Codex logs to rename the cmux tab. It's bound to nothing, referenced only by `docs/cli-tools.md:56` and `just codex2-check`, and fish history shows one use ever. Native replacement: `automation.workspaceAutoNaming` (R4). Titles become AI-generated rather than Codex's own `thread_name`.
- **Codex CLI install**, per the README at `~/repo-references/codex` (2026-09-13): `curl -fsSL https://chatgpt.com/codex/install.sh | sh` (standalone installer, listed first), `npm install -g @openai/codex`, or `brew install --cask codex`. `home/.local/bin/codex` exists because the earlier Homebrew cask (0.144.0) couldn't parse the config Codex.app writes. The app-bundled CLI it execs is an alpha (`0.154.0-alpha.6.2`).
- **`dispatch-claude`** (active: `~/.claude/skills/dispatch-claude` → skills library since 2026-06-12) fans work out to separate Claude sessions, each in its own cmux workspace, with 23 `cmux` calls in `dispatch.sh`.
  - Native candidates: Claude Code agent teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is already exported, `config.fish:57-62`; teammates run in-process inside cmux; docs https://code.claude.com/docs/en/agent-teams; changelog entries at `~/repo-references/claude-code/CHANGELOG.md:2273,5067`) and `cmux claude-teams` for split-pane teammates.
  - `cmux-upstream-audit` tracks cmux issues #1900, #1418, #1884, #1472 and #2319, which concern `new-workspace --command`, `new-surface`, pane commands and `claude-teams` — the surface `dispatch-claude` uses. #1200 was already dropped as closed (`7a235e94`).

### R9 — The cmux crashes (unresolved)

- **Four reports**: `~/Library/Logs/DiagnosticReports/cmux-2026-09-13-234107.ips`, `cmux-2026-09-14-115536.ips`, `-115609.ips`, `-115625.ips`.
- **Identical signature**: `EXC_BAD_ACCESS`/`SIGBUS`, a 27-frame faulting thread topped by `___chkstk_darwin`, with frame `cmux+0x6a4514` repeated 6 times. That's a stack overflow on a secondary thread, in unsymbolicated cmux code. The binary contains process-tree walking (`childrenByParentPID`, a per-pane process-tree memory warning), but no link to it is proven.
- **No attribution is established** to the dotfiles, the zmx bridge, or the pnpm node-shim breakage that happened the same night.
- **Two relevant facts**: 0.64.23's changelog fixes "cold PTY spawns wedging the app after CLI bursts (#9796)", and the bridge bursts `cmux tree` on every new terminal. Removing the bridge removes that burst regardless.

### Sources

- Agent transcripts (read-only research, 2026-09-14), under `~/.claude/projects/-Users-jasonkuhrt-projects-jasonkuhrt-dotfiles/55a82ea1-2021-43aa-899b-00a8bf1cc515/subagents/`: `agent-acmux-audit-2-*.jsonl`, `agent-acmux-burndown-*.jsonl`, `agent-azmx-burndown-*.jsonl`.
- Reference clones: `~/repo-references/cmux` (tags `v0.64.22`; `refs/remotes/upstream-tags/v0.64.23`), `~/repo-references/zmx` (`v0.5.0`, `v0.8.1`), `~/repo-references/zsm` (`v0.4.0`), `~/repo-references/codex`, `~/repo-references/claude-code`, `~/repo-references/karabiner-elements` (docs live on the website, not in this repo).
- Karabiner docs: the two URLs in R6.
- Local backlog: `.session/ignore/audit-backlog.md` (gitignored).

---

## Decision Gates

Jason answers each row before its tasks run. The defaults are the clean-slate recommendation.

| ID | Question | Clean-slate default | Lost with the default | Alternative |
| --- | --- | --- | --- | --- |
| D1 | Keep the Karabiner drive mode navigation stack (Ctrl+0 sticky mode, `cmux-mode`, Ghostty Hyper keybinds, nvim `cmux-nav`, `cmuxx`)? | **Option A: delete it all**; use cmux's native shortcuts and LazyVim's default window navigation | sticky Ctrl+0 mode; split left/up; resize until 0.64.23 ships (`ctrl+shift+hjkl` then); seamless Ctrl+hjkl crossing between nvim splits and cmux panes; `w j/k` workspace cycling (native: `cmd+ctrl+]`/`[`) | **Option B**: keep drive mode but collapse the two enumeration rules with `from.any` (Task 5B.1), and swap `cmux-mode`'s Python for `cmux next-window` (Task 5B.2) |
| D2 | Replace `codex2`/`codex-tab-sync` tab titles with cmux AI auto-naming? | **Yes** | Codex's own `thread_name` as the tab title | no tab naming |
| D3 | Retire the `dispatch-claude` skill in favour of Claude Code agent teams? | **Yes**, after Task 4.2 step 1 confirms agent teams cover fan-out | one sidebar workspace per dispatched session | keep the skill and its two recipes |
| D4 | Replace the 473-line custom cmux skill with cmux's official skills plus a ≤120-line personal overlay? | **Yes** | nothing substantive found | keep the custom skill |
| D5 | (Only if D1 = Option B) Keep `[`/`]` in fish vi-normal mode for tab switching? | **No**: use `cmd+shift+]`/`[` | single-key tab switch at an idle prompt | keep 5 lines + `cmuxx` |
| D6 | Install Codex CLI with its documented standalone installer and delete the `codex` wrapper? | **Yes, if** the installed CLI loads `~/.codex/config.toml` without error (Task 1.2) | nothing | keep the 4-line wrapper, with its reason in a comment |
| D7 | When to cut over from zmx (Task 2.2)? | next quiet moment | processes running inside the 27 zmx sessions. Claude conversations come back with `claude -r` | — |

---

## Target End State

- A new cmux terminal is launched by cmux itself. There is no Ghostty `command`, so cmux's fish integration loads, and with it the Claude and Codex shims, hooks, auto-resume (on by default), sidebar status, notifications, workspace auto-naming (D2) and, after 0.64.23, `open` routing.
- zmx and zsm are uninstalled; `~/.local/state/cmux-zmx` is gone.
- Navigation (D1 Option A): cmux default shortcuts (R4), LazyVim default `<C-h/j/k/l>` window navigation in Neovim, and Karabiner rules 0-1 only.
- No Codex or Claude launch wrappers; parallel agent work uses Claude Code agent teams (D3).
- The dead in-tree `cmd-ux` copy and its CI, hook, LuaLS and recipe wiring are gone.
- Tools: cmux 0.64.23 (once released), Karabiner-Elements 16.3.0, Ghostty 1.3.1, Claude Code 2.1.270, Codex CLI from its documented installer (D6), Neovim stable 0.12.5.

## Deletion Ledger (measured)

Measured by executing this plan's edit steps on a scratch copy of `ca2298e6` (`git diff --numstat` per task). Task 4.3 wasn't simulated because it downloads; it removes roughly 350 more lines.

| Phase | Removed | Added | Net | Notes |
| --- | ---: | ---: | ---: | --- |
| P2 zmx bridge (2.1) | 320 | 5 | −315 | restores native integration and resume |
| P3 dead `cmd-ux` copy (3.1) | 25,565 | 15 | −25,550 | zero behaviour change |
| P4 wrappers (4.1, 4.2) | 1,235 | 5 | −1,230 | plus Task 4.3 |
| P5 Option A (5A.1–5A.5) | 6,009 | 1,164 | −4,845 | 5A.1's reformatting adds 894 net, then 5A.2 removes it |
| P5 Option B (5A.1, 5B.1, 5B.2) | 3,936 | 1,183 | −2,753 | instead of Option A |
| P6 after cmux 0.64.23 (6.1) | 53 | 1 | −52 | `open` routing |
| **Total, Option A** | **33,182** | **1,190** | **≈ −31,990** | ≈ −6,440 excluding the `cmd-ux` duplicate |

Task 0.1 records the live baseline, and Task 7.1 the live result.

---

## Helpers

Use these in the tasks below. Save them to your scratchpad; they aren't repo files.

**H1 — remove `justfile` recipes by name**, asserting each one was found (`/tmp/rm_recipe.py`):

```python
#!/usr/bin/env python3
# usage: python3 /tmp/rm_recipe.py justfile recipe-a recipe-b ...
import re, sys

path, names = sys.argv[1], set(sys.argv[2:])
lines = open(path).read().split("\n")
header = re.compile(r"^([A-Za-z0-9_-]+)(\s[^:]*)?:(?!=)(\s|$)")
out, removed, i = [], [], 0
while i < len(lines):
    m = header.match(lines[i])
    if m and m.group(1) in names:
        while out and out[-1].startswith("["):  # attributes such as [private]
            out.pop()
        removed.append(m.group(1))
        i += 1
        while i < len(lines) and (lines[i].startswith((" ", "\t")) or lines[i] == ""):
            if lines[i] == "" and (i + 1 >= len(lines) or not lines[i + 1].startswith((" ", "\t"))):
                i += 1
                break
            i += 1
        continue
    out.append(lines[i])
    i += 1
missing = names - set(removed)
assert not missing, f"recipes not found: {sorted(missing)}"
open(path, "w").write("\n".join(out))
print("removed:", ", ".join(removed))
```

**H2 — refuse to edit files carrying someone else's uncommitted changes:**

```bash
check_clean() {
  local f
  for f in "$@"; do
    if ! git diff --quiet -- "$f" || ! git diff --cached --quiet -- "$f"; then
      echo "STOP: $f has uncommitted changes you did not make"; return 1
    fi
  done
}
```

**H3 — dangling-reference scan** (historical plans, specs and lockfiles are excluded on purpose):

```bash
refs() { git grep -n -E "$1" -- . ':!archive' ':!research' ':!docs/plans' ':!docs/superpowers' ':!*.lock' ':!pnpm-lock.yaml'; }
```

`git grep -E` is POSIX ERE and has **no `\b`**: a pattern like `\bzmx\b` silently matches nothing. For a whole word use `(^|[^[:alnum:]_-])zmx([^[:alnum:]_-]|$)`; spell that out in each check.

---

## Phase 0 — Baseline

### Task 0.1: Record the baseline and coordinate

**Files:** none modified.

**Interfaces:**
- Consumes: nothing.
- Produces: the baseline line count used by Task 7.1; confirmation that no peer session is mid-edit on this plan's files.

- [ ] **Step 1: Record the bespoke-code baseline**

```bash
cd ~/projects/jasonkuhrt/dotfiles
git ls-files home/.local/libexec/cmux home/.local/bin/cmuxx home/.local/bin/codex2 home/.local/libexec/codex \
  home/.config/nvim/local-plugins/cmd-ux home/.config/nvim/local-plugins/cmux-nav home/.claude/skills-library/cmux \
  home/.claude/skills-library/dispatch-claude scripts/tests/fake-cmux.sh scripts/tests/fake-zmx.sh | xargs cat | wc -l
```

Expected: ≈ 27,090 at `ca2298e6`. Write the actual number into this task.

- [ ] **Step 2: Check for concurrent work**

Run `git status --short` and list the other Claude sessions working in this repo. Any file this plan edits that shows up dirty is owned by someone else: pause that task per Global Constraints.

---

## Phase 1 — Tools to latest

### Task 1.1: Neovim from HEAD to stable

**Files:** none in the repo; `scripts/data/Brewfile:93` already declares `brew "neovim"` (stable).

**Interfaces:**
- Consumes: nothing.
- Produces: a stable `nvim` on PATH for every later Lua task.

- [ ] **Step 1: Confirm the failing state**

Run: `nvim --version | head -1`
Expected: `NVIM v0.13.0-dev-…` (not stable).

- [ ] **Step 2: Reinstall the stable bottle**

```bash
brew uninstall neovim && brew install neovim
```

- [ ] **Step 3: Verify**

```bash
nvim --version | head -1                                   # Expected: NVIM v0.12.5
perl -e 'alarm 60; exec @ARGV' nvim --headless '+qa' && echo "nvim starts clean"
just lua-check
```

Expected: `NVIM v0.12.5`, "nvim starts clean", and `just lua-check` passing. If Lazy reports a plugin needing a newer Neovim, record the plugin name in this task and tell Jason before continuing. Don't pin plugins.

- [ ] **Step 4: Log it**

```bash
nesia add neovim "Neovim is the stable 0.12.5 release again, not a HEAD build"
```

### Task 1.2: Codex CLI the documented way (Gate: D6)

**Files:**
- Delete (if the gate passes): `home/.local/bin/codex`
- Modify: none

**Interfaces:**
- Consumes: nothing.
- Produces: `codex` on PATH from the official installer, or a documented reason the wrapper stays.

- [ ] **Step 1: Read the installer before running it**

```bash
curl -fsSL https://chatgpt.com/codex/install.sh -o /tmp/codex-install.sh
grep -n -E 'INSTALL|PREFIX|BIN|\.local/bin|rc|profile|SHELL|ENV' /tmp/codex-install.sh | head -40
```

Record the install directory and whether it edits shell rc files. **If it installs into `~/.local/bin`:** that directory holds per-file symlinks into this repo, so remove the wrapper symlink first (`rm ~/.local/bin/codex`, which is not a repo delete). An installer writing through the symlink would overwrite tracked source.

- [ ] **Step 2: Install, keeping rc edits out of the repo**

```bash
rc_sink=$(mktemp)
env SHELL=/bin/sh ENV="$rc_sink" sh /tmp/codex-install.sh
git -C ~/projects/jasonkuhrt/dotfiles diff --quiet -- home/.config/fish/config.fish && echo "config.fish untouched"
cat "$rc_sink"; rm -f "$rc_sink"
```

Expected: "config.fish untouched". If the installer added a PATH line for a directory `config.fish`'s PATH block doesn't cover, add that directory to the `fish_add_path -gP` block (`config.fish:21-31`) in a separate commit.

- [ ] **Step 3: Verify it can load Codex.app's config**

```bash
perl -e 'alarm 20; exec @ARGV' env -i HOME="$HOME" PATH=/usr/bin:/bin /opt/homebrew/bin/fish -c 'command -v codex; codex --version'
codex doctor
```

`codex doctor` "Diagnose[s] local Codex installation, config, auth, and runtime health" (`codex doctor --help`). Expected: exit 0 and no config parse error. Record its summary in this task.

- [ ] **Step 4a (passes): delete the wrapper**

```bash
cd ~/projects/jasonkuhrt/dotfiles
git rm -q home/.local/bin/codex
git commit -m "chore(codex): drop the codex wrapper for the documented CLI install" -- home/.local/bin/codex
nesia add codex "codex on PATH comes from Codex's official installer, not a wrapper around the app's bundled CLI"
```

- [ ] **Step 4b (fails): keep the wrapper and say why**

Add one comment line above the `exec` in `home/.local/bin/codex` saying the documented CLI fails to parse the config Codex.app writes, naming the CLI version you installed, the exact error `codex doctor` printed, and today's date. Commit it as `docs(codex): record why the codex wrapper stays`.

### Task 1.3: cmux release watch

**Files:** none.

**Interfaces:**
- Consumes: nothing.
- Produces: the go/no-go for Phase 6.

- [ ] **Step 1: Check**

Run: `gh release view v0.64.23 --repo manaflow-ai/cmux --json publishedAt -q .publishedAt`
Expected today: `release not found`. Once it returns a date, update cmux through the app's updater, then confirm with `/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' /Applications/cmux.app/Contents/Info.plist` (Homebrew's cask record is stale for this app, so don't trust `brew info`). Only then start Phase 6.

---

## Phase 2 — Remove the zmx bridge (Gate: D7 for Task 2.2)

### Task 2.1: Delete the bridge and its glue from the repo

**Files:**
- Delete: `home/.local/libexec/cmux/cmux-zmx-enter`, `scripts/tests/fake-zmx.sh`
- Modify: `home/.config/ghostty/config:48-56`, `home/.config/fish/config.fish` (the zmx block, `230-235` at blob `0c054b866102`), `home/.config/starship.toml:13,32-37`, `DECISIONS.md:104-130`, `docs/cli-tools.md:79-80`, `docs/claude-code-tools.md:41-46`, `scripts/data/Brewfile:75-76`, `justfile` (recipe `cmux-zmx-check`), `home/.claude/skills-library/starship/SKILL.md:22-28`, `home/.claude/skills-library/configuring-zed/hidden-gems.md:137-152`, `home/.local/libexec/cmux/cmux-mode:5` (comment)

**Interfaces:**
- Consumes: nothing.
- Produces: new terminals launch without zmx once the config is live (Task 2.2).

- [ ] **Step 1: Write the failing check**

```bash
cd ~/projects/jasonkuhrt/dotfiles
refs 'cmux-zmx-enter|ZMX_SESSION|(^|[^[:alnum:]_-])(zmx|zsm)([^[:alnum:]_-]|$)|fake-zmx|cmux-zmx-check'
```

Expected now: many matches (FAIL). After this task: no output.

- [ ] **Step 2: Guard against concurrent edits**

```bash
check_clean home/.config/ghostty/config home/.config/fish/config.fish home/.config/starship.toml DECISIONS.md \
  docs/cli-tools.md docs/claude-code-tools.md scripts/data/Brewfile justfile \
  home/.claude/skills-library/starship/SKILL.md home/.claude/skills-library/configuring-zed/hidden-gems.md home/.local/libexec/cmux/cmux-mode
```

Expected: no `STOP` line. As of `ca2298e6` the only foreign uncommitted change in these files was a 4-line edit inside recipe `cmux-zmx-check`, which this task deletes. Still get Jason's or the owning session's OK before discarding it.

- [ ] **Step 3: Apply the edits**

```bash
cd ~/projects/jasonkuhrt/dotfiles
git rm -q home/.local/libexec/cmux/cmux-zmx-enter scripts/tests/fake-zmx.sh
python3 /tmp/rm_recipe.py justfile cmux-zmx-check
python3 - <<'PY'
import re

def sub(path, old, new, count=1):
    s = open(path).read()
    assert s.count(old) == count, (path, s.count(old), old[:60])
    open(path, "w").write(s.replace(old, new))

sub("home/.config/ghostty/config",
    "#\n# Terminal session persistence\n#\n# Every new terminal surface enters through the cmux/zmx bridge.\n"
    "# Outside cmux it falls back to the normal shell.\n#\n\n"
    "command = direct:/Users/jasonkuhrt/.local/libexec/cmux/cmux-zmx-enter\n\n", "")

sub("home/.config/fish/config.fish",
    'abbr -a zx zmx\nabbr -a zs zsm\n\nfunction zz --description "zmx: attach/create session named after current directory"\n'
    "    zmx attach (basename $PWD)\nend\n\n", "")

p = "home/.config/starship.toml"; s = open(p).read()
assert s.count("${env_var.ZMX_SESSION}\\\n") == 1
s = s.replace("${env_var.ZMX_SESSION}\\\n", "")
s, n = re.subn(r"\[env_var\.ZMX_SESSION\]\n(?:(?!\[)[^\n]+\n)*\n?", "", s)
assert n == 1, n
open(p, "w").write(s)

p = "DECISIONS.md"; s = open(p).read()
i = s.index("\n---\n\n## Decision 8: Starship Prompt with zmx Session Context")
open(p, "w").write(s[:i].rstrip("\n") + "\n")

p = "docs/cli-tools.md"; s = open(p).read()
s, n = re.subn(r"^\| Shell +\| `(zmx|zsm)` +\|.*\n", "", s, flags=re.M)
assert n == 2, n
open(p, "w").write(s)

sub("docs/claude-code-tools.md",
    "cmux's Claude integration (sidebar status, notifications, Feed approvals, session restore) comes from cmux\n"
    "itself. `/Applications/cmux.app/Contents/Resources/bin/cmux-claude-wrapper` injects `--session-id` and\n"
    "`--settings`, and cmux's fish integration puts a per-surface `claude` shim ahead of the real binary on PATH.\n"
    "That integration loads only when cmux starts the shell itself (`fish -il --init-command …`); surfaces started\n"
    "through `cmux-zmx-enter` run plain `fish -l`, so it does not load there. See the\n",
    "cmux's Claude integration (sidebar status, notifications, Feed approvals, agent auto-resume) comes from cmux\n"
    "itself. `/Applications/cmux.app/Contents/Resources/bin/cmux-claude-wrapper` injects `--session-id` and\n"
    "`--settings`, and cmux's fish integration puts a per-surface `claude` shim ahead of the real binary on PATH.\n"
    "That integration loads only when cmux starts the shell itself (`fish -il --init-command …`), which is why\n"
    "the Ghostty config sets no `command`. See the\n")

sub("scripts/data/Brewfile",
    'brew "neurosnap/tap/zmx", trusted: true  # terminal session persistence\n'
    'cask "mdsakalu/tap/zsm", trusted: true   # TUI session manager for zmx\n', "")

fence = "`" * 3
p = "home/.claude/skills-library/starship/SKILL.md"; s = open(p).read()
s, n = re.subn(r"\*\*Current setup:\*\* Single config with optional zmx session segment:\n\n" + fence + r"toml\n\[env_var\.ZMX_SESSION\]\n(?:[^\n]*\n)*?" + fence + r"\n\n",
               "**Current setup:** Single config.\n\n", s)
assert n == 1, n
open(p, "w").write(s)

p = "home/.claude/skills-library/configuring-zed/hidden-gems.md"; s = open(p).read()
a = s.index("## Auto-Attach to Project zmx Session\n"); b = s.index("## Map Unknown File Extensions to Languages\n")
open(p, "w").write(s[:a] + s[b:])

sub("home/.local/libexec/cmux/cmux-mode",
    "# /usr/sbin:/sbin, where cmux, zmx and jq are missing and this script would fall back\n",
    "# /usr/sbin:/sbin, where cmux and jq are missing and this script would fall back\n")
print("edits applied")
PY
```

Expected: `removed: cmux-zmx-check`, then `edits applied`.

- [ ] **Step 4: Verify**

```bash
refs 'cmux-zmx-enter|ZMX_SESSION|(^|[^[:alnum:]_-])(zmx|zsm)([^[:alnum:]_-]|$)|fake-zmx|cmux-zmx-check'   # Expected: no output
fish -n home/.config/fish/config.fish && just fish-check
perl -e 'alarm 10; exec @ARGV' starship prompt >/dev/null && echo "starship ok"
just --summary >/dev/null && echo "justfile parses"
grep -n 'tap "neurosnap/tap"\|tap "mdsakalu/tap"' scripts/data/Brewfile || echo "no tap lines to remove"
```

Expected: no refs output; `fish-check` PASS; "starship ok"; "justfile parses". If a `tap` line prints, delete it too.

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor(cmux): remove the zmx launch bridge

A Ghostty command makes cmux skip its managed fish launch, so the bridge
switched off cmux's Claude integration, including agent auto-resume (on
by default). zmx kept processes alive across a crash, but not across a
reboot, and it leaked sessions it could never clean up." -- \
  home/.local/libexec/cmux/cmux-zmx-enter scripts/tests/fake-zmx.sh home/.config/ghostty/config \
  home/.config/fish/config.fish home/.config/starship.toml DECISIONS.md docs/cli-tools.md \
  docs/claude-code-tools.md scripts/data/Brewfile justfile home/.claude/skills-library/starship/SKILL.md \
  home/.claude/skills-library/configuring-zed/hidden-gems.md home/.local/libexec/cmux/cmux-mode
```

### Task 2.2: Cut the machine over (with Jason) (Gate: D7)

**Files:** none in the repo.

**Interfaces:**
- Consumes: Task 2.1 deployed. `~/.config/ghostty/config` is a symlink into the repo, so it's already live.
- Produces: a machine with no zmx, and native integration confirmed.

- [ ] **Step 1: List what runs inside zmx today**

```bash
python3 - <<'PY'
import subprocess
rows = subprocess.run(["ps", "-axo", "pid=,ppid=,command="], capture_output=True, text=True).stdout.splitlines()
procs = {}
for r in rows:
    p = r.split(None, 2)
    if len(p) == 3:
        procs[int(p[0])] = (int(p[1]), p[2])
for pid, (ppid, cmd) in procs.items():
    if cmd.split()[0].endswith("claude"):
        cur, host = ppid, None
        while cur in procs and cur > 1:
            if "zmx attach" in procs[cur][1]:
                host = procs[cur][1]
                break
            cur = procs[cur][0]
        cwd = subprocess.run(["lsof", "-a", "-p", str(pid), "-d", "cwd", "-Fn"], capture_output=True, text=True).stdout.splitlines()
        print(pid, (host or "not in zmx")[:60], next((l[1:] for l in cwd if l.startswith("n")), "?"))
PY
zmx list
```

Expected: one line per Claude process with its zmx session and working directory. Give the list to Jason.

- [ ] **Step 2: Jason verifies native integration in a new tab**

In cmux, press `cmd+shift+,` (reload configuration), open a new tab, then run:

```fish
echo "ZMX_SESSION=[$ZMX_SESSION]"          # Expected: ZMX_SESSION=[]
set -q CMUX_FISH_INTEGRATION_FILE; and echo "integration env present"
type -p claude                              # Expected: NOT /Users/jasonkuhrt/.local/bin/claude
```

Then start `claude` there and run `stat -f %Sm ~/.cmuxterm/claude-hook-sessions.json`. Expected: today's timestamp, and Claude's status in the cmux sidebar. **If `ZMX_SESSION` is still set**, cmux hasn't reloaded the Ghostty config: quit and relaunch cmux *after* Step 3.

- [ ] **Step 3: Jason resumes each zmx-hosted Claude natively**

For each row from Step 1: new tab → `cd <cwd>` → `claude -r` → pick the session. cmux never recorded these sessions (R1), so this one manual resume is what makes them native.

- [ ] **Step 4: Remove zmx from the machine**

```bash
for s in $(zmx list | awk -F'\t' '{sub(/^[→ ]*name=/,"",$1); print $1}'); do zmx kill "$s"; done
brew uninstall neurosnap/tap/zmx
brew uninstall --cask mdsakalu/tap/zsm
[ -z "$(brew list --full-name 2>/dev/null | grep -E '^(neurosnap|mdsakalu)/')" ] && brew untap neurosnap/tap mdsakalu/tap
rm -rf ~/.local/state/cmux-zmx
```

- [ ] **Step 5: Verify**

```bash
command -v zmx zsm || echo "zmx and zsm gone"
ls ~/.local/state/cmux-zmx 2>/dev/null || echo "state dir gone"
just doctor
```

Expected: both "gone" lines; `just doctor` reports no failure involving cmux, Ghostty or zmx.

- [ ] **Step 6: Log it**

```bash
nesia add cmux "cmux's own Claude integration is back: auto-resume after quit/crash/reboot, sidebar status, notifications"
nesia add fish "gone: zx, zs, zz (zmx is uninstalled)"
```

---

## Phase 3 — Delete the dead in-tree `cmd-ux` copy

### Task 3.1: Delete the copy and every piece of wiring to it

**Files:**
- Delete: `home/.config/nvim/local-plugins/cmd-ux/`, `home/.config/nvim/cmd-ux-command-blocklist.txt`
- Modify: `justfile:6-7` plus eight recipes, `.luarc.json:6-8`, `scripts/git-hooks/check-staged-lua.sh:11`, `scripts/ci/lua-ci.sh`, `.github/workflows/lua.yml:15,29,58`, `.claude/CLAUDE.md:14`, `docs/lua-tooling.md:50,88,101-102,118,140,144-145`, `keymap.yml` (one `cmd-ux` mention), `home/.config/nvim/local-plugins/file-ops/README.md:15,99`

**Interfaces:**
- Consumes: nothing (independent of Phase 2).
- Produces: `lua_paths` and the CI regex without `cmd-ux`, which Task 5A.3 later edits for `cmux-nav`.

- [ ] **Step 1: Write the failing check**

```bash
cd ~/projects/jasonkuhrt/dotfiles
refs 'local-plugins/cmd-ux|cmd_ux|cmd-ux-command-blocklist|cmd-ux-test|cmd-ux-bench|cmd-ux-proof|cmd-ux-blocklist-check|`cmd-ux`'
```

Expected now: matches (FAIL). After this task: no output.

- [ ] **Step 2: Re-confirm the copy is dead**

```bash
git grep -n 'local-plugins/cmd-ux' -- home/.config/nvim/lua || echo "no runtime spec loads the in-tree copy"
git log -1 --format='%h %s' 48981058
```

Expected: "no runtime spec loads the in-tree copy", and the "migrate consumers to standalone cmdux repo" commit. If either differs, stop and report.

- [ ] **Step 3: Guard, then apply**

```bash
check_clean justfile .luarc.json scripts/git-hooks/check-staged-lua.sh scripts/ci/lua-ci.sh .github/workflows/lua.yml .claude/CLAUDE.md docs/lua-tooling.md \
  keymap.yml home/.config/nvim/local-plugins/file-ops/README.md
git rm -r -q home/.config/nvim/local-plugins/cmd-ux home/.config/nvim/cmd-ux-command-blocklist.txt
python3 /tmp/rm_recipe.py justfile cmd-ux-blocklist-check cmd-ux-test cmd-ux-test-loop cmd-ux-test-spec \
  cmd-ux-test-spec-loop cmd-ux-bench cmd-ux-bench-finder cmd-ux-proof-wq-regression
python3 - <<'PY'
import json, re

def sub(path, old, new, count=1):
    s = open(path).read()
    assert s.count(old) == count, (path, s.count(old), old[:70])
    open(path, "w").write(s.replace(old, new))

sub("justfile",
    'cmd_ux_blocklist_path := "home/.config/nvim/cmd-ux-command-blocklist.txt"\n'
    'cmd_ux_plugin_path := "home/.config/nvim/local-plugins/cmd-ux"\n', "")

sub(".luarc.json", '  "workspace.ignoreDir": [\n    "home/.config/nvim/local-plugins/cmd-ux"\n  ],\n', "")
json.load(open(".luarc.json"))

sub("scripts/git-hooks/check-staged-lua.sh", "    home/.config/nvim/local-plugins/cmd-ux/lua/*.lua | \\\n", "")

p = "scripts/ci/lua-ci.sh"; s = open(p).read()
old = "local-plugins/(cmux-nav|cmd-ux|file-ops)"; assert s.count(old) == 1; s = s.replace(old, "local-plugins/(cmux-nav|file-ops)")
s, n = re.subn(r"\nis_cmd_ux_test_path\(\) \{\n.*?\n\}\n", "\n", s, flags=re.S); assert n == 1, n
old = "declare -a cmd_ux_test_files=()\n"; assert s.count(old) == 1; s = s.replace(old, "")
old = '  if is_cmd_ux_test_path "$file"; then\n    cmd_ux_test_files+=("$file")\n  fi\n\n'; assert s.count(old) == 1; s = s.replace(old, "")
old = " && [ ${#cmd_ux_test_files[@]} -eq 0 ]"; assert s.count(old) == 1; s = s.replace(old, "")
old = ("if [ ${#cmd_ux_test_files[@]} -gt 0 ]; then\n  printf '\\n[just cmd-ux-test]\\n'\n  just cmd-ux-test\nelse\n"
       "  printf '\\nSKIP: cmd-ux tests not needed for this change set\\n'\nfi\n\n")
assert s.count(old) == 1; s = s.replace(old, "")
open(p, "w").write(s)

sub(".github/workflows/lua.yml", '      - "home/.config/nvim/local-plugins/cmd-ux/**"\n', "", count=2)
sub(".github/workflows/lua.yml", "      - name: Clone plenary.nvim for cmd-ux tests\n", "      - name: Clone plenary.nvim for plugin tests\n")

sub(".claude/CLAUDE.md", "* For Lua changes in the Neovim config or `cmd-ux`, run `just lua-check` before finishing.",
    "* For Lua changes in the Neovim config, run `just lua-check` before finishing.")

p = "docs/lua-tooling.md"; s = open(p).read()
old = "just cmd-ux-test\n"; assert s.count(old) == 1; s = s.replace(old, "")
old = "- It only runs `just cmd-ux-test` when the change set touches `cmd-ux` paths.\n"; assert s.count(old) == 1
s = s.replace(old, "- It runs a plugin's tests only when the change set touches that plugin.\n")
old = "- `symlink-roots/config/nvim/lua`\n- `symlink-roots/config/nvim/local-plugins/cmd-ux/lua`\n"; assert s.count(old) == 1
s = s.replace(old, "- `home/.config/nvim/lua`\n- `home/.config/nvim/local-plugins/file-ops/lua`\n"
                   "- `home/.config/nvim/local-plugins/file-ops/tests`\n")
old = "1. Extends `lazydev.nvim` so local plugin code under `local-plugins/cmd-ux` is part of Lua editor intelligence.\n"; assert s.count(old) == 1
s = s.replace(old, "1. Extends `lazydev.nvim` so local plugin code listed in that file (for example the standalone `cmdux` project) is part of Lua editor intelligence.\n")
s, n = re.subn(r"including files like `plugins/editor\.lua`, `plugins/lang\.lua`, `plugins/cmux-nav\.lua`, and `cmd_ux/adapters/snacks\.lua`\.",
               "including plugin specs such as `plugins/editor.lua` and `plugins/lang.lua`.", s); assert n == 1, n
s, n = re.subn(r"^- Reuse shared contracts when they already exist\. In `cmd-ux`.*\n",
               "- Reuse shared contracts when they already exist instead of inventing duplicate local schemas.\n", s, flags=re.M); assert n == 1, n
s, n = re.subn(r"^- Add local `---@class` and `---@alias` blocks for file-local boundary shapes and string unions\. Good examples.*\n",
               "- Add local `---@class` and `---@alias` blocks for file-local boundary shapes and string unions.\n", s, flags=re.M); assert n == 1, n
open(p, "w").write(s)

sub("keymap.yml", "exposed through cmd-ux as", "exposed through cmdux as")
sub("home/.config/nvim/local-plugins/file-ops/README.md", "cmd-ux discovers it automatically", "cmdux discovers it automatically")
sub("home/.config/nvim/local-plugins/file-ops/README.md", "(e.g. cmd-ux)", "(e.g. cmdux)")
print("edits applied")
PY
```

Expected: the removed-recipes line, then `edits applied`.

- [ ] **Step 4: Verify**

```bash
refs 'local-plugins/cmd-ux|cmd_ux|cmd-ux-command-blocklist|cmd-ux-test|cmd-ux-bench|cmd-ux-proof|cmd-ux-blocklist-check|`cmd-ux`'   # Expected: no output
bash -n scripts/ci/lua-ci.sh scripts/git-hooks/check-staged-lua.sh && echo "scripts parse"
just --summary >/dev/null && echo "justfile parses"
just lua-check
perl -e 'alarm 60; exec @ARGV' nvim --headless '+lua require("cmdux")' '+qa' && echo "cmdux still loads"
```

Expected: no refs output; "scripts parse"; "justfile parses"; `lua-check` PASS; "cmdux still loads".

- [ ] **Step 5: Commit**

```bash
git commit -m "chore(nvim): delete the dead in-tree cmd-ux copy

Neovim has loaded the standalone cmdux project since 48981058. The 85-file
predecessor, its unread blocklist, eight just recipes, and its CI, hook
and LuaLS wiring only exercised code nothing runs." -- \
  home/.config/nvim/local-plugins/cmd-ux home/.config/nvim/cmd-ux-command-blocklist.txt justfile .luarc.json \
  scripts/git-hooks/check-staged-lua.sh scripts/ci/lua-ci.sh .github/workflows/lua.yml .claude/CLAUDE.md docs/lua-tooling.md \
  keymap.yml home/.config/nvim/local-plugins/file-ops/README.md
```

---

## Phase 4 — Agent wrappers and skills

### Task 4.1: `codex2` + `codex-tab-sync` → cmux auto-naming (Gate: D2; requires Task 2.2)

**Files:**
- Delete: `home/.local/bin/codex2`, `home/.local/libexec/codex/codex-tab-sync`
- Modify: `justfile` (recipe `codex2-check`), `docs/cli-tools.md:56`, `home/.config/cmux/cmux.json`

**Interfaces:**
- Consumes: native integration live (Task 2.2).
- Produces: cmux names agent workspaces and tabs itself.

- [ ] **Step 1: Write the failing check**

Run: `refs 'codex2|codex-tab-sync'`
Expected now: matches. After this task: no output.

- [ ] **Step 2: Confirm the setting key at the installed version**

Run: `git -C ~/repo-references/cmux show v0.64.22:docs/workspace-auto-naming.md | grep -n workspaceAutoNaming`
Expected: a line naming `automation.workspaceAutoNaming`.

- [ ] **Step 3: Apply**

```bash
cd ~/projects/jasonkuhrt/dotfiles
check_clean justfile docs/cli-tools.md home/.config/cmux/cmux.json
git rm -q home/.local/bin/codex2 home/.local/libexec/codex/codex-tab-sync
python3 /tmp/rm_recipe.py justfile codex2-check
python3 - <<'PY'
import re
p = "docs/cli-tools.md"; s = open(p).read()
s, n = re.subn(r"^\| AI +\| `codex2` +\|.*\n", "", s, flags=re.M); assert n == 1, n
open(p, "w").write(s)
p = "home/.config/cmux/cmux.json"; s = open(p).read()
old = '  "sidebar" : {\n    "showPullRequests" : false\n  },\n'; assert s.count(old) == 1
s = s.replace(old, old + '\n  // Name agent workspaces and tabs from their conversation.\n'
                         '  "automation" : {\n    "workspaceAutoNaming" : true\n  },\n')
open(p, "w").write(s)
print("edits applied")
PY
```

- [ ] **Step 4: Verify (Jason, in cmux)**

- Run `refs 'codex2|codex-tab-sync'`. Expected: no output.
- In cmux press `cmd+shift+,`, start `codex` in a new tab, and complete one turn. Expected: the workspace or tab gets a 2-5 word topic name.
- If the name doesn't change within two turns, check whether the Codex hooks are installed: `git -C ~/repo-references/cmux show v0.64.22:docs/workspace-auto-naming.md` names the hook setup, and the CLI help for `cmux hooks setup --agent codex` (`CLI/cmux.swift:15786`) shows how to install them. Run that command only with Jason's go-ahead (Global Constraints).

- [ ] **Step 5: Commit and log**

```bash
git commit -m "chore(codex): replace codex2 and codex-tab-sync with cmux workspace auto-naming" -- \
  home/.local/bin/codex2 home/.local/libexec/codex/codex-tab-sync justfile docs/cli-tools.md home/.config/cmux/cmux.json
nesia add cmux "workspaces and tabs are named from agent conversations (codex2 and its tab syncer are gone)"
```

### Task 4.2: Retire `dispatch-claude` (Gate: D3)

**Files:**
- Delete: `home/.claude/skills-library/dispatch-claude/`
- Modify: `justfile` (recipes `claude-dispatch-check`, `cmux-upstream-audit`), `home/.codex/config.toml` (a disabled `dispatch-claude` skill entry)
- Machine: the `~/.claude/skills/dispatch-claude` link

**Interfaces:**
- Consumes: nothing.
- Produces: no skill that drives cmux workspaces for fan-out.

- [ ] **Step 1: Confirm agent teams cover fan-out**

Read https://code.claude.com/docs/en/agent-teams and `~/repo-references/claude-code/CHANGELOG.md` around lines 2273 and 5067. Answer in this task, with quotes: can a lead session spawn several teammates that work independently and report back, inside cmux, with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`? **If not**, stop, record why, and ask Jason to revisit D3.

- [ ] **Step 2: Write the failing check**

Run: `refs 'dispatch-claude|claude-dispatch-check|cmux-upstream-audit'`
Expected now: matches.

- [ ] **Step 3: Apply**

```bash
cd ~/projects/jasonkuhrt/dotfiles
check_clean justfile home/.codex/config.toml
git rm -r -q home/.claude/skills-library/dispatch-claude
python3 /tmp/rm_recipe.py justfile claude-dispatch-check cmux-upstream-audit
[ -L ~/.claude/skills/dispatch-claude ] && rm ~/.claude/skills/dispatch-claude
python3 - <<'PY'
import os
block = '[[skills.config]]\nname = "dispatch-claude"\nenabled = false\n\n'
repo = "home/.codex/config.toml"
s = open(repo).read(); assert s.count(block) == 1, s.count(block)
open(repo, "w").write(s.replace(block, ""))
live = os.path.expanduser("~/.codex/config.toml")
if os.path.exists(live) and not os.path.islink(live) and block in open(live).read():
    open(live, "w").write(open(live).read().replace(block, ""))
    print("also removed from the live, app-written ~/.codex/config.toml")
print("edits applied")
PY
```

- [ ] **Step 4: Verify**

```bash
refs 'dispatch-claude|claude-dispatch-check|cmux-upstream-audit'   # Expected: no output
just --summary >/dev/null && echo "justfile parses"
ls ~/.claude/skills/dispatch-claude 2>/dev/null || echo "skill link gone"
```

- [ ] **Step 5: Commit and log**

```bash
git commit -m "chore(claude): retire dispatch-claude in favour of agent teams" -- home/.claude/skills-library/dispatch-claude justfile home/.codex/config.toml
nesia add claude "dispatch-claude is gone; fan work out with Claude Code agent teams"
```

### Task 4.3: Official cmux skills + a personal overlay (Gate: D4)

**Files:**
- Modify: `home/.claude/skills-library/cmux/SKILL.md` (rewrite to ≤120 lines)
- Delete: `home/.claude/skills-library/cmux/references/integration.md`, `home/.claude/skills-library/cmux/references/spatial-model.md`

**Interfaces:**
- Consumes: Phase 2 done (the overlay mustn't describe zmx). If D1 = Option A, do this after Phase 5 so the overlay doesn't describe drive mode.
- Produces: official skills installed where Jason's agents read skills, plus an overlay with only machine-specific facts.

- [ ] **Step 1: Evidence (already gathered, re-check it)**

cmux documents two installs at `v0.64.22`: `npx skills add manaflow-ai/cmux -g -y [--skill NAME ...]` (`web/app/[locale]/(landing)/docs/skills/page.tsx:208-211`), and `skills.sh` with `--ref REF`, `--dest DIR`, `--skill NAME` (repeatable) and `--list` (`skills.sh` @ `v0.64.22`, lines 4-22). `~/.claude/skills` is a **whole-directory symlink into this repo**, so a global `npx skills add` would write untracked directories straight into `home/.claude/skills`. Use `skills.sh` instead, pinned to the installed version, with `--dest` pointing at the shan library.

- [ ] **Step 2: Move the custom skill out of the way (shan first, then git)**

Official cmux ships a skill named `cmux`, which collides with `home/.claude/skills-library/cmux/`. `shan skills off` fails once a library directory has been renamed, so switch the skill off before moving it.

```bash
cd ~/projects/jasonkuhrt/dotfiles
check_clean home/.claude/skills-library/cmux
shan skills off cmux --scope user
git mv home/.claude/skills-library/cmux home/.claude/skills-library/cmux-local
```

- [ ] **Step 3: Install the end-user skills pinned to the installed cmux**

```bash
curl -fsSL https://raw.githubusercontent.com/manaflow-ai/cmux/v0.64.22/skills.sh -o /tmp/cmux-skills.sh
sed -n '1,60p' /tmp/cmux-skills.sh      # read it before running it
bash /tmp/cmux-skills.sh --ref v0.64.22 --dest "$PWD/home/.claude/skills-library" \
  --skill cmux --skill cmux-browser --skill cmux-workspace --skill cmux-keyboard-shortcuts \
  --skill cmux-settings --skill cmux-customization --skill cmux-markdown
for sk in cmux cmux-browser cmux-workspace cmux-keyboard-shortcuts cmux-settings cmux-customization cmux-markdown; do
  shan skills on "$sk" --scope user
done
```

Leave out the upstream-contributor skills (`cmux-architecture`, `-backend`, `-billing`, `-release`, `-testing`, `-localization`, `-dev-workflow`, `-debugging`, `-diagnostics`, `-socket-policy`, `-shared-behavior`, `-custom-sidebar`, `-ghostty`).

- [ ] **Step 3b: Rewrite the overlay**

Rewrite `home/.claude/skills-library/cmux-local/SKILL.md` (≤120 lines) with frontmatter `name: cmux-local` and a description saying it covers only this machine's cmux facts. Use exactly these sections:
1. `new-window` (OS window) vs `new-workspace` (sidebar tab) — keep the existing warning text.
2. `~/.config/cmux` is a directory symlink into dotfiles, because cmux rewrites `cmux.json` through a temp-file rename.
3. cmux integration requires that the Ghostty config sets no `command`.
4. Navigation: native defaults (§ R4). Add drive mode only if D1 = Option B.

Then delete `home/.claude/skills-library/cmux-local/references/`, and run `shan skills on cmux-local --scope user`.

- [ ] **Step 4: Verify**

```bash
wc -l home/.claude/skills-library/cmux*/SKILL.md          # Expected: overlay ≤ 120
shan skills doctor --scope user                          # Expected: no errors for cmux skills
git grep -n -E 'cmux-zmx|drive mode|cmux-tab-cycle|cmux-mode|cmuxx' -- home/.claude/skills-library/cmux-local   # Expected: no output (unless D1 = Option B)
```

- [ ] **Step 5: Commit and log**

```bash
git status --short -- home/.claude     # commit ONLY the paths this task created or moved; other sessions have dirty files here
paths="home/.claude/skills-library/cmux home/.claude/skills-library/cmux-local"
for sk in cmux-browser cmux-workspace cmux-keyboard-shortcuts cmux-settings cmux-customization cmux-markdown; do paths="$paths home/.claude/skills-library/$sk"; done
git add -A $paths
git commit -m "docs(claude): use cmux's official skills plus a small local overlay" -- $paths
nesia add claude "cmux's official agent skills are installed; the custom cmux skill is a short local overlay"
```

---

## Phase 5 — Navigation stack (Gate: D1)

Do **either** Option A (Tasks 5A.1–5A.5) **or** Option B (Tasks 5B.1–5B.2).

### Task 5A.1: Normalize `karabiner.json` formatting (no semantic change)

**Files:** Modify `home/.config/karabiner/karabiner.json` (blob `fb567b74e521` at `ca2298e6`).

**Interfaces:**
- Consumes: nothing.
- Produces: a canonical formatting, so Task 5A.2's diff is pure removal.

- [ ] **Step 1: Normalize and prove equivalence**

```bash
cd ~/projects/jasonkuhrt/dotfiles
check_clean home/.config/karabiner/karabiner.json
git show HEAD:home/.config/karabiner/karabiner.json > /tmp/karabiner.before.json
python3 - <<'PY'
import json
p = "home/.config/karabiner/karabiner.json"
d = json.load(open(p))
open(p, "w").write(json.dumps(d, indent=4, ensure_ascii=False) + "\n")
assert json.load(open(p)) == json.load(open("/tmp/karabiner.before.json"))
print("semantically identical")
PY
jq empty home/.config/karabiner/karabiner.json && echo "valid JSON"
```

Expected: "semantically identical", "valid JSON".

- [ ] **Step 2: Commit**

```bash
git commit -m "style(karabiner): normalize karabiner.json formatting" -- home/.config/karabiner/karabiner.json
```

### Task 5A.2: Delete drive mode, `cmux-mode`, the Hyper keybinds and the shared fake

**Files:**
- Delete: `home/.local/libexec/cmux/cmux-mode`, `scripts/tests/fake-cmux.sh`
- Modify: `home/.config/karabiner/karabiner.json` (rules 2-9), `home/.config/ghostty/config` (the Hyper block, lines 74-96 at blob `366ad5cd4eea`), `justfile` (recipe `cmux-mode-check`)

**Interfaces:**
- Consumes: Tasks 5A.1, 2.1, 4.1 and 4.2 done (every other `fake-cmux.sh` consumer gone).
- Produces: nothing sends Hyper keys to cmux, and no Karabiner variable `cmux_mode` remains.

- [ ] **Step 1: Write the failing check**

```bash
refs 'cmux-mode|cmux_mode|cmux_prefix|shift\+ctrl\+alt\+cmd|fake-cmux'
grep -c 'cmux' home/.config/karabiner/karabiner.json
```

Expected now: matches, and a non-zero count.

- [ ] **Step 2: Confirm `fake-cmux.sh` has no remaining consumers**

Run: `git grep -n 'fake-cmux' -- justfile scripts ':!scripts/tests/fake-cmux.sh'`
Expected: only lines inside recipe `cmux-mode-check`. If any other recipe uses it, keep the file and drop it from this task.

- [ ] **Step 3: Apply**

```bash
check_clean home/.config/karabiner/karabiner.json home/.config/ghostty/config justfile
git rm -q home/.local/libexec/cmux/cmux-mode scripts/tests/fake-cmux.sh
python3 /tmp/rm_recipe.py justfile cmux-mode-check
python3 - <<'PY'
import json
p = "home/.config/karabiner/karabiner.json"; d = json.load(open(p))
assert len(d["profiles"]) == 1
rules = d["profiles"][0]["complex_modifications"]["rules"]
keep = [r for r in rules if "cmux" not in r["description"].lower()]
assert [r["description"] for r in keep] == [
    "Raycast Ctrl+J/K menu navigation",
    "Tap fn to toggle sticky fn; hold fn for normal fn behavior",
], [r["description"] for r in keep]
assert len(rules) - len(keep) == 8
d["profiles"][0]["complex_modifications"]["rules"] = keep
open(p, "w").write(json.dumps(d, indent=4, ensure_ascii=False) + "\n")

p = "home/.config/ghostty/config"; s = open(p).read()
old = ("\n# Internal cmux action surface.\n"
       "# These Hyper bindings are private implementation detail bindings used by:\n"
       "# - Karabiner's sticky Ctrl+0 cmux drive mode\n"
       "# - Neovim's repo-owned cmux-nav bridge\n#\n"
       "# They are intentionally not the user-facing keymap.\n"
       "keybind = shift+ctrl+alt+cmd+h=goto_split:left\nkeybind = shift+ctrl+alt+cmd+j=goto_split:down\n"
       "keybind = shift+ctrl+alt+cmd+k=goto_split:up\nkeybind = shift+ctrl+alt+cmd+l=goto_split:right\n\n"
       "keybind = shift+ctrl+alt+cmd+u=resize_split:left,3\nkeybind = shift+ctrl+alt+cmd+i=resize_split:down,3\n"
       "keybind = shift+ctrl+alt+cmd+o=resize_split:up,3\nkeybind = shift+ctrl+alt+cmd+p=resize_split:right,3\n\n"
       "keybind = shift+ctrl+alt+cmd+n=new_split:left\nkeybind = shift+ctrl+alt+cmd+m=new_split:down\n"
       "keybind = shift+ctrl+alt+cmd+comma=new_split:up\nkeybind = shift+ctrl+alt+cmd+period=new_split:right\n\n"
       "keybind = shift+ctrl+alt+cmd+z=toggle_split_zoom\nkeybind = shift+ctrl+alt+cmd+x=close_surface\n")
assert s.count(old) == 1, s.count(old)
open(p, "w").write(s.replace(old, ""))
print("edits applied")
PY
```

- [ ] **Step 4: Verify**

```bash
refs 'cmux-mode|cmux_mode|cmux_prefix|shift\+ctrl\+alt\+cmd|fake-cmux'   # Expected: only hjkl-navigation.md + keymap.yml (5A.5), local-plugins/cmux-nav (5A.3), and the custom cmux skill if Task 4.3 hasn't run
grep -c 'cmux' home/.config/karabiner/karabiner.json                     # Expected: 0
jq empty home/.config/karabiner/karabiner.json && just karabiner-check && just karabiner-reload
git diff --cached --stat -- home/.config/karabiner/karabiner.json 2>/dev/null; git diff --numstat -- home/.config/karabiner/karabiner.json
```

Expected: 0 cmux lines; `karabiner-check` PASS; the numstat shows 0 insertions and ~4,700 deletions for `karabiner.json` (measured on the file as normalized by Task 5A.1). In Karabiner-EventViewer (Jason): Ctrl+0 in cmux types nothing special; Raycast Ctrl+J/K and sticky fn still work.

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor(cmux): remove Karabiner drive mode and its Hyper-key plumbing

cmux has native shortcuts for tab, workspace, focus, split and zoom, and
0.64.23 adds resize. The sticky mode cost 3.8k hand-maintained JSON lines,
a 170-line helper and a hidden Ghostty keymap." -- \
  home/.local/libexec/cmux/cmux-mode scripts/tests/fake-cmux.sh home/.config/karabiner/karabiner.json \
  home/.config/ghostty/config justfile
```

### Task 5A.3: Delete nvim `cmux-nav` (LazyVim defaults take over)

**Files:**
- Delete: `home/.config/nvim/local-plugins/cmux-nav/`, `home/.config/nvim/lua/plugins/cmux-nav.lua`
- Modify: `justfile:4-5` and recipe `cmux-nav-test`, `scripts/ci/lua-ci.sh`, `docs/neovim.md:144`, `home/.config/nvim/lua/plugins/lua.lua:9-12` (lazydev library entry)

**Interfaces:**
- Consumes: Task 3.1 (the `lua-ci.sh` regex is already `(cmux-nav|file-ops)`).
- Produces: `<C-h/j/k/l>` in Neovim are LazyVim's default window moves.

- [ ] **Step 1: Write the failing check**

Run: `refs 'cmux-nav|cmux_nav'`
Expected now: matches.

- [ ] **Step 2: Apply**

```bash
check_clean justfile scripts/ci/lua-ci.sh docs/neovim.md home/.config/nvim/lua/plugins/lua.lua
git rm -r -q home/.config/nvim/local-plugins/cmux-nav home/.config/nvim/lua/plugins/cmux-nav.lua
python3 /tmp/rm_recipe.py justfile cmux-nav-test
python3 - <<'PY'
import re

def sub(path, old, new):
    s = open(path).read()
    assert s.count(old) == 1, (path, s.count(old), old[:70])
    open(path, "w").write(s.replace(old, new))

sub("justfile", " home/.config/nvim/local-plugins/cmux-nav/lua home/.config/nvim/local-plugins/cmux-nav/tests", "")
sub("justfile", 'cmux_nav_plugin_path := "home/.config/nvim/local-plugins/cmux-nav"\n', "")

p = "scripts/ci/lua-ci.sh"; s = open(p).read()
old = "local-plugins/(cmux-nav|file-ops)"; assert s.count(old) == 1; s = s.replace(old, "local-plugins/file-ops")
s, n = re.subn(r"\nis_cmux_nav_test_path\(\) \{\n.*?\n\}\n", "\n", s, flags=re.S); assert n == 1, n
old = "declare -a cmux_nav_test_files=()\n"; assert s.count(old) == 1; s = s.replace(old, "")
old = '  if is_cmux_nav_test_path "$file"; then\n    cmux_nav_test_files+=("$file")\n  fi\n\n'; assert s.count(old) == 1; s = s.replace(old, "")
old = "[ ${#cmux_nav_test_files[@]} -eq 0 ] && "; assert s.count(old) == 1; s = s.replace(old, "")
old = ("if [ ${#cmux_nav_test_files[@]} -gt 0 ]; then\n  printf '\\n[just cmux-nav-test]\\n'\n  just cmux-nav-test\nelse\n"
       "  printf '\\nSKIP: cmux-nav tests not needed for this change set\\n'\nfi\n\n")
assert s.count(old) == 1; s = s.replace(old, "")
open(p, "w").write(s)

sub("docs/neovim.md", "- `cmux-nav.lua` — Pane navigation and resize (hjkl across cmux boundaries)\n", "")
sub("home/.config/nvim/lua/plugins/lua.lua",
    '        {\n          path = vim.fn.stdpath("config") .. "/local-plugins/cmux-nav",\n          words = { "cmux_nav" },\n        },\n', "")
print("edits applied")
PY
```

- [ ] **Step 3: Verify**

```bash
refs 'cmux-nav|cmux_nav'   # Expected: only hjkl-navigation.md and keymap.yml (5A.5), plus the custom cmux skill if Task 4.3 hasn't run
bash -n scripts/ci/lua-ci.sh && just --summary >/dev/null && just lua-check
perl -e 'alarm 60; exec @ARGV' nvim --headless "+lua vim.defer_fn(function() local m = vim.fn.maparg('<C-h>', 'n', false, true); io.stdout:write(vim.inspect({ desc = m.desc, rhs = m.rhs }) .. '\n'); vim.cmd('qa!') end, 4000)"
```

Expected: `lua-check` PASS, and the mapping prints `desc = "Go to Left Window"` (LazyVim's `lazyvim/config/keymaps.lua:14`), not cmux-nav's "Move to left split/pane". This check was verified to print the current mapping headless.

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor(nvim): remove cmux-nav; LazyVim's window navigation takes over" -- \
  home/.config/nvim/local-plugins/cmux-nav home/.config/nvim/lua/plugins/cmux-nav.lua justfile scripts/ci/lua-ci.sh docs/neovim.md \
  home/.config/nvim/lua/plugins/lua.lua
```

### Task 5A.4: Delete `cmuxx` and the fish `[`/`]` bindings

**Files:**
- Delete: `home/.local/bin/cmuxx`
- Modify: `home/.config/fish/config.fish` (the `[`/`]` block, `281-284` at blob `0c054b866102`)

**Interfaces:**
- Consumes: nothing.
- Produces: tab switching via cmux's `cmd+shift+]`/`[`.

- [ ] **Step 1: Write the failing check** — Run `refs 'cmuxx'`. Expected now: matches.

- [ ] **Step 2: Apply**

```bash
check_clean home/.config/fish/config.fish
git rm -q home/.local/bin/cmuxx
python3 - <<'PY'
p = "home/.config/fish/config.fish"; s = open(p).read()
old = ("# Vi normal mode: [ and ] cycle cmux tabs (surfaces) via cmuxx\n"
       "# Overrides history-token-search (alt-up/down and ctrl+r remain)\n"
       "bind -M default \\[ 'cmuxx prev-surface'\n"
       "bind -M default \\] 'cmuxx next-surface'\n\n")
assert s.count(old) == 1, s.count(old)
open(p, "w").write(s.replace(old, ""))
print("edit applied")
PY
```

- [ ] **Step 3: Verify**

```bash
refs 'cmuxx'   # Expected: only hjkl-navigation.md, fixed in Task 5A.5
fish -n home/.config/fish/config.fish && just fish-check
```

- [ ] **Step 4: Commit and log**

```bash
git commit -m "chore(cmux): remove cmuxx; cmux's cmd+shift+]/[ switch tabs" -- home/.local/bin/cmuxx home/.config/fish/config.fish
nesia add cmux "tabs: cmd+shift+]/[ · workspaces: cmd+ctrl+]/[ · focus: cmd+opt+arrows · split: cmd+d / cmd+shift+d (drive mode, cmux-nav and cmuxx are gone)"
```

### Task 5A.5: Bring the navigation docs in line

**Files:** Modify `hjkl-navigation.md` (blob `3e8315557c9c`), `keymap.yml` (blob `22d91d842c82`), `docs/karabiner.md:222`.

**Interfaces:**
- Consumes: Tasks 5A.2–5A.4.
- Produces: docs describing only what exists.

- [ ] **Step 1: Confirm the pinned blobs**

```bash
git rev-parse --short=12 HEAD:hjkl-navigation.md HEAD:keymap.yml
```

Expected: `3e8315557c9c` and `22d91d842c82`. If either differs, re-derive the edits below from the current file with `grep -n 'cmux\|C-0\|cmux-nav'` before applying.

- [ ] **Step 2: Edit `keymap.yml` by line (addresses refer to the pinned blob)**

```bash
sed -i '' -e '128,148d' -e '126d' -e '121d' -e '116d' -e '111d' -e '106d' -e '83,102d' -e '81d' -e '75d' -e '69d' -e '63d' keymap.yml
sed -i '' -e 's|# cmux-nav (crosses nvim↔cmux)|# LazyVim window nav|' keymap.yml
grep -n -E 'cmux: "C-0|cmux_mode|cmux-nav|resize_(up|down|left|right)' keymap.yml || echo "keymap.yml clean"
```

Expected: "keymap.yml clean". These deletions remove the drive-mode `cmux:` values, the `resize_*` entries (whose nvim `M-hjkl` came from `cmux-nav`), the cmux-only `close` entry and the `cmux_mode` block.

- [ ] **Step 3: Edit `hjkl-navigation.md`**

```bash
python3 - <<'PY'
p = "hjkl-navigation.md"; s = open(p).read()

def sub(old, new):
    global s
    assert s.count(old) == 1, (s.count(old), old[:60])
    s = s.replace(old, new)

sub("- `Ctrl+hjkl` = pane focus\n- `Alt+hjkl` = pane resize\n- `Ctrl+0` = enter sticky cmux drive mode\n",
    "- `Ctrl+hjkl` = window focus inside Neovim (LazyVim default)\n- cmux panes, tabs and workspaces use cmux's native shortcuts\n")
sub("| Alt | resize left | resize down | resize up | resize right |\n| Ctrl+0 | enter sticky cmux mode | | | |\n", "")
start = s.index("### Cmux Drive Mode\n"); end = s.index("## Per-Tool Implementation\n")
s = s[:start] + s[end:]
sub("Files: `nvim/lua/config/keymaps.lua`, `nvim/lua/plugins/cmux-nav.lua`, `nvim/lua/plugins/blink-cmp.lua`",
    "Files: `nvim/lua/config/keymaps.lua`, `nvim/lua/plugins/blink-cmp.lua`")
sub("| Ctrl+hjkl | pane/split nav | repo-owned `cmux-nav` (local split first, then cmux host action) |\n"
    "| Alt+hjkl | resize | repo-owned `cmux-nav` |\n",
    "| Ctrl+hjkl | window nav | LazyVim default |\n")
start = s.index("### cmux\n"); end = s.index("### Fish\n")
s = s[:start] + ("### cmux\n\nFile: `ghostty/config` (read by cmux); shortcuts are cmux defaults.\n\n"
                 "| Layer | Keys | Mechanism |\n|-------|------|-----------|\n"
                 "| Cmd+Opt+arrows | focus pane | cmux `focusLeft/Down/Up/Right` |\n"
                 "| Cmd+Shift+] / [ | next / previous tab | cmux `nextSurface` / `prevSurface` |\n"
                 "| Cmd+Ctrl+] / [ | next / previous workspace | cmux `nextSidebarTab` / `prevSidebarTab` |\n"
                 "| Cmd+D / Cmd+Shift+D | split right / down | cmux `splitRight` / `splitDown` |\n"
                 "| Cmd+Shift+Enter | zoom | cmux `toggleSplitZoom` |\n"
                 "| Ctrl+' | clear screen | Ghostty `clear_screen` binding read by cmux |\n"
                 "| Shift+Enter | literal newline | Ghostty `text:\\\\n` binding read by cmux |\n\n") + s[end:]
sub("- `Ctrl+0` mode is frontmost-cmux only.\n- The mode is explicit and sticky. There is no inferred Neovim or shell mode sync.\n", "")
sub("- Neovim terminal mode still relies on the existing escape-to-normal step before split navigation.\n",
    "- Neovim window navigation stops at Neovim's edge; cmux panes use cmux's shortcuts.\n")
for row in ("| `nvim/lua/plugins/cmux-nav.lua` | Ctrl+hjkl nav, Alt+hjkl resize |\n",
            "| `nvim/local-plugins/cmux-nav/*` | cmux boundary bridge implementation + tests |\n",
            "| `karabiner/karabiner.json` | sticky `Ctrl+0` hard-grab mode |\n",
            "| `~/.local/libexec/cmux/cmux-mode` | workspace cycling + mode status + Neovim host action dispatch |\n"):
    sub(row, "")
sub("| `ghostty/config` | hidden cmux action bindings + terminal bindings |\n", "| `ghostty/config` | terminal bindings read by cmux |\n")
open(p, "w").write(s)
print("hjkl-navigation.md updated")
PY
```

- [ ] **Step 4: Edit `docs/karabiner.md`**

```bash
python3 - <<'PY'
p = "docs/karabiner.md"; s = open(p).read()
old = "- low-level keyboard behavior like fn handling and cmux mode\n"; assert s.count(old) == 1
open(p, "w").write(s.replace(old, "- low-level keyboard behavior like fn handling\n"))
PY
```

- [ ] **Step 5: Verify**

```bash
refs 'cmux-mode|cmux_mode|cmux-nav|cmuxx|Ctrl\+0|drive mode|shift\+ctrl\+alt\+cmd'   # Expected: no output
```

- [ ] **Step 6: Commit**

```bash
git commit -m "docs: describe native cmux navigation instead of drive mode" -- hjkl-navigation.md keymap.yml docs/karabiner.md
```

### Task 5B.1 (Option B only): Collapse the enumeration rules with `from.any`

**Files:** Modify `home/.config/karabiner/karabiner.json` (after Task 5A.1's normalization commit).

**Interfaces:**
- Consumes: Task 5A.1.
- Produces: rules 8 and 9 with one manipulator each.

- [ ] **Step 1: Apply**

```bash
python3 - <<'PY'
import json
p = "home/.config/karabiner/karabiner.json"; d = json.load(open(p))
by = {r["description"]: r for r in d["profiles"][0]["complex_modifications"]["rules"]}

def collapse(desc):
    ms = by[desc]["manipulators"]
    assert len({json.dumps(m["conditions"], sort_keys=True) for m in ms}) == 1
    assert len({json.dumps(m["to"], sort_keys=True) for m in ms}) == 1
    by[desc]["manipulators"] = [{
        "type": "basic",
        "conditions": ms[0]["conditions"],
        "from": {"any": "key_code", "modifiers": {"optional": ["any"]}},
        "to": ms[0]["to"],
    }]
    return len(ms)

assert collapse("Sticky cmux drive mode clears invalid prefixes") == 54
assert collapse("Sticky cmux drive mode swallows unmapped keys") == 45
open(p, "w").write(json.dumps(d, indent=4, ensure_ascii=False) + "\n")
print("collapsed 99 manipulators into 2")
PY
jq empty home/.config/karabiner/karabiner.json && just karabiner-check && just karabiner-reload
```

- [ ] **Step 2: Verify in Karabiner-EventViewer (Jason)**

- Enter drive mode, then press `h`, `r` `l`, `s` `j`, `w` `k`, `z`. Each must still act.
- Press an unmapped letter: nothing is typed.
- Press `Esc`, `Enter` and `Ctrl+0`: each exits.
- **Modifier caveat:** the old lists excluded modifier keys, but `any` matches them. If Ctrl+0 no longer exits, put pass-through manipulators for the modifier keys ahead of the catch-all in rule 9 (they reuse that rule's conditions), then repeat this step:

```bash
python3 - <<'PY'
import json
p = "home/.config/karabiner/karabiner.json"; d = json.load(open(p))
rule = next(r for r in d["profiles"][0]["complex_modifications"]["rules"]
            if r["description"] == "Sticky cmux drive mode swallows unmapped keys")
conds = rule["manipulators"][-1]["conditions"]
mods = ["left_control", "right_control", "left_shift", "right_shift", "left_option",
        "right_option", "left_command", "right_command", "fn"]
rule["manipulators"][:0] = [{"type": "basic", "conditions": conds,
                             "from": {"key_code": k, "modifiers": {"optional": ["any"]}},
                             "to": [{"key_code": k}]} for k in mods]
open(p, "w").write(json.dumps(d, indent=4, ensure_ascii=False) + "\n")
print("modifier pass-throughs added")
PY
just karabiner-check && just karabiner-reload
```

- [ ] **Step 3: Commit**

```bash
git commit -m "refactor(karabiner): collapse drive-mode key enumerations with from.any" -- home/.config/karabiner/karabiner.json
```

### Task 5B.2 (Option B only): `cmux-mode` workspace cycling → `cmux next-window`

**Files:** Modify `home/.local/libexec/cmux/cmux-mode` (`cycle_workspace`, lines 32-104), `justfile` (recipe `cmux-mode-check`), `scripts/tests/fake-cmux.sh`.

**Interfaces:**
- Consumes: cmux has run a day without crashing after Phase 2 (Global Constraints).
- Produces: `cmux-mode workspace-next|workspace-prev` built on `cmux next-window`/`previous-window`, which wrap (`Sources/TabManager.swift:3541,3561` @ `v0.64.22`).

- [ ] **Step 1: Write the failing test**

Add a `next-window`/`previous-window` branch to the fake. It cycles the fake's workspace state file through `workspace:1..3`.

```bash
cd ~/projects/jasonkuhrt/dotfiles
check_clean home/.local/libexec/cmux/cmux-mode justfile scripts/tests/fake-cmux.sh
cat > /tmp/fake-branch.txt <<'BRANCH'
    next-window|previous-window)
        if [ -n "$workspace_state" ]; then
            n="$(current_workspace_ref)"
            n="${n#workspace:}"
            if [ "$cmd" = "next-window" ]; then
                n=$(( n % 3 + 1 ))
            else
                n=$(( (n + 1) % 3 + 1 ))
            fi
            printf 'workspace:%s\n' "$n" > "$workspace_state"
        fi
        ;;
BRANCH
python3 - <<'EDIT'
import re
p = "scripts/tests/fake-cmux.sh"; s = open(p).read()
anchor = "    identify)\n"; assert s.count(anchor) == 1
s = s.replace(anchor, open("/tmp/fake-branch.txt").read() + anchor)
open(p, "w").write(s)

p = "justfile"; s = open(p).read()
pat = r"(?m)^([ \t]*)grep -q '\^--json list-workspaces\$' \"\$log\"\n\1grep -q '\^select-workspace --workspace workspace:2\$' \"\$log\"\n"
def repl(m):
    ind = m.group(1)
    return ind + "grep -q '^next-window$' \"$log\"\n" + ind + "! grep -q '^select-workspace' \"$log\"\n"
s, n = re.subn(pat, repl, s)
assert n == 1, n
open(p, "w").write(s)
print("test updated")
EDIT
just cmux-mode-check
```

Expected: `test updated`, then `just cmux-mode-check` **FAILS**, because the helper still logs `select-workspace` and never `next-window`.

- [ ] **Step 2: Implement**

```bash
cat > /tmp/cycle-workspace.sh <<'NEWFN'
workspace_ref_from_json() {
    CURRENT_JSON="$1" python3 - <<'PY'
import json
import os

payload = json.loads(os.environ["CURRENT_JSON"] or "{}")
if isinstance(payload, dict):
    value = payload.get("workspace_ref") or payload.get("selected_workspace_ref") or payload.get("ref") or payload.get("workspace_id")
    if value:
        print(value)
PY
}

cycle_workspace() {
    local direction="$1"
    local old_ref new_ref

    old_ref="$(workspace_ref_from_json "$(run_cmux_json current-workspace)")"
    if [ "$direction" = "next" ]; then
        run_cmux next-window >/dev/null
    else
        run_cmux previous-window >/dev/null
    fi
    new_ref="$(workspace_ref_from_json "$(run_cmux_json current-workspace)")"

    if [ -n "$old_ref" ] && [ "$old_ref" != "$new_ref" ]; then
        clear_mode_status --workspace "$old_ref"
    fi
    set_mode_status --workspace "$new_ref"
}
NEWFN
python3 - <<'EDIT'
import re
p = "home/.local/libexec/cmux/cmux-mode"; s = open(p).read()
new = open("/tmp/cycle-workspace.sh").read()
s, n = re.subn(r"(?ms)^cycle_workspace\(\) \{\n.*?^\}\n", lambda m: new, s)
assert n == 1, n
open(p, "w").write(s)
print("cycle_workspace replaced")
EDIT
bash -n home/.local/libexec/cmux/cmux-mode
```

Expected: `cycle_workspace replaced`, and `bash -n` exits 0.

- [ ] **Step 3: Verify**

Run: `just cmux-mode-check`
Expected: `PASS: cmux-mode-check`. Then Jason tests `w` `j`/`k` in live drive mode, including wrap-around at the first and last workspace, and confirms the blue mode badge follows the selection.

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor(cmux): cycle workspaces with cmux next-window" -- home/.local/libexec/cmux/cmux-mode justfile scripts/tests/fake-cmux.sh
```

---

## Phase 6 — After cmux 0.64.23 ships (requires Tasks 1.3 and 2.2)

### Task 6.1: Let `open` route to the cmux browser natively

**Files:**
- Delete: `home/.local/bin/plannotator-browser`
- Modify: `home/.config/fish/config.fish` (`PLANNOTATOR_BROWSER` at `68-69`; `gprv` function), `home/.config/nvim/lua/config/link_open.lua:245-278`

**Interfaces:**
- Consumes: cmux 0.64.23 installed and the fish integration live.
- Produces: web links from fish, gh, plannotator and nvim open through cmux's `open` wrapper.

- [ ] **Step 1: Verify native routing first (Jason, in a cmux tab)**

```fish
type -p open                           # Expected: a path inside cmux.app, not /usr/bin/open
open https://example.com               # Expected: opens in the cmux browser
gh pr view --web                       # (inside a repo with a PR) Expected: opens in the cmux browser
```

**If `open` still resolves to `/usr/bin/open`, stop:** record the failing output here and leave Phase 6 undone. **If `gh` doesn't route but `open` does**, keep the `gprv` function unchanged and do the rest.

- [ ] **Step 2: Write the failing check** — Run `git grep -n -E 'plannotator-browser|PLANNOTATOR_BROWSER|open_in_cmux_browser|cmux browser open' -- home/.config home/.local`. Expected now: matches.

- [ ] **Step 3: Apply**

```bash
check_clean home/.config/fish/config.fish home/.config/nvim/lua/config/link_open.lua
git rm -q home/.local/bin/plannotator-browser
python3 - <<'PY'
import re

def sub(path, old, new):
    s = open(path).read()
    assert s.count(old) == 1, (path, s.count(old), old[:70])
    open(path, "w").write(s.replace(old, new))

sub("home/.config/fish/config.fish",
    '# Plannotator: open in cmux browser instead of OS default\nset --export PLANNOTATOR_BROWSER "$HOME/.local/bin/plannotator-browser"\n\n', "")

p = "home/.config/fish/config.fish"; s = open(p).read()
s, n = re.subn(r'function gprv --description "Open current branch\'s PR in browser"\n.*?\n    gh pr view --web\nend\n',
               "", s, flags=re.S)
assert n == 1, n
old = "abbr -a gprc 'gh pr create'\n"; assert s.count(old) == 1
s = s.replace(old, old + "abbr -a gprv 'gh pr view --web'\n")
open(p, "w").write(s)

p = "home/.config/nvim/lua/config/link_open.lua"; s = open(p).read()
s, n = re.subn(r"---@return boolean\nlocal function in_cmux\(\)\n.*?\nend\n\n---@param target string\n---@return boolean, string\?\n"
               r"local function open_in_cmux_browser\(target\)\n.*?\nend\n\n", "", s, flags=re.S)
assert n == 1, n
s, n = re.subn(r"  if is_web_uri\(target\) and in_cmux\(\) then\n.*?\n  end\n\n", "", s, flags=re.S)
assert n == 1, n
open(p, "w").write(s)
print("edits applied")
PY
```

- [ ] **Step 4: Verify**

```bash
git grep -n -E 'plannotator-browser|PLANNOTATOR_BROWSER|open_in_cmux_browser|cmux browser open' -- home/.config home/.local   # Expected: no output
fish -n home/.config/fish/config.fish && just fish-check && just lua-check
git grep -n 'is_web_uri' home/.config/nvim/lua/config/link_open.lua
```

Expected: `fish-check` and `lua-check` pass. If `is_web_uri` is now defined but unused, `lua-check` reports it: delete that function too and re-run.

- [ ] **Step 5: Commit and log**

```bash
git commit -m "refactor(cmux): let cmux's open wrapper route web links

cmux 0.64.23 fixed PATH ordering for its open wrapper, so the
plannotator-browser shim, the gprv cmux branch and link_open's cmux
branch were duplicating it." -- \
  home/.local/bin/plannotator-browser home/.config/fish/config.fish home/.config/nvim/lua/config/link_open.lua
nesia add cmux "web links from fish, gh, plannotator and nvim open in the cmux browser natively; gprv is an abbreviation"
```

---

## Phase 7 — Close out

### Task 7.1: Sweep, measure, record

**Files:**
- Modify: `DECISIONS.md` (append Decision 10), `.session/ignore/audit-backlog.md` (local, gitignored)

**Interfaces:**
- Consumes: every completed task.
- Produces: the final ledger and a durable decision record.

- [ ] **Step 1: Dangling-reference sweep**

```bash
refs 'cmux-zmx|(^|[^[:alnum:]_-])(zmx|zsm)([^[:alnum:]_-]|$)|cmd-ux|cmd_ux|codex2|codex-tab-sync|dispatch-claude|cmux-mode|cmux_mode|cmux-nav|cmuxx|plannotator-browser'
```

Expected: no output, except the pieces kept on purpose by a gate answer (list them here).

- [ ] **Step 2: Health checks**

```bash
just doctor; just fish-check; just lua-check; just karabiner-check
perl -e 'alarm 20; exec @ARGV' env -i HOME="$HOME" PATH=/usr/bin:/bin /opt/homebrew/bin/fish -c 'for t in nvim claude codex pnpm node; printf "%s %s\n" $t (command -v $t); end'
```

Expected: all pass, and every tool resolves.

- [ ] **Step 3: Measure** — Re-run Task 0.1 Step 1's command, and write *baseline − now* into § Deletion Ledger as the actual result.

- [ ] **Step 4: Record the decision** — Append to `DECISIONS.md`:

```markdown
---

## Decision 10: Native Tool Features Over Bespoke Glue

**Context:**
Through early 2026 this repo accrued launch bridges, wrappers, a sticky Karabiner navigation mode and a
duplicate Neovim plugin, each working around a gap in cmux, Claude Code, Codex or zmx. By September most
gaps had closed, and the zmx launch bridge was actively switching off cmux's Claude integration,
including agent auto-resume.

**Decision:**
Use the latest tools' native features and delete glue that re-implements them. Glue is justified only by
a capability the current release lacks, and its comment must name that gap and the date it was checked.

**Trade-offs:**
- Lost: whatever each gate in docs/superpowers/plans/2026-09-14-terminal-stack-clean-slate.md recorded
  (e.g. sticky drive mode, nvim↔cmux edge crossing).
- Gained: agent auto-resume across quit, crash and reboot; sidebar status and notifications; ≈32k fewer lines.
```

- [ ] **Step 5: Commit and push**

```bash
git commit -m "docs(decisions): prefer native tool features over bespoke glue" -- DECISIONS.md docs/superpowers/plans/2026-09-14-terminal-stack-clean-slate.md
git log origin/main..HEAD --format='%h %an %s'   # push only if every commit listed is from this plan
git push
```

- [ ] **Step 6: Update the local backlog** — Mark the corresponding items in `.session/ignore/audit-backlog.md` done, with commit hashes.

---

## Out of Scope (not researched here)

These are bespoke too, but this document holds no evidence about them. Each needs its own research pass using the same method: latest docs first, then a gate for any real loss.

- The git dashboard (`home/.config/fish/modules/git.fish` and `git-dashboard*`) is being rewritten by another session (`docs/superpowers/specs/2026-09-13-git-dashboard-rewrite-design.md`).
- `keymap.yml` as a whole: 907 lines of cross-tool chord documentation (Zed, Neovim, VS Code, fish, hunk, Claude Code) that nothing reads. This plan only removes its drive-mode content.
- The VS Code / key-binder keybinding stack: Jason's own OSS projects (`vsv`, `key-binder`), which are not glue.
- Karabiner rules 0-1 and their recipes (`karabiner-check`, `raycast-nav-check`, `fn-wispr-qa`).
- fish modules (git guardrails, `cc-logs`), the breadth of the skills library, dotctl.
