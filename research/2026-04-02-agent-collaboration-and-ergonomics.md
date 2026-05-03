# Agent Collaboration and Repo Ergonomics

## Core Model

Collaborate with agents as if the repo were a small API:

- one intent = one canonical command
- names describe the contract, not the implementation
- docs, scripts, and runtime all agree
- hidden shell state is not required
- failures are fast, local, and specific

The biggest thing to optimize for is first-command success. If a workflow matters, a new agent should be able to spot the right command quickly and trust that it is the one real path.

## Public Workflow Shape

The clean model is:

- `dev:app:x` means one app only, no dependency guarantee
- `dev:stack:x` means an integration-ready composed runtime
- `test:e2e` attaches to a running stack
- `test:e2e:fresh` can exist later if a hermetic boot path is worth the cost

What to avoid:

- multiple overlapping public commands for the same intent
- convenience aliases that obscure which path is canonical
- env loading or runtime setup that differs across near-identical scripts
- docs that describe a softer or more magical workflow than the scripts actually support

## Logging Contract

Logging should follow ownership.

- `dev:app:x` starts one app and has no shared log contract
- `dev:stack:x` owns exactly one canonical shared log
- `dev:stack:x:logs` tails that exact shared log

Filesystem rule:

- `.clauding/dev-stacks/x.log`

For Heartbeat specifically, the ideal shape is:

- `dev:app:api`
- `dev:app:heartbeat`
- `dev:app:inngest`
- `dev:stack:heartbeat`
- `dev:stack:heartbeat:logs`
- `.clauding/dev-stacks/heartbeat.log`

Negative rules matter too:

- no generic `dev:logs`
- no repo-wide rule that "all dev commands write here"
- no app command that silently participates in stack logging

## E2E Note

For long-lived local E2E development, attaching to a dev stack is usually the right default. That path should be fast to start, stable to keep running, and boring to reason about.

Disabling HMR on a dev server is useful, but it is not the same thing as serving a built artifact. If a truly hermetic path is needed, it should be a separate workflow such as `test:e2e:fresh`, not a hidden mode of the main dev stack.

## How To Prompt Agents Well

The best handoffs usually include:

- the goal
- the current diagnosis
- the desired naming or contract
- the exact files to read first
- hard constraints
- concrete deliverables

Agents are weak at social inference and strong at explicit contracts. If the repo and prompt make the contract obvious, progress is fast. If the repo presents several nearly-right paths, time gets spent proving which one was intended.

## Agent Ergonomics Rubric

Use this checklist when deciding whether a repo workflow is agent-friendly:

1. Can a new agent tell the canonical command in under 30 seconds?
2. Does that command work without inherited shell state?
3. Is there exactly one public name per important workflow?
4. Do docs describe the same workflow the scripts implement?
5. If it fails, does the error say what prerequisite is missing?

## Practical Rule

Optimize for clarity over convenience. A repo is collaborative when the obvious command is the right command.
