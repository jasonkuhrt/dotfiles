# Git Mode Control

## CRITICAL

**Check `<tmp>/git-mode.yaml` before any git commit or push.**

## Overview

Controls whether Claude can commit/push via a persistent state file. If file missing, prompt user to set mode before proceeding.

## Modes

**Persistent** (saved to state file):

| Mode          | Commit | Push |
| ------------- | ------ | ---- |
| `commit-push` | Yes    | Yes  |
| `commit`      | Yes    | No   |
| `manual`      | No     | No   |

**One-time** (no state change):

| Option               | Action                    |
| -------------------- | ------------------------- |
| `commit (once)`      | Commit this time only     |
| `commit+push (once)` | Commit and push this time |

## State File

Location: `<tmp>/git-mode.yaml`

```yaml
mode: commit-push
```

## Steps

1. Read `<tmp>/git-mode.yaml`
2. If missing or mode blocks action -> AskUserQuestion with exact options below
3. If persistent mode chosen -> **create dir + write file using Write tool**, then proceed:
   ```bash
   mkdir -p .clauding/git_mode-control
   ```
   Then use Write tool to create `.clauding/git_mode-control/git-mode.yaml` with content:
   ```yaml
   mode: <chosen-mode>
   ```
4. If one-time option chosen -> proceed without writing

## AskUserQuestion options

- when wanting to just commit, present just commit options
- when wanting to just push, present just push options
- when wanting to commit+push, present combo options

| Label                      | Description                                  | Action                       |
| -------------------------- | -------------------------------------------- | ---------------------------- |
| `commit (once)`            | Commit this time only                        | Proceed, no file change      |
| `commit+push (once)`       | Commit and push this time only               | Proceed, no file change      |
| `commit (enter mode)`      | Commit and allow more going forward          | Write `mode: commit` to file |
| `commit+push (enter mode)` | Commit and push and allow more going forward | Write `mode: commit-push`    |
