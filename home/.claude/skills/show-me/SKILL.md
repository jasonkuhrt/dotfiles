---
name: show-me
description: Use before writing a reply that would run past a few short paragraphs or a long list — an audit, review, findings report, plan, comparison, status roll-up, or a walkthrough of an architecture, a diff or a data flow — and whenever the user signals overload or confusion ("I'm confused", "what is X even", "too long", "tl;dr", "fewer words", "show me", "visually", "diagram"). Also use when the material has a shape prose flattens: before and after, many items each with a state, flows, hierarchies, ownership, dependencies, or options weighed against criteria.
---

# Show me

Answer with a picture the user reads at a glance. Words become labels; the layout carries what sentences would have said.

## The reply

In this order:

1. **The answer**, in one line or one visual element: the verdict, the headline number, the direct answer to the user's last message.
2. **The view**: the smallest set that answers the question, usually one and at most three.
3. **The decisions left to the user**, each as its options with the recommended one marked.

Around the views, at most three short lines of text, plus the link or path.

## Pick the view by the material's shape

| The material | The view |
| --- | --- |
| Logic or an algorithm | pseudocode |
| A runtime path | call tree |
| UI structure | component tree, with the state and module boundaries that matter |
| Files and who owns what | shallow file tree, one `# role` comment per line |
| Interaction over time | Mermaid `sequenceDiagram` |
| Branches and decisions | Mermaid `flowchart` |
| A change to an existing shape | a `diff` of that shape: file tree, call tree, component tree or code |
| Many items, each with a state or fate | names colored by state, a legend, and before → after counts |
| Options against criteria | a matrix with the recommended option marked |
| Problems or findings | one card each: a title of six words or fewer, one small picture, one "→ fix" line |
| Code the user will copy | the whole block |

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

```text
src/
├── commands/       # parses user actions
├── sessions/       # owns session state
└── transport/      # sends API requests
```

## Inline or a page

- **Inline** when the view fits in about 40 lines and needs no color: fenced text, `diff`, `mermaid`, a table.
- **A page** when it needs color, holds many items, or sets views side by side: one focused HTML file. Publish it with the Artifact tool when the session has one, following its quickstart; otherwise write `show-me-<topic>.html` beside the work's notes (`.session/context/` in a session) and `open` it. Use the product's own colors, type and components when it has them, and make it work at phone width and in dark mode.

## Make it true and legible

- Every label comes from the material: its real names, counts, paths and `file:line`. Count what you show.
- A state never lives in color alone: pair the color with a second cue (strikethrough, ✓ or ✗, an arrow), and give every colored view a legend.
- A label is six words or fewer. A sentence inside a picture is prose again.
- When the picture stands in for a longer written report, link the report, and both say the same thing.
- In a session, a view explains one item and is linked from it; the `session` board stays the one work queue.

## Before sending

Read only the views. If the user can answer their question from them in ten seconds, send; otherwise cut what doesn't serve that question.
