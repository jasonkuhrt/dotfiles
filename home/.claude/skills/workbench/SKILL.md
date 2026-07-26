---
name: workbench
description: 'Use when a session should publish a living workbench interface (design/ops Artifact) — multi-thread design work with executing pipelines, spitball explorations, dispatched batches, or awaiting-user decisions the user wants to monitor from one URL. Triggers: "workbench", "control tower", "design flights", "publish the design docs", "keep the page fresh", or when exploratory code sketches would benefit from typed hovers (Shiki/Twoslash).'
---

# Workbench

A __workbench is an interface, not a document__ — operated, not read. It
is a __general extension of a Claude Code session on a worktree__: opened
when work on the worktree begins, ONE standing workbench (not one per
topic) where closed work recedes instead of vanishing. The surface is a
__spatial map__ (see THE MAP), dark-only, with prose as detail-on-demand,
HOSTED LOCALLY at `<worktree>/.session/workbench/` (see Workflow — no
cloud). Markdown in `.session/` stays a source of truth; the workbench is
a projection, rebuilt in place on every material state change.

It is also a __boot surface__: the content module holds enough persisted
context (UL, node specs, positions, signals) that a fresh agent on the
worktree reads it to kickstart being informed about the work and Jason's
status/focus — no transcript archaeology.

## THE ACCUMULATION CONTRACT (read first)

This skill is Jason's accumulated spec of what a workbench interface IS.
Every preference he states in-session — vocabulary, layout, framing,
components — gets folded into this skill THEN, so no future agent relearns
it. Stated wishes are spec requirements, not session-local styling. When
extending, respect everything below; when he contradicts it, update it.

## THE UL IS THE HEART (not a side legend)

__The UL is the first thing an agent puts into context when using the
workbench.__ Before layout, runtime, or publishing: load the UL listing
below AND the live content module's `ul` array (it carries any
session-scoped terms). Every subsequent decision — naming, placement, code
organization, what a new feature even IS — is made in UL terms.

The UL is the workbench's domain model, with three consumers held in sync:

1. __Jason__ — the legend modal is its human-readable projection.
2. __The agent__ — read it as the ontology, not as UI copy.
3. __The code__ — organization follows the UL 1:1: component, file, type,
   and prop names ARE UL terms (`Signal`, `Flights`, `Spec`, `Node` —
   never a "Badge" the legend must translate).

It is also the EXTENSION SURFACE: any new concept — including short-lived,
session-particular ones — enters by being named INTO the UL (single word),
placed relative to existing terms, and reflected 1:1 in code and legend.
When its need passes, delete it from all three surfaces — no dead
vocabulary. Terms collapse when one subsumes another (Flight subsumed
"Ops"; Signal subsumed "badge"/"pill"; Node dissolved "Lane"/"Thread" —
they were names for depths, not concepts).

## The UL

* __Naming rule: UL terms are SINGLE WORDS.__ If a term wants two words,
  find the one word.
* __Workbench__ — the whole interface: where the work is visible and
  actionable.
* __Node__ — THE structural unit; nodes all the way down, root = the
  worktree. __Storage spec: a node IS a directory__ (under `.session/`);
  its contents are file(s) in that dir — shapes emerge from files, not
  schema; the map is a projection of the dir tree. A node holds facets
  (Flights, Canon, Spec, position, body, address, Signal) and children.
  States: _open_ (active) or _closed_ (recedes on the map, annotated
  `encoded → spec (fully|partly|none)`; disposable history — conclusions
  live in an ancestor Spec). Free-text kicker labels ("speculative",
  "executing", "worktree") replace the old maturity attribute.
  __Execution-at-node__: at any node, an execution can be requested for
  what that node-and-down LOCKS — drill into one vertical of a massive
  idea, ratchet-approve it, dispatch it, while sibling branches stay
  dirty.
* __Spec__ — a node's standing truth: incremental, always-current,
  __standalone__ — it must survive deletion of every closed descendant
  (never reference one for meaning). Git metaphor: Spec = staged/clean,
  open descendants = dirty. Locked content only; grows by encoding closed
  nodes. Canon and Concepts render inside it.
* __Detail__ — a node's on-demand pane: opens on node click (hash
  deep-links), holds the prose facets (Decision, Flights, Canon + Spec,
  position, body, address) — the map itself stays labels + signals.
  Named for the doctrine: prose is detail-on-demand. NOT "Body" — `body`
  is a facet rendered INSIDE it; part and whole must not share a name.
* __Flight__ — an execution run currently in the air, launched from a
  node: it executes what that node-and-down locks. The node's __Flights
  strip__ is its live surface: In flight / Next cards plus anything
  carrying the awaiting-you Signal. NODE-SCOPED facts only; bulky detail
  collapses quietly inside the strip.
* __Signal__ — THE status indicator. Variants: flight states
  `done`/`run`/`wait` · attention `you` (purple — the user's decision is
  the blocker) · node states `open`/`closed`. On map nodes: chip + border
  glow; it also orders every node's children. Label rule: the OWNING node
  shows its authored label verbatim ("go / park"); ancestors show
  aggregate framing ("N awaiting you") — provenance reads naturally as
  you drill toward the source.
* __Decision__ — the first reified input: a choice awaiting the user at a
  node (`decision: { prompt?, options }`). An open Decision IS the node's
  you-signal (label = options joined) — no separate authoring. Responding
  happens in the node's Detail (choice buttons + optional note);
  the payload `{workbench, kind: "decision", node, decision, choice,
note?, at}` enters THE QUEUE.
* __Message__ — the universal escape hatch, node-scoped (never arbitrary
  DOM): freeform text to the agent — an ack or a big ask. NOT a comment:
  messages are A QUEUE TO BE PROCESSED — each stays pending (✉ counter
  on its node) until the agent does the ask and writes a receipt (see
  THE QUEUE). Compose is ON DEMAND: the node's hover-toolbar ✉ summons
  the form as the Detail's pinned footer — there is NO standing form on
  the Detail; payload
  `{workbench, kind: "message", node, text, at}`. Repeated message
  patterns reify into controls (Decision was first).
* __Canon__ — the rule-shaped strip OF the Spec: terse locked postures
  (rules, not sections), rendered first inside it. Changes only by
  explicit lock.
* __Concept__ — a named mental object in a node's pool; lives in the Spec.
  The diagram IS the concept — its canonical form, without exception;
  prose references it, never substitutes for it. Standard bearer: Tufte —
  direct labels, hairline rules, minimal ink. Prefer theme-aware HTML/CSS
  diagrams (grid + tokens) over hardcoded-color SVG.
* __Address__ — where a node's dir/files live, tucked quiet in its
  detail. The root node's address carries the worktree facts (PR,
  worktree, worker, Updated = last publish). Repetition across scopes is
  conceptually correct; guts-out path dumping is not.
* __Corner__ — ONE quiet control top-right (`⋯`) opening a flyout: `UL`
  and fullscreen (no theme control — dark-only is hardcoded). Only `UL`
  opens a MODAL (the legend); everything else acts in place. Never a
  tabbed settings modal; never a row of always-visible icons.
* __Legend__ — the UL modal: all terms plus Signal semantics. Keep current.
* __Zen rule__ — quiet by default; the right information at the right
  time. Generous whitespace and information density are NOT opposed:
  density is data-per-ink, not data-per-inch — calm emptiness around,
  instrument precision within.
* __Freshness contract__ (operating rule, not a UL noun): set the
  Address's Updated field on every publish; republish on every material
  state change witnessed. Pass a short `label` per publish.

## THE FRACTAL (structural rule)

The workbench is an __infinite branching tree of Nodes__, rooted at the
worktree (git) itself — realized uniformly in the types (`Node` with
`children`; no per-depth types). Deeper nesting is free, not a new
concept. The banner is the root node's facets. Per-node facets split by
one asymmetry — __state rolls up, truth stays put__:

* __Signal (derived)__ — a node's signal AGGREGATES its subtree
  (awaiting-you counts sum; highest urgency wins). Never author a signal
  an aggregation could derive — authored signals are fallback only, for
  state not yet modeled as data. Signals are provenance: the root's
  "1 awaiting you" traces to the node that awaits.
* __Spec (authored)__ — a node's own standing truth. Specs do NOT
  aggregate.
* __Stacking (derived)__ — every node orders its children by their
  aggregated signals: awaiting-you → running → queued → done → none, at
  every depth, authored order never showing through.

## THE MAP (the surface)

The workbench UI is a __spatial 2D map of the fractal tree__ — hard
decision, not a styling choice: Jason is a spatial thinker, and the
terminal + Claude Code already cover text exhaustively; a workbench whose
UI is principally more text is redundant capacity. The map is the missing
organ.

* __Layout__: depth = column (root worktree outward), stack
  order = vertical position, position carries meaning. Edges are
  hairlines. Deterministic layout from data — no DOM measurement.
* __Prose is detail-on-demand__: clicking a node opens its Detail with
  its facets (Flights, Canon + Spec, position, body, address). The map
  surface itself is labels + signals only. Hash deep-links to the
  selected node.
* __Closed recedes, never vanishes__: closed nodes drop to ~14% opacity,
  drift off the main flow, restore on hover. Spatial memory is the point
  — one standing workbench accumulates; the map remembers where things
  were. (At scale, receded nodes may also shed their heavy payloads —
  bytes recede too; defer until measured need.)
* __Dark-only, hardcoded__ (KISS — removed the theme axis entirely).
* __Pan__ = wheel/drag; __zoom__ = pinch (ctrl/cmd+wheel), toward cursor.
* Size reality: the runtime is a fixed ~340KB; content grows linearly and
  twoslash snippets (~57KB each) dominate. Multi-MB ≈ 20+ snippets;
  mitigations when measured: recede sheds mass, gzip +
  `DecompressionStream` (native, CSP-legal).

## THE BOOT CONTRACT (agent rehydration)

The content module is a structured rehydration document. A fresh agent on
the worktree boots by reading: (1) the UL, (2) the worktree's content
module (node specs, positions, signals = Jason's status and focus),
(3) any CHECKPOINT the session left. __The LLM is the parser__: derive
git/session facts by reading them directly at authoring time — no
build-time parsers; reify a parser only when token cost or error rate
proves the need.

## UI IS VISUALIZATION (design rule)

UI and visualization are, if not the same thing, the closest of
collaborators — THE way to think about a workbench. Information
presentation is always relative to the INFORMATION, never to a pre-canned
generic component; on-the-fly code generation makes bespoke-per-information
UI possible like never before — exploit it. The fractal's derived stacking
is this rule pre-applied to the stable concepts; for any new concept, ask
"what does this information's own state ORDER/EMPHASIZE?" before reaching
for a generic layout.

## Workflow (runtime — React + Tailwind + shadcn, rolldown-bundled)

The runtime lives at `runtime/` in this skill: vendored shadcn components
(`src/components/ui/`, incl. `Signal`), workbench chrome
(`src/workbench/`), and content as TSX data modules
(`src/content/<domain>.tsx` exporting `WorkbenchContent`). Content and
runtime are deliberately split: iterating content never touches the
runtime; iterating the UI is a runtime edit.

__HOSTING IS LOCAL (decision 2026-07-17: artifact hosting DITCHED).__ The
workbench lives at `<worktree>/.session/workbench/`: `workbench.html`
(built bundle) + `inbox/` (pending queue) + `processed/` (receipts).
Rationale on record: claude.ai hosting bought only off-machine URLs,
share-links, and the `window.claude.mcp` connector runtime — none in the
workflow — while costing a publish round-trip and blocking the local
verify loop; local hosting unlocks a write path strictly better than the
Drive connector design (no auth, no observation constraint, instant
read-back). The old artifact URL survives as a dead snapshot; artifact
mode returns only if sharing/off-machine ever becomes a real need.

1. Author/edit the content module; point `src/main.tsx` at it.
2. Snippets: write `.ts` files (Typed sketchpad below), render with
   `scripts/render.ts` → `.html` fragments in a snippets dir.
3. Build ONE self-contained HTML (everything inlined):

   ```bash
   cd ~/.claude/skills/workbench/runtime && bun install   # once
   ./node_modules/.bin/tsx build.ts \
     --snippets <dir-of-rendered-html> \
     --out <worktree>/.session/workbench/workbench.html \
     --stamp "<YYYY-MM-DD · label>"
   ```

   Warm build ≈ 150ms — bundle-per-rebuild IS dev mode. Decision on
   record: direct rolldown, NOT vite/vp — `bundle.generate()` returns the
   JS as an in-memory string for single-file assembly, and vp would couple
   a user-level skill to a repo checkout.

4. Verify — jsdom smoke executes the built bundle and asserts rendered
   text:

   ```bash
   ./node_modules/.bin/tsx smoke.ts <built.html> "<expected text>" ...
   ```

5. Serve (the standing open path — also the write loop):

   ```bash
   ./node_modules/.bin/tsx serve.ts --dir <worktree>/.session/workbench --port 4517
   ```

   `GET /` serves the bundle with `no-store` (rebuilds are live on
   reload — no cache-busting dance); `POST /record` appends
   `inbox/<kind>-<ts>.json`; `GET /messages` returns `{pending}` and
   drives the node ✉ counters. Jason opens http://127.0.0.1:4517/. Run it
   in the background, track the PID (process-isolation rules apply), and
   allowlist the port for claude-in-chrome verification. The chrome
   extension cannot drive `file://` URLs — the server IS the open path.

## THE QUEUE (Message/Decision processing protocol)

Page writes land as files in `inbox/` (`kind: "message" | "decision"`,
node-anchored, stamped). __They are a queue addressed to the agent, not
annotations__: each stays pending — and its node shows the ✉ counter —
until the agent processes it. Processing = do the ask (an ack or a big
task), then write the receipt: add `receipt` (what was done) +
`processedAt` to the payload and move the file `inbox/` → `processed/`.
Never delete without a receipt; never leave a processed ask in `inbox/`.
Check the inbox at turn start and whenever Jason says to check the
workbench. Transport in the page is tiered automatically: same-origin
POST when served, clipboard fallback otherwise (pasted payloads are the
same queue items — process them identically, receipts included).

## Typed sketchpad (Shiki tokyo-night + Twoslash)

Speculative APIs can't typecheck — so __the `declare` stubs above the
`// ---cut---` line ARE the design__: hovers carry the claims, JSDoc on
the stubs replaces surrounding prose, `// ^?` pins inline type readouts.
Precomputed at publish time → static CSS hover popups, CSP-safe, zero
runtime JS.

```bash
cd ~/.claude/skills/workbench/scripts && bun install   # once
./node_modules/.bin/tsx render.ts <snippet.ts>         # → <snippet>.html
```

`build.ts` injects `@shikijs/twoslash/style-rich.css` BEFORE the page CSS
(it ships light `:root` var defaults that must lose the cascade to the
page's tokyo-night `--twoslash-*` values).

## Common mistakes (each one observed and corrected in the field)

| Mistake                                   | Fix                                                                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| A global operations/status tab            | Reads as soup; live state colocates per node (the Flights strip)                                                        |
| Flat nav of many peer sections            | The tree does the leveling: nodes → children; Signals on nodes                                                          |
| Status language inside the Spec           | Specs are timeless; state lives in Flights/Signals only                                                                 |
| Running `render.ts` with bun              | `ts.sys` is undefined under bun — run via `tsx` (node)                                                                  |
| `typescript@7.x` in scripts deps          | The Go-era compiler has no `ts.sys` JS API; twoslash needs pinned 5.x                                                   |
| No Updated field on publish               | Staleness becomes a trust question; set it every publish                                                                |
| New file path on redeploy                 | Mints a new URL; same path = same URL                                                                                   |
| Repo-real imports in snippets             | Not wired yet — use declare-stubs; real-import twoslash via VFS is the ambition                                         |
| `define` at rolldown top level            | Rolldown ≥1.2 wants `transform: { define: {...} }`                                                                      |
| `npm` in the skill dirs                   | Hooks enforce the skill toolchain — use `bun add --exact` (runtime/, scripts/)                                          |
| Publishing without the smoke test         | jsdom smoke (`runtime/smoke.ts`) catches a blank/broken page before the user does                                       |
| Twoslash CSS appended after page CSS      | `style-rich.css`'s own light `:root` defaults win the cascade → white popups. Twoslash CSS first, page CSS after        |
| Descendant selectors on panel `pre.shiki` | Popups nest their own `pre.shiki` — panel padding/radius leaks in. Use direct-child (`.codepanel > pre.shiki`)          |
| `overflow-x: auto` on the snippet pre     | Clips hover popups (overflow-y computes auto too). Keep it `visible`; author snippet lines narrow (~90 cols)            |
| CSS bugs diagnosed by eyeball             | Serve the built file locally (`python3 -m http.server`) and `getComputedStyle` the suspect element via claude-in-chrome |

## Write interactions

Both shipped verbs ride THE QUEUE (see above): __Message__ (universal
escape hatch — hover toolbar ✉ on every node summoning the Detail's footer form) and
__Decision__ (choice buttons). The retired design for reference: the
Drive-connector append-only path (artifact `mcp` capability) died with
artifact hosting — local `POST /record` supersedes it with no auth, no
schema-observation constraint, and instant read-back. __Verbs are earned,
never speculated__: reify a repeated message pattern into a control only
after observing it n times (Decision was the first).

## Addendum rows — common mistakes (observed 2026-07-17)

| Mistake                                            | Fix                                                                                                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Assuming the artifact host sets charset            | It does not reliably — mojibake (`â€"`) shipped to the published page. Emit `<meta charset="utf-8">` as the FIRST line of the built HTML                                                                                                   |
| Trusting the browser tab during local verify       | Chrome serves the CACHED build after a rebuild — the "missing" feature is a stale page. Cache-bust with a `?v=` query before concluding anything                                                                                           |
| Shipping a guessed connector call shape            | When observation is blocked (e.g. expired connector token), ship the clipboard fallback and SAY the observation is blocked — never guess the schema                                                                                        |
| Persisted queries (`^?`) left as upstream overlays | style-rich.css keeps them `position: absolute` — they collide with whatever follows the snippet. globals.css flows them in-block (`.codepanel .twoslash-query-persisted .twoslash-popup-container { position: relative; display: block }`) |
