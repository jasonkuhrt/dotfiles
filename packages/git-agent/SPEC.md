# git-agent Specification

An embedded Git CLI extension that controls agent access to git write operations.

## Commands

```
git agent              Status (show current gates)
git agent r            Read-only — block all write operations
git agent off          Alias for r
git agent w            Read-write — allow all write operations
git agent on           Alias for w (v1: identical to w)

git agent on commit    Allow commits
git agent on push      Allow pushes (cascade: also enables commit)
git agent off commit   Block commits (cascade: also blocks push)
git agent off push     Block pushes

git agent install      Set up hooks + CLAUDE.local.md
git agent uninstall    Remove all traces from this repository
```

## State Model

Two gates: `commit` and `push`. Each is `on` or `off`.

**Cascades:**

- `on push` → also enables commit (can't push without committing)
- `off commit` → also disables push (can't push without committing)

**Default after install:** both gates `off`.

## Auto-Install

All commands (except `uninstall` and bare status) idempotently run install first.

## Install Behavior

1. Create `.git/agent-hooks/` with `pre-commit` and `pre-push` wrapper scripts
2. Save original `core.hooksPath` to `.git/agent-original-hookspath`
3. Set `core.hooksPath` to `.git/agent-hooks/`
4. Create `.git/agent-state` with default gates
5. Write rules to `CLAUDE.local.md`

Wrapper hooks chain to original hooks (husky, etc.) for non-agent invocations
and after passing the gate check for agents.

## Uninstall Behavior

1. Restore original `core.hooksPath`
2. Remove `.git/agent-hooks/`, `.git/agent-state`, `.git/agent-original-hookspath`
3. Remove git-agent section from `CLAUDE.local.md`

## Agent Detection

Hooks check the `CLAUDE_CODE` environment variable. If unset, the caller is
not an agent and passes through to original hooks unconditionally.

## Blocking Message

When an agent hits a closed gate, the hook emits a strongly-worded message:

- States the operation is blocked
- Explains there is no point retrying
- Warns the agent about misalignment
- Shows the human command to change the setting
- Shows current gate state

## CLAUDE.local.md Rules

When any gate is closed, the git-agent section includes:

1. A rule forbidding the agent from running `git agent` commands itself
2. A table showing current gate states
3. Instruction to stop and inform the human if a blocked operation is needed

When all gates are open, the section is removed entirely.

## Completions

Fish completions support both `git-agent` (direct) and `git agent` (subcommand)
with full two-level tab completion (command → target).

## File Layout

```
.git/agent-state               Gate state (commit=on/off, push=on/off)
.git/agent-hooks/pre-commit    Hook wrapper (chains to original)
.git/agent-hooks/pre-push      Hook wrapper (chains to original)
.git/agent-original-hookspath  Saved core.hooksPath for restore
CLAUDE.local.md                Agent rules (managed section between markers)
```
