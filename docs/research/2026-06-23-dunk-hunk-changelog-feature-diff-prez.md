# Dunk / Hunk Changelog + Feature Diff

Date: 2026-06-23

Purpose: evidence input for the Dunk-to-Hunk migration plan.

---

## Thesis

Dunk was a useful fork for a very specific workflow:

- local review comments in `.dunk/comments.json`
- agent-readable `dunk comments` CLI
- simple no-daemon review loop
- deep LazyGit authoring via Jason's fork

Hunk has since moved ahead as the better default review surface:

- newer releases
- live review sessions
- bundled agent skill
- multi-VCS support
- stronger pager/LazyGit behavior
- broader performance and security hardening

---

## Current State

| Surface | Dunk | Hunk |
| --- | --- | --- |
| Latest upstream release | `v0.15.1`, 2026-05-19 | `v0.16.0`, 2026-06-19 |
| npm package | `dunkdiff@0.15.1` | `hunkdiff@0.16.0` |
| Local binary | `~/.npm-global/bin/dunk` | `/opt/homebrew/bin/hunk` |
| Local version | `0.15.1` | `0.12.0` |
| Local install health | current, but unmanaged | stale; `hunk skill path` fails |

Readout: Dunk is locally current but out-of-band. Hunk is locally stale even though upstream has moved.

---

## Release Momentum

### Dunk

| Release | Date | Meaning |
| --- | --- | --- |
| `v0.12.1` / `v0.12.2` | 2026-05-11 | fork baseline, scroll-position fixes |
| `v0.13.0` | 2026-05-14 | `--branch` review |
| `v0.14.0` | 2026-05-16 | Git-only, watch config, static pager for captured hosts |
| `v0.15.0` | 2026-05-19 | `dunk diff` reviews staged + unstaged together |
| `v0.15.1` | 2026-05-19 | deletes empty `.dunk/comments.json` |

### Hunk

| Release | Date | Meaning |
| --- | --- | --- |
| `v0.12.0` / `v0.12.1` | 2026-05-12 to 2026-05-14 | Homebrew, pager, bundled skill fixes |
| `v0.13.0` | 2026-05-18 | sessions, user review notes, VCS adapter |
| `v0.14.0` | 2026-05-26 | context expansion, themes, agent author names, security hardening |
| `v0.15.0` | 2026-06-08 | Sapling, moved-line highlighting, benchmark coverage |
| `v0.15.3` | 2026-06-13 | large-review latency and memory fixes |
| `v0.16.0` | 2026-06-19 | refreshed themes, LazyGit static-pager split fix, session cleanup |

Readout: Dunk concentrated on a local file protocol. Hunk kept broadening the review platform.

---

## What Dunk Optimized For

Dunk's core bet:

- Human reviews in a TUI.
- Comments are written to `.dunk/comments.json`.
- Agent reads comments via `dunk comments list/show/resolve`.
- No daemon, MCP, or session broker.
- Missing comment file means no pending review.

This made it easy to graft other tools onto the loop.

Jason-local extension:

- `dunk-lazygit` writes comments from LazyGit.
- LazyGit `;` bindings author line/file/dir/commit-scope comments.
- Scope/context are encoded into the comment body.
- The wrapped `dunk-review` skill teaches agents to interpret the extra markers.

---

## What Hunk Moved Ahead On

Hunk now has the stronger platform direction:

- `hunk session` command surface for live review state.
- Bundled review skill via `hunk skill path`.
- Inline human/agent notes and session comment cleanup.
- Git, Jujutsu, and Sapling support.
- Static pager support for captured hosts like LazyGit.
- Explicit split layout honored in static pager output as of `v0.16.0`.
- Custom/built-in theme system.
- Context expansion, mouse text selection, editor open shortcut.
- Security hardening around pager execution, daemon scope, terminal control sequences.
- Large-review performance and benchmark coverage.

---

## Feature Diff

| Axis | Dunk | Hunk |
| --- | --- | --- |
| Comment model | `.dunk/comments.json`, hunk-scoped comments | live sessions, inline notes, session cleanup |
| Agent surface | `dunk comments list/show/resolve` | `hunk session ...` |
| VCS | Git only after `v0.14.0` | Git, Jujutsu, Sapling |
| Default diff | staged + unstaged together | targeted diff with explicit staged flag |
| Branch review | `dunk diff --branch` | generic target/revset model |
| Pager/LazyGit | static ANSI for captured hosts | static pager; split layout honored in `v0.16.0` |
| Config | `~/.config/dunk/config.toml`, `.dunk/config.toml` | `~/.config/hunk/config.toml`, `.hunk/config.toml` |
| Agent notes | local file comments | inline notes/session review flow |
| Best fit | simple local file protocol | current long-term review platform |

Decision signal: Dunk's durable advantage is the simple local comment file. Hunk's advantage is everything else.

---

## Jason-Local Dependency Stack

Tracked Dunk surfaces in dotfiles:

- `docs/dunk-lazygit.md`
- `home/.local/bin/dunk-lazygit`
- `home/.local/bin/dunk-lazygit.protocol.md`
- `home/.claude/skills-library/dunk-review/SKILL.md`
- `home/.claude/skills/dunk-review`
- `home/.config/lazygit/config.yml`
- `scripts/data/vscode-extensions.txt`
- `home/.config/git/ignore`
- `research/2026-05-15-lazygit-delta-tokyonight.md`

Runtime state:

- `dunkdiff@0.15.1` installed globally, but not in the npm globals manifest.
- `hunk 0.12.0` installed through Homebrew tap.
- `hunk skill path` currently fails.
- `jasonkuhrt.dunk` VS Code extension is installed.
- `~/.local/bin/lazygit` shadows Homebrew LazyGit.

---

## LazyGit Fork Readout

`jasonkuhrt/lazygit`:

- fork of `jesseduffield/lazygit`
- default branch `master`
- pushed 2026-05-13
- 3 commits ahead, 151 behind upstream master

The three commits:

- expose patch selection to custom commands
- drop redundant `Path` alias from patch selection
- add `b64enc` template function

Interpretation:

The fork exists for Dunk comment authoring from LazyGit. Once Dunk custom commands are retired, the fork should stop being part of the live workflow.

---

## Migration Implication

The migration is not just:

> update Hunk, uninstall Dunk

It is:

1. make Hunk the managed review tool
2. remove the Dunk comment-file protocol
3. remove the LazyGit custom-command bridge
4. stop shadowing upstream LazyGit with the fork binary
5. replace the agent review skill
6. rewire Git pager/review habits around Hunk

---

## Recommendation

Use Hunk as the primary review tool.

Concrete direction:

- install current `hunkdiff` through managed npm globals
- remove old Homebrew Hunk
- remove npm-global Dunk
- delete Dunk dotfiles surfaces
- remove the VS Code Dunk extension
- remove the LazyGit Dunk custom commands
- stop using the LazyGit fork in PATH
- install/sync the Hunk review skill
- verify `hunk skill path`, `hunk diff --watch`, `hunk session`, `git diff`, and LazyGit pager behavior

---

## Sources

- Hunk repo: <https://github.com/modem-dev/hunk>
- Hunk `v0.16.0`: <https://github.com/modem-dev/hunk/releases/tag/v0.16.0>
- Dunk repo: <https://github.com/amix/dunk>
- Dunk `v0.15.1`: <https://github.com/amix/dunk/releases/tag/v0.15.1>
- Dunk `v0.15.0`: <https://github.com/amix/dunk/releases/tag/v0.15.0>
- Local dotfiles scan: `rg -n 'dunk|hunk|lazygit|SelectedPatch|dunk-lazygit|jasonkuhrt\\.dunk|\\.dunk'`
- Local runtime checks: `dunk --version`, `hunk --version`, `hunk skill path`, `lazygit --version`, `npm view`, `npm ls -g`, `brew list`, `code --list-extensions`
- LazyGit fork comparison: `gh api repos/jasonkuhrt/lazygit/compare/jesseduffield:master...jasonkuhrt:master`
