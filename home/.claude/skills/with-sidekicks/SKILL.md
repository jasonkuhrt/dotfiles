---
name: with-sidekicks
description: A mode the user switches on to hand side work to one named sidekick, `sonnet` (a Claude Sonnet subagent), `astra` (gpt-6-astra through codex) or `sol` (gpt-6.1-sol through codex), to stretch the Claude quota. Use when the user invokes with-sidekicks with one of those names, says to use Sonnet, Astra or Sol for side tasks, reviews or second opinions, or says to stop; and, while the mode is on, before every dispatch of a worker, fork or subagent, and before taking on yourself a self-contained task that is not the main line of the chat.
---

# Sidekicks

A mode, not a task. `/with-sidekicks <name>` turns it on with one sidekick:

| Name     | Model         | Effort | Conductor agent and model  |
| -------- | ------------- | ------ | -------------------------- |
| `sonnet` | Claude Sonnet | xhigh  | `claude`, `sonnet-5-5-1m`  |
| `astra`  | `gpt-6-astra` | ultra  | `codex`, `gpt-6-astra`     |
| `sol`    | `gpt-6.1-sol` | ultra  | `codex`, `gpt-6.1-sol`     |

How it launches depends on where the lead runs; see
[Where you run](#where-you-run).

With no name it is `astra`. One sidekick is on at a time: invoking the skill
again with another name switches to it. The mode holds until the user ends it
(`/with-sidekicks off`, or words that say so; "no Astra" ends it while it names
`astra`). It survives compaction and handoffs: carry "with-sidekicks is on:
<name>" in whatever you hand yourself.

Its peer `gate-astra-review` owns whether existing review is sufficient and when
new review is needed, whether this mode is on or off and whichever sidekick it
names. Its reviews always run on Astra, through the `astra` launch below; this
skill supplies launch mechanics, not another handoff review.
`/with-sidekicks off` leaves that gate on; "no Astra" ends both.

The lead is whichever session runs the mode, Claude or Codex. A Codex lead also
uses the `astra` launch when `gate-astra-review` requires a new independent
review. A worker assigned a task does that task and dispatches nothing; role
follows the assignment, not the harness name.

Why: every task a sidekick takes is off the lead's model. Astra and Sol run on
the user's OpenAI subscription, so they spend no Claude quota at all; Sonnet
spends Claude quota, at a smaller model than the lead's. None of them shares
your context, so they take only the work that loses nothing from that.

## The rule

The user's rule, in its final wording. He said it of Astra; the mode applies it
to whichever sidekick it names:

> **Astra sidekicks.** Send Astra (gpt-6-astra, ultra, via codex) the side
> work: a short-lived discrete task briefed in full up front, a targeted
> review, a second or third opinion, an off-topic one-off. Keep with Claude
> (the lead, or a fork of the lead) the work that advances the chat's story,
> that would gain from the user's steering or from the lead's context, and any
> lead on an API, an abstraction, a library's design or taste. The point is to
> stretch the Claude quota.

Before each piece of work you would hand off or do yourself, apply the test. It
goes to the sidekick when all four hold:

1. **Briefed in full now.** You can write the whole brief this turn: the
   question, the files, what done looks like, the report's shape. Nothing in it
   waits on the user.
2. **One run.** It finishes in one run of minutes, not a loop of rounds you
   would steer.
3. **An input, not the line.** Its result feeds your work (a fact, a
   measurement, a finding, an opinion, an applied edit list the user has
   already ruled on). It is not the thing the chat is building.
4. **No design call.** It sets no API, abstraction, library design, name or
   other matter of taste, and it writes no text the user reads (issue
   descriptions, docs, templates). You write or finally edit that text.

When the test fails, the work stays with Claude: you, or a fork of you (Agent
tool, `subagent_type: "fork"`) when it should run in the background while the
chat goes on.

When the test passes, use the sidekick. Doing it yourself or in a fork spends
the quota this mode exists to save. The one exception is a task you finish in a
couple of tool calls (one grep, one file read), where the brief would cost more
than the task.

## Examples

- Bad: a sidekick building a run switch whose design the user had just approved
  in the PR. Good: a fork builds it; the sidekick reviews the fork's diff.
- Bad: a fork measuring four tasks' peak memory with `/usr/bin/time -l` and
  reporting a table. Good: the sidekick takes the measurement, while a fork,
  steered from the chat, chooses the concurrency budget from it.
- Bad: a sidekick reworking a library's `Compiler` API. Good: a sidekick giving
  a second opinion on whether a WASM build fits a Cloudflare Worker's limits.
- Bad: the lead making forty Linear writes itself after the user ruled on
  them. Good: the lead writes the edit list; the sidekick applies it.

## Where you run

Launch each sidekick with the first-class agent feature of the place the lead
runs in. In Conductor, Conductor launches every sidekick. On a Mac, a sidekick
on the lead's own harness is that harness's sub-agent, and a sidekick on the
other harness runs as that harness's CLI in a subprocess:

| Where the lead runs                                  | `sonnet`                    | `astra`, `sol`                |
| ---------------------------------------------------- | --------------------------- | ----------------------------- |
| A Conductor cloud workspace (`CONDUCTOR_IS_LOCAL=0`) | a Conductor session         | a Conductor session           |
| A Mac, as a Claude lead                              | sub-agent: the Agent tool   | subprocess: `codex exec`      |
| A Mac, as a Codex lead                               | subprocess: `claude -p`     | sub-agent: `spawn_agent`      |

A Mac covers the Claude app, the Codex app and a local Conductor workspace,
which gets no Conductor API URL or token.
A Codex lead may instead make the sidekick a peer thread (`dispatch-codex-peer`)
when the user should watch or steer it in its own chat.

## Launching in Conductor

A sidekick is a new session in the lead's own workspace, so it shares the
workspace's files and branch, and the user sees it in Conductor's sidebar and
can steer it there.

1. **Brief.** Write the brief to `.context/sidekicks/<name>-<slug>.brief.md` in
   the workspace (`.context` is Conductor's uncommitted handoff folder). It
   names its report file, `.context/sidekicks/<name>-<slug>.report.md`, which
   the sidekick writes before it ends its turn.
2. **Launch.**

   ```sh
   ws=${CONDUCTOR_WORKSPACE_ID:-$(conductor --json session status \
     "$CONDUCTOR_SESSION_ID" | jq -r .workspaceId)}
   conductor --json session create --workspace "$ws" \
     --agent <agent> --model <model> --effort <effort> \
     --name "<name>: <slug>" \
     --message "Read .context/sidekicks/<name>-<slug>.brief.md and do exactly what it says." \
     > .context/sidekicks/<name>-<slug>.session.json
   ```

   The agent, model and effort come from the table at the top. The result
   holds the session's `id` and its `deepLink`; give the user the link with
   the one line on what the sidekick is doing. Without the `conductor` CLI,
   the same call is `POST /v0/sessions` with `workspaceId`, `agent`, `model`,
   `effort`, `name` and `message`, authorized with `CONDUCTOR_API_KEY`, or
   with `CONDUCTOR_API_TOKEN` when that is unset.
3. **Wait** in a background shell loop, never a model loop. Poll
   `conductor --json session status <id>` every 30 s. `status` is `idle`,
   `working` or `error`; count `idle` as done only after you have seen
   `working`, since a session reads `idle` until its first message is
   delivered. Stop after 20 minutes to look at it, not to give up on it.
4. **Correct** a running sidekick with
   `conductor message create --session <id> --message-file <file>`. The
   message is steered into its running turn. Never `conductor session cancel`:
   it drops queued messages.
5. **Read** the report file. When it is missing, read the session's last
   messages with `conductor --json session message <id> --limit 20`,
   redirected to a file.
6. **Archive** the session with `conductor session archive <id>` once you have
   checked its result.

A review or an opinion says in its brief that it changes no file except its
report: a Conductor session has no read-only switch.

## Launching from a Codex lead on a Mac

- **`astra`, `sol`:** Codex's `spawn_agent` (skill `dispatch-codex-sub`), with
  its model override set to the sidekick's model, its effort to `ultra` where
  the tool takes one, and `fork_turns: "none"`, since the brief carries what it
  needs. Its final answer comes back to you when it finishes; correct it with
  `send_message`. When the tool's list of model overrides lacks the model,
  launch it with `codex exec` as below.
- **`sonnet`:** Claude Code's CLI in the background:

  ```sh
  claude -p --agent sonnet-xhigh --model sonnet --effort xhigh \
    --permission-mode bypassPermissions --output-format json \
    "<prompt, or the brief's path>" \
    < /dev/null > <scratch>/sonnet-<slug>.json 2> <scratch>/sonnet-<slug>.log
  ```

  Call it by its plain name, `claude`, so whatever the user's machine puts on
  that name applies, such as a launcher that picks which account runs it.

  The JSON's `result` is its final message and `is_error` says whether it
  failed; a usage limit shows there as an error result. Correct it with the
  same command, adding `--resume <session_id>` and the correction as the
  prompt.
  `bypassPermissions` because nobody is there to approve its tools: the brief
  names the files it owns, and a review's brief says it changes no file but its
  report.

## Launching `sonnet` from a Claude lead on a Mac

- Write the brief to a file, then call the Agent tool with
  `subagent_type: "sonnet-xhigh"` and the brief's path as its prompt. It runs
  in the background; its completion notice brings you back.
- Pass `isolation: "worktree"` when it edits a checkout that other agents are
  editing. Otherwise the brief names the files it owns and has it commit only
  those, by pathspec.
- To correct a run, send it the correction with `SendMessage`. It keeps its
  context.

## Launching `astra` and `sol` with `codex exec`

A Claude lead on a Mac launches them this way, and so does a Codex lead whose
`spawn_agent` can't take the model.

```sh
codex exec -C <dir> --skip-git-repo-check \
  -c 'model="<model>"' -c 'model_reasoning_effort="ultra"' \
  -c 'agents.default_subagent_model="<model>"' \
  -c 'agents.default_subagent_reasoning_effort="ultra"' \
  -o <scratchpad>/<name>-<slug>.txt \
  "<prompt, or the brief's path>" \
  < /dev/null > <scratchpad>/<name>-<slug>.log 2>&1
```

`<model>` is `gpt-6-astra` for `astra` and `gpt-6.1-sol` for `sol`; `<name>` is
the sidekick's name.

- Run it in the background (`run_in_background: true`) and keep working; the
  completion notice brings you back.
- `--skip-git-repo-check` is on every command, so a run starts from any
  `<dir>`: a skill folder, a scratchpad, the home directory. Without it,
  Codex refuses any directory that is neither a git repo nor under a trusted
  path in `~/.codex/config.toml`. Jason, 2026-10-28: "they can access for
  example my home dir down i dont have a problem with that at all".
  - Bad: `-C ~/.claude/skills/worth-owning` without the flag. The run exited
    at once with "Not inside a trusted directory", and the lead relaunched
    it from another directory by hand.
  - Good: the same `-C`, with the flag, starting on the first try.
- Name the model and effort on every command. `~/.codex/config.toml` sets
  another default model.
- The two `agents.default_subagent_*` flags hold for any sub-agents the run
  splits its task across. Without them those run on the config's default
  sub-agent model, and part of the task is done by a model nobody chose.
- `< /dev/null` is required. Without it a background run waits forever at
  "Reading additional input from stdin...".
- Read the log's head within about 15 seconds. A live run shows
  `model: <model>`, `reasoning effort: ultra` and `session id: <uuid>`. A log
  holding only the stdin line is a hung run, not a slow one.
- A review or an opinion adds `--sandbox read-only`. The config's default is
  full access with no approvals, so any other run can edit and commit: check
  `git status` in `<dir>` after it.
- A review is a read-only `codex exec` whose prompt names the base to diff
  against and has the sidekick read the change through the repository's
  `review` skill at `small`, when the repository has one (`gate-astra-review`,
  "New independent reviews use Astra"). Without one,
  `codex exec review --base origin/develop` with the same `-c` flags reviews a
  branch you have no instructions for.
- To correct a run, stop it and continue its session:
  `codex exec resume <session id> "<correction>"`, with the same flags and
  redirects. A fresh `codex exec` starts from nothing.

Say in one line in the chat what each sidekick is doing. For `astra` and `sol`,
the line ends with the run's link, `codex://threads/<session id>`, taking the
session id from the log's head. The link opens the run in the Codex Desktop app,
where the user can read it and reply to it, while it runs or after. Jason,
2026-10-29, of sessions a Claude lead starts: "make codex session that are not
blocked from me accessing".

- Bad: "Astra is researching agent messaging." The run exists only in a log file.
- Good: "Astra is researching agent messaging:
  `codex://threads/01a189e6-d1ba-7772-9c62-5b95e6f36a98`." The user opens it,
  or asks the lead to, which runs `open "codex://threads/<session id>"`.

To message a run that is still open, see `codex queue --thread <session id>
--message <text>`: it starts the thread's next turn when the thread is idle.

## The brief

A sidekick takes a brief to the letter, Codex models most of all: a
prohibition at its widest, a permission at its narrowest.

- Write it whole: the question, the files, what done looks like, and the exact
  shape of the report.
- Say what each limit is for, and grant the small exceptions in advance ("an
  `export` keyword on an existing declaration is allowed; list each one").
- State a check against the specific sites ("the two casts at the call site are
  gone"), never as a whole-file count ("grep finds nothing"), which it will
  meet by rewriting unrelated code.
- Say whether other agents are editing the same checkout, and which files the
  sidekick owns.

## Its result

The report is a claim, not evidence. Check it before it reaches the user or
anything is built on it: read the diff, run the checks it names, and reproduce
a review finding as a red test. Drop what doesn't hold, and tell the user only
what does.
