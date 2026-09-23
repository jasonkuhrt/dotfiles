# Git Dashboard Rewrite

__Status:__ Proposed, revision 2 — awaiting approval
__Revised:__ 2026-09-14 (revision 1: 2026-09-13)
__Written against:__ `09870d90`

Revision 2 incorporates a review of revision 1. Every claim was re-checked against the working
tree, git 2.54.0 and Bun 1.4.0. Where this revision decides differently from the review, the
reasons are in [Departures from the review](#departures-from-the-review). Code is cited by symbol,
not line number, because the files involved are changing.

## Summary

Bare `git` runs `_git_dashboard` (fish) through the sole `git` wrapper in `modules/git.fish`.
Replace the dashboard with a TypeScript program run by Bun. Its output depends on repository state
and terminal width, never on terminal height, and it never writes to the repository.

## Design

### Principles

* __Abnormal first and loud.__ An operation in progress, conflicts or a deleted upstream lead the
  output. Normal states stay quiet.
* __Deterministic.__ Folding and caps follow fixed rules, so output survives split panes,
  screenshots, snapshot tests and muscle memory.
* __Counts are conserved.__ Every folded or hidden entry is accounted for in a count and in totals.
* __Local and side-effect free.__ No network. No command that can rewrite the index.
* __One owner per concept.__ Trunk has one definition, shared with `gco`.

### Presentation modes

Rendering takes the presentation as a parameter, so tests inject it instead of reading a terminal.
Height is not an input.

| | Terminal (stdout is a TTY) | Piped |
|---|---|---|
| Width | Terminal columns; subjects and directory parts truncate | Unbounded; nothing truncates |
| Colour | On unless `NO_COLOR` is set | Off unless `FORCE_COLOR` is set |
| OSC 8 links | On | Off |
| Folding rung 1 (semantic) | On | On |
| Folding rungs 2–3, commit caps | On | Off — every row printed |

### Layout

Top to bottom, each section omitted when empty, one blank line between sections:

1. Operation banner
2. Header
3. Change groups — Conflicts, Staged, Unstaged, Untracked — or `✓ nothing to commit`
4. Commit rail
5. Incoming block

### Example — trunk, dirty, unpushed

The working state captured on 2026-09-11, 80 columns, terminal mode. Commit ages use real author
times from the repository.

```
main ⇡43 origin/main · 2 stashes

Staged 1                                                                    +4
  A home/.config/fish/conf.d/node-options.fish                              +4

Unstaged 48                                                         +312 −3.4K
  M docs/cli-tools.md                                                    +1 −1
  M docs/worktrunk.md                                                  +33 −20
  M home/.claude/settings.json                                         +55 −48
  M home/.claude/skills-library/effect/CHECKS.quality.md                   −94
  D home/.claude/skills-library/hunk-review/SKILL.md                      −214
  D home/.claude/skills-library/linear/  28 files                        −2.6K
  D home/.claude/skills/linear                                              −1
  D home/.claude/skills/linear-managing-issues                              −1
  M home/.codex/AGENTS.md                                                +1 −1
  M home/.config/fish/completions/grok.fish                          +117 −111
  M home/.config/fish/config.fish                                           +1
  M home/.config/fish/functions/wt.fish                                     +8
  M home/.config/hunk/config.toml                                       +85 −8
  M home/.config/hunk/extensions/hunk-agent-dispatch/index.ts            +9 −1
  M home/.config/hunk/state.json                                         +2 −1
  D packages/linear/  6 files                                             −322

Untracked 11
  ? archive/linear/
  ? example.txt
  ? home/.claude/commands/hunk-watch.md
  ? home/.claude/skills-library/hunk-review
  ? home/.claude/skills/heartbeat-dev-login/
  ? home/.claude/skills/heartbeat-visual-parity/
  ? home/.config/hunk/extensions/  5 entries

● 50badf4  fix      claude  correct and condense the vite-plus skill…      11h
● 3bd5498  refactor         consolidate session skills and workflow…        2d
● a774eae  chore    claude  purge rules, stale commands, statusline…        5d
● 05e0dc2  chore    claude  remove all hooks and the hookify plugin         5d
● cae6abd  chore            sync zed, vscode, hunk and known_hosts state    5d
● e218792  feat     fish    add copilot and grok completions, refresh…      5d
● 0814936  docs     codex   sync AGENTS.md, config and hooks                5d
┆ 36 more
◆ d0af6d1  chore    config  enable tsgo, route lazygit…       origin/main  2mo
```

### Example — rebase stopped on a conflict

Illustrative. Mid-rebase HEAD is detached, so the header carries only the branch being rebased.
The rail shows commits replayed so far above `onto`.

```
▲ REBASING feat/login onto main · step 3/4 · 1 conflict
  git rebase --continue · --skip · --abort

feat/login

Conflicts 1
  UU src/auth/token.ts                                           both modified

┆ 1 remaining
● 4d5f6a7  fix   auth  handle token expiry                                  3h
● 9c1e2ab  feat  auth  add login endpoint                                   5h
◆ 8e9f0a1  chore deps  bump effect to 4.2                            main   1h
```

### Example — feature branch diverged from its upstream

Illustrative. The upstream tip is not an ancestor of HEAD, so no row carries its label; the
commits only the upstream has appear in the incoming block.

```
feat/login ⇡1 ⇣2 origin/feat/login · ↑3 ↓5 main

✓ nothing to commit

● 9c1e2ab  feat  auth  add login endpoint                                   2h
● 4d5f6a7  fix   auth  handle token expiry                                  3h
● 1a2b3c4  test  auth  cover refresh edge cases                             5h
◆ 8e9f0a1  chore deps  bump effect to 4.2                forked from main   3d

⇣ 2 on origin/feat/login not here
◇ 7b8c9d0  fix  auth  rotate signing key on refresh                         1h
◇ 6a7b8c9  docs auth  document token lifetimes                              1h
```

### Header

Grammar: `<location> [<sync>] [· <trunk relation>] [· <n> stash(es)]`

| State | Porcelain v2 evidence | Header |
|---|---|---|
| Upstream in sync | `branch.ab +0 -0` | `main origin/main` |
| Ahead or behind upstream | `branch.ab +a -b` | `main ⇡43 origin/main` · `feat/x ⇡1 ⇣2 origin/feat/x` |
| No upstream | no `branch.upstream` | `feat/x · no upstream · ↑3 main` |
| Upstream deleted | `branch.upstream` present, `branch.ab` absent | `feat/x · origin/feat/x gone · ↑3 ↓1 main` |
| Detached HEAD | `branch.head (detached)` | `detached at 50badf4 · ↑2 ↓5 main` |
| No commits | `branch.oid (initial)` | `main · no commits yet` |
| Rebase in progress | operation state | `feat/login` — sync and trunk relation omitted |

* `⇡` and `⇣` appear only when non-zero. With both zero, the upstream name alone is shown, dimmed.
* Trunk relation is omitted on trunk itself and when no trunk resolves. A branch exactly at trunk
  shows `at main`.
* `gone` is red.

### Operation banner

Detection mirrors git's own `wt_status_get_state()` and `contrib/completion/git-prompt.sh`
(v2.54.0). The files live in the worktree's own git directory (`git rev-parse --git-dir`) and are
read directly, without spawning anything.

| Operation | Detected by | Banner | Progress | Second line |
|---|---|---|---|---|
| Rebase, merge backend | `rebase-merge/` | `REBASING <head-name> onto <onto>` | `msgnum` / `end` | `git rebase --continue · --skip · --abort` |
| Rebase, apply backend | `rebase-apply/rebasing` | same | `next` / `last` | same |
| Applying patches | `rebase-apply/applying` | `APPLYING PATCHES` | `next` / `last` | `git am --continue · --skip · --abort` |
| Merge | `MERGE_HEAD` | `MERGING <name> into <branch>` | — | `git commit · git merge --abort` |
| Cherry-pick | `CHERRY_PICK_HEAD`, or `sequencer/todo` | `CHERRY-PICKING <hash> <subject>` | remaining in `sequencer/todo` | `git cherry-pick --continue · --skip · --abort` |
| Revert | `REVERT_HEAD`, or `sequencer/todo` | `REVERTING <hash> <subject>` | remaining in `sequencer/todo` | `git revert --continue · --skip · --abort` |
| Bisect | `BISECT_LOG` | `BISECTING from <BISECT_START>` | — | `git bisect good · bad · reset` |

The banner appends the conflict count from the status entries. `<onto>` and `<name>` come from the
decorations (`%D`) of the `onto` and `MERGE_HEAD` commits, preferring the trunk name when present.

### Change groups

Row grammar: `  <status> <path>  [<annotation>]  <+added −deleted>`

* __Status__: `A M D R C T` for staged and unstaged entries, `?` for untracked. Conflicts show
  git's two-letter code.
* __Path__: directory dimmed, file name bright. Renames and copies compact the shared prefix:
  `src/auth/{login.ts → signin.ts}`.
* __Annotation__:
  * Conflicts use git's phrase (table below).
  * Intent-to-add (`git add -N`): `intent to add`.
  * Type change: `type changed`.
  * Submodules: `new commits`, `modified` and/or `untracked`, from the `S<c><m><u>` flags.
  * Folded rows: `n files`, or `n entries` when git reported directories.
* __Numbers__: a zero side is omitted (`+8`, `−94`). Binary files show `bin`. Untracked entries
  have none. Each group header carries the group's totals.
* __Truncation__ (terminal mode only): the directory part elides from the middle. The file name,
  annotation and numbers never truncate.

Conflict codes and phrases, mirroring git's `wt_status_unmerged_status_string()`:

| Code | Phrase | Code | Phrase |
|---|---|---|---|
| `UU` | both modified | `AU` | added by us |
| `AA` | both added | `UA` | added by them |
| `DD` | both deleted | `DU` | deleted by us |
| | | `UD` | deleted by them |

#### Folding ladder

1. __Semantic — always.__ A directory whose entries within the group are all `A`, all `D`, or all
   `?`, numbering three or more, folds to one row at the highest directory that qualifies.
   Modified entries never fold at this rung: an added or deleted subtree is one event, while N
   modifications are N pieces of work.
2. __Terminal mode, when a group exceeds 25 rows.__ Fold directories holding three or more rows
   regardless of status; the annotation shows the mix, such as `M4 A2`. Choose the deepest
   directory first, then the one with most rows, then path order. Fold one at a time until the
   group fits or nothing more qualifies.
3. __Terminal mode, if still over 25 rows.__ Show the first 24 rows in path order, then
   `… n more` with its totals.

Untracked entries use git's default, which reports an untracked directory as a single `dir/` entry;
its contents are not counted. Counting them needs `-uall`, measured at 33.0 ms against 8.7 ms with
20,000 untracked files.

### Commit rail

Row grammar: `<marker> <hash>  <type> <scope>  <subject>  [<labels>]  <age>`

* __Hash__: seven columns. The shortest unique prefix (`--abbrev=4` with `%h`) is bright and the
  remainder dimmed.
* __Conventional commits__: type and scope columns are sized to the visible rows. Other subjects
  start at the subject column with blank type and scope. A breaking `!` renders red.
* __Merge commits__: dimmed, marker `◎`.
* __Age__: author time (`%at`), formatted in-process — `now` under a minute, then minutes, hours,
  days under 14 days, weeks under 8 weeks, months, years. Committer time is not used: a rebase
  resets it, so every replayed commit would read as just made.

#### Selection

The anchor is always a merge-base.

| Situation | Rows above the anchor | Anchor |
|---|---|---|
| On trunk, with upstream | `anchor..HEAD` — unpushed | merge-base(HEAD, upstream), labelled with the upstream |
| Feature branch or detached | `anchor..HEAD` | merge-base(HEAD, trunk), labelled `forked from <trunk>` |
| No trunk resolves | as above against the upstream; with no upstream either, the last 5 commits and no anchor | merge-base(HEAD, upstream), or none |
| Nothing above the anchor | none; 4 older context rows follow the anchor | HEAD |
| Rebase in progress | `┆ n remaining` (`end − msgnum`), then `onto..HEAD` | `onto`, labelled with its decorations |
| Merge in progress | as for the branch | as for the branch, plus a `◇` row for `MERGE_HEAD` labelled `merging <name>` |
| No commits | none | none |

* When the upstream tip is one of the rows, that row carries the upstream label, and rows above it
  are unpushed. When the branch has diverged from its upstream, no row carries the label, and
  unpushed rows are marked from `git rev-list <upstream>..HEAD`.
* __Cap__ (terminal mode only): 8 rows above the anchor. Beyond that, the newest 7 then `┆ n more`.
* __Incoming block__, only when behind the upstream: `⇣ n on <upstream> not here`, then up to 3 `◇`
  rows (all of them when piped).
* Trunk commits the branch lacks appear only as `↓n` in the header. Trunk movement is context, not
  work to review.

### Trunk resolution

One rule, local only, first match wins:

1. `refs/remotes/<remote>/HEAD`, where `<remote>` is the upstream's remote, otherwise `origin`
2. `<remote>/<init.defaultBranch>`, then the local `<init.defaultBranch>`
3. `origin/main`, `main`, `origin/master`, `master`
4. No match: trunk relation omitted

__Freshness.__ Step 1 is only as current as `refs/remotes/origin/HEAD`. Fetch's default
`remote.<name>.followRemoteHEAD=create` never updates an existing one (git 2.54.0 docs), so a
default-branch change on the remote goes unnoticed. Set `remote.origin.followRemoteHEAD` to
`always` in the global gitconfig; the background auto-fetch (`git-auto-fetch-maybe`, every
5 minutes) then keeps it current. That a global `remote.origin.*` key applies to the `origin`
remote of every repository is expected from config merging and is to be confirmed during
implementation.

__Ownership.__ `home/.local/bin/git-trunk` (callable as `git trunk`) implements the rule. The
dashboard runs it in wave 1. `__dotfiles_git_default_branch` in `git-shortcuts.fish`, which `gco`
uses, delegates to it and drops its `gh repo view` network call.

### Symbols and colour

Colour uses the ANSI palette. In Ghostty's `tokyonight` theme, ANSI 1, 2 and 5 are `#f7768e`,
`#9ece6a` and `#bb9af7` — the same hex values starship uses for behind, ahead and the branch
(verified in the theme file).

| Element | Treatment |
|---|---|
| Branch | Magenta, bold |
| `⇡n` · `⇣n` | Ahead of · behind the __upstream__ — green · red |
| `↑n` · `↓n` | Ahead of · behind __trunk__ |
| Status letters | `A` green · `M` yellow · `D` red · `R` `C` cyan · `T` magenta · conflict bold red · `?` dim |
| `●` green · `●` dim | Commit not on the upstream · already on it |
| `◆` | Anchor |
| `○` | Context commit below an anchor on HEAD |
| `◇` | Commit not reachable from HEAD (incoming, `MERGE_HEAD`) |
| `◎` | Merge commit |
| `┆` | Hidden rows (`n more`, `n remaining`) |
| `▲` | Operation in progress |
| Commit type | `feat` green · `fix` red · `refactor` blue · `docs` cyan · `perf` magenta · `test` yellow · `chore` `ci` `build` `style` dim |

__Deliberate inversion of existing muscle memory.__ The current dashboard draws `↑` and `↓` for the
remote. This design gives `⇡⇣` to the remote and `↑↓` to trunk, which is the vocabulary starship
(remote) and worktrunk's `wt list` (both) already use on the same screen.

### Links

In terminal mode, paths carry OSC 8 links to `file://` absolute paths. What opens is decided by
macOS default-app policy, which this repo already manages in `home/.config/duti.yml`
(`just macos-default-apps`): code and config extensions open in Zed. `$EDITOR` is nvim, a
terminal editor, so it cannot be a link target.

* `fish` is missing from `duti.yml`; this work adds it.
* Extensionless files (`justfile`, `Brewfile`) open in whatever macOS chooses.
* That Ghostty opens `file://` links through default-app policy is likely; to confirm during
  implementation.

## Architecture

### Runtime and location

* __TypeScript on Bun 1.4__, no runtime dependencies, strict typecheck (`@tsconfig/strictest`, as
  the archived `packages/linear` used).
* __Why Bun:__ 6.1 ms startup, and `Bun.stringWidth` measures display width across ANSI escapes
  and East Asian wide characters. Width-aware layout otherwise needs a dependency or hand-rolled
  width tables.
* __No build step.__ Ten small modules run as raw `.ts` in 10.8 ms against 9.9 ms pre-bundled
  (hyperfine) — under a millisecond, not worth a checked-in artefact.
* __Location:__ `home/.local/libexec/git-dashboard/`, deployed as a whole-directory symlink like
  `libexec/cmux/`. `home/.local/bin/git-dashboard` is a `#!/bin/sh` shim that runs
  `exec bun …/src/main.ts "$@"`. Being on PATH gives the tests a seam and provides
  `git dashboard` for free.
* __What is new here:__ the dotfiles already contain TypeScript packages with dev dependencies
  (the `bun.lock` workspace, the hunk extensions). What is new is TypeScript on the interactive
  shell's hot path — it runs every time `git` is typed bare.

### Modules

```
home/.local/libexec/git-dashboard/
  git-dashboard.md    durable design doc — design only, no audit or survey
  package.json        dev dependencies only
  tsconfig.json
  src/
    main.ts           read → model → render → print; builds the presentation from the TTY
    git.ts            the only module that spawns processes; runs the waves
    status.ts         porcelain v2 -z parser
    numstat.ts        numstat -z parser, joined to status entries by path
    history.ts        log -z parser and rail selection
    conventional.ts   conventional-commit subject parser
    operation.ts      operation detection from git-directory files
    fold.ts           folding ladder — pure
    age.ts            relative author time — pure, `now` injected
    render.ts         layout from (model, presentation)
    ansi.ts           styles and OSC 8
```

### Git invocations

Every reader must be free of side effects. Measured on git 2.54.0, each case starting from an
identical fresh repository with one stat-dirty tracked file:

| Reader | Rewrites the index |
|---|---|
| `git diff --numstat` | yes |
| `git --no-optional-locks diff --numstat` | __yes__ — the flag does not cover porcelain `diff` |
| `git status --porcelain=v2 -z --branch` | yes |
| `git --no-optional-locks status --porcelain=v2 -z --branch --show-stash` | no |
| `git diff-files --numstat -z` | no |
| `git diff-index --cached --numstat -z HEAD` | no |

The planned wave-1 set, run together, also left the index untouched.

__Wave 1__ — concurrent, no inputs:

* `git --no-optional-locks status --porcelain=v2 -z --branch --show-stash`
* `git diff-files --numstat -z`
* `git diff-index --cached --numstat -z -M HEAD` — fails without commits; treated as empty
* `git log -z --abbrev=4 --format=… -n <window> HEAD` — fails without commits; treated as empty
* `git rev-parse --git-dir`
* `git trunk`

__Wave 2__ — needs the upstream and trunk from wave 1; concurrent:

* `git merge-base HEAD <base>`
* `git rev-list --left-right --count HEAD...<trunk>` — not on trunk
* `git rev-list <upstream>..HEAD` — only when diverged from the upstream
* `git log -z -n 3 --format=… HEAD..<upstream>` — only when behind the upstream
* `git log -1 -z --format=… <onto | MERGE_HEAD>` — only during a rebase or merge

__Wave 3__ — only when the anchor lies beyond the wave-1 window: `git log -1 -z --format=… <anchor>`.

The window size is chosen by measurement; the cost of a larger `-n` is not yet measured.

### Parsing notes

Observed on git 2.54.0:

* __Status rename:__ `2 <XY> … R85 <target>␀<orig>␀` — target first.
* __Numstat rename__ (with `-M`): `<added>⇥<deleted>⇥␀<orig>␀<target>␀` — an empty path field,
  then orig first. The opposite order from status; join on the target.
* __Numstat binary:__ `-⇥-⇥<path>␀`.
* `diff-files` reports nothing for a stat-only change. Status decides which entries exist; numstat
  only supplies counts.
* Status can report copies (`C`), since `diff.renames=copies` here. Numstat runs `-M` only, so a
  copy's counts are its whole content as added.
* Numstat passes `-M` explicitly, so rename detection does not depend on configuration.

### Fish wiring — delta from HEAD

`modules/git.fish` already owns the only `git` function (`9c536857`). Changes:

* `git.fish`: bare `git` runs `git-dashboard` instead of `_git_dashboard`.
* Delete `modules/git-dashboard.fish` and `modules/git-dashboard.md`; the durable design doc moves
  beside the implementation.
* `just fish-check`: drop `_git_dashboard` from the functions it requires.
* `just git-guardrail-check`: replace the `_git_dashboard` fish-function stub with a PATH fake
  `git-dashboard` binary, following `scripts/tests/fake-codex.sh`. Keep the assertion that
  `functions --details git` resolves to `git.fish`.
* `.claude/rules/git-dashboard.md`: watch the new location.
* New `just git-dashboard-check` (typecheck, tests, `git trunk` tests), added to `git-dx-check`.
* `__dotfiles_git_default_branch` delegates to `git trunk`.
* Global gitconfig: `remote.origin.followRemoteHEAD = always`.
* `duti.yml`: add `fish`.

### Provisioning

* __Today bun is provisioned nowhere.__ It is absent from `scripts/data/Brewfile` and
  `scripts/data/npm/global-packages.txt`; the running copy is an unmanaged npm global (1.4.0).
  Meanwhile `config.fish` already exports `BUN_INSTALL=$HOME/.bun` and puts `$BUN_INSTALL/bin` on
  PATH — the official installer's location, where nothing is installed.
* __Install bun the way bun documents it__ (`docs/installation.mdx` on bun's main branch, last
  changed 2026-08-21): the official script, `curl -fsSL https://bun.com/install | bash`, upgraded
  with `bun upgrade`. The docs offer Homebrew only through the `oven-sh/bun/bun` tap, not
  homebrew/core. This follows the pnpm precedent in `a36b5273`.
* __Keep the installer out of the repo.__ When `SHELL` is fish, the installer appends `BUN_INSTALL`
  and `PATH` lines to `~/.config/fish/config.fish`, which is a symlink into this public repo. For
  any shell other than fish, zsh or bash it only prints instructions, so run it with
  `SHELL=/bin/sh`, as `04-node-toolchain.sh` does for pnpm. `config.fish` already owns the PATH entry.
* __Bootstrap order.__ The README runs `bun install` before `just up`, so bun must exist before
  anything `just up` could install. Make the install command the first step of New Machine Setup,
  and add bun's update path to the table in `docs/node-setup.md`.
* __Remove the npm-global copy__ (`npm uninstall -g bun`) so one bun is on PATH, and record the
  decision in `DECISIONS.md`.
* __No fallback when bun is missing.__ A missing prerequisite should fail loudly rather than degrade
  to a different view that hides a broken install.
* __Found while checking:__ the README links `docs/manual-setup.md`, which was deleted in
  `ab448c5c`. Restore or unlink it while editing the README.

## Verification

### Tests

* __Parsers:__
  * Status fixtures for every entry type: ordinary, rename, copy, all seven conflict codes,
    untracked, submodule flags, intent-to-add, type change, and paths with spaces, newlines and
    non-ASCII characters.
  * Numstat fixtures: plain, rename, binary.
  * Log fixtures: conventional with and without scope, breaking, merge, non-conventional.
* __Pure units:__
  * Folding ladder: rung order, rows within the cap in terminal mode, counts and totals
    conserved.
  * Age boundaries with an injected `now`.
  * The trunk rule.
* __Scenario snapshots:__ scripted temporary repositories, rendered with
  `{ width: 80, colour: off, links: off }` and with the piped presentation. Cases:
  * clean and synced
  * dirty
  * unpushed beyond the cap
  * behind the upstream
  * diverged from the upstream
  * feature branch with trunk moved
  * no upstream
  * upstream deleted
  * detached HEAD
  * no commits
  * merge stopped on a conflict
  * rebase stopped on a conflict
  * cherry-pick
  * bisect
  * a deleted subtree
  * 30 or more modified files across directories
* __Purity:__ the index mtime is unchanged after a full dashboard run on a stat-dirty repository.
* __Wiring:__ the justfile checks listed under Fish wiring.

### Performance target

* The binary alone, warm, in this repository: `hyperfine -N git-dashboard` mean under 50 ms.
* Also report `fish -c git` minus `fish -c true`, before (about 175 ms today) and after.

## Non-goals

* PR or CI status — a network call defeats the glance.
* JSON output — no consumer.
* Numbered-file shortcuts and any interactive mode.
* Fitting output to terminal height.

## Tech debt accepted

* Bun on the interactive `git` hot path.
* Link targets depend on `duti.yml` coverage.
* `git trunk` adds a process to wave 1.
* `remote.origin.followRemoteHEAD = always` is global: every fetch silently moves `origin/HEAD`
  when a remote's default branch changes. That is the intent, but it applies to every repository.

## Departures from the review

* __Piped output keeps rung-1 folding.__ The review asked for no folding when piped. Rung 1 is
  semantic — a deleted subtree is one event — so piped output stays equal to the terminal view
  minus presentation. `git status` remains the complete file list.
* __Groups have a fixed cap in terminal mode__ (25 rows). The review suggested groups never
  truncate. A fixed cap is still deterministic and bounds pathological changes, such as a codemod
  across hundreds of files.
* __No build step.__ Measured instead: under 1 ms.
* __No fallback when bun is missing.__ Provisioning plus loud failure instead of a degraded mode.
* __Rebase progress reads `msgnum` and `end`__, as `git-prompt.sh` does, rather than counting lines
  in `done` and `git-rebase-todo`.
* __Trunk gets one owner.__ Rather than documenting that `gco` and the dashboard disagree, both use
  `git trunk`, and `gco` loses its network call.

## Implementation order

1. `git trunk` with tests; the `followRemoteHEAD` config.
2. Parsers and pure units, test-first: status, numstat, log, conventional, operation, fold, age.
3. `git.ts` waves, rendering, scenario snapshots, purity test.
4. Measure; choose the log window.
5. Provisioning: official bun installer, npm-global removal, README, `docs/node-setup.md`,
   `DECISIONS.md`.
6. Wiring delta, justfile checks, rules file, `duti.yml`, `gco` delegation.
7. Durable design doc; `nesia add`.

---

## Appendix A — Audit of the current implementation

As of `09870d90`, except where noted.

1. __Guardrails were shadowed — fixed in `9c536857`.__ The dashboard module's `git` function
   replaced the guardrail wrapper, because modules load alphabetically and the last definition
   wins. Reproduced on 2026-09-11: `git checkout other` switched branches instead of being blocked.
2. __Conflicts are invisible.__ `_git_file_status` handles no `U` status, and nothing detects an
   operation in progress. Reproduced: mid-merge, `git status --short` reported `UU conflict.txt`
   and the dashboard printed only commits. The untracked label `U` also collides with git's
   conflict code.
3. __Unpushed commits are hidden.__ In `_git_railway`'s trunk mode the header shows only "behind",
   and the remote marker sits at index `ahead + 1`, inside the middle crop. At capture on
   2026-09-11, porcelain v2 reported `branch.ab +43 -0`: the marker fell on commit 44, and the crop
   hid commits 6 to 45. This is checkable from the code alone: the crop keeps indexes 1–5 and
   46–50 of the last 50 commits, so the marker is hidden whenever 5 ≤ ahead ≤ 44. The
   `example.txt` rendering of that state was never committed; the "unpushed beyond the cap"
   scenario pins the state as a fixture instead.
4. __Missing state:__ stashes, type changes, intent-to-add entries.
5. __Fixed width:__ subjects are cut at 25 characters whatever the terminal width, and
   non-conventional commits do not align with conventional ones.
6. __Dead code:__ `_git_is_dirty` (also broken — `"(…)"` does not substitute inside double quotes
   in fish, so it always reports dirty) and `_git_branch_info`.
7. __Cost:__ about 175 ms over shell startup, across about nine git spawns.

## Appendix B — OSS survey

Checked 2026-09-11 against each project's repository, releases and the Homebrew API. Nothing prints
files, upstream sync, trunk relation and relevant commits together on a plain git repository and
exits.

| Tool | Why not |
|---|---|
| [GitButler `but status`](https://docs.gitbutler.com/commands/but-status) | Closest layout, but takes over the repository: a workspace merge commit, hooks that block `git commit`, the staging area repurposed |
| [jj](https://docs.jj-vcs.dev/latest/git-compatibility/) `jj st`, `jj log` | Best-designed output, but no staging area, so a Staged group cannot exist |
| [git-branchless `git sl`](https://github.com/arxanas/git-branchless/wiki/Command:-git-smartlog) | Best commit view on plain git; labelled alpha, installs 7 hooks, shows no files or upstream |
| [worktrunk `wt list`](https://worktrunk.dev/list/) | Already installed; covers only what would be the header |
| git-machete, git-spice, Graphite | Show only branches they have been told to track |
| git-graph, scmpuff, git-status-tree, onefetch | Single-purpose: graph, numbered status, file tree, repository stats |
| lazygit, gitui, gitu, tig, serie, keifu, gh-dash, hunk | Interactive TUIs — a different job |

Ideas adopted:

* Only relevant commits (git sl, jj)
* Shortest unique hash prefix (jj)
* `↑↓` for trunk and `⇡⇣` for remote (worktrunk)
* Working changes on top, fork point at the bottom (GitButler)

## Appendix C — Measurements

All with hyperfine, on this machine.

| Measurement | Mean |
|---|---|
| `fish -c true` | 138.2 ms ± 31.1 |
| `fish -c git` (current dashboard) | 312.8 ms ± 81.9 |
| `bun -e 0` | 6.1 ms ± 0.6 |
| `git --no-optional-locks status --porcelain=v2 --branch --show-stash -z` (this repository) | 16.6 ms ± 1.7 |
| `git log -8 --format=%H` (this repository) | 11.6 ms ± 1.1 |
| Ten small `.ts` modules, raw | 10.8 ms ± 0.5 |
| The same, pre-bundled `.js` | 9.9 ms ± 0.5 |
| `git status --porcelain=v2 -z --branch`, 3,000 untracked files | 9.1 ms ± 0.7 |
| same with `-uall` | 11.8 ms ± 0.3 |
| `git status --porcelain=v2 -z --branch`, 20,000 untracked files | 8.7 ms ± 0.6 |
| same with `-uall` | 33.0 ms ± 1.6 |
