---
name: ladder
description: Use when asked whether a system's design is what a green field would repeat, to analyze or draw the architecture of a library, a framework layer, an app feature or one abstraction from its bedrock up, to show its layers of concepts or its ladder of abstraction, to find where a concern, fact or rule is stated twice (a stutter, a restatement, a reinvention, duplication between layers), to find callers split between two forms of one thing, to find incidental design, or to say which layer has or lacks a feature and where a change would land. Also "did you analyze its arch", "is this a line or a tree", "what does each layer introduce".
---

# Ladder

A good design reads close to a ladder of abstraction: each rung is built from the one before it and states concerns of its own. This skill reads the real structure off the code, draws the ladders that are there, and marks every place the code is not one: an extra input, a missing edge, a concern stated twice, a fact its consumers take by two paths. Those places are the finding. A clean ladder with nothing marked is a valid result.

It is an instrument: a procedure and three pictures that make facts visible. The judgement of a design and the direction of a fix are `simplicity`'s; where code belongs is `placement`'s; what a restatement costs at run time is `efficiency`'s. Point at them, do not restate them. `show-me` governs anything you add around this skill's output, and never its order.

## Hard rules

The reader asks because they cannot hold the system in their head, so they cannot notice a wrong shape. A wrong shape drawn with confidence is worse than no picture: every later judgement is made on it.

1. **An edge is read off code.** "B is built from A" exists only where B's builder takes A, cited `file:line` with the text that takes it. Never from the order you read things in, a directory layout, a name, an import line, or a number you assigned.
2. **The edge list comes first and the script draws from it.** You never draw structure by hand, and you never pick "ladder" as the form in advance. The list is part of the answer, so the reader can check the read instead of trusting it.
3. **No edge does not mean unrelated.** An upper rung that reinvents what a lower rung owns has, by definition, no edge to it. Restatements are searched across the whole corpus by each concern's tells, never along the edges.
4. **How a thing is made is a technique, never a finding.** Written by hand, derived in types, derived at run time, generated: record it on the rung and stop. It is never marked, counted or judged, and generated output is never a restatement of its source. The finding is a fact that reaches its consumers by more than one path, so that callers are split.
5. **What was not opened is an unopened box.** It gets no verdict and no edge beyond those the code you read shows. A line the sweep reached inside it may carry a mark; the box stays unopened.
6. **The pictures lead.** Nothing sits above them except the one-sentence answer. In another medium (a page) they come first, at equal or higher density, never as lists, a table of contents or prose.
7. **Every structural term is defined at first use, in the user's words where they have one.** The script's legends do it; add no term of your own.

## Terms

| Term | Meaning | Test |
| --- | --- | --- |
| rung | one kind of thing the subject makes | it has a name in the code, one builder at a `file:line`, and something takes what it makes, or it is a top |
| builder | the function, class or declaration that makes a rung | its inputs are the rung's edges, all of them |
| root | a rung whose builder takes nothing in the list | bedrock when it is a dependency (`outside`); else it says why it takes nothing |
| ladder | a chain of rungs, each built from the one before | computed from the edges; you name what it builds, you never choose its rungs |
| concern | one fact, rule or decision the code states and could have stated otherwise | another rung could state the same sentence |
| owner | the identifier of a concern's first statement | what a later rung would call or import to use it |
| tell | text that finds a concern, or a path, anywhere | see Concerns |
| path | one form in which a fact reaches a consumer | see Paths |

Things made the same way are one rung, named in the plural (twelve handlers); one made another way (it takes other inputs) is its own rung. A helper only its own rung calls is part of that rung. A re-export is no rung. A dependency is a rung only when a chain ends at it or a concern is first stated in it. A rung is never left out for looking redundant: showing that is the matrix's job.

Where the edges start and end, by subject. This is where to look, not a template; a rung exists only where a builder does.

| Subject | Bedrock | Top | Usually between |
| --- | --- | --- | --- |
| library | the dependency's primitive it wraps | the value a caller writes | datum, collection, derived forms, public value, client |
| framework layer | the host's contract: a request, a lifecycle, an RPC library | what an app author declares | definition helpers, registry, wiring, generated glue |
| app feature | the stored model | the route, job or component a user reaches | read shape, query, operation, contract, handler, client hook, component |

## Procedure

`ladder.mjs` sits beside this file. Call it as `node <this directory>/ladder.mjs`; `format` prints the data file's format. The data file is the record: keep it in the scratchpad as `<subject>.ladder.json`.

1. **Scope.** Name the subject, its top (what the outside takes) and the question, one line each. A probe only when the user gave one: never invent one.
2. **Candidates.** `ladder.mjs imports <the top's file, or the subject's directory>`: who imports whom, by height, with each file's exports. These are candidates, not edges.
3. **Rungs and edges, from the top down, until every chain ends at a root.** For each candidate read the builder's doc comment and signature, several per call, bodies only when the signature does not show the inputs. Record each rung, how it is `made`, and every input its builder takes, with the text and line. Stopping when it "feels explained" is the error; the stop is a builder that takes nothing the subject makes.
4. **Draw the structure.** `ladder.mjs draw <data>`. It refuses text that is not on its line, an import cited as an edge, a code that reads as an order, and a cycle. Clear its list "Imports this list does not explain": each is an edge you missed, or gets a `not` with its reason. A missed second input is how a graph gets drawn as a line.
5. **Departures.** `draw` lists every place the edges are not one ladder. Mark one `essential`, with its reason, when the subject exists to join the two. Leave the rest: they print "to explain", and that is the finding. Never explain one away.
6. **Concerns, from the bedrock up.** For every opened rung, write what its builder declares (see Concerns).
7. **Sweep.** `ladder.mjs tells <data>`: every place a tell appears, documents first, then files that hold the concern and do not name its owner. Each hit is the first statement, a read of it, or the concern stated again. Open only the last kind. Read every document it flags before any verdict.
8. **Paths.** For each fact a consumer can take in more than one form, add it to `facts` with each path's tell (see Paths). `[]` says you looked and found none.
9. **Draw, check, reply.** See Before sending.

Budget: about one tool call per rung plus eight; reads sent together count once. At twice that, stop reading: mark the rest `read: none` and draw. One deciding run (a plain `node -e`) where a mark hinges on run-time behaviour. No compiler, ever.

## Concerns

- **Name the fact, never its holder.** A short noun phrase in the domain's words: "nullable", not "the facade's nullable handling". A name that holds its rung, its mechanism or a verdict cannot be found stated again. The matrix leaves a name about 96 characters less 2 per rung; a row's members go in `members`.
- **Grain is the builder's own.** One row per member it declares: a field, a case, a parameter, a static, a branch that decides. Members declared together and marked alike in every column share one row. Split a row whose members would be marked differently.
- **Total is shown.** Every member of every opened builder lands in exactly one row. The script prints which rungs were read whole, by signature, or not opened.
- **First is the rung nearest bedrock that states it.** What a dependency or the stored model already states is first stated there. On a tie (neither is built from the other) first is the declaration the other is checked against; if neither is, the earlier in the data file. For a concern first stated in bedrock, `at` may cite the dependency's source or its documentation.
- **Tells are several.** The owner's identifier, the domain's words for the concern, and a piece of its data's shape (a literal, a key). A reinvention does not use the owner's name; that is what makes it one. A tell found all over the repo gets its own `corpus` on the concern.
- **A read is not a restatement.** One member used through its typed owner is a read. A pick of members through the owner states a new concern (which members) and restates nothing. A copied list, a second declaration, a literal written again, a second derivation is the concern stated again.
- **The same rung can state it twice.** Two of twelve handlers that each write the rule: first and again in one rung, drawn `◉`.

The kind of a restatement is one check at the site, on the lines cited: is the owner used there? Check the site, not the rung: a rung can reach the owner through one input while another input reinvents.

| Mark | Kind | The check | Means |
| --- | --- | --- | --- |
| `R` | reinvented | the owner is not on the lines | a missing edge: should be built from, is not |
| `C` | re-carried | the owner is on them, or the text that takes it (`takes`) | has the edge, and still copies members, re-lists a list, re-declares a parameter |
| `D` | derived twice | not on them; `parent` is a rung both are built from | two siblings derive it from one parent, neither uses the other |
| `○` | missing | the rung states a list that claims the whole set this concern belongs to | the list lacks it; or, for a probe, where the change lands |

A probe is a concern with `"probe": true`: marked where it is stated, and `○` at every rung that states its siblings without it.

## Paths

The third picture: one fact, more than one path, who takes which. A fact here is something consumers need (a typed row for a read; a stored Email, read). A path is one form they take it in: through the library's own form, through a generated type, through a literal written at the call. Give each path a tell and name the consumers with one `*` in a path (`src/features/*`, each match a consumer); the script counts.

One path taken by all is clean, however it is made. A split is the finding, and the picture names who is on which side, and who is on both. Counts never rank the paths: usage does not say which form is right.

## Verdicts

The script reads "would a green field repeat it" off the tally: yes (states something first, nothing again), in part, no (nothing first), not judged (not opened). Bedrock gets none. Override it only with `verdict` and `why`, and only for one of these:

- **A documented decision,** cited. Read `CONTRIBUTING`, the README and the package's notes before any `no` or `in part`.
- **A ruling of the user's.** Report the stutter as fact; put its fix under `notJudged` with the ruling.

Usage ("nothing calls it"), precedent ("the repo does this"), size (lines) and technique ("it is generated") are never reasons.

## Before sending

1. For each rung, read its inputs from "Built from" alone and open each cited line: is that the builder taking an input?
2. Ask: did I list these edges because the code takes them, or because I read one after the other? Did any builder take something I left out?
3. The reply is these three things, in this order, and nothing else:
   - **One sentence of at most 30 words:** yes or no first when one was asked, then the counts that decide it (rungs that would be repeated, concerns stated again, missing edges, facts taken by more than one path). No tour of the findings: the pictures carry them.
   - **`draw`'s output, whole and unedited.** What you want said about a stutter goes in its `note` in the data file, never in text around the output.
   - **The data file's path.**
4. A second answer on the same subject is drawn with `--since <the earlier data file>`: the changes are stated first, never a silent redraw.

## Common mistakes

- Numbering rungs in the order you read them and presenting that as the structure.
- Starting at the public API and descending until it feels explained.
- Taking "no edge" for "unrelated", so a reinvention reads as clean separation.
- Leaving out a builder's second input because the first one explained enough.
- Marking generated output as a restatement, or debating whether generating it is justified, while the split of its callers goes unlisted.
- Marking a pick or a use through the typed owner as a restatement.
- Naming a concern after its holder, so its restatement has a different name.
- Looking for restatements only in the rungs. The sweep covers the corpus: tests, other packages, the apps.
- Listing every dependency as a rung, so the ladder drowns in its own bedrock.
- Inventing a probe, or a tour of findings in the first sentence.
- Reporting a doubt as a finding. Run the one deciding run, or list it under not judged.
- Moving the pictures below a summary, or re-typing them as lists.
- Hunting for kinds of stutter. Read the picture; the kinds are labels for what it shows.
