# Git Dashboard Preview — Design Handoff

__Status:__ Preview v1 rejected, 2026-09-14. Ready for a design session to iterate on.

## Return to this work

Work from the dotfiles repository at its real path. Claude Code files sessions by directory, and
`~/dotfiles` is only a symlink to it.

```sh
cd ~/projects/jasonkuhrt/dotfiles
claude --resume 02b749fc-9336-4bbf-86e9-25580e6ca6de
```

That session produced the spec, this preview and the critique below.

## What this is

`preview.ts` renders fixed scenarios of the proposed bare-`git` dashboard (typed as `gst`) using
the layout, colour and symbols from the spec. It is a mockup, not the tool.

* __Spec:__ `docs/superpowers/specs/2026-09-13-git-dashboard-rewrite-design.md` (revision 2)
* __Run:__ `bun sandbox/git-dashboard-preview/preview.ts` in a Ghostty pane. Width follows the
  pane; colour and clickable paths need a real terminal.
* __Screenshot of v1:__ `~/Pictures/Screenshots/claude/2026-09-14-git-dashboard-preview-v1.png`,
  taken at roughly 200 columns.

Scenarios in the preview: this repo's dirty state from 2026-09-11 and a clean `main`, both with
real commits; then an illustrative diverged feature branch, a rebase stopped on a conflict, every
header state, and a legend.

## Goal

Typing `gst` should give an instant, motivating read of where you are and what needs doing. v1 was
"way too much work to visually parse" and fails four criteria: __density__, __symmetry__,
__scannability__ and __beauty__.

## Environment

* Ghostty (inside cmux), `tokyonight` theme, Monaspace Neon, truecolor.
* The ANSI palette maps to Tokyo Night: 1 red `#f7768e`, 2 green `#9ece6a`, 3 yellow `#e0af68`,
  4 blue `#7aa2f7`, 5 magenta `#bb9af7`, 6 cyan `#7dcfff`, 8 bright black `#414868`.
* On the same screen: the starship prompt shows the branch in magenta and `⇡n` / `⇣n` against the
  upstream in green / red. worktrunk's `wt list` uses `↑↓` for trunk and `⇡⇣` for the remote.
* Widths range from about 80 columns in a split pane to 200+ full screen.

## Critique of v1

### Density

* __Right-hand columns are pinned to the window edge.__ At 200 columns the ages and `+/−` numbers
  sit over 100 columns from the text they belong to, so pairing a subject with its age means
  scanning across empty space.
* __Things are said twice.__
  * `origin/main` in the header and again on the anchor row.
  * `feat/login` in the rebase banner and again as the header.
  * `Staged 1 +2 −2` above a single row showing the same numbers.
* __Structure outweighs content.__ In the rebase example, 8 of 12 lines are banner, header, group
  title or blank.
* __Directory prefixes repeat.__ `home/.claude/` appears six times in the first scenario's file
  list.

### Symmetry

* __The middle is dead.__ Text forms a ragged block on the left and a thin column on the right,
  with nothing between. The composition does not respond to the width.
* __Columns leave holes.__ Type and scope are padded to the widest value, so short rows get a gap
  before the subject.

### Scannability

* __Too many symbols for one question — "is this pushed?"__
  * Green `●` versus grey `●` is nearly indistinguishable at this size.
  * `◆ ○ ◇ ┆ ▲ ◎` need a legend, and needing a legend is the giveaway.
* __The two-tone hash__ (bold unique prefix, dim remainder) flickers down the whole column and
  competes with the subject, which is what you actually read.
* __Type and scope columns__ put 15–20 columns of low-value words before the subject, and colouring
  each commit type is a rainbow the eye tries to decode.

### Beauty

* __Nothing leads.__ Bold goes on branch names, group names, hash prefixes and the banner all at
  once.
* __Red means five things:__ `fix` commits, deletions, `⇣`, `gone` and conflicts. The one colour
  that should mean "act on this" has lost its signal.

## Starting hypotheses

Suggestions to test, not decisions:

* Columns hug their content, or the output caps its width, instead of aligning to the window edge.
* A single `── origin/main` divider between unpushed and pushed commits replaces per-row markers.
  Position carries the meaning, with no symbol to learn.
* Files group under their directory instead of repeating the prefix on every row.
* Red is reserved for things that need action: conflicts, a deleted upstream, an operation stopped
  mid-way.
* Wide terminals use the width, for example changes beside commits, rather than leaving a dead
  middle.

## Settled by the spec

The design session decides how things look and what is worth showing. These are not visual and do
not need re-deciding:

* __Information available__ to present:
  * branch, upstream, and ahead/behind against both upstream and trunk
  * stash count
  * an operation in progress, with its step, conflict count and continue/abort commands
  * changes grouped as conflicts, staged, unstaged and untracked, each with status and
    per-file `+/−`
  * commits since the fork point or not yet pushed, anchored at the merge-base
  * commits on the upstream you don't have
  * author-time ages
  * conventional-commit type and scope
* __Deterministic__ output: it may depend on terminal width, never terminal height.
* __Piped__ output has no colour, links or truncation.
* __Fast and local:__ under 50 ms, no network, never writes to the repository.

## Scenarios the design must hold up in

* clean and in sync
* dirty, including a deleted subtree and 30 or more modified files across directories
* unpushed commits beyond any cap
* behind the upstream
* diverged from the upstream
* feature branch after trunk moved
* no upstream
* upstream deleted
* detached HEAD
* no commits yet
* merge stopped on a conflict
* rebase stopped on a conflict
* cherry-pick
* bisect

## After the design lands

Update the spec's visual sections to match: Layout and its examples, Header, Change groups, Commit
rail, Symbols and colour, and Links.
