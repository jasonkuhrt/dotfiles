---
name: astra-sidekicks
description: A mode the user switches on to stretch the Claude quota. Use when the user invokes astra-sidekicks, says to use Astra (gpt-6-astra through codex) for side tasks, reviews or second opinions, or says to stop using it; and, while the mode is on, before every dispatch of a worker, fork or subagent, and before taking on yourself a self-contained task that is not the main line of the chat.
---

# Astra sidekicks

A mode, not a task. It starts when the user invokes this skill, or says the same
thing in words, and holds until the user ends it (`/astra-sidekicks off`, "no
Astra", or words that say so). It survives compaction and handoffs: carry
"astra-sidekicks is on" in whatever you hand yourself.

Its peer `astra-review` holds whether this mode is on or off: before a ping
that puts your work in front of the user, Astra reviews the work and you
resolve every finding. `/astra-sidekicks off` leaves it on; "no Astra" ends
both.

This skill is for a Claude lead session. A Codex agent reading it is the
sidekick: do the task you were given and dispatch nothing.

Why: Astra (gpt-6-astra through the Codex CLI) runs on the user's OpenAI
subscription, so every task it takes is Claude quota saved. It cannot be
messaged mid-run and does not share your context, so it takes only the work
that loses nothing from that.

## The rule

The user's rule, in its final wording:

> **Astra sidekicks.** Send Astra (gpt-6-astra, ultra, via codex) the side
> work: a short-lived discrete task briefed in full up front, a targeted
> review, a second or third opinion, an off-topic one-off. Keep with Claude
> (the lead, or a fork of the lead) the work that advances the chat's story,
> that would gain from the user's steering or from the lead's context, and any
> lead on an API, an abstraction, a library's design or taste. The point is to
> stretch the Claude quota.

Before each piece of work you would hand off or do yourself, apply the test. It
goes to Astra when all four hold:

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

When the test passes, use Astra. Doing it yourself or in a fork spends the
quota this mode exists to save. The one exception is a task you finish in a
couple of tool calls (one grep, one file read), where the brief would cost
more than the task.

## Examples

- Bad: an Astra worker building a run switch whose design the user had just
  approved in the PR. Good: a fork builds it; Astra reviews the fork's diff.
- Bad: a fork measuring four tasks' peak memory with `/usr/bin/time -l` and
  reporting a table. Good: Astra takes the measurement, while a fork, steered
  from the chat, chooses the concurrency budget from it.
- Bad: Astra reworking a library's `Compiler` API. Good: Astra giving a second
  opinion on whether a WASM build fits a Cloudflare Worker's limits.
- Bad: the lead making forty Linear writes itself after the user ruled on
  them. Good: the lead writes the edit list; Astra applies it.

## Launching

```sh
codex exec -C <dir> \
  -c 'model="gpt-6-astra"' -c 'model_reasoning_effort="ultra"' \
  -o <scratchpad>/astra-<slug>.txt \
  "<prompt, or the brief's path>" \
  < /dev/null > <scratchpad>/astra-<slug>.log 2>&1
```

- Run it in the background (`run_in_background: true`) and keep working; the
  completion notice brings you back.
- Name the model and effort on every command. `~/.codex/config.toml` sets
  another default model.
- `< /dev/null` is required. Without it a background run waits forever at
  "Reading additional input from stdin...".
- Read the log's head within about 15 seconds. A live run shows
  `model: gpt-6-astra`, `reasoning effort: ultra` and `session id: <uuid>`. A
  log holding only the stdin line is a hung run, not a slow one.
- A review or an opinion adds `--sandbox read-only`. The config's default is
  full access with no approvals, so any other run can edit and commit: check
  `git status` in `<dir>` after it.
- A review of a branch with no instructions of your own is
  `codex exec review --base origin/develop` with the same `-c` flags. With
  instructions, it is a read-only `codex exec` whose prompt names the base to
  diff against.
- To correct a run, stop it and continue its session:
  `codex exec resume <session id> "<correction>"`, with the same flags and
  redirects. A fresh `codex exec` starts from nothing.
- Say in one line in the chat what each sidekick is doing.

## The brief

Codex workers take a brief to the letter: a prohibition at its widest, a
permission at its narrowest.

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
