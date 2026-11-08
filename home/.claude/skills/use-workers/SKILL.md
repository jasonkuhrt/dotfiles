---
name: use-workers
description: >-
  Weigh how to do or hand off work using its kind, size, fixed cost, existing
  context, steering, checking, quota windows, speed and effort. Use when
  invoking /use-workers or asking for workers without naming a model, or
  considering a handoff. Pick the engine, effort and run count and explain
  why in one line; a name is a rare override.
---

# Workers

`/use-workers`, or words asking for workers without a name, is the normal
case: weigh the considerations, pick the engine, effort and number of runs,
and say the pick in one line. A name is the rare override. Jason,
2026-11-08: "imo i shouldn't have to name the model anymore 99% of the time
whne i use useworkers skill".

Choose in the context you hold. Jason, 2026-11-08: "this decision tree needs
to stop over steering, it has to explain things to consider and why and be
useful as things to cover but not override agent's context and agency".
The considerations below help cover the decision; they are not a routing
tree. "sonnet, jev, sol, opus, all are appropiate at different times".
State the pick and the considerations that decided it in one line.

The routing hard lines are Jason's explicit ones: use a worker he names;
Astra runs only when he names it; before money is spent on more than one or
two PRs or workers at once, state the scale, concurrency and cost and wait
for his yes. "i never want astra used unless I asked for it explicitly"
(2026-11-05). A rule that gets in the way of good judgment is named to him:
"if any of my rules contradict or make difficult u doing the right thing u
need to speak up" (2026-11-08).

Effort is weighed for the work, not fixed by the engine.

| Engine | Useful strengths | Quota and handoff cost | Route |
| --- | --- | --- | --- |
| Jev | Typed judgments over supplied evidence | TypeSafe quota; supplied state, no conversation | `typesafe` (`typesafe-ai`) |
| Sonnet | Fully briefed work; easy steering in an app session | Claude quota; fresh context and result checking | Claude app or Agent tool; Conductor: `claude`, `sonnet-5-5-1m` |
| Sol | Fully briefed work, bulk reads, mechanical edits and reviews | OpenAI quota, no Claude quota; fresh context and result checking | `gpt-6.1-sol`; Conductor: `codex`, `gpt-6.1-sol` |
| Opus | Chat context, taste and design; lead, inheriting fork or subagent | Claude quota; an inheriting fork can reuse context | Lead or Claude session/Agent tool, using the available Opus model |
| Astra | A reasoning worker or reviewer when Jason names it | OpenAI quota; fresh context and result checking | `gpt-6-astra`, only when named; Conductor: `codex`, `gpt-6-astra` |

How it launches depends on where the lead runs; see
[Where you run](#where-you-run). `gate-peer-review` owns whether existing
review is sufficient and what needs review; the repository's `review`
skill owns criteria. This skill supplies launch and result mechanics.
The lead is the session steering the work, Claude or Codex; a worker's
assignment determines its role, not its harness.

## Considerations and why they matter

1. **Kind of work.** Jev returns typed judgments over supplied evidence;
   `typesafe-ai` explains its contracts. Sol and Sonnet are useful for fully
   briefed work that needs none of the chat's context. Opus can carry the
   chat's story, taste and design. Each is good at different work at a
   different price; this is information, not a kind-to-engine mapping.
2. **Size.** Compute tokens read and written as bytes divided by four and
   account for the proposed runs. This is most of the work's cost.
3. **Fixed cost of a run.** Every run pays a baseline before useful work,
   then the brief and files it rereads. A Heartbeat Claude session measured
   about 117k baseline tokens on 2026-11-08 (`get_usage`): MCP tool schemas
   35k, system tools 30k, memory index 31k, system prompt 11k, skills 10k.
   A subagent's baseline is likely different and remains unmeasured. Compare
   repeated overhead with each run's useful work: similar work split many
   ways can mostly buy overhead. Shrinking the baseline helps every run.
   Jason's "19? no unless they are fucking short like 50k tkoens" illustrates
   this concern, not a threshold authorizing fan-out.
4. **Context the lead already holds.** The lead or an inheriting fork may
   be cheapest for work that depends on the chat's state: a fresh worker
   rebuilds that context from a brief and its own reads.
5. **Steering.** Consider whether Jason or the lead will want to talk to
   the run while it works. A Claude app session is easiest to chat with;
   a `codex exec` run takes replies through its `codex://` thread or stop
   and resume; Jev takes none. Steering an unreachable run can cost a restart.
   Jason, 2026-11-08: "sonnet or opus have benefit of being easier to chat
   with iiuc, so that's another tradeoff in the decision tree".
6. **Checking the result.** Someone reviews what a worker returns. When
   checking costs about as much as doing, handing off saves nothing.
7. **Quota and its windows.** Read Claude's percent used per window and
   reset times from desktop `get_usage` when available; state unavailable
   readings. Sol and Astra spend OpenAI quota; Jev spends TypeSafe's. Every
   window resets: near a cap, that pool is best reserved for what nothing
   else can do; work nobody waits on can wait for a reset, while room near
   reset can be cheap. Compute available readings rather than guessing.
8. **Speed against cost.** Parallel runs buy elapsed time with duplicated
   fixed cost. Unless someone is waiting or other work is blocked, fewer
   deeper runs, or staying in the lead, are usually worth more. Jason,
   2026-11-08: "the overhead of running each should be a fraction of the
   expected token cost"; "unless speed is specially important then its
   likely better to have fewer deeper sub agents if sub agents at fucking all".
9. **Effort.** Weigh the reasoning the work needs. Extra effort costs more
   and is wasted on mechanical work. Pass the chosen effort where supported.

Compute the available size and quota numbers; do not build a tool for this
calculation. Such a tool is a design for Jason to approve.

- Bad: similar classification work nobody was waiting on, split across
  19 Opus subagents, each rereading the same rules at 99% weekly usage.
- Good: Jev buckets the files, one deep Sol run reads and writes the targets,
  and the lead spends its tokens on the brief.

### Four questions about independent side work

These questions make context and steering costs visible; they do not decide
the engine or take the decision away from the lead.

1. **Can it be briefed in full now?** Include the question, files, done
   condition and report shape. Missing chat state makes a fresh run rebuild it.
2. **Is it steerable from here?** A long run can work well when the lead
   can reach it. Jason, 2026-11-01: "the one run of minutes limitation is
   only if the main chat would be blocked from steering".
   - Bad: campaign units hidden in `claude --bg` sessions because the lead
     read "short-lived" as ruling out long app sessions.
   - Good: app sessions the lead can message and Jason can open.
3. **Is its result an input or the main line?** Facts, measurements,
   findings and an approved edit list are easier to brief than the thing
   the chat is still designing.
4. **Does it need a design call?** API, abstraction, naming, taste and text
   the user will read benefit from the lead's context and final edit.

Claude's Agent tool runs a subagent on the lead's model unless `model` is
set. When the choice is Sonnet, pass `model: "sonnet"` explicitly.

## Examples

- A worker measures four tasks' peak memory while the lead chooses the
  concurrency budget using the result and the chat's constraints.
- A worker offers a second opinion on a WASM build's fit for Cloudflare
  Workers while the lead keeps the library API design.
- The lead writes an approved Linear edit list; a worker applies it when
  the saved work exceeds the handoff and checking costs.

## Where you run

Launch each worker with the first-class agent feature of the place the lead
runs in: the one that lets the lead steer it and the user see it. In
Conductor, Conductor launches every worker; in the Claude desktop app, the
app launches a `sonnet` one. Elsewhere on a Mac, a worker on the lead's own
harness is that harness's sub-agent, and a worker on the other harness runs
as that harness's CLI in a subprocess:

| Where the lead runs                                  | `sonnet`                        | `astra`, `sol`           |
| ---------------------------------------------------- | ------------------------------- | ------------------------ |
| A Conductor cloud workspace (`CONDUCTOR_IS_LOCAL=0`) | a Conductor session             | a Conductor session      |
| The Claude desktop app, as a Claude lead             | an app session: `start_session` | subprocess: `codex exec` |
| A Mac terminal, as a Claude lead                     | sub-agent: the Agent tool       | subprocess: `codex exec` |
| A Mac, as a Codex lead                               | subprocess: `claude -p`         | sub-agent: `spawn_agent` |

A lead is in the Claude desktop app when its tools include
`mcp__ccd_session__start_session`. A Mac terminal covers Claude Code in a
shell and a local Conductor workspace, which gets no Conductor API URL or
token.

- Bad (2026-10-31): a lead in the Claude app sent its Sonnet workers to the
  Agent tool, which the app blocks from writing outside the lead's own
  worktree, then to `claude --bg` sessions outside the app.
- Good: one app session per worker, each in its own worktree, which the lead
  steers with `SendMessage` and Jason opens from his sidebar.
  A Codex lead may instead make the worker a peer thread (`dispatch-codex-peer`)
  when the user should watch or steer it in its own chat.

Claude reviews dispatched from Codex follow the shared independent-review
workflow in `~/.codex/skills/.shared/independent-review/workflow.md`: prefer
an app-hosted session, otherwise an interactive CLI session opened in the app.
Name them `Via Codex – <short title>`. This review-specific route takes
precedence over the generic `claude -p` worker route above and below.

## Every worker stays reachable

Jason, 2026-11-01, after the campaign's cloud units kept pushing and taking
PRs out of draft once he had paused it: "routine fired should not be used for
campiagns, that would be iuc better as a loop by u with delay? if we can msg
cloud then we can at least force stop them that way via msg request".

- A worker is a session the lead can stop: an app session, a Conductor
  session, a `codex exec` run, a `claude --bg` session (`claude stop <id>`),
  or a cloud session the app starts (`start_session` with `target: "cloud"`),
  which takes a message but can't answer, so its PR and transcript confirm
  the stop.
- Never a routine run (RemoteTrigger). Once it fires, no message reaches it
  and no tool stops it; only its claude.ai page does. RemoteTrigger's `run`
  ignores a body's events and starts a fresh session on the stored prompt.
- The lead paces its workers with its own loop: a background watcher, or
  `/loop` with a wakeup. A routine is for a schedule, never for a worker.
- When the app refuses a cloud start (Remote Control, below), ask Jason in one
  line or use Conductor.
- Bad (2026-11-01): nine campaign units launched as one-time routines a few
  minutes out. After the pause, five kept pushing and undrafting PRs, and
  only Jason could stop them, one claude.ai page at a time.
- Good: the same units as cloud sessions the app starts, each in
  `ListAgents`, stopped by one message each.

## Many workers at once

Jason, 2026-11-01, after his "use ci for running checks instead of gating on
my machine resources" became a rule in every worker's brief: "the bug was
that i was never made awares that i was authorizing ci for more than 1 or 2
prs. i did not realize i was authorizing dozens of prs that would be
concurrent and cost dollars very fast."

- Before a launch or a ruling puts more than one or two workers on paid
  compute (CI, cloud sessions), say how many run at once and what that costs,
  and wait for his yes.
- Bad: "CI proves everything" written into the header every worker reads,
  then 17 more units launched that hour, with about 30 PRs running CI's whole
  task set at once.
- Good: "Leaving proof to CI puts the 20 open units on CI at once, each
  unproven head running the full task set. All 20, or these two?"

## Launching in Conductor

A worker is a new session in the lead's own workspace, so it shares the
workspace's files and branch, and the user sees it in Conductor's sidebar and
can steer it there.

1. **Brief.** Write the brief to `.context/workers/<name>-<slug>.brief.md` in
   the workspace (`.context` is Conductor's uncommitted handoff folder). It
   names its report file, `.context/workers/<name>-<slug>.report.md`, which
   the worker writes before it ends its turn.
2. **Launch.**

   ```sh
   ws=${CONDUCTOR_WORKSPACE_ID:-$(conductor --json session status \
     "$CONDUCTOR_SESSION_ID" | jq -r .workspaceId)}
   conductor --json session create --workspace "$ws" \
     --agent <agent> --model <model> --effort <effort> \
     --name "<name>: <slug>" \
     --message "Read .context/workers/<name>-<slug>.brief.md and do exactly what it says." \
     > .context/workers/<name>-<slug>.session.json
   ```

   The agent and model come from the table; effort comes from the calculation.
   The result
   holds the session's `id` and its `deepLink`; give the user the link with
   the one line on what the worker is doing. Without the `conductor` CLI,
   the same call is `POST /v0/sessions` with `workspaceId`, `agent`, `model`,
   `effort`, `name` and `message`, authorized with `CONDUCTOR_API_KEY`, or
   with `CONDUCTOR_API_TOKEN` when that is unset.

3. **Wait** in a background shell loop, never a model loop. Poll
   `conductor --json session status <id>` every 30 s. `status` is `idle`,
   `working` or `error`; count `idle` as done only after you have seen
   `working`, since a session reads `idle` until its first message is
   delivered. Stop after 20 minutes to look at it, not to give up on it.
4. **Correct** a running worker with
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
  its model override set to the worker's model, its calculated effort where
  the tool takes one, and `fork_turns: "none"`, since the brief carries what it
  needs. Its final answer comes back to you when it finishes; correct it with
  `send_message`. When the tool's list of model overrides lacks the model,
  launch it with `codex exec` as below.
- **`sonnet`:** Claude Code's CLI in the background:

  ```sh
  claude -p --model sonnet --effort <effort> \
    --permission-mode bypassPermissions --output-format json \
    "<prompt, or: Read <brief's path> and do exactly what it says.>" \
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

## Launching `sonnet` from a Claude lead in the Claude app

- Write the brief to a file. Call `mcp__ccd_session__start_session` with
  `initiation: "user_asked"` for the user's task, `context: "fresh"`,
  `model: "claude-sonnet-5-5"`, the calculated `effort`, a `title`, a short `name`, `prompt`
  `Read <brief's path> and do exactly what it says.` and a `background` of
  at least 80 characters on the goal the work serves.
- Work that ends in its own branch or PR takes `use_worktree: true`. Its
  worktree is cut from the lead's base branch, so a brief that needs another
  base says which (`git switch -c <branch> origin/develop`), or the call
  passes `source_branch`. A review or an opinion takes `use_worktree: false`,
  and its brief says it changes no file but its report.
- Say in one line in the chat what it is doing, with its link,
  `[<title>](#local_<id>)`, from the result.
- Correct it while it runs with `SendMessage` to its `local_…` id. It keeps
  its context.
- When its turn ends, a note brings the lead back with the first 400
  characters of its report; read the report file before acting on it.
- The app refuses a start on a turn that another session's message or an
  automated event began, such as a background watcher's notice. A start that
  comes due then waits for the user's next turn, or for the
  `<side-sessions-event>` turn a finishing worker brings.
- The app also refuses every start while the user is connected over Remote
  Control ("you can start a session only on a message typed in the desktop
  app"). Then a unit that needs no steering launches at once as a CLI
  background session, in its own worktree:
  `claude --bg --name <name> --model sonnet --effort <effort> --permission-mode bypassPermissions "Read <brief's path> and do exactly what it says." < /dev/null`.
  The lead can't message it mid-run (`--resume` starts a copy), so its brief
  says to write a blocking question in its report and stop.
  - Bad (2026-11-01): holding a unit that removes reruns from every other
    worker until the user is back at the desktop.
  - Good: the same unit launched with `claude --bg` on that turn, and one
    line in the chat saying why.

## Launching `sonnet` from a Claude lead in a terminal

- Write the brief to a file, then call the Agent tool with
  `subagent_type: "general-purpose"`, `model: "sonnet"` and calculated `effort`,
  and the prompt `Read <brief's path> and do exactly what it says.` It runs in
  the background; its completion notice brings you back.
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
  -c 'model="<model>"' -c 'model_reasoning_effort="<effort>"' \
  -c 'agents.default_subagent_model="<model>"' \
  -c 'agents.default_subagent_reasoning_effort="<effort>"' \
  -o <scratchpad>/<name>-<slug>.txt \
  "<prompt, or the brief's path>" \
  < /dev/null > <scratchpad>/<name>-<slug>.log 2>&1
```

`<model>` is `gpt-6-astra` for `astra` and `gpt-6.1-sol` for `sol`; `<name>` is
the worker's name, and `<effort>` is the calculated effort.

- Run it in the background (`run_in_background: true`) and keep working; the
  completion notice brings you back.
- `--skip-git-repo-check` is on every command, so a run starts from any
  `<dir>`: a skill folder, a scratchpad, the home directory. Without it,
  Codex refuses any directory that is neither a git repo nor under a trusted
  path in `~/.codex/config.toml`. Jason, 2026-10-28: "they can access for
  example my home dir down i dont have a problem with that at all".
  - Bad: `-C ~/.claude/skills/<skill>` without the flag. The run exited
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
  `model: <model>`, the selected reasoning effort and `session id: <uuid>`. A log
  holding only the stdin line is a hung run, not a slow one.
- A review or an opinion adds `--sandbox read-only`. The config's default is
  full access with no approvals, so any other run can edit and commit: check
  `git status` in `<dir>` after it.
- A review is a read-only `codex exec` whose prompt names the base to diff
  against and has the worker read the change through the repository's
  `review` skill at `small`, when the repository has one (`gate-peer-review`,
  "The reviewer"). Without one,
  `codex exec review --base origin/develop` with the same `-c` flags reviews a
  branch you have no instructions for.
- To correct a run, stop it and continue its session:
  `codex exec resume <session id> "<correction>"`, with the same flags and
  redirects. A fresh `codex exec` starts from nothing.

Say in one line in the chat what each worker is doing. For `astra` and `sol`,
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

A worker takes a brief to the letter, Codex models most of all: a
prohibition at its widest, a permission at its narrowest.

- Write it whole: the question, the files, what done looks like, and the exact
  shape of the report.
- Say what each limit is for, and grant the small exceptions in advance ("an
  `export` keyword on an existing declaration is allowed; list each one").
- State a check against the specific sites ("the two casts at the call site are
  gone"), never as a whole-file count ("grep finds nothing"), which it will
  meet by rewriting unrelated code.
- Say whether other agents are editing the same checkout, and which files the
  worker owns.

## Its result

The report is a claim, not evidence. Check it before it reaches the user or
anything is built on it: read the diff, run the checks it names, and reproduce
a review finding as a red test. Drop what doesn't hold, and tell the user only
what does.
