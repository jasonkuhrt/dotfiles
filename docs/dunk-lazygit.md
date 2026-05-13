# dunk-lazygit

Author [`dunk`](https://github.com/dunkdiff/dunk) review comments from any lazygit panel — at line, file, directory, or commit scope.

## Grounding

[`dunk`](https://github.com/dunkdiff/dunk) is a terminal diff viewer for human-and-agent code review. The human leaves comments in dunk's TUI; an agent reads `.dunk/comments.json` and fixes the underlying issues. Dunk's schema natively models only **line-anchored** comments: every entry must point at a specific line in a specific file.

dunk-lazygit extends two surfaces dunk doesn't address. First, the authoring surface: a single keybind (`;`) in [`lazygit`](https://github.com/jesseduffield/lazygit) leaves a dunk comment from whichever lazygit panel you're already in — no context switch to a second TUI. Second, the comment schema: the same keybind in different panels emits comments at different scopes — a whole file, a whole directory, a whole commit — by encoding the scope in the comment body using a markup that the resolver agent learns from a wrapped version of dunk's own skill.

## Problem

Dunk's native authoring is its own TUI. You leave `lazygit` (where you already navigate diffs, hunks, commits, and patches) to run `dunk diff`, then navigate the same diff a second time to leave a comment. Two separate terminals are now state-coupled to your review intent.

Dunk's schema is also strictly line-anchored. You cannot say "this whole file is wrong," "this directory shouldn't have been touched," or "this commit shouldn't have shipped." You can only point at a line, even when the line is incidental.

## Solution

dunk-lazygit binds `;` in every lazygit panel that has selection state. The same key fires a different custom command per panel context — `staging`, `stagingSecondary`, `patchBuilding`, `files`, `commitFiles`, `commits`/`subCommits`/`reflogCommits`. Each command shells out to a single `dunk-lazygit` script that writes a comment entry to `.dunk/comments.json` using dunk's existing schema.

Scope and context that dunk can't natively express are encoded in the comment **body** with a `[on=<scope>; in=<context>]` prefix. Scope values are `line | file | dir | commit`. Context values are `dirty | staged | commit:<sha>`. Dunk treats the body as opaque text; the resolver agent reads the prefix.

For the agent to interpret the new markers, dunk-lazygit wraps the upstream `dunk-review` skill at install time. Running `dunk-lazygit skill path` calls `dunk skill path`, augments the upstream skill's H1 with ` (extended with lazygit support)`, and injects an extensions blob directly under the title. Everything else in upstream's skill is passed through verbatim. The agent now has one combined skill teaching both dunk's native CLI workflow and how to parse the dunk-lazygit extension markers.

## Quickstart

### Prerequisites

- [`dunk`](https://github.com/dunkdiff/dunk) (the diff TUI being extended)
- [`lazygit`](https://github.com/jesseduffield/lazygit)
- [`bun`](https://bun.sh) — dunk-lazygit is a single bun script

### Install the script

Place `dunk-lazygit` and `dunk-lazygit.protocol.md` together in a directory on your `$PATH`. The script resolves the protocol blob via `dirname(import.meta.path)`, so they must stay siblings.

```sh
chmod +x ~/.local/bin/dunk-lazygit
which dunk-lazygit    # verify resolution
```

### Wire lazygit

Add six custom commands to your lazygit config (typically at `~/.config/lazygit/config.yml`). Each command targets one [`panel context`](#panel-context) and passes the appropriate args. The minimal entry — line comments in the working-tree staging view — looks like this:

```yaml
customCommands:
  - key: ';'
    context: 'staging'
    description: 'Add Dunk line comment (dirty)'
    prompts:
      - { type: 'input', title: 'Dunk line comment', key: 'Body' }
    command: >
      dunk-lazygit
      --mode line
      --file {{.SelectedPatch.FileName | quote}}
      --line {{.SelectedPatch.CurrentLineNumber}}
      --range "{{.SelectedPatch.SelectedStartLineNumber}}:{{.SelectedPatch.SelectedEndLineNumber}}"
      --body {{.Form.Body | quote}}
    output: log
```

The full six-binding config is in the [Usage](#usage) section. Note that `staging`'s use of `SelectedPatch.*` template variables requires a [`SelectedPatch` template extension](#patch-selection-template-extension) that is not in upstream lazygit at time of writing.

### Wire the agent

Install the wrapped skill into wherever your agent loads skills. For Claude Code:

```sh
dunk-lazygit skill path > ~/.claude/skills/dunk-review/SKILL.md
```

Re-run after `dunk` updates or after editing the extensions blob.

### First use

Open lazygit in a repo with uncommitted changes. Press `2` to focus Files, select a modified file, `Enter` to enter the staging view, navigate to a line, press `;`. Type a comment body and submit. From a terminal:

```sh
dunk comments list
```

The new comment appears with body prefix `[on=line; in=dirty]`. Your agent can now process it.

## Concepts

### Scope

The four values of `on=` in the comment body marker. Each names what the comment is *about*:

| `on=` | What the comment addresses |
|---|---|
| `line` | Specific line(s) in a file |
| `file` | Every change in a file |
| `dir` | Every change under a directory tree |
| `commit` | Everything a commit changes |

[`scope`](#scope) is determined by which lazygit panel `;` was pressed in, and (for `files`/`commitFiles`) auto-detected by whether the cursor is on a file leaf or a directory node via `stat` or `git ls-tree`.

### Context

The three values of `in=` in the comment body marker. Each names which diff the comment *lives in*:

| `in=` | The diff this comment is about |
|---|---|
| `dirty` | Working tree (unstaged changes) |
| `staged` | The index (staged changes, vs `HEAD`) |
| `commit:<40-hex-sha>` | A specific commit, vs its parent |

[`context`](#context) is determined by panel: `staging` → `dirty`, `stagingSecondary` → `staged`, `patchBuilding`/`commitFiles`/commits panels → `commit:<sha>`. The SHA is read from lazygit's `SelectedCommit.Hash` template variable.

### Body marker

Every comment written by dunk-lazygit has a body that begins with:

```
[on=<scope>; in=<context>] <free text>
```

The marker is the only schema extension to dunk's comment shape. Everything else dunk validates passes through unchanged: `file`, `line`, `range`, `anchor` all remain valid per dunk's schema. The resolver agent reads the [`body marker`](#body-marker) before reading the rest of the entry; the marker determines how to interpret the other fields.

### Anchor rule

Dunk's [`anchor`](#anchor) is a 16-hex SHA-256 prefix over the three-line window `(line_above, target_line, line_below)` of the **working tree** file. Dunk's drift check ALWAYS recomputes the anchor against the working tree at read time. An anchor only carries meaningful drift information when the original content also came from the working tree.

**Real anchor IFF `on=line` AND `in=dirty`. [`Sentinel anchor`](#sentinel-anchor) `0000000000000000` for every other combination.**

Why not always compute a real anchor? For `on=line; in=staged` or `on=line; in=commit:<sha>`, the cursor's line number refers to the *index* or *commit* content, not the working tree. A working-tree-based anchor would silently match against unrelated content. The sentinel makes the non-anchored intent explicit; the wrapped skill tells agents to ignore drift state when the anchor is sentinel.

### Panel context

lazygit's notion of "which panel has focus." Each lazygit panel has a context key (`files`, `commitFiles`, `staging`, etc.). Custom commands declare which contexts they apply to. dunk-lazygit binds `;` in six contexts and passes panel-specific template variables (`SelectedPath`, `SelectedPatch.*`, `SelectedCommit.Hash`) into the script, which dispatches to `--mode line | file | commit` and optionally `--commit <sha>` / `--staged`.

### Wrapped skill

The agent-facing protocol document. `dunk-lazygit skill path` produces it by:

1. Calling `dunk skill path` to find the upstream skill file.
2. Reading the upstream file verbatim.
3. Finding the H1 line via regex `^# (.+)$`.
4. Augmenting it with ` (extended with lazygit support)`.
5. Injecting the extensions blob from `dunk-lazygit.protocol.md` directly under the augmented title.
6. Streaming the result to stdout.

Two surgical cuts (find H1, insert below); everything else in upstream is treated as opaque. If upstream changes its workflow or CLI surface, the [`wrapped skill`](#wrapped-skill) passes the changes through automatically — only the H1 line and the inserted blob are owned by dunk-lazygit.

Re-run `dunk-lazygit skill path > <skills-dir>/dunk-review.md` after `dunk` updates or after editing `dunk-lazygit.protocol.md`.

### Patch selection template extension

Some dunk-lazygit bindings reference `{{.SelectedPatch.FileName}}`, `{{.SelectedPatch.CurrentLineNumber}}`, `{{.SelectedPatch.SelectedStartLineNumber}}`, and `{{.SelectedPatch.SelectedEndLineNumber}}`. These template variables expose the patch explorer's cursor and line-select state to lazygit custom commands. They are **not in upstream lazygit** at time of writing — a small fork patch is required (`pkg/gui/services/custom_commands/session_state_loader.go` exposes a `SelectedPatch` struct populated for the `staging`, `stagingSecondary`, and `patchBuilding` contexts).

Without the patch, the four `file`/`dir` bindings (which use only `SelectedPath` and `SelectedCommit.Hash`) and the `commit` binding still work. Only the three line-mode bindings depend on `SelectedPatch`.

## Usage

The six panel bindings, by which scope × context each produces. Add all six to `customCommands:` in your lazygit config.

### Line, in working tree

```yaml
- key: ';'
  context: 'staging'
  description: 'Add Dunk line comment (dirty)'
  prompts:
    - { type: 'input', title: 'Dunk line comment (dirty)', key: 'Body' }
  command: >
    dunk-lazygit
    --mode line
    --file {{.SelectedPatch.FileName | quote}}
    --line {{.SelectedPatch.CurrentLineNumber}}
    --range "{{.SelectedPatch.SelectedStartLineNumber}}:{{.SelectedPatch.SelectedEndLineNumber}}"
    --body {{.Form.Body | quote}}
  output: log
```

### Line, in staged index

```yaml
- key: ';'
  context: 'stagingSecondary'
  description: 'Add Dunk line comment (staged)'
  prompts:
    - { type: 'input', title: 'Dunk line comment (staged)', key: 'Body' }
  command: >
    dunk-lazygit
    --mode line
    --file {{.SelectedPatch.FileName | quote}}
    --line {{.SelectedPatch.CurrentLineNumber}}
    --range "{{.SelectedPatch.SelectedStartLineNumber}}:{{.SelectedPatch.SelectedEndLineNumber}}"
    --staged
    --body {{.Form.Body | quote}}
  output: log
```

### Line, in a commit

```yaml
- key: ';'
  context: 'patchBuilding'
  description: 'Add Dunk line comment (in commit)'
  prompts:
    - { type: 'input', title: 'Dunk line comment (in commit)', key: 'Body' }
  command: >
    dunk-lazygit
    --mode line
    --file {{.SelectedPatch.FileName | quote}}
    --line {{.SelectedPatch.CurrentLineNumber}}
    --range "{{.SelectedPatch.SelectedStartLineNumber}}:{{.SelectedPatch.SelectedEndLineNumber}}"
    --commit {{.SelectedCommit.Hash | quote}}
    --body {{.Form.Body | quote}}
  output: log
```

### File or directory, in working tree

```yaml
- key: ';'
  context: 'files'
  description: 'Add Dunk file/dir comment (dirty)'
  prompts:
    - { type: 'input', title: 'Dunk file/dir comment (dirty)', key: 'Body' }
  command: >
    dunk-lazygit
    --mode file
    --file {{.SelectedPath | quote}}
    --body {{.Form.Body | quote}}
  output: log
```

Whether the comment lands as `on=file` or `on=dir` is decided by `dunk-lazygit` at runtime: `stat`-ing the path in the working tree.

### File or directory, in a commit

```yaml
- key: ';'
  context: 'commitFiles'
  description: 'Add Dunk file/dir comment (in commit)'
  prompts:
    - { type: 'input', title: 'Dunk file/dir comment (in commit)', key: 'Body' }
  command: >
    dunk-lazygit
    --mode file
    --file {{.SelectedPath | quote}}
    --commit {{.SelectedCommit.Hash | quote}}
    --body {{.Form.Body | quote}}
  output: log
```

Detection via `git ls-tree <sha> -- <path>`: `tree` → `on=dir`, anything else → `on=file`.

### Whole commit

```yaml
- key: ';'
  context: 'commits, subCommits, reflogCommits'
  description: 'Add Dunk commit-level comment'
  prompts:
    - { type: 'input', title: 'Dunk commit-level comment', key: 'Body' }
  command: >
    dunk-lazygit
    --mode commit
    --commit {{.SelectedCommit.Hash | quote}}
    --body {{.Form.Body | quote}}
  output: log
```

Encodes `file: "@commit:<sha>"` as a sentinel; dunk will report `drifted: missing-file` (the sentinel path has no working-tree counterpart), but the body marker (`[on=commit; in=commit:<sha>]`) tells the agent that drift state is irrelevant for this entry.

## Command Reference

The `dunk-lazygit` script. See `dunk-lazygit --help` for the authoritative listing.

### `--mode line`

Line-anchored comment.

| Flag | Required | Notes |
|---|---|---|
| `--file <path>` | yes | repo-relative |
| `--line <n>` | yes | cursor line (positive integer) |
| `--range <s:e>` | yes | inclusive selection range |
| `--commit <sha>` | no | sets `in=commit:<sha>`; mutually exclusive with `--staged` |
| `--staged` | no | sets `in=staged`; mutually exclusive with `--commit` |
| `--body <text>` | yes (or `--body-stdin`) | comment body, prefix added by the script |

Real anchor only when neither `--commit` nor `--staged` is set. Otherwise sentinel.

### `--mode file`

File-level or directory-level comment, scope auto-detected.

| Flag | Required | Notes |
|---|---|---|
| `--file <path>` | yes | repo-relative; can be a file or directory |
| `--commit <sha>` | no | sets `in=commit:<sha>`; detection via `git ls-tree` |
| `--staged` | no | sets `in=staged` |
| `--body <text>` | yes (or `--body-stdin`) | |

### `--mode commit`

Whole-commit comment.

| Flag | Required | Notes |
|---|---|---|
| `--commit <sha>` | yes | 7- to 40-character hex SHA |
| `--body <text>` | yes (or `--body-stdin`) | |

### `skill path`

Print the wrapped agent skill (upstream `dunk-review` + dunk-lazygit extensions) to stdout. Pipe into your agent's skill loader:

```sh
dunk-lazygit skill path > ~/.claude/skills/dunk-review/SKILL.md
```

No arguments. Reads upstream via `dunk skill path`, transforms in memory, streams to stdout.

## Known Limitations

### Stash → commitFiles drill-in

lazygit's `session_state_loader.go` (the source that populates `{{.SelectedCommit.Hash}}` for custom commands) resolves `SelectedCommit` via a 3-way switch on `IsCurrentOrParent(LocalCommits | SubCommits | ReflogCommits)`. When `commitFiles` is drilled into from the Stash panel, none of the three branches match, and `SelectedCommit` silently falls through to whatever was last cursored in the main Commits panel — an unrelated SHA.

**Avoid pressing `;` inside a `commitFiles` view drilled in from Stash.** Every other drill-in source resolves correctly. The limitation is reachable but obscure; most workflows don't touch it.

### Line + commit anchor noise

For `[on=line; in=commit:<sha>]`, the line numbers refer to the commit's content, but dunk's drift check always reads the working tree. The anchor is sentinel-valued precisely so dunk doesn't lie about drift state — but consumers should know that `drifted: ...` reports for these entries carry no signal. The body marker is the source of truth.

## Glossary

#### Anchor

A 16-hex SHA-256 prefix over the three-line window around a target line. Dunk uses it to detect content drift. Real-valued only when `on=line` AND `in=dirty`; sentinel otherwise. See [Anchor rule](#anchor-rule).

#### Body marker

The `[on=<scope>; in=<context>]` prefix at the start of every comment body written by dunk-lazygit. Encodes scope and context outside dunk's native schema fields.

#### Context

Which diff the comment lives in. `dirty`, `staged`, or `commit:<sha>`. See [Context](#context).

#### Dirty

Context value for the working tree (unstaged changes).

#### Dunk comment

A single entry in `.dunk/comments.json` — the unit of communication between human reviewer and resolver agent.

#### Panel context

lazygit's notion of which panel has focus. Custom commands declare which contexts they bind to. See [Panel context](#panel-context).

#### Scope

What a comment is about. `line`, `file`, `dir`, or `commit`. See [Scope](#scope).

#### Sentinel anchor

The string `"0000000000000000"`. Used as the `anchor` field value when the comment is not line-anchored against the working tree. The wrapped skill tells agents to ignore drift state for entries with this anchor.

#### Staged

Context value for the index — staged-but-not-yet-committed changes.

#### Wrapped skill

The combined agent-facing skill produced by `dunk-lazygit skill path`: upstream `dunk-review` verbatim plus dunk-lazygit extensions injected under the H1. See [Wrapped skill](#wrapped-skill).
