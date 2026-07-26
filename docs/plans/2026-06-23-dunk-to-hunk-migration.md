# Dunk to Hunk Migration Plan

Date: 2026-06-23

Presentation input: `docs/research/2026-06-23-dunk-hunk-changelog-feature-diff-prez.md`

## Evidence

- Hunk latest upstream release is `v0.16.0` from 2026-06-19; npm `hunkdiff` latest is `0.16.0` and exposes both `hunk` and `hunkdiff`.
- Dunk latest upstream release is `v0.15.1` from 2026-05-19; npm `dunkdiff` latest is `0.15.1`.
- Local `dunk` is `0.15.1` from `~/.npm-global/bin/dunk`, installed outside `scripts/data/npm/global-packages.txt`.
- Local `hunk` is `0.12.0` from `/opt/homebrew/bin/hunk`; `hunk skill path` currently fails.
- Local `lazygit` resolves to `~/.local/bin/lazygit`, build `jasonkuhrt-dunk`, commit `68c0ba64`.
- `jasonkuhrt/lazygit` is a fork, 3 commits ahead and 151 behind upstream; the 3 commits exist for Dunk custom-command plumbing.

## Decisions

- Make `hunkdiff` the canonical managed install via `scripts/data/npm/global-packages.txt`, because npm has the current `0.16.0` release and `~/.npm-global/bin` already precedes Homebrew in PATH.
- Remove the out-of-band Homebrew Hunk install and the out-of-band npm Dunk install.
- Retire the Dunk file protocol entirely: no `.dunk/comments.json`, no `dunk-lazygit`, no wrapped `dunk-review` skill, no VS Code Dunk extension, no LazyGit Dunk custom commands.
- Restore the live LazyGit binary to upstream/Homebrew. The fork is no longer a workflow dependency once Dunk comment authoring is gone.
- Set terminal Git pager review to Hunk with `core.pager = hunk pager`. Keep delta for LazyGit's explicit pager and `interactive.diffFilter = delta --color-only`.
- Make discoverable shell/Git/LazyGit/editor/agent surfaces the primary Hunk UX. Do not make `just`, opaque aliases, or abbreviation memorization the daily review entrypoint.
- Bridge saved Hunk user notes to Codex with `hunk-agent-watch` when Hunk is launched from LazyGit, so saving a note can trigger the agent handoff instead of requiring a manual "read my Hunk notes" prompt.
- Keep generic git-hunk editor/keymap names such as `hunk_next` and `hunk_prev`; those are Git hunk concepts, not Dunk/Hunk tool wiring.

## Implementation

1. Managed installs
   - Add `hunkdiff` to `scripts/data/npm/global-packages.txt`.
   - Remove `dunkdiff` from the global npm install: `npm uninstall -g dunkdiff`.
   - Remove the old Homebrew Hunk install: `brew uninstall hunk`, then `brew untap modem-dev/tap` if the tap has no remaining packages.
   - Run the dotfiles convergence path: `DOTFILES_REPO_ROOT=$PWD dotctl up`; `just up` is only the existing wrapper.
   - Verify `command -v hunk` resolves to `~/.npm-global/bin/hunk`.

2. Hunk config and shell workflow
   - Add `home/.config/hunk/config.toml` as the managed Hunk config anchor:

     ```toml
     # Hunk user config anchor.
     # Git routes diff-shaped pager output through `hunk pager`; LazyGit opens
     # explicit Hunk review sessions from custom commands.
     ```

   - Change `[core] pager` in `home/.gitconfig` from `delta --side-by-side` to `hunk pager`.
   - Keep `home/.config/lazygit/config.yml` on `pager: delta --paging=never`.
   - Keep `[interactive] diffFilter = delta --color-only`.
   - Do not add short fish abbreviations or Git aliases for Hunk. Use full, self-describing commands in docs and examples:
     - `hunk diff`
     - `hunk diff --watch`
     - `hunk diff --staged`
     - `hunk show <ref>`
     - `hunk session ...`
   - Update `docs/cli-tools.md` so Hunk is discoverable in the CLI reference instead of remembered as private shorthand.

3. Editor and command-palette workflow
   - Add a `Git review` namespace to `cmd-ux` so Hunk review flows are discoverable by typing plain words in the command picker:
     - `Git review working` -> `hunk diff`
     - `Git review watch` -> `hunk diff --watch`
     - `Git review staged` -> `hunk diff --staged`
     - `Git review show` -> `hunk show`
     - `Git review session` -> `hunk session list`
   - Keep existing `Git hunk ...` commands in `cmd-ux` mapped to gitsigns; those are editor hunk operations, not the Hunk application.
   - Update `keymap.yml` only for semantic discoverability:
     - keep `qj`/`qk`/`qa`/`qu` as editor hunk operations
     - keep `qw` as LazyGit / Git panel
     - keep `qd` as editor diff
     - add documentation that Hunk review is launched through `Git review ...` in `cmd-ux`, not through a new memorized chord
   - Do not add new Hunk-specific q-prefix chords unless later real usage proves one command is repeated enough to deserve muscle memory.

4. Agent review skill
   - Add `home/.local/bin/hunk-check` that verifies:
     - `command -v hunk`
     - `hunk --version`
     - `test -f (hunk skill path)`
     - `hunk diff --help`
     - `hunk session --help`
   - Add `home/.local/bin/hunk-skill-sync` that copies the current `hunk skill path` output into the shared Claude skill location and links Codex to it.
   - Do not add `just` wrappers; the shell scripts are the real entrypoints.
   - Add `hunk-review` to `scripts/setup/after/onchange/12-skills-sync.sh` so `~/.codex/skills/hunk-review` is a managed symlink to the shared skill.
   - Install the shared Claude copy to `home/.claude/skills-library/hunk-review/SKILL.md` and link `home/.claude/skills/hunk-review` to it.
   - Do not keep `dunk-review` around as an alias.

5. Remove Dunk dotfiles surfaces
   - Delete `docs/dunk-lazygit.md`.
   - Delete `home/.local/bin/dunk-lazygit`.
   - Delete `home/.local/bin/dunk-lazygit.protocol.md`.
   - Delete `home/.claude/skills-library/dunk-review/SKILL.md`.
   - Delete `home/.claude/skills/dunk-review`.
   - Remove `jasonkuhrt.dunk` from `scripts/data/vscode-extensions.txt`.
   - Remove `.dunk/` from `home/.config/git/ignore` after deleting stale `.dunk` directories from active repos.
   - Update `research/2026-05-15-lazygit-delta-tokyonight.md` so its Dunk pager note is marked historical and no longer reads as current guidance.

6. Remove live Dunk/VS Code runtime state
   - Run `code --uninstall-extension jasonkuhrt.dunk`.
   - Delete `/Users/jasonkuhrt/.vscode/extensions/jasonkuhrt.dunk-0.0.1` if the uninstall leaves it behind.
   - Archive or delete `/Users/jasonkuhrt/projects/jasonkuhrt/vscode-dunk` after confirming it has no uncommitted work and no remote.
   - Remove stale `.dunk/` directories from active working repos after confirming they contain no pending review comments.

7. Restore LazyGit upstream path
   - Remove the Dunk `customCommands` block from `home/.config/lazygit/config.yml`; keep the Tokyo Night theme, `git.pagers`, and `os.open`.
   - Add Hunk-oriented LazyGit custom commands that start `hunk-agent-watch --repo . --background` before Hunk and do not require the fork-only `SelectedPatch` template state:
     - `hunk diff --watch` from status context.
     - `hunk diff --staged` from staged context.
     - `hunk show {{.SelectedCommit.Hash}}` from commit contexts.
     - `hunk diff --watch -- {{.SelectedPath | quote}}` from file contexts when a selected path is available.
   - Remove `/Users/jasonkuhrt/.local/bin/lazygit` so PATH falls through to Homebrew LazyGit.
   - Run the normal dotfiles convergence path so Homebrew LazyGit is the live binary.
   - Verify `lazygit --version` no longer reports `version=jasonkuhrt-dunk`.
   - Leave deleting or archiving the `jasonkuhrt/lazygit` GitHub fork for an explicit external-account cleanup step.

8. Agent instructions and review loop
   - Replace the Dunk review skill with the bundled Hunk review skill so agents prefer Hunk when the user asks for local review comments.
   - Add `home/.local/bin/hunk-agent-watch` to poll live Hunk user notes through `hunk session comment list --type user --json`.
   - Have `hunk-agent-watch` resolve the newest live Hunk session whose `repoRoot` matches the LazyGit worktree, bind to that concrete `sessionId`, and pass that `sessionId` to the agent prompt. Use the repo root only as the discovery key.
   - Make `hunk-agent-watch` default to `--transport auto`:
     - prefer Codex Desktop remote control by starting `codex remote-control start --json` on demand and sending a repo-scoped prompt through `codex debug app-server send-message-v2`
     - fall back to `codex exec -C <repo>` when Desktop remote control is unavailable
     - keep `--transport desktop`, `--transport exec`, and `--transport print` for explicit mode selection
   - Document the default loop:
     - human opens Hunk through LazyGit `H`
     - LazyGit starts `hunk-agent-watch` in the background
     - human leaves and saves review notes in Hunk
     - watcher sends Codex the repo-scoped Hunk prompt
     - agent uses the synced `hunk-review` skill and `hunk session ...`
     - agent fixes code, reloads/navigates/resolves through Hunk session commands
   - Keep this loop command-first and shell-native; do not require `just` to participate.

## Verification

- `hunk-check` passes.
- `hunk-agent-watch --help` passes Bash syntax and shellcheck.
- `hunk-agent-watch --repo . --transport print --background`, `--status`, and `--stop` work without leaving a process running.
- `hunk-agent-watch` uses Hunk `sessionId` after discovery, avoiding repo-only ambiguity when more than one Hunk session exists for the same worktree.
- `codex remote-control start --json` currently reports the standalone Codex install is missing, so `hunk-agent-watch --transport auto` should fall back to `codex exec` until that install exists.
- `hunk --version` reports `0.16.0` or newer.
- `hunk skill path` prints an existing file.
- `git config --global --get core.pager` reports `hunk pager`.
- `git config --global --get interactive.diffFilter` still reports `delta --color-only`.
- `cmd-ux` exposes `Git review working`, `Git review watch`, `Git review staged`, `Git review show`, and `Git review session`.
- `keymap.yml` keeps editor hunk operations separate from Hunk app review commands.
- LazyGit starts with the managed config and contains no `dunk-lazygit` commands.
- LazyGit exposes Hunk commands that work without `SelectedPatch` and arm `hunk-agent-watch` before opening Hunk.
- `lazygit --version` does not include `jasonkuhrt-dunk`.
- `npm ls -g --depth=0 | rg dunk` returns no output.
- `code --list-extensions | rg '^jasonkuhrt\.dunk$'` returns no output.
- `rg -n 'dunk|dunk-lazygit|jasonkuhrt\.dunk|\.dunk' home scripts --hidden` returns no operational surfaces.
- `hunk diff --watch` works in a dirty test repo and reloads after an edit.
- `git diff` opens through `hunk pager`.
- LazyGit still renders diffs with `delta --paging=never`.
