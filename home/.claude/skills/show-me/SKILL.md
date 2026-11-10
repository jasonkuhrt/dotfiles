---
name: show-me
description: 'Use before writing a reply that would run past a few short paragraphs or a long list — an audit, review, findings report, plan, comparison, status roll-up, or a walkthrough of an architecture, a diff or a data flow — and whenever the user signals overload or confusion ("I''m confused", "what is X even", "too long", "tl;dr", "fewer words", "show me", "visually", "diagram"). Use for abstraction and library API design discussions, even when the answer is short. Also use when the material has a shape prose flattens: before and after, many items each with a state, flows, hierarchies, ownership, dependencies, or options weighed against criteria.'
---

# Show me

Answer with a picture the user reads at a glance. Words become labels; the layout carries what sentences would have said.

Choose the simplest format that makes the answer clear. A custom artifact can be worth creating for one question; optimize it for the user's understanding and ability to judge the result.

## Resolution layers

Every reply, of any size, is a stack of resolution layers. **Resolution** is how exactly a view specifies its subject: at the coarsest, the whole subject as a few named parts and how they relate; at the finest, one part with every name, type, value and step. A **layer** is everything the reply shows at one resolution. The user reads down the stack and can stop after any layer with a whole and true picture. Without layers the user wades through detail to find the shape, or bounces between resolutions inside one view, which is worse.

One phrasing, so that a direction is never in doubt:

- The **root layer**, `R0`, is on top and is the coarsest. `R1`, `R2` and on lie below it, each finer than the one above.
- Say _coarser_ and _finer_ for resolution, and _above_ and _below_ for place in the stack. _Higher_ and _lower_ read both ways; do not use them.
- _Fidelity_, _zoom_, _altitude_ and _level of detail_ name the same thing. Write _resolution_.
- An **end point** is a named thing that a layer shows and does not open: a box, a row, a name in code.

The rules:

- **Coarsest first, one resolution per view.** Label every view with its layer. A view that stops for one exact detail and then resumes is mixed resolution: raise the point, or move the view down a layer.
- **Every layer is whole.** A reader who stops after it knows the subject at that resolution, and nothing in it is wrong for want of the layer below. A layer names what it leaves closed; it does not hide it.
- **A view below `R0` starts at an end point.** Its first line names the end point of the layer above, by the same name, and what the view does to it: _deepens_ it (the same thing, finer), _extends_ it (what the layer above left out beside it), or _continues_ it (the sequence from where the layer above stopped). A view with no end point above it is lost: add its end point, or cut the view.
- **Mark the way down and the way back.** An end point that a view below opens points to that view. If moving between layers feels like lost navigation, the reply has failed, whatever its content.
- **Resolution is a dimension of the reply, never of the subject.** It is not an architectural layer, a tier, a call depth or a step of a data flow. A three-tier system at three resolutions is a three-by-three grid: each tier has its own `R0` to `R2`, and may stop at a different depth. A subject with two structures of its own, tiers and phases say, makes a cube, and a third makes more. Call the subject's parts by their own names, and keep _layer_ and `R0`, `R1`, `R2` for resolution.
- **Lead with the map.** Before `R0`, show the reply's dimensions: resolution across, each of the subject's dimensions down, and in every cell the view that fills it. Leave a cell the reply does not fill visibly empty. The map keeps "where am I in this document" from ever being a question. A reply that is `R0` alone needs none; a two-layer reply's map is one line.
- **Terms sit where they first become visible.** Terms that every layer uses go in one table before `R0`. A layer adds only the terms that first appear at its resolution, and no layer uses a term that is defined below it. The map and the shared terms are the only parts outside the layers.

A map, and the first line of a view below `R0`:

```text
              R0 whole    R1 parts    R2 exact
the request   ● §1
  client                  ● §2        ● §5
  server                  ● §3        ● §6
  database                ● §4        ·
terms         shared      + 2         + 3

● a view fills the cell    · the reply stops above it
```

```text
R2 · server · deepens "request queue" (R1 §3)
```

## The reply

`R0`, the root layer, in this order:

1. **The answer**, in one line or one visual element: the verdict, the headline number, the direct answer to the user's last message.
2. **The view**: the smallest set that answers the question, usually one and at most three.
3. **The decisions left to the user**, each as its options with the recommended one marked.

Around the views, at most three short lines of text, plus the link or path.

## Show abstraction value through caller code

When discussing an abstraction, make its value visible in the code that uses it.

- **Caller first.** Start with realistic caller code using the public API. Include the imports, setup, and handling needed to judge the abstraction. Show what complexity the caller loses and what it must learn or supply.
- **Standalone library examples.** For library design, choose a small, coherent example in a neutral domain before drafting snippets. Recast supplied application code into that domain for both sides of the comparison, preserving the relevant behavior and type requirements. Explain the library on its own terms even when it lives in an application's monorepo. Use application-specific examples when the question is about application integration.
- **Comparable before and after.** Prefer one `diff` block showing caller code before and after for the same task and outcome. Keep enough context to expose any setup or handling moved elsewhere. Mark proposed APIs and illustrative examples as proposals.
- **A layer each for caller, declarations and implementation.** Keep caller code, public API declarations, and library implementation in distinct, labeled views, each at its own resolution layer, in that order. Go a layer down only when it helps the current decision. During API design, establish whether the caller shape helps before expanding implementation detail.
- **Demonstrate the benefit.** Let the caller comparison support the recommendation. Show effects on complexity, expressiveness, type inference, and error handling when they matter to the choice.

## Pick the view by the material's shape

A diagram has to beat a table: when three columns say the same thing, send the table.

| The material                                           | The view                                                                          |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Logic or an algorithm                                  | pseudocode                                                                        |
| A runtime path                                         | call tree                                                                         |
| UI structure                                           | component tree, with the state and module boundaries that matter                  |
| Files and who owns what                                | shallow file tree, one `# role` comment per line                                  |
| Message order between actors                           | Mermaid `sequenceDiagram`                                                         |
| Branches and decisions                                 | Mermaid `flowchart`                                                               |
| A change to an existing shape                          | a `diff` of that shape: file tree, call tree, component tree or code              |
| Many items, each with a state or fate                  | names colored by state, a legend, and before → after counts                       |
| Many items, each awaiting a decision                   | buckets cut on fault lines, each opening on its test (see below)                  |
| Options against criteria                               | a matrix with the recommended option marked                                       |
| Cause and effect, or options with changing assumptions | interactive controls with visible downstream changes and a live comparison        |
| A mechanism clarified by motion or changing quantities | a step-through animation or a short explainer video                               |
| Problems or findings                                   | one card each: a title of six words or fewer, one small picture, one "→ fix" line |
| Code the user will copy                                | the whole block                                                                   |

```diff
 submitForm
   createSession
     persistPrompt
+    expandSkillMention
     launchAgent
-  navigateToSession
+  navigateToSession
+    subscribeToEvents
```

**Bucket items that wait on a decision.** When the user has to decide what happens to many items (proposals, findings, backlog issues), the first view groups them by the next action each needs. Each item appears in one bucket. Each bucket opens with a one-line placement test and shows its count. The boundaries follow the decision the user faces next. When more than one grouping fits, the reply names the strongest alternative considered and why the chosen grouping better serves that decision.

For examples supplied by the user, apply [pattern-not-example](../pattern-not-example/SKILL.md).

- Bad: 19 proposed Linear changes shown by topic, each with a challenge; when asked to bucket them, the reply copies the user's example labels without weighing another grouping.
- Good: the same 19 grouped by what should happen next, each bucket showing its test and count, with one line explaining why that grouping serves the decision better than the alternative considered.

```text
src/
├── commands/       # parses user actions
├── sessions/       # owns session state
└── transport/      # sends API requests
```

## Choose the delivery format

- **Inline** when a static view answers the question in about 40 lines: fenced text, `diff`, `mermaid`, or a table.
- **A page** when interaction helps the user vary assumptions, compare outcomes, or follow a mechanism; also use it for color, many items, or views side by side. Create one focused HTML file. Publish it with the Artifact tool when the session has one, following its quickstart. Without one, in a Conductor cloud workspace (`CONDUCTOR_IS_LOCAL=0`), serve the file's folder in the background (`python3 -m http.server <port> --bind 127.0.0.1 --directory <folder>`), run `conductor preview set --port <port>`, and give the user `<preview URL>/<file>.html`; viewers sign in with Conductor. The workspace has one preview URL, so when `conductor preview get` shows it serving the app, say that the page replaces it there. Otherwise write `show-me-<topic>.html` beside the work's notes and `open` it. Use the product's own colors, type and components when it has them, and make it work at phone width and in dark mode. On a page, draw a diagram with the `diagram-design` skill and a chart with `dataviz`, not freehand; where a session lacks one, use the nearest it has (`artifact-diagramming` for a diagram, `diagram-design` for a chart). Hand the drawing skill the diagram's type, size and content, so it draws without asking again.
- **A timed explanation** when seeing motion or changing quantities clarifies the mechanism: use a stepped HTML animation, or a short explainer video when the available tools support it and motion or narration improves understanding. Give each scene one relationship to explain, with visible labels. Provide pause, replay, and step controls for animations; respect reduced motion.

Whatever the format, the layers keep their order. Inline, send `R0` and stop at the layer the question needs; put the layers below it in the page or file the reply links. On a page, show the map and `R0` first, and keep each layer below one step away (a section, a tab, a disclosure), reachable from its end point.

Follow an explicit format request. If the available tools cannot produce it, explain the limitation and offer an available format.

For interactive views, show the starting assumptions and update every dependent result when a control changes. Distinguish measured values from illustrative inputs. Keep the direct answer visible as the user explores.

This format guidance adapts [Karpathy's post on understanding model outputs](https://x.com/karpathy/status/2105819303471976479).

## Make it true and legible

- For an existing system, labels use its real names, counts, paths and `file:line`. Keep a standalone library example internally consistent and identify it as illustrative. Count what you show.
- A state never lives in color alone: pair the color with a second cue (strikethrough, ✓ or ✗, an arrow), and give every colored view a legend.
- A diagram holds at most 9 nodes and 12 arrows. Past that it is two views at two resolutions: the whole in one layer, the crowded part a layer below.
- One accent, on the one or two things the answer turns on. State colors are a separate encoding and keep their legend.
- An arrow says what moves along it (`writes`, `polls every 30s`). An arrow the layout already implies is removed.
- Aim for labels of six words or fewer. Keep exact technical names and necessary qualifiers; split the view when a label becomes hard to read.
- When the picture stands in for a longer written report, link the report, and both say the same thing.

The table test, the diagram budget, the single accent and the delete pass adapt [diagram-design](https://github.com/cathrynlavery/diagram-design/blob/7a2e22170ee838e859d8142ba825d83f8b6375e6/skills/diagram-design/SKILL.md).

## Make the words unambiguous

Reduce ambiguity before reducing word count. Write labels, legends, callouts and the text around the view by `plain-english` (`.claude/skills/plain-english/SKILL.md`). Its meaning rules matter most here, since a label shortens a claim: one claim per label, conditions kept beside what they limit, "may" kept as "may", and evidence for any quality claim.

## Before sending

Compare the view with its source. Check facts, conditions, exceptions, claim strength, sequence, dependencies, and causality. Every arrow must have support in the source.

For an abstraction comparison, check that the first code view is caller code, the before and after solve the same task, and each additional layer is needed for the current decision. For standalone library design, check that both versions use a neutral domain throughout, including imports and names.

Check the layers. The map comes first. Read `R0` alone: the subject is whole and true; then read each layer below the same way. No view mixes resolutions. For every view below `R0`, find its end point in the layer above, under the same name. From any view, say which layer and which part of the subject it is, using only what that view shows; if you cannot, the reader is lost.

Then delete: every node, arrow and label the reader would not miss goes, and two nodes that always travel together become one.

Then read the initial view. The user should see the answer or the model's key relationship within ten seconds. When the question needs it, keep deeper detail available through interaction or a timed walkthrough. Check that controls and scenes reveal the relationships they claim to explain. Simplify the layout or split the view while keeping the words needed for precision.
