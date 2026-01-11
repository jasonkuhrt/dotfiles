# Git Dashboard Design

## Purpose

Quick context when typing `git` with no args. Answer: "Where am I? What's the state?"

## Current Modes

### 1. Trunk Mode

__When:__ On trunk branch

```
main
  ├─● feat     fish   add npmx function for ...  7065cc6 3h
  ├─● feat     brew   add onefetch, speedtes...  4e9f7bd 4h
  ├─● feat     fish   add weather command        6e194ae 5h
  ├─● feat     fish   add modern Unix abbrev...  b1a2bc3 5h
  └─● fix      fish   git dashboard column a...  6cba1eb 5h
```

* Vertical commit history (last 5)
* Conventional commit parsing: `type  scope  message  hash  time`
* Red node + "← remote" marker if local is ahead of origin

### 2. Feature Branch Mode

__When:__ Not on trunk

__Current (complex horizontal railway):__

```
main ──●──┬──●──●
          └──●──●──●
          │        │
          │        └─ last commit message
          │           abc1234 2h
          └───────────── feat/my-branch ↑3 ↓1 origin
```

__Proposed (unified vertical):__

Case A: Ahead of trunk only (trunk hasn't moved)

```
     feat/my-branch ↑2
     ├─● feat     auth   add login endpoint       abc1234 2h
     ├─● fix      auth   handle token expiry      def5678 3h
 ┌─●─┘
 │─●
 │─●

 ◆ forked 3d ago
```

* Branch commits grow up from fork
* Trunk commits descend into history
* Fork node: `◆` + color to pop

Case B: Trunk has also moved (divergence)

```
trunk  feat/my-branch ↑2
  ├●   ├─● feat     auth   add login endpoint       abc1234 2h
  ├●   ├─● fix      auth   handle token expiry      def5678 3h
  ├●───┘
  │─●
  │─●

  ◆ forked 3d ago
```

* Trunk left: minimal nodes (new commits since fork)
* Branch right: full commit details
* Stem descends into history
* Fork node: `◆` + color

### 3. Dirty Overlay

__When:__ Uncommitted changes exist (either mode)

```
Staged (2)
  M file1.ts
  A file2.ts

Unstaged (1)
  M file3.ts

Untracked (3)
  U new-file.ts

[railway visualization]
```

---

## Decisions

* __Stem length:__ 3 commits below fork
* __Recent branches:__ Removed
* __Merge base failures:__ Show branch commits only, no fork visualization

## Design Principles

* Scannable in <2 seconds
* Most important info: current branch state
* Secondary: relationship to trunk/remote
