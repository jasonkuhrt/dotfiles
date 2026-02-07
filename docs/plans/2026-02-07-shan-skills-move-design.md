# Shan Skills Move — Scope & Commitment Migration

## Overview

Add `shan skills move <axis> <direction> <targets>` for migrating skills between scopes (user/project) and between commitments (core/pluggable). Also introduces:

* __Project-level library__ (`.claude/skills-library/`)
* __Materialized current state__ in `state.json` (eagerly updated install index)
* __Atomic batch execution__ across all commands (`on`, `off`, `move`)

---

## 1. CLI Surface

```
shan skills move <axis> <direction> <targets>
```

| Argument    | Values                  | Description                             |
| ----------- | ----------------------- | --------------------------------------- |
| `axis`      | `scope` \| `commitment` | What property changes                   |
| `direction` | `up` \| `down`          | Which direction                         |
| `targets`   | comma/space-separated   | Colon-syntax names, supports namespaces |

### Direction Table

| Command                | Meaning                               |
| ---------------------- | ------------------------------------- |
| `move scope up`        | project → user                        |
| `move scope down`      | user → project                        |
| `move commitment up`   | pluggable → core (eject from library) |
| `move commitment down` | core → pluggable (adopt into library) |

### Constraint

Scope and commitment cannot change in one invocation. Two separate commands required.

### Examples

```bash
shan skills move scope up playwright              # project → user
shan skills move scope down ts:tooling            # user → project
shan skills move commitment up playwright         # pluggable → core
shan skills move commitment down my-tool          # core → pluggable
shan skills move scope up linear,playwright       # batch
shan skills move commitment down a,b              # batch
```

---

## 2. Project-Level Library

The library (`skills-library/`) can exist at two scopes:

| Scope   | Path                        | Description                                |
| ------- | --------------------------- | ------------------------------------------ |
| user    | `~/.claude/skills-library/` | Global library, shared across all projects |
| project | `.claude/skills-library/`   | Project-local library, committed to repo   |

A pluggable skill has two independent properties:

* __Which library it lives in__ (its scope — user or project)
* __Where it's installed__ (which outfits have symlinks to it — zero or more)

These are decoupled. A skill in the user library can be installed in many project outfits. A skill can exist in the library without being installed anywhere.

`move scope` on a pluggable skill moves the directory between libraries. Installs (symlinks pointing to it) are updated to follow.

### Impact on Existing Commands

The project library changes how `on`, `off`, `list`, and `doctor` resolve skills:

__`on <targets>`__:

* `--scope project` (default): resolve from project library first, then user library. Install goes in project outfit.
* `--scope user`: resolve from user library ONLY. Install goes in user outfit.
* A project-library skill can never be installed at user scope (the symlink would point into a specific project, breaking all other projects)
* A user-scope pluggable skill can be installed at either scope

__`off <targets>`__:

* `--scope project` (default): remove symlink from project outfit. Validate against both libraries.
* `--scope user`: remove symlink from user outfit. Validate against user library only.

__`list`__:

* Shows skills from both libraries
* Indicates provenance: which library each skill comes from
* When a project library skill shadows a user library skill, both are visible

__`doctor`__:

* New aspects added for project library awareness — see Section 10 (Doctor)

---

## 3. Materialized State

### Problem

`state.json` currently stores only history (event log). To support cross-project operations (e.g., finding all projects that have a user-scoped skill installed), we need a system-wide index of current installs.

### Solution

Add a `current` section to `state.json`, eagerly updated on every operation:

```typescript
interface ShanState {
  version: 2
  current: Record<string, ScopeState> // "global" for user, or project paths
  history: Record<string, ProjectHistory>
}

interface ScopeState {
  installs: string[] // flat names of pluggable skills installed by shan (symlinks only)
}
```

```json
{
  "version": 2,
  "current": {
    "global": {
      "installs": ["playwright", "ts_tooling"]
    },
    "/Users/jason/project-a": {
      "installs": ["linear", "tips"]
    },
    "/Users/jason/project-b": {
      "installs": ["playwright"]
    }
  },
  "history": {
    "global": { "entries": [], "undoneCount": 0 },
    "/Users/jason/project-a": { "entries": [], "undoneCount": 0 }
  }
}
```

### What `current` tracks (and doesn't)

`current` tracks only __pluggable installs__ — symlinks that shan creates and manages. It does NOT track core skills (real directories). Core skills are managed outside shan (CC plugin installs, manual edits, git operations) and would go stale if cached. When shan needs to know about core skills (collision detection, list display), it reads the outfit directory at runtime.

### Update Rules

* Every `on`, `off`, `move` operation updates both `current` and `history` atomically
* `current` is the source of truth for "which pluggable skills are installed where across all known projects"
* On first use in a project, shan bootstraps the `current` entry by scanning the outfit directory for symlinks

---

## 4. Target Resolution

Resolution extends existing `resolveTarget` logic, with axis-specific search order.

### `move scope up` (project → user)

1. Resolve target in __project__ (outfit for core/pluggable-installed, project library for pluggable-not-installed)
2. Not found at project scope → error: "not found at project scope"
3. Already at user scope → no-op

### `move scope down` (user → project)

1. Resolve target in __user__ (outfit for core/pluggable-installed, user library for pluggable-not-installed)
2. Not found at user scope → error: "not found at user scope"
3. Already at project scope → no-op

### `move commitment up` (pluggable → core)

1. Resolve target as pluggable — check project library first, then user library
2. Not found as pluggable → check if already core → no-op
3. Not found at all → error: "not found"

### `move commitment down` (core → pluggable)

1. Resolve target as core — check project outfit first, then user outfit
2. Not found as core → check if already pluggable → no-op
3. Not found at all → error: "not found"

### Namespace Support

When a target resolves to a namespace (group), all descendant leaf skills are included — same as `on`/`off`. Each leaf is processed independently.

For `commitment` moves on namespaces: all leaves must share the same commitment type. Mixed-commitment leaves are skipped with a warning (in validation phase, so may trigger abort).

---

## 5. State Transition Rules

Each path below reads top-to-bottom. Indented sub-points are conditional on the parent. Every automatic side-effect (install, uninstall, gitignore, filesystem op) is listed explicitly.

### `move scope up` (project → user)

* Resolve target at project scope
* If __core__ (real dir in project outfit):
  * `move-dir`: `.claude/skills/<name>/` → `~/.claude/skills/<name>/`
  * gitignore: remove entry (leaving project)
  * Sub-actions: `[move-dir]`
* If __pluggable, installed__ (symlink exists in project outfit):
  * `off` at project scope (remove symlink from `.claude/skills/<name>`)
  * `on` at user scope (create symlink at `~/.claude/skills/<name>` → user library)
  * Move skill directory from project library to user library
  * gitignore: remove entry (leaving project)
  * Sub-actions: `[off project, move-library-dir, on user]`
* If __pluggable, not installed__ (exists in project library, no symlink):
  * Move skill directory from `.claude/skills-library/<path>/` → `~/.claude/skills-library/<path>/`
  * No install changes — skill was uninstalled, remains uninstalled
  * Sub-actions: `[move-library-dir]`

### `move scope down` (user → project)

* Resolve target at user scope
* If __core__ (real dir in user outfit):
  * `move-dir`: `~/.claude/skills/<name>/` → `.claude/skills/<name>/`
  * gitignore: do NOT add (core arriving in project is intended to be committed)
  * Sub-actions: `[move-dir]`
* If __pluggable, installed__ (symlink exists in user outfit or any project outfit):
  * Read `state.json` `current` to find ALL projects with this skill installed
  * `off` at EACH scope where installed (user outfit + every project outfit found)
  * Move skill directory from user library to project library
  * `on` at project scope only (create symlink at `.claude/skills/<name>` → project library)
  * gitignore: add entry (symlink to library)
  * Other projects that had it installed lose it (their `off` sub-actions are recorded for undo)
  * CLI notification: list affected projects (see Section 8)
  * Sub-actions: `[off user, off project-a, off project-b, ..., move-library-dir, on project]`
* If __pluggable, not installed__ (exists in user library, no symlink):
  * Move skill directory from `~/.claude/skills-library/<path>/` → `.claude/skills-library/<path>/`
  * No install changes — skill was uninstalled, remains uninstalled
  * Sub-actions: `[move-library-dir]`

### `move commitment up` (pluggable → core)

* Resolve target as pluggable (project library first, then user library)
* Note the scope where found — that scope is preserved
* Read `state.json` `current` to find ALL scopes where this skill is installed
* `off` at EACH scope where installed (may be many: user outfit + N project outfits)
  * Each `off` is a separate sub-action for undo
* `copy-to-outfit` at resolved scope (copy library dir contents to outfit — now a real directory)
* Skill is now core — shan will never touch it
* Skill remains in library (other projects could still install it independently)
* gitignore: if project scope, remove entry (now a real committed directory)
* CLI notification: list affected projects if cross-project uninstalls occurred (see Section 8)
* Sub-actions: `[off scope-1, off scope-2, ..., copy-to-outfit]`

### `move commitment down` (core → pluggable)

* Resolve target as core (project outfit first, then user outfit)
* Note the scope where found — that scope is preserved
* Compute library destination via `unflattenName` (e.g., `my-tool` → `skills-library/my-tool/`)
  * Library destination is at the SAME scope (user core → user library, project core → project library)
  * If library destination already exists → Error: "library path already occupied"
* `move-to-library` (move real dir from outfit to library destination)
* `on` at resolved scope (create symlink from outfit to new library path — auto-install)
* CC sees no change — skill remains active at same scope
* gitignore: if project scope, add entry (now a symlink)
* Sub-actions: `[move-to-library, on]`

### Gitignore Summary

| Path            | Commitment | Action                                   |
| --------------- | ---------- | ---------------------------------------- |
| scope up        | any        | Remove project entry                     |
| scope down      | core       | Do NOT add (commit intent)               |
| scope down      | pluggable  | Add entry                                |
| commitment up   | any        | Remove entry (now real dir)              |
| commitment down | any        | Add entry if project scope (now symlink) |

---

## 6. Composite History Model

### Extended `HistoryEntry`

```typescript
type Op =
  | 'on'
  | 'off'
  | 'move'
  | 'doctor'
  | 'copy-to-outfit'
  | 'move-to-library'
  | 'move-dir'
  | 'move-library-dir'

interface HistoryEntry {
  op: Op
  targets: string[]
  scope: string // "global" for user-scope, or absolute project path
  timestamp: string

  // For on/off (existing)
  snapshot?: string[]
  generatedRouters?: string[]

  // For move (composite)
  subActions?: HistoryEntry[]

  // For filesystem ops (copy-to-outfit, move-to-library, move-dir, move-library-dir)
  sourcePath?: string
  destPath?: string
}
```

### Op Types

| Op                 | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `on`               | Create symlink in outfit → library                                 |
| `off`              | Remove symlink from outfit                                         |
| `move`             | Composite: contains `subActions`                                   |
| `doctor`           | Non-undoable reconciliation entry (see Section 10 (Doctor))                 |
| `copy-to-outfit`   | Copy library dir to outfit (pluggable → core eject)                |
| `move-to-library`  | Move outfit dir to library (core → pluggable adopt)                |
| `move-dir`         | Move dir between outfits (core scope change)                       |
| `move-library-dir` | Move dir between libraries (pluggable scope change, not installed) |

### Composite Structure

A `move` entry contains ordered `subActions`. Each sub-action is a complete `HistoryEntry` with its own snapshot/paths.

__Example: `move commitment up` on a user-scoped pluggable installed in user outfit + 2 project outfits:__

```json
{
  "op": "move",
  "targets": ["playwright"],
  "scope": "user",
  "timestamp": "...",
  "subActions": [
    {
      "op": "off",
      "targets": ["playwright"],
      "scope": "user",
      "snapshot": ["git", "playwright", "..."],
      "timestamp": "..."
    },
    {
      "op": "off",
      "targets": ["playwright"],
      "scope": "/Users/jason/project-a",
      "snapshot": ["playwright"],
      "timestamp": "..."
    },
    {
      "op": "off",
      "targets": ["playwright"],
      "scope": "/Users/jason/project-b",
      "snapshot": ["playwright"],
      "timestamp": "..."
    },
    {
      "op": "copy-to-outfit",
      "targets": ["playwright"],
      "scope": "user",
      "sourcePath": "~/.claude/skills-library/playwright",
      "destPath": "~/.claude/skills/playwright",
      "timestamp": "..."
    }
  ]
}
```

__Example: `move scope down` on a pluggable skill installed in user outfit + 1 other project:__

```json
{
  "op": "move",
  "targets": ["linear"],
  "scope": "user",
  "timestamp": "...",
  "subActions": [
    {
      "op": "off",
      "targets": ["linear"],
      "scope": "user",
      "snapshot": ["git", "linear", "..."],
      "timestamp": "..."
    },
    {
      "op": "off",
      "targets": ["linear"],
      "scope": "/Users/jason/other-project",
      "snapshot": ["linear"],
      "timestamp": "..."
    },
    {
      "op": "move-library-dir",
      "targets": ["linear"],
      "scope": "user",
      "sourcePath": "~/.claude/skills-library/linear",
      "destPath": "/Users/jason/current-project/.claude/skills-library/linear",
      "timestamp": "..."
    },
    { "op": "on", "targets": ["linear"], "scope": "project", "snapshot": [], "timestamp": "..." }
  ]
}
```

### Undo for Composites

Undo a composite = undo each sub-action in __reverse order__:

| Sub-action op      | Undo behavior                                       |
| ------------------ | --------------------------------------------------- |
| `on`               | Restore outfit to sub-action's snapshot             |
| `off`              | Restore outfit to sub-action's snapshot             |
| `copy-to-outfit`   | Delete the copied directory from outfit             |
| `move-to-library`  | Move directory back from `destPath` to `sourcePath` |
| `move-dir`         | Move directory back from `destPath` to `sourcePath` |
| `move-library-dir` | Move directory back from `destPath` to `sourcePath` |

### Redo for Composites

Redo = replay sub-actions in forward order, same as initial execution.

---

## 7. Atomicity Rule (All Commands)

__All batch commands (`on`, `off`, `move`) are atomic: validate all targets first, abort entirely on any hard error.__

### Two-Phase Execution

__Phase 1 — Dry-run validation (no side effects):__

1. Resolve all targets
2. Check for errors: NOT FOUND, CONFLICT, NOT INSTALLED, WRONG TYPE
3. Check for no-ops (already at target)
4. If `--strict`: no-ops are elevated to errors
5. If ANY errors → abort entirely, report all errors, exit non-zero. Nothing is mutated.

__Phase 2 — Execute (only if Phase 1 had zero errors):__

1. Snapshot current state
2. Execute all mutations
3. Update `state.json` (`current` + `history`) atomically
4. Report results (successes + skips)

### Per-Command Validation

| Command | Phase 1 checks                                                             |
| ------- | -------------------------------------------------------------------------- |
| `on`    | Exists in library, no collision, not already on (strict)                   |
| `off`   | Exists in library, not core, not already off (strict)                      |
| `move`  | Exists in outfit/library, correct type, not already at target, no conflict |

### Behavior

* No-ops (skips) are NOT errors unless `--strict`
* With `--strict`, no-ops become errors and trigger full abort
* Errors on ANY target prevent ALL targets from executing
* This is a __change to existing `on`/`off` behavior__ (previously partial success was allowed)

---

## 8. Batch Output Format

```
scope up: playwright, linear
skip: git (already at user scope)
error: nonexistent (not found)
```

```
commitment down: my-tool, sync
skip: git (already pluggable)
error: nonexistent (not found)
```

Uses `<axis> <direction>:` as the result prefix. Consistent across all four paths.

### Collateral Notifications

When a move operation causes installs to be removed from projects other than the one running the command, the CLI prints a notification after the main result:

```
scope down: playwright
  uninstalled from: /Users/jason/project-a, /Users/jason/project-b
  (undo to restore)
```

```
commitment up: playwright
  uninstalled from: user, /Users/jason/project-a, /Users/jason/project-b
  (undo to restore)
```

This applies to:

* `move scope down` — pluggable installed: other projects lose their install
* `move commitment up` — pluggable installed: all installs removed during eject

This is a CLI-only concern — the underlying operations are not blocked, because the undo system provides a complete safety net. The notification exists purely for transparency.

---

## 9. Error Categories

| Category          | When                                                    | Behavior                      |
| ----------------- | ------------------------------------------------------- | ----------------------------- |
| __NOT FOUND__     | Target doesn't exist in any outfit / library            | Always error, triggers abort  |
| __WRONG TYPE__    | `commitment up` on core, `commitment down` on pluggable | No-op (error with `--strict`) |
| __ALREADY THERE__ | `scope up` on user skill, `scope down` on project skill | No-op (error with `--strict`) |
| __CONFLICT__      | `commitment down` but library path already occupied     | Always error, triggers abort  |

---

## 10. Doctor System

### Overview

`shan skills doctor` diagnoses AND auto-fixes by default. Use `--no-fix` for report-only mode.

```
shan skills doctor              # detect + auto-fix (default)
shan skills doctor --no-fix     # detect + report only
```

### Aspect Model

Each doctor check is a named __aspect__ with a standard interface:

```typescript
interface DoctorAspect {
  name: string // slug identifier
  description: string // human-readable one-liner
  level: 'error' | 'warning' | 'info' // severity
  detect: (ctx: DoctorContext) => Finding[] // detection function
  fix?: (finding: Finding) => void // auto-fix (undefined = report-only)
  enabled: boolean // default: true
}
```

All aspects are enabled by default. Disable by slug in `~/.claude/shan/config.json`:

```json
{
  "skills": {
    "doctor": {
      "disabled": ["stale-gitignore"]
    }
  }
}
```

### Aspect Registry

| Slug                   | Level   | Description                                                                                              | Fixable | Fix Strategy                                                                                                           |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `broken-symlink`       | error   | Outfit symlink target doesn't exist                                                                      | Yes     | Git rename detection → repoint; otherwise remove symlink + update `current`                                            |
| `state-drift`          | warning | `current` doesn't match filesystem (install in state but no symlink, or symlink exists but not in state) | Yes     | Re-create missing symlinks if target exists; add untracked symlinks to state; remove irrecoverable installs from state |
| `new-leaf`             | warning | Installed group has new leaf skills in library not yet symlinked                                         | Yes     | Create symlinks, add to `current`                                                                                      |
| `stale-router`         | warning | Auto-generated router child list outdated                                                                | Yes     | Regenerate router SKILL.md from current library children                                                               |
| `orphaned-router`      | warning | Generated router dir with no child symlinks                                                              | Yes     | Remove router directory                                                                                                |
| `orphaned-scope`       | info    | Project path in `state.json` doesn't exist on disk                                                       | Yes     | Prune entry from state                                                                                                 |
| `stale-gitignore`      | info    | Gitignore entries for unequipped skills                                                                  | Yes     | Remove stale entries from shan-managed block                                                                           |
| `frontmatter-mismatch` | error   | Nested skill frontmatter `name` doesn't match directory position                                         | No      | Report only — may be intentional                                                                                       |
| `name-conflict`        | error   | Library skill name collides with core skill in outfit                                                    | No      | Report only — user must decide                                                                                         |
| `duplicate-name`       | error   | Multiple library paths produce same flattened symlink name                                               | No      | Report only — user must rename                                                                                         |
| `shadow`               | info    | Project library skill has same name as user library skill                                                | No      | Informational — may be intentional                                                                                     |
| `stale-shadow`         | warning | Symlink → user library when project library has same name                                                | Yes     | Repoint symlink to project library                                                                                     |
| `cross-scope-install`  | error   | User outfit symlink points into project library                                                          | Yes     | Remove symlink, update `current`                                                                                       |

### Git Rename Detection

The `broken-symlink` aspect uses git history before giving up:

1. Determine which git repo contains the broken target path
2. `git log -1 --diff-filter=R --find-renames --format="" --name-status -- <old-path>/SKILL.md`
3. If rename found AND new path exists → repoint symlink
4. Check uncommitted: `git diff --diff-filter=R --find-renames --name-only HEAD -- <old-path>/SKILL.md`
5. No rename detected → fall back to remove + update `current`

When a rename also changes the flattened name (e.g., `playwright/` → `testing/playwright/`, flat: `playwright` → `testing_playwright`), the fix is composite: remove old symlink, create new one with correct name.

### History Entry

Doctor logs a non-undoable `op: "doctor"` entry for auditability:

```typescript
type Op =
  | 'on'
  | 'off'
  | 'move'
  | 'doctor'
  | 'copy-to-outfit'
  | 'move-to-library'
  | 'move-dir'
  | 'move-library-dir'

interface DoctorReconciled {
  restored: string[] // "name@scope" — symlinks re-created
  removed: string[] // cleared from state (irrecoverable)
  repointed: string[] // symlinks updated (rename, stale-shadow)
  untracked: string[] // added to state (manually-added symlinks)
  newLeaves: string[] // new group members symlinked
  regenerated: string[] // routers regenerated
  pruned: string[] // scopes/routers/gitignore entries removed
}

interface HistoryEntry {
  // ... existing fields ...
  reconciled?: DoctorReconciled // only for op: "doctor"
}
```

`shan skills undo` after a doctor skips the doctor entry and undoes the previous real operation.

### Output Format

Default (detect + fix):

```
doctor: 5 issues found, 4 fixed

  ✓ broken-symlink:    old-skill (user) → new-skill — repointed via git rename
  ✓ state-drift:       manual-skill (project) — added to state
  ✓ new-leaf:          ts:newchild (project) — symlinked
  ✓ stale-router:      ts (project) — regenerated
  ✗ name-conflict:     linear (user library) collides with linear (project core)
                        → resolve manually: rename one or remove the other

doctor: 0 issues — all clear ✓
```

With `--no-fix`:

```
doctor: 5 issues found (--no-fix: report only)

  broken-symlink:    old-skill (user) — target missing, git rename: new-skill
  state-drift:       manual-skill (project) — symlink exists, not in state
  new-leaf:          ts:newchild (project) — group installed, leaf not symlinked
  stale-router:      ts (project) — children changed
  name-conflict:     linear (user library) collides with linear (project core)

  Run `shan skills doctor` to auto-fix 4 of 5 issues
```

---

## 11. Domain Model

### Design Principle

All domain entities use Effect Schema. This gives runtime validation for file I/O (`state.json`, `config.json`, frontmatter), discriminated unions via `Schema.Literal` discriminators, and consistent terminology across the codebase.

The existing pattern in `transcript-schema.ts` — `Schema.Struct` with a literal `type` discriminator + `Schema.Union` — is the established convention. Skill-library entities follow the same pattern, using `_tag` as discriminator (Effect convention for tagged unions).

### Terminology

| Term | Definition | Schema |
| --- | --- | --- |
| __scope__ | Where a skill lives: user-level or project-level | `Scope` (literal union) |
| __scope key__ | Storage key in `state.json`: `"global"` for user, or absolute project path | `ScopeKey` (branded string) |
| __commitment__ | Whether shan manages it: core (real dir, shan-agnostic) or pluggable (library-managed) | `Commitment` (literal union) |
| __node type__ | Shape in library: leaf skill, namespace group, or callable group | `NodeType` (literal union) |
| __outfit__ | The effective skill directory CC reads from (user: `~/.claude/skills/`, project: `.claude/skills/`) | — (path, not a schema type) |
| __library__ | Canonical store of pluggable skills (user: `~/.claude/skills-library/`, project: `.claude/skills-library/`) | — (path, not a schema type) |
| __outfit entry__ | A skill as seen in an outfit: name, commitment, scope, optional symlink target | `OutfitEntry` |
| __library node__ | A node in the library: path, node type, frontmatter | `LibraryNode` |
| __skill ref__ | Identifies a skill by colon-syntax name | `SkillRef` |
| __history entry__ | A logged operation — discriminated union by `_tag` | `HistoryEntry` (union) |
| __finding__ | A doctor detection result — discriminated union by `_tag` | `DoctorFinding` (union) |

### Enums

```typescript
import { Schema } from "effect"

export const Scope = Schema.Literal("user", "project")
export type Scope = typeof Scope.Type

export const ScopeKey = Schema.String.pipe(Schema.brand("ScopeKey"))
export type ScopeKey = typeof ScopeKey.Type
// Values: "global" | "/absolute/project/path"

export const Commitment = Schema.Literal("core", "pluggable")
export type Commitment = typeof Commitment.Type

export const NodeType = Schema.Literal("leaf", "group", "callable-group")
export type NodeType = typeof NodeType.Type

export const Level = Schema.Literal("error", "warning", "info")
export type Level = typeof Level.Type
```

### Domain Entities

Entities that are constructed in code use `Schema.TaggedClass` with `.is()` and `.make()`. Entities that are only decoded from external data (frontmatter, JSON files) use `Schema.Struct`.

```typescript
export class OutfitEntry extends Schema.TaggedClass<OutfitEntry>()("OutfitEntry", {
  name: Schema.String,
  dir: Schema.String,
  commitment: Commitment,
  scope: Scope,
  symlinkTarget: Schema.optional(Schema.String),
}) {
  static is = Schema.is(OutfitEntry)
}

export class LibraryNode extends Schema.TaggedClass<LibraryNode>()("LibraryNode", {
  colonName: Schema.String,
  libraryRelPath: Schema.String,
  nodeType: NodeType,
  frontmatter: Schema.optional(SkillFrontmatter),
}) {
  static is = Schema.is(LibraryNode)
}

// Decoded from external YAML — Schema.Struct is fine here (serialization boundary)
export const SkillFrontmatter = Schema.Struct({
  name: Schema.String,
  description: Schema.optional(Schema.String),
  argumentHint: Schema.optional(Schema.String),
  disableModelInvocation: Schema.optional(Schema.Boolean),
})
```

### Errors

All errors use `Data.TaggedError` for typed error channels:

```typescript
export class SkillNotFoundError extends Data.TaggedError("SkillNotFoundError")<{
  readonly name: string
}> {}

export class CollisionError extends Data.TaggedError("CollisionError")<{
  readonly name: string
  readonly scope: string
}> {}

export class LibraryPathOccupiedError extends Data.TaggedError("LibraryPathOccupiedError")<{
  readonly path: string
}> {}

export class BrokenSymlinkError extends Data.TaggedError("BrokenSymlinkError")<{
  readonly name: string
  readonly target: string
}> {}
```

These enable `Effect.catchTag` for selective recovery:

```typescript
pipe(
  resolveTarget(name),
  Effect.catchTag("SkillNotFoundError", (e) => Effect.succeed(/* ... */)),
)
```

### History Entry (Tagged Enum)

Uses `Data.TaggedEnum` for exhaustive `$match` instead of raw unions with switch statements:

```typescript
export type HistoryEntry = Data.TaggedEnum<{
  OnOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly snapshot: ReadonlyArray<string>
    readonly generatedRouters: ReadonlyArray<string>
  }
  OffOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly snapshot: ReadonlyArray<string>
    readonly generatedRouters: ReadonlyArray<string>
  }
  CopyToOutfitOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly sourcePath: string
    readonly destPath: string
  }
  MoveToLibraryOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly sourcePath: string
    readonly destPath: string
  }
  MoveDirOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly sourcePath: string
    readonly destPath: string
  }
  MoveLibraryDirOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly sourcePath: string
    readonly destPath: string
  }
  MoveOp: {
    readonly targets: ReadonlyArray<string>
    readonly scope: string
    readonly timestamp: string
    readonly subActions: ReadonlyArray<SubAction>
  }
  DoctorOp: {
    readonly scope: string
    readonly timestamp: string
    readonly reconciled: DoctorReconciled
  }
}>

const {
  OnOp, OffOp, CopyToOutfitOp, MoveToLibraryOp,
  MoveDirOp, MoveLibraryDirOp, MoveOp, DoctorOp,
  $is, $match,
} = Data.taggedEnum<HistoryEntry>()

// SubAction is the non-composite subset
export type SubAction = Data.TaggedEnum.Value<HistoryEntry, "OnOp">
  | Data.TaggedEnum.Value<HistoryEntry, "OffOp">
  | Data.TaggedEnum.Value<HistoryEntry, "CopyToOutfitOp">
  | Data.TaggedEnum.Value<HistoryEntry, "MoveToLibraryOp">
  | Data.TaggedEnum.Value<HistoryEntry, "MoveDirOp">
  | Data.TaggedEnum.Value<HistoryEntry, "MoveLibraryDirOp">
```

Usage — compiler-enforced exhaustiveness via `$match`:

```typescript
const undoEntry = (entry: HistoryEntry) =>
  $match(entry, {
    OnOp: (e) => restoreSnapshot(e.snapshot, e.scope),
    OffOp: (e) => restoreSnapshot(e.snapshot, e.scope),
    CopyToOutfitOp: (e) => removeDir(e.destPath),
    MoveToLibraryOp: (e) => moveDir(e.destPath, e.sourcePath),
    MoveDirOp: (e) => moveDir(e.destPath, e.sourcePath),
    MoveLibraryDirOp: (e) => moveDir(e.destPath, e.sourcePath),
    MoveOp: (e) => Effect.forEach([...e.subActions].reverse(), undoSubAction),
    DoctorOp: () => Effect.void, // non-undoable, skip
  })
```

### DoctorReconciled

```typescript
export class DoctorReconciled extends Schema.TaggedClass<DoctorReconciled>()("DoctorReconciled", {
  restored: Schema.Array(Schema.String),
  removed: Schema.Array(Schema.String),
  repointed: Schema.Array(Schema.String),
  untracked: Schema.Array(Schema.String),
  newLeaves: Schema.Array(Schema.String),
  regenerated: Schema.Array(Schema.String),
  pruned: Schema.Array(Schema.String),
}) {
  static is = Schema.is(DoctorReconciled)
}
```

### Serialization

`Data.TaggedEnum` values serialize to JSON with `_tag` discriminator natively. For `state.json` persistence, use a `Schema` that decodes/encodes the tagged enum:

```typescript
// Schema for JSON persistence of HistoryEntry
const HistoryEntrySchema = Schema.Union(
  Schema.Struct({ _tag: Schema.Literal("OnOp"), targets: Schema.Array(Schema.String), /* ... */ }),
  Schema.Struct({ _tag: Schema.Literal("OffOp"), /* ... */ }),
  // ... one struct per variant
)

// Decode JSON → TaggedEnum, Encode TaggedEnum → JSON
// The _tag field bridges both representations
```

### State Schema

```typescript
export const ScopeState = Schema.Struct({
  installs: Schema.Array(Schema.String),
})

export const ProjectHistory = Schema.Struct({
  entries: Schema.Array(HistoryEntry),
  undoneCount: Schema.Number,
})

export const ShanState = Schema.Struct({
  version: Schema.Literal(2),
  current: Schema.Record({ key: ScopeKey, value: ScopeState }),
  history: Schema.Record({ key: ScopeKey, value: ProjectHistory }),
})
export type ShanState = typeof ShanState.Type
```

### Config Schema

```typescript
export const DoctorConfig = Schema.Struct({
  disabled: Schema.Array(Schema.String), // aspect slugs
})

export const ShanConfig = Schema.Struct({
  version: Schema.Literal(1),
  skills: Schema.Struct({
    historyLimit: Schema.Number,
    defaultScope: Scope,
    doctor: DoctorConfig,
  }),
})
export type ShanConfig = typeof ShanConfig.Type
```

### Doctor Finding (Tagged Enum)

```typescript
export type DoctorFinding = Data.TaggedEnum<{
  BrokenSymlink: {
    readonly scope: string
    readonly name: string
    readonly symlinkTarget: string
    readonly renameTo: Option.Option<string>
  }
  StateDrift: {
    readonly scope: string
    readonly name: string
    readonly kind: "missing-symlink" | "untracked-symlink" | "irrecoverable"
  }
  NewLeaf: {
    readonly scope: string
    readonly name: string
    readonly groupName: string
  }
  StaleRouter: {
    readonly scope: string
    readonly name: string
    readonly added: ReadonlyArray<string>
    readonly removed: ReadonlyArray<string>
  }
  OrphanedRouter: { readonly scope: string; readonly name: string }
  OrphanedScope: { readonly scopePath: string }
  StaleGitignore: { readonly entries: ReadonlyArray<string> }
  FrontmatterMismatch: { readonly scope: string; readonly name: string; readonly expected: string; readonly actual: string }
  NameConflict: { readonly name: string; readonly libraryScope: string; readonly coreScope: string }
  DuplicateName: { readonly flatName: string; readonly paths: ReadonlyArray<string> }
  Shadow: { readonly name: string }
  StaleShadow: { readonly scope: string; readonly name: string }
  CrossScopeInstall: { readonly name: string; readonly symlinkTarget: string }
}>

const { $match: $matchFinding } = Data.taggedEnum<DoctorFinding>()
```

Note: `renameTo` uses `Option.Option<string>` — not `string | undefined`. Per `option-combinators-not-null-checks`, nullable values are wrapped at the boundary where they enter domain logic.

### Doctor Aspect (Runtime Interface)

`DoctorAspect` is a runtime object, not a Schema (it contains functions). But it references Schema types:

```typescript
export interface DoctorAspect {
  readonly name: string
  readonly description: string
  readonly level: Level
  readonly detect: (ctx: DoctorContext) => Effect.Effect<DoctorFinding[]>
  readonly fix?: (finding: DoctorFinding) => Effect.Effect<void>
}
```

### Code Style (from `.claude/checks/`)

Implementation must follow these checks. The design schemas above are verified against them.

__TypeScript checks (`ts.quality.md`, `ts.types.quality.md`):__

* __`function-expressions-preferred`__: All module-scope functions as `const fn = (...) => ...`. `Effect.gen(function* () { ... })` generator callback is the one exception.
* __`no-ts-enums`__: Use `Schema.Literal` unions or `Data.TaggedEnum`.
* __`no-namespace-destructuring`__: Always `Schema.Struct(...)`, never `const { Struct } = Schema`.
* __`js-extension-on-imports`__: All relative imports include `.js` extension.
* __`prefer-unknown-over-any`__: No `any` except where Effect requires it (e.g., `Schema.suspend`).
* __`no-jsdoc-on-self-evident`__: Schemas are self-documenting. Only add JSDoc where meaning isn't obvious.
* __`dollar-prefix-type-params`__: If generics are needed, use `$` prefix: `<$T>`, `<$scope>`.

__Effect checks (`effect_review/CHECKS.quality.md`):__

* __`tagged-enum-over-raw-unions`__: `HistoryEntry` and `DoctorFinding` use `Data.TaggedEnum` with `$match` — never raw TS unions with switch.
* __`schema-always-taggedclass`__: Domain entities (`OutfitEntry`, `LibraryNode`, `DoctorReconciled`) use `Schema.TaggedClass` with `.is()` and `.make()`. `Schema.Struct` only at serialization boundaries (frontmatter decode, JSON persistence).
* __`typed-errors-tagged`__: All errors use `Data.TaggedError` — never `Error` base class. Enables `Effect.catchTag`.
* __`option-combinators-not-null-checks`__: `Schema.optional` values wrapped with `Option.fromNullable` at domain boundary. No null checks in business logic.
* __`effect-array-combinators`__: Use `Array.filter`, `Array.map`, `Array.groupBy` etc. — not native `.filter()`, `.map()`.
* __`pipe-vs-generator-consistency`__: `Effect.gen` for sequential effects, `pipe` for transformations. Don't mix.
* __`is-predicate-on-class`__: Every `TaggedClass` has `static is = Schema.is(X)`.
* __`schema-make-not-new`__: Use `.make()`, never `new`.
* __`no-business-logic-on-schema`__: Schema classes own data ops (`.is`, `.make`, getters). Business logic in services.
* __`catchtag-for-selective-recovery`__: Use `Effect.catchTag("ErrorTag", ...)` not `catchAll` with instanceof.

### Migration from v1

`loadState` decodes with `Schema.decodeUnknown(ShanState)`. When the file has `version: 1` (no `current`, old `HistoryEntry` format), a migration function transforms to v2:

* Add empty `current` section (bootstrapped from outfit scan on next operation)
* Map old `{ op: "on", ... }` entries to `{ _tag: "OnOp", ... }`
* Map old `{ op: "off", ... }` entries to `{ _tag: "OffOp", ... }`

The migration is applied during decode, so the rest of the code only sees v2 types.

### File I/O Pattern

All reads/writes go through Schema encode/decode:

```typescript
const loadState = Effect.gen(function* () {
  const raw = yield* readJsonFile(STATE_FILE)
  return yield* Schema.decodeUnknown(ShanState)(raw)
})

const saveState = (state: ShanState) =>
  Effect.gen(function* () {
    const json = yield* Schema.encode(ShanState)(state)
    yield* writeJsonFile(STATE_FILE, json)
  })
```

This catches schema drift at I/O boundaries rather than letting corrupt data propagate.

---

## 12. Implementation

### New Files

| File                                      | Purpose                                                 |
| ----------------------------------------- | ------------------------------------------------------- |
| `packages/shan/src/bin/skills/move.ts`    | CLI command for scope/commitment migration              |
| `packages/shan/src/lib/doctor-aspects.ts` | Aspect registry: 13 named aspects with detect/fix/level |

### Modified Files

| File                                              | Changes                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/shan/src/lib/skill-library.ts`          | Extended `ShanState` with `current` section (v2). Extended `HistoryEntry` with new ops + `subActions` + `sourcePath`/`destPath`. New constant `PROJECT_LIBRARY_DIR`. Library resolution function (project → user). New functions: `copyDirRecursive`, `moveDirToLibrary`, `moveDirBetweenLibraries`, `findAllInstalls`. Two-phase validation helpers. |
| `packages/shan/src/bin/shan.ts`                   | Add `move` command routing                                                                                                                                                                                                                                                                                                                            |
| `packages/shan/src/bin/skills/on.ts`              | Refactor to two-phase atomic execution. Resolve from both libraries (project → user). Update `state.json` `current` on every operation.                                                                                                                                                                                                               |
| `packages/shan/src/bin/skills/off.ts`             | Refactor to two-phase atomic execution. Validate against both libraries. Update `state.json` `current` on every operation.                                                                                                                                                                                                                            |
| `packages/shan/src/bin/skills/undo.ts`            | Extend for composite entries, new sub-action types, cross-project undo                                                                                                                                                                                                                                                                                |
| `packages/shan/src/bin/skills/redo.ts`            | Extend for composite entries, new sub-action types, cross-project redo                                                                                                                                                                                                                                                                                |
| `packages/shan/src/bin/skills/list.ts`            | Show skills from both libraries with provenance indicators                                                                                                                                                                                                                                                                                            |
| `packages/shan/src/bin/skills/doctor.ts`          | Rewrite as aspect-based system: 13 named aspects with detect/fix/level/enabled. Add `--no-fix` flag. Git rename detection. Non-undoable `op: "doctor"` history entries. See Section 10 (Doctor).                                                                                                                                                               |
| `packages/shan/src/lib/doctor-aspects.ts`         | New file: aspect registry — each aspect exported as `DoctorAspect` with name, description, level, detect, fix. Shared `DoctorContext` with access to state, filesystem, git.                                                                                                                                                                          |
| `~/.claude/skills-library/skills/change/SKILL.md` | Document `move` command                                                                                                                                                                                                                                                                                                                               |
| `~/.claude/skills-library/shan/SKILL.md`          | Document `move` command                                                                                                                                                                                                                                                                                                                               |

### Implementation Order

1. Migrate all domain types to Effect Schema (Section 11): enums, entities, HistoryEntry union, state/config schemas, DoctorFinding union
2. Extend `ShanState` schema to v2 (add `current` section) with v1 → v2 migration in `loadState`
3. Add project-level library support (new constant, resolution changes)
4. Add two-phase validation infrastructure (shared by all commands)
5. Refactor `on.ts` and `off.ts` to two-phase atomic execution + `current` state updates
6. Implement `move.ts` with all four paths
7. Extend `undo.ts` and `redo.ts` for composites and cross-project operations
8. Rewrite `doctor.ts` as aspect-based system with detect/fix/level/enabled + `--no-fix` flag
9. Create `doctor-aspects.ts` with all 13 aspects including git rename detection
10. Update `shan.ts` routing (add `move`, update `doctor` for `--no-fix`)
11. Update CC skill docs and shan SKILL.md
12. Verify all paths + undo/redo + atomicity + cross-project + doctor aspects

### Verification

```bash
# Scope moves
shan skills move scope up playwright          # project pluggable → user
shan skills move scope down playwright        # user pluggable → project
shan skills move scope up sync                # project core → user core
shan skills move scope down sync              # user core → project core

# Scope move: pluggable not installed
shan skills move scope up some-lib-skill      # project library → user library (no install change)

# Commitment moves
shan skills move commitment up playwright     # pluggable → core
shan skills move commitment down playwright   # core → pluggable (auto-install)

# Commitment up with cross-project uninstalls
# (install playwright in user + 2 projects, then eject)
shan skills on playwright --scope user
cd /project-a && shan skills on playwright
cd /project-b && shan skills on playwright
cd /project-a && shan skills move commitment up playwright
# → should off in user + project-a + project-b, then copy-to-outfit in project-a

# Undo/redo
shan skills move scope up playwright
shan skills undo                              # restores to project
shan skills redo                              # back to user

# Batch
shan skills move scope up linear,playwright

# Errors (atomic abort)
shan skills move scope up linear,nonexistent  # aborts — linear NOT moved
shan skills move commitment up git            # already core → no-op
shan skills move scope up git                 # already at user → no-op
shan skills move scope up --strict git        # no-op elevated to error, abort

# Atomicity of on/off (new behavior)
shan skills on linear,nonexistent             # aborts — linear NOT turned on
shan skills off linear,nonexistent            # aborts — linear NOT turned off

# Doctor aspects
shan skills doctor                            # detect + auto-fix
shan skills doctor --no-fix                   # detect + report only

# Doctor: broken symlink with git rename
# (rename a skill dir in the library, commit, then run doctor)
mv ~/.claude/skills-library/playwright ~/.claude/skills-library/testing/playwright
git add -A && git commit -m "reorganize"
shan skills doctor                            # should detect rename + repoint

# Doctor: state drift (manual symlink removal)
rm .claude/skills/playwright                  # manually delete symlink
shan skills doctor                            # should re-create symlink

# Doctor: new leaf in installed group
mkdir -p ~/.claude/skills-library/ts/newchild && echo "..." > ~/.claude/skills-library/ts/newchild/SKILL.md
shan skills doctor                            # should symlink new leaf
```
