---
name: start
description: >-
  Use when the user says "start" with a Linear issue, asks to start work on a
  Linear ticket, or wants a new Codex peer agent launched in the current Codex
  project, usually with Codex App's first-class worktree mode, to work toward a
  draft PR.
---

# Start

Use this skill for `start HEA-1234` style requests: Linear issue context in,
Codex App peer task out.

## Contract

Given one Linear issue or one explicitly described task, start a peer agent in
the **current Codex project**. Do not model each task as a new Codex project.

Keep these concepts separate:

- project: the Codex App project/repo context
- worktree: git/filesystem isolation for a task
- fork: a new session copied from an existing conversation history

Use Codex App's first-class worktree mode when the task needs isolation. A
worktree is not a new project, and a fork is not a worktree.

Do **not** create a sibling project directory and then run `codex app <new-dir>`
as the default flow. That creates the wrong Codex App shape: multiple projects
for one repo.

Do **not** manually run `git worktree add` as the default flow. Codex App already
has a first-class worktree flow that allocates a managed worktree, can carry the
starting diff, and runs the selected environment setup.

Default shape:

- project: same Codex project as the current thread
- worktree: isolated via Codex App's managed worktree mode when needed
- session: new peer task/thread
- fork: only if the new session should inherit this conversation history
- branch: normal `codex/` branch inside the managed worktree
- deliverable: pushed branch plus draft PR for user review

## Workflow

1. Resolve the Linear issue id from the user request.
2. Fetch the issue from Linear. Include title, body, link, visual/Figma links,
   acceptance criteria, and explicit exclusions in the launch prompt.
3. If the issue is visual, tell the agent to open the Figma links and preserve
   attached/inline visuals as implementation targets.
4. Build a prompt that is specific enough for an autonomous agent:
   - identify the issue id and title
   - name the current project/repo and current git branch
   - say to inspect current code before editing
   - say to implement the issue only, commit, push, and open a draft PR
   - say to run the narrowest meaningful checks and report any blockers
   - say not to touch unrelated backlog issues
5. Start the peer in the current Codex project. Prefer Codex App's first-class
   worktree task flow when the task should be isolated from the current checkout.
   Use the app's project/thread/worktree actions rather than opening a different
   workspace path as a new project.
6. If conversation history should be inherited, fork the session. From the CLI,
   the session fork surface is:

   ```bash
   codex fork <session-id> "<prompt>"
   ```

   Use `codex fork --last "<prompt>"` only when the current thread is known to
   be the most recent recorded session for this cwd. Do not guess. Do not use
   CLI fork by itself as a substitute for Codex App worktree mode.
7. Report the task/thread handle or the link/action the user should click.

For a batch of issues, prepare one task prompt per issue and launch each as a
peer task in the same Codex project. Use managed worktrees for filesystem/git
isolation.

For dashboard-style batch starts, the dashboard should expose Codex App task
actions and show the exact prompt before launch. It should not create project
directories, run `codex app <new-dir>`, or manually create worktrees as a side
effect.

## Legacy Project-Directory Launcher

The bundled `scripts/start.ts` and `scripts/dashboard.ts` currently implement
the old hand-rolled project-directory model. Treat them as legacy and do not use
them for the default `start` workflow until they are rewritten around Codex App
project/thread/worktree semantics.

## Dashboard Launcher

Use a dashboard only when the user wants to review a batch of task prompts before
starting them. The desired manifest shape is:

```json
{
  "actions": [
    {
      "id": "HEA-1234",
      "title": "Dock controls",
      "project": "/absolute/current/project",
      "state": "Ready",
      "prompt": "Full Codex prompt"
    }
  ]
}
```

The dashboard must bind to `127.0.0.1`, print `DASHBOARD <url>` on startup, and
report that URL in chat under:

**Dashboard**
[Open](...)

The dashboard is intentionally allowlist-shaped: actions come from the manifest
or built-in dummy data, prompts are visible before launch, and the route does not
accept arbitrary shell commands.
