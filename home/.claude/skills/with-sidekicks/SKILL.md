---
name: with-sidekicks
description: A mode the user switches on to hand side work to one named sidekick, `sonnet` (a Claude Sonnet subagent), `astra` (gpt-6-astra through codex) or `sol` (gpt-6.1-sol through codex), to stretch the Claude quota. Use when the user invokes with-sidekicks with one of those names, says to use Sonnet, Astra or Sol for side tasks, reviews or second opinions, or says to stop; and, while the mode is on, before every dispatch of a worker, fork or subagent, and before taking on yourself a self-contained task that is not the main line of the chat.
---

# Sidekicks

A mode, not a task. `/with-sidekicks <name>` turns it on with one sidekick:

| Name     | Model                 | Runs through                                     |
| -------- | --------------------- | ------------------------------------------------ |
| `sonnet` | Claude Sonnet, xhigh  | the Agent tool, `subagent_type: "sonnet-xhigh"`  |
| `astra`  | `gpt-6-astra`, ultra  | `codex exec`, on the user's OpenAI subscription  |
| `sol`    | `gpt-6.1-sol`, ultra  | `codex exec`, on the user's OpenAI subscription  |

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

The mode is for a Claude lead session. A Codex lead uses its `astra` launch when
`gate-astra-review` requires a new independent review. A worker assigned a task
does that task and dispatches nothing; role follows the assignment, not the
harness name.

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

## Launching `sonnet`

- Write the brief to a file, then call the Agent tool with
  `subagent_type: "sonnet-xhigh"` and the brief's path as its prompt. It runs
  in the background; its completion notice brings you back.
- Pass `isolation: "worktree"` when it edits a checkout that other agents are
  editing. Otherwise the brief names the files it owns and has it commit only
  those, by pathspec.
- To correct a run, send it the correction with `SendMessage`. It keeps its
  context.

## Launching `astra` and `sol`

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

Say in one line in the chat what each sidekick is doing.

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
