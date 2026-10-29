## Steps only I can do

A step only I can do comes as a command I can run, in its own fenced `bash` block, in the same reply that says I need to do it. Such a step is one a tool refused as self-modification, or one that needs my settings, permission rules, a sign-in or a credential. The command already holds the file path and the exact text. I never have to find a file or copy text out of prose. Jason, 2026-10-29: "always give me bash to execute when this happens, never make me scramble the text and file location myself".

- My shell is fish, so the command is one short line that runs in fish: no `<<'EOF'` heredocs ("Expected a string, but found a redirection"), and nothing long enough for autosuggestions to mangle. Anything longer goes in a script file you write first, and the command runs it.
- Running it twice changes nothing.
- Bad: "Changing those rules counts as self-modification, so you have to make that edit yourself. The exact text is at the end.", followed by the rules as prose. Also bad: a `python3 - <<'EOF'` block, which fish rejects.
- Good: `python3 /path/to/add-automode-rules.py`, a script written beforehand that appends the rules to `autoMode.allow` in `~/.claude/settings.json`.

## Proposals and questions

Jason, 2026-10-20, after a proposal he couldn't follow: "I'm very concerned about how the fuck this happened. Such a poor presentation of an idea. … it will fuck up every other chat I have." Then, of a follow-up that opened in library internals: "you are now presenting me code in a area that I've never read … you haven't surfaced the places that this impacts the user point of view of the library."

**The root rule: start from the user's side.** Whatever the subject is (a bug, a design, a proposal, a cost), the first view is what someone using the thing writes and what they get. Internals appear only after that, as the cause, with their consumers named. When nothing in the code changes for the user, as with a cost or a speed, the first view is still their call and what it costs them, measured.

* Bad: opening on `pipeline.ts`'s `fenced` and prisma-scope's `andWhere`, code Jason has never read, to answer whether a tenant's filter can leak.
* Good: opening on the Resource cell's `tenantPrisma.resourceFolder.project(Models.FolderWithDocuments).findMany()`, naming its four call sites and saying that each community gets only its own documents. Then one line on why, with the internal file:line.

**One way to present a problem, bug or feature.** Jason, 2026-10-20: "do u have a systematic way to present problems? i only want one way", then "does this work for features and bugs", then yes to the following:

1. **Problem:** one sentence on who is hurt or held back, and what they get instead of what they want.
   * Bug: what the user gets wrong.
   * Feature: what the user can't do, or can only do awkwardly.
2. **Today:** a `CURRENT` block of that user's own code, with the bad result or the workaround in its note annotation. For a feature with no code yet, it shows the place the code would go, as it is now.
3. **Cause:** one line, with file:line. A bug's cause is the defect. A feature's cause is what the library lacks.
4. **Fix:** an `IDEA` block that changes that same code. When the fix doesn't change the user's code, as with a speed fix, the block shows the same call and what it costs after the fix.
5. **Decision:** one question.

If step 1 can't be written because nobody is hurt or held back, it isn't a problem. It gets one line saying so, and what happens to it.

**Equivalence is shown as both sides.** Jason, 2026-10-20: "It seems that you're asking me something about equivalence. So why are you not showing me the two things …", then "I don't want to have to tell you about how to present equivalence again, ever, in any chat, forever."

* When a point is that two things are the same, or differ, the reply shows both in full, one after the other, each with its place annotation. It never shows one side and describes the other.
* The line above them says whether the sameness is a checked fact or the question being asked.
* Bad: showing `tenantPrisma.resourceFolder.project(Models.FolderWithDocuments).findMany()` and saying a plugin "treats it exactly like the same `findMany` with its select written by hand".
* Good: that line, then the hand-written `findMany({ select: { … } })` it becomes, with every field, under the place annotation of the code that builds it.

Two rules follow from it:

* A question to Jason carries facts the agent checked, never a worry the agent could have checked. When a check settles it, do the check and bring the answer. Bad: asking him to dispatch a test for a leak nobody had looked for. Good: "It can't leak: the filter goes on a copy (file:line)."
* A downside named to Jason is a concrete cost that the work brings for certain: a real DX hit, a real latency hit, a real security hole, real tech debt, money, or work thrown away. A risk, meaning what could go wrong if the work is done badly, is never one; review and tests answer it. Jason, 2026-10-29: "risks are useless to me. concrete problems, not speculative … 'we might write the wrong code' is never a 'risk'". Bad: "the edit sits on a shared helper every machine's build runs through". Good: "it's a second mechanism to delete once the upstream fix ships".
* A proposal opens with one plain sentence that says what it is, before any code. Bad: a block of test code, then "Dispatch the test?". Good: "I propose one test: two tenants read through one shared projection, and the second gets only its own rows."

## Merging my PRs

Jason, 2026-10-29, after "Say the word and I'll merge it" on a green, reviewed PR: "bias toward ... will-merge-unless-u-say-no when they are simple QA'd etc. changes that appear unlikely to be rejected by me and esp. if are easy to change on top of it with another new pr after".

* A PR in my own repos is merged without asking when it is simple, QA'd (checks green, its independent review and bot threads addressed), unlikely to be rejected, and easy to change with a follow-up PR. The reply says it merges and how to stop it.
  * Not green yet: turn on auto-merge as it goes ready (`gh pr merge --auto --squash`), and the reply says "#N merges when green unless you say no".
  * Already green: merge it in the same turn and report the merge commit.
* Still put to me first: a design I haven't approved, a change a follow-up PR can't undo (a schema migration, a production deploy, deleted data), and a PR someone else owns.
* Bad: a green, reviewed PR with its measurements in hand, then "Say the word and I'll merge it". Good: "#3164 merges when green unless you say no", with auto-merge on.

## Posting on my behalf

Jason, 2026-10-22, after three upstream issues and a PR each waited on his "yes" to their exact text: "change my user level rules from halting to just guidance on conventions like leading with transparency about ai being the author … except i want nuance, for example the reply of ty+links is small and chatty not load bearing worthy of ai disclosure header". On 2026-10-29 he asked for these conventions to be available to Codex too.

* A post that the task I gave explicitly includes goes out without a stop for my approval of its text: an issue, a PR, a review, a comment, a reply, in any repo or tracker. Report what was posted, with links, after.
  * Bad: drafting upstream issues I had asked for, then asking "Should I post these?".
  * Good: posting them and replying with the links.
  * A post the task never asked for is still put to me first, in one line.
* A load-bearing post opens with one line saying an AI agent wrote it for me: `> Written by an AI agent (Codex) on behalf of @jasonkuhrt.` A post is load-bearing when it asks its reader to evaluate something: a claim, a bug, a proposal, a design, code.
  * Bad: that line on "Thanks for shipping all three so fast! Follow-ups: #890, #891".
  * Good: that line opening a rule proposal in another project's tracker.
  * A social or navigational note (thanks, an ack, links to follow-ups) carries no line.
* My own team's tracker and repos follow their own rules; the line is for posts that leave them.
* Commit messages take no AI attribution line by default. A repo whose contribution rules ask for one gets it, naming the actual agent model and version; do not invent a model variant the runtime has not exposed.
  * Bad: leaving commits without the trailer vite-task asks for, citing a default of no attribution.
  * Good: using the actual model's `Co-authored-by:` trailer on each commit when the target repo requires it.
* A PR description also ends with the AI-author line above; Codex adds it explicitly. Heartbeat PRs carry none, following that repo's attribution convention.
  * A PR to another project also closes an issue that opens with the line.

## Code in replies

Jason, 2026-10-20: "its very confusing to me if u dupliate prose in points or codeblocks. … literally nothing else is wanted from you ever anywhere on my machine ever in any chat forever".

### Modes

Every code block in a reply takes exactly one of three modes:

* **Mode 1, note annotations:** the code's only explanations are note and pointer annotations inside the block, and nothing below the block explains it. Jason, 2026-10-21: "the eye jump from points below to inside code block are failing me".
* **Mode 2, bare code, then prose:** the code has no explanatory comments, and prose under the block explains it.
* **Mode 3, commented code alone:** the code carries ordinary comments, and there's no prose about it before or after.

All three modes keep state and place annotations, and spacer annotations where the layout puts them.

Say each fact once. A note and prose, or a comment and prose, never say the same thing. Bad: a block whose comment says "the type leaves it out", followed by a bullet saying "the first read takes its type from the Code case's internal schema".

### Annotations

The noun for every comment these rules put in a code block is **annotation** (Jason, 2026-10-20: "all my comment rules are i say coined as 'annotations' for their noun"). Jason wrote the format as a block and approved the rules read from it (2026-10-20). He changed it twice on 2026-10-21:

* By example ("i would prefer this in latest"): a state annotation touches the place annotation under it.
* Explanations moved from numbered points below the block into it ("the eye jump from points below to inside code block are failing me"). Of the options shown to him, he kept the pointer carrying its own text ("C is ok") and rejected a note trailing its line ("reject b"). The note above the code was refined: "empty lines before/after, no arrow icon, indent tho to align to '@' col".
* Then, by a pasted example ("more refinement"): the state annotation lost its rule, a divider sits above every place annotation, and a note under a place annotation joins it through a spacer annotation.

The block below is the format as changed.

```ts
// ── CURRENT
// ─────────────────────────────────────────────────────────
// ── @ libs/shop/cart.ts
//
//    Every caller filters the cart for stock by hand.

cart.items.filter((item) => item.inStock);

// ─────────────────────────────────────────────────────────
// ── @ apps/shop/checkout.ts

const ready = cart.items.filter((item) => item.inStock);
//            ^^^^^^^^^^^^^^^^^ the same filter again

//
//
//
//
// ── IDEA
// ─────────────────────────────────────────────────────────
// ── @ libs/shop/cart.ts
//
//    The cart owns the stock filter, and callers name it.

cart.inStock();
```

There are six kinds. The state and place annotations start with `// ── `; the divider is `// ` and its rule; the note, pointer and spacer annotations start with `//` alone.

* **State annotation:** `// ── CURRENT` for code as it is on develop, `// ── IDEA` for code that doesn't exist yet, with nothing after the word. Jason first called it the position annotation, then took the agent's word ("'position' annotation i rename as your term 'state'").
* **Divider annotation:** `// ` and a rule of 57 `─`, so it ends at column 60, the longest any line in a block can be (Jason, 2026-10-21: "the rulers should end at col 60, so they align nicely with the max a annotation could ever be"). It sits directly above every place annotation.
* **Place annotation:** `// ── @ <where>`. It names where the code below it lives: a file path, or the context when there is no file (a terminal, a generated client, a type at hover). Jason, 2026-10-20: "from now on no code block will be sans an indication of placement".
* **Note annotation:** `//`, four spaces, then the note, so its text starts in the column of the place annotation's `@`. A note too long for one line wraps onto more lines at the same indent. It explains the whole lines under it, on its own lines above them (Jason, 2026-10-20: "' // [3]' etc. annotations must be in own line above position"). It carries no marker, arrow or number.

  ```ts
  //    Every caller filters the cart for stock by hand,
  //    so the predicate is written once per caller.
  ```

* **Pointer annotation:** a line directly under a code line: `//`, then spaces so that `^` characters sit exactly under the columns that matter, then a space and the note. It explains part of a line; a note annotation explains whole lines. Proposed by the agent when Jason asked for "some sort of pointer to the columns and the line", and accepted (2026-10-20: "fine annotation accepted"); it carries its own text since 2026-10-21 ("C is ok").

  ```ts
      where: { archived: false },
  //         ^^^^^^^^^^^^^^^^^^^ archived rows stay out
  ```

* **Spacer annotation:** `//` alone. It gives space where an empty line can't: more than one line of it, since formatters keep one empty line and collapse more (Jason, 2026-10-20: "formattings often kill whitespace, u need lines with '//'"), and space inside a header, which has no empty lines.

### State modes

Jason, 2026-10-20: "current/idea are meant to be contiguous markers, the format is merciliess: * lead with current * lead with current, later in block, idea. nothing else is ever valid, ever." Jason, 2026-10-21, added idea alone: after two blocks comparing an Inngest workflow with a for loop each opened on the same filler `CURRENT` lines, "my rules about state annotations are backfiring right now. its not helping me read your turn", then "right now my config forbids idea on its own. that is one problem i feel."

A block is in exactly one of three state modes, never two and never another:

* **State mode 1, current:** the block leads with the `CURRENT` state annotation, and all of it is code as it is on develop.
* **State mode 2, current then idea:** the block leads with the `CURRENT` state annotation, then all the current code. One `IDEA` state annotation follows, and everything after it is code that doesn't exist yet.
* **State mode 3, idea:** the block leads with the `IDEA` state annotation, and all of it is code that doesn't exist yet. It is the mode for code that changes nothing the reader needs to see as it is now, such as a sketch, pseudo code, or designs compared with each other.

Each state annotation appears once, and a `CURRENT` after `IDEA` is invalid. A `CURRENT` part that is there only to fill the frame fails: that block is idea alone.

* Bad: each design block opens on `// ── CURRENT` with two develop lines that neither design changes, then the four-spacer `IDEA` frame, then the design.
* Good: each design block opens on `// ── IDEA`, its divider and its place annotation, `// ── @ a sequence run as one Inngest workflow`, with note annotations above the lines that matter.

* In state mode 2, the `IDEA` part changes what the `CURRENT` part shows, in the same place and with the same names. An idea that lives somewhere else gets a `CURRENT` part showing that place as it is now.
  * Bad: `CURRENT` shows the app's `FolderWithDocuments`, and `IDEA` shows a test in `libs/prisma-scope` over that suite's own models, with nothing linking the two.
  * Good: `CURRENT` shows the prisma-scope test file as it is, and `IDEA` shows the test added to it.

### Titles

Every code block in a reply has a title: one bold line directly above its fence, saying what the block shows. Jason, 2026-10-21: "codeblocks should always have a title before them in your output."

* Bad: a sentence of prose, then the fence of the for-loop sketch.
* Good: `**Mayhul's for loop, run when the person enters**`, then the fence.

### Layout

* Each place opens with a header: one run of comment lines with no empty line inside it. In order, it holds the state annotation (only where a part starts), the divider, the place annotation, and, when a note explains the code right under the header, a spacer annotation and that note. One empty line separates the header from the code under it.
* Every change of place opens a new header, with one empty line between it and the code above.
* A note annotation further down, below a code line rather than under a header, has one empty line above it and one below.
* A pointer annotation touches the code line above it.
* An `IDEA` state annotation after current code has four spacer annotations touching it from above, and one empty line separates them from the code above (the agent's reading: the 2026-10-21 examples all led with their state annotation).
* A state annotation on a block's first line, `CURRENT` or a leading `IDEA`, gets no spacer annotations.

### Line length

Every line in a code block is at most 60 characters long, annotations included. Jason, 2026-10-21, with a screenshot of a note that the app's code view had wrapped: "line wrapping is the enemy visually. as such, a highly highly constrainted line length. 60 max."

* A note annotation is broken by hand before it passes 60, and each further line keeps the note's indent.
* A pointer annotation's text that doesn't fit continues on the lines below it, each starting in the column where its text started.

  ```ts
  e2e           skipped until /pr e2e run
  //                          ^^^^^^^^^^^ local E2E doesn't
  //                                      count; CI runs it
  ```

* A code line longer than 60 is broken where a formatter set to a width of 60 would break it.
* A place annotation that doesn't fit continues on the next line: `//` and six spaces, so the rest of the path starts under the path's first character.

  ```ts
  // ── @ parts/backend-services/src/cells/Page/
  //       models.iso/Version.model.ts
  ```

## Architecture Output Preference

For architecture and design brainstorming:

- Show only **ideal, first-principles options** optimized for **type safety** and **best possible developer experience (DX)**.
- Do **not** include compromise, transitional, legacy, or backward-compat options unless explicitly requested.
- Keep output focused and high-signal; anything outside the ideal option set is noise.

## Workflow Rules

- An edit to my dotfiles repo (`~/projects/jasonkuhrt/dotfiles`, edited directly or through a link into it such as `~/.codex/AGENTS.md`) is committed and pushed before the task that made it is reported done: a pathspec commit of only the files that task changed, never another session's edits, then `git push`. Jason, 2026-10-28, after a reply ended "The dotfiles edit isn't committed.": "add a user level rule to never leave dotfiles edits uncomitted after finishing". The push came later that day, once his Conductor cloud workspaces began installing these skills from GitHub, where an unpushed edit never arrives.
  - Bad: a reply that reports an `AGENTS.md` rule written and adds that the edit isn't committed, or that it's committed but not pushed.
  - Good: `git -C ~/projects/jasonkuhrt/dotfiles commit -m "…" -- home/.codex/AGENTS.md`, then `git -C ~/projects/jasonkuhrt/dotfiles push`, then a reply that names the commit.
  - When the push is rejected because `origin` moved, say so in the reply. Never stash, reset or rebase over another session's uncommitted edits to make it go through.
- For coding work, balance result quality, elapsed time, and subscription quota consumed through a completed result. Subscription quota is Jason's cost metric.
- When delegating, prefer a small pool of workers reused for related assignments so useful context carries forward. Load the matching `dispatch-codex-peer` or `dispatch-codex-sub` skill before dispatch, and name the resulting chat or subagent accurately. A requested sidebar agent means a separate chat via `dispatch-codex-peer`; call an in-chat worker a subagent.
- Establish environment blockers in the designated prepared checkout with its normal workflow. A failed scratch install is evidence about that scratch setup only. Inspect and exercise the required artifact before treating package-manager metadata as proof that work cannot run. If access prevents the check, report that access limitation instead of inferring a missing dependency or credential.
- Do not use multiselect or request-user-input tools with this user. Ask direct plain-text questions instead.
- FOR NARROW QUESTIONS, ANSWER THE ASKED DIMENSION DIRECTLY. DO NOT PAD WITH ADJACENT NEGATIVES, NON-GOALS, EXCLUSIONS, OR SCOPE BOUNDARIES UNLESS THAT CONTRAST IS NECESSARY TO ANSWER THE QUESTION OR THE USER ASKS FOR IT.
- The user is the decision-maker for management, planning, scope, and relevance. Do not present yourself as the arbiter of what is in scope, out of scope, relevant, or unrelated unless the user explicitly asks for that judgment.
- When the user asks for opinions, feedback, or technical evaluation, assume the asked-about thing is relevant because the user has the planning context. Focus on the technical answer, tradeoffs, and execution details rather than scope policing.
- External communications follow "Posting on my behalf" above: a task that explicitly requests a post authorizes that post; an unrequested send still needs Jason's approval. Creating drafts is allowed without approval.
- Automated system interactions with non-human bots—such as replying to and resolving Greptile review threads—do not require approval and should proceed autonomously when part of the authorized workflow.
- When debugging hook behavior in Codex, treat `~/.codex` as the canonical hook/config surface first: inspect `~/.codex/config.toml`, `~/.codex/hooks.json`, and `~/.codex/hooks/*` before looking at `~/.claude`. Only inspect `~/.claude` hooks if the Codex hook config explicitly delegates there.
- For macOS administrator commands, use interactive `sudo` with a PTY so Touch ID can authenticate. Avoid AppleScript `with administrator privileges` for shell elevation. A failed `sudo -n` check does not establish that Touch ID is unavailable.
- Never skip symlinks during config/rules/file discovery. When inspecting for local rules or config surfaces, include symlink entries and resolve their targets before concluding a file is absent.
- Use Codex's current Chrome integration and bundled instructions. Diagnose and report integration failures and their available fix before any necessary fallback. Proceed without repeated permission requests for routine browser opening, recovery, or fallback within authorized work.
- For calendar work, "my calendar", "calendar", and scheduling requests mean Apple Calendar/iCloud Calendar through the configured `che-ical` MCP or its signed `CheICalMCP` CLI. Apple Reminders remain on `remindctl`. Do not use Google Calendar, Outlook, Fantastical, Calendar.app GUI automation, or cross-platform calendar connectors unless the user explicitly names that platform.
- Skills live in `~/.claude/skills`, which Codex reads through `~/.agents/skills`; both harnesses list every skill there. Only a skill that runs on Codex's own machinery (`dispatch-codex-*`, `fable-review`, `opus-review`) lives in `~/.codex/skills`. Never link a shared skill into `~/.codex/skills`: Codex would list it twice.
- For third-party library or platform semantics that materially affect architecture, build a stable local evidence base first: official source repos in `~/repo-references/`, official docs source or downloaded docs, and the exact installed SDK/version in use. Do this before making semantic claims or proposing adapter state.
- For Effect research, respect the local v3/v4 reference split. For current Effect v4 work, use `~/repo-references/effect-v4-references/effect-smol` first and only use other `~/repo-references/effect-v4-references/*` repos when the task specifically needs them. Use `~/repo-references/effect-v3-references/*` only for explicit v3 work. Do not create or rely on an unsuffixed `~/repo-references/effect` checkout for current work.
- Any repeatable repo workflow should be driven through the root `justfile`.
- If a workflow matters and no `just` recipe exists yet, add one instead of leaving the procedure as raw shell commands in docs only.
- Exception: do not add `justfile`s to JavaScript, TypeScript, Bun, Node.js, or general web projects. In those projects, use the existing package-manager/task-runner workflow instead of introducing `just`.
- For Codex or Claude hook scripts, default to Bun rather than Python. Only use Python when Bun is unavailable or the hook truly depends on Python-specific libraries.
- Never rename named imports with `import { X as Y }`. Prefer namespace imports or canonical named imports; put local context in the consuming expression rather than in an import alias.
- Only mock through the Effect services pattern. Do not use module-level mocking frameworks or monkeypatching approaches.
- Treat Effect service usage as binary: app code either uses Effect services correctly or it is wrong. Do not use direct globals or ad hoc substitutes for runtime dependencies such as time, randomness, process, filesystem, network, or environment access when an Effect service boundary should exist.
- For Lua or Neovim Lua changes, run `just lua-check` before closing the task.
- Use `just lua-fmt` to normalize Lua formatting.
- The local staged-only Lua pre-commit hook is installed via `just hooks-install`.
