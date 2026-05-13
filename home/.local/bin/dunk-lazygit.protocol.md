## Custom extensions on top of upstream (READ THIS BEFORE ACTING ON UPSTREAM RULES)

This skill is **wrapped**. The upstream `dunk-review` rules below have
been **modified** by these extensions — specifically how comment bodies
are parsed, how anchors are interpreted, and how drift state should be
read. Treat this section as authoritative wherever it conflicts with the
upstream rules below.

### Body prefix

Every comment body in this project starts with a structured prefix:

```
[on=<scope>; in=<context>] <free text>
```

Parse the prefix BEFORE reading the rest of the entry. The prefix
determines how to interpret `file`, `line`, `range`, `anchor`, and
upstream's drift state.

### Scope values (`on=`)

| value | meaning |
|---|---|
| `line` | specific line(s) in a file |
| `file` | all changes in this file |
| `dir` | all changes under this directory tree |
| `commit` | the whole commit (with sentinel `file="@commit:<sha>"`) |

### Context values (`in=`)

| value | meaning |
|---|---|
| `dirty` | working tree (unstaged modifications) |
| `staged` | the index (staged modifications, vs HEAD) |
| `commit:<40-hex-sha>` | the diff of this specific commit vs its parent |

### Anchor rule

**Real anchor IFF `on=line` AND `in=dirty`. Sentinel `0000000000000000`
for everything else.**

Upstream's drift check ALWAYS reads the working tree to recompute the
anchor. An anchor only carries meaningful drift information when the
original line content came from the working tree too. For `on=line;
in=staged` or `on=line; in=commit:<sha>`, the line numbers refer to
index or commit content (not the working tree), so a working-tree-based
anchor would silently lie. Those entries are sentinel-anchored.

### Field conventions

| field | convention |
|---|---|
| `file = "<path>"` | real repo-relative path; used for `on=line`, `on=file`, `on=dir` |
| `file = "@commit:<sha>"` | sentinel; used only for `on=commit` |
| `anchor = "<16-hex-sha>"` | real anchor; only present when `on=line` AND `in=dirty` |
| `anchor = "0000000000000000"` | sentinel; ignore drift state when this appears |
| `line`, `range` | real values when `on=line`; placeholder `[1,1]` for every other scope |

### Drift state interpretation

Upstream's drift state (`anchored` or `drifted: ...`) is ONLY meaningful
when the anchor is real (`on=line` AND `in=dirty`). When the anchor is
sentinel, ignore drift state — the entry is intentionally non-anchored
by design, not "broken."

### Resolution

Identical to upstream: `dunk comments resolve <id>`. The extension
markers don't change the resolution mechanism — only how to read entries.

### Re-install / refresh

Regenerate this skill any time `dunk` or the extension definition changes:

```
dunk-lazygit skill path > <your-skills-dir>/dunk-review.md
```

---
