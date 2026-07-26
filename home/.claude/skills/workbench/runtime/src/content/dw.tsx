import * as React from "react"
import { Signal } from "../components/ui/signal"
import { Card, CardBody, CardLabel } from "../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableCellNum,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  Board,
  Concept,
  LaneAddress,
  Layer,
  LayerStack,
  Lede,
  Flights,
  Quiet,
  SectionTitle,
  Snippet,
} from "../workbench/prims"
import type { WorkbenchContent } from "../workbench/types"

/* ─────────────────────────── Lane 1 · TS Schema ─────────────────────────── */

const schemaFlights = (
  <Flights>
    <Board>
      <Card>
        <CardLabel>In flight</CardLabel>
        <CardBody>
          <span className="text-[16.5px] font-[650]">Manual</span> — Jason driving batch 8/9+
          directly post-outage; 4 enricher/effect-prisma refactor commits landed, work in flight{" "}
          <Signal variant="run">in flight</Signal>
        </CardBody>
      </Card>
      <Card>
        <CardLabel>Next</CardLabel>
        <CardBody>Tower resyncs from worktree state when the manual work settles</CardBody>
      </Card>
    </Board>
    <Quiet summary="Batch pipeline (11) + backlog">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCellNum>1</TableCellNum>
            <TableCell>
              DateTime.Utc codec helpers; DW authored models on them; delete Version cell model
            </TableCell>
            <TableCell><Signal variant="done">done · rachet</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>2</TableCellNum>
            <TableCell>
              Naming canon: <code>DateTimeInsert</code>/<code>DateTimeUpdate</code>; legacy →{" "}
              <code>DateRaw*</code>
            </TableCell>
            <TableCell><Signal variant="done">done · rachet</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>3</TableCellNum>
            <TableCell>
              <code>Model.Relation</code> v1 (projection-only) + relation-aware <code>$</code>
            </TableCell>
            <TableCell><Signal variant="done">done</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>4</TableCellNum>
            <TableCell>
              <code>schema/Model.ts</code> → <code>Model/</code> dir; surface proven identical
            </TableCell>
            <TableCell><Signal variant="done">done</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>5</TableCellNum>
            <TableCell>
              <code>schemas/date.ts</code> + <code>fieldMap.ts</code>
            </TableCell>
            <TableCell><Signal variant="done">done</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>6</TableCellNum>
            <TableCell>
              Final algebra; FK-subsumption stubs; PK identity; type-only rejections — 20/20
            </TableCell>
            <TableCell><Signal variant="done">done</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>7</TableCellNum>
            <TableCell>
              Wiring: authored declarations; DMMF vetting (9-row matrix); PSL renames + migration
              refresh; regen (DW-scoped); payload-as-selection; FIXMEs HEA-4856/4858 — enricher 248
              tests, byte oracle stable
            </TableCell>
            <TableCell><Signal variant="done">done</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>8</TableCellNum>
            <TableCell><code>Select</code> class-position projection</TableCell>
            <TableCell><Signal variant="run">running</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>9</TableCellNum>
            <TableCell>
              Cell collapse: Select class; delete query.ts; handlers to <code>.select</code> + stub
              writes
            </TableCell>
            <TableCell><Signal variant="wait">after 8</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>10</TableCellNum>
            <TableCell>
              Variant-aware <code>$</code> + create/update payload collapse
            </TableCell>
            <TableCell><Signal variant="wait">later</Signal></TableCell>
          </TableRow>
          <TableRow>
            <TableCellNum>11</TableCellNum>
            <TableCell>Cell canon rewrite (lint rule)</TableCell>
            <TableCell><Signal variant="wait">later</Signal></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ul>
        <li>
          <a href="https://linear.app/heartbeat-chat/issue/HEA-4856">HEA-4856</a> — back-relation
          to-one.
        </li>
        <li>
          <a href="https://linear.app/heartbeat-chat/issue/HEA-4857">HEA-4857</a> — community as
          relation / type-only targets.
        </li>
        <li>
          <a href="https://linear.app/heartbeat-chat/issue/HEA-4858">HEA-4858</a> — create/update
          payload collapse.
        </li>
        <li>
          <a href="https://linear.app/heartbeat-chat/issue/HEA-4859">HEA-4859</a> — to-many selection
          args.
        </li>
        <li>
          <a href="https://linear.app/heartbeat-chat/issue/HEA-4860">HEA-4860</a> — nested-write
          modeling.
        </li>
      </ul>
    </Quiet>
    <LaneAddress>
      thread <code>.session/thread.dw-model-relations/</code> · plan.md = batch table + locked
      decisions
    </LaneAddress>
  </Flights>
)

const schemaCanon = (
  <>
    <li>
      <b>The 1:1 rule.</b> Per Prisma construct: full-fidelity modeling or transparent overlay —
      never a lossy middle. Modeled: scalars, relations, selection. Overlay: <code>where</code>{" "}
      (permanent), nested writes, full operation inputs.
    </li>
  </>
)

const schemaSpec = (
  <>
    <Lede>
      The locked TS-schema design — authored Prisma models as the single expressive layer (codecs,
      relations, projections) that cells consume directly.
    </Lede>

    <SectionTitle>Timestamps</SectionTitle>
    <ul className="kv">
      <li>
        Canonical: <b><code>Model.DateTimeInsert</code> / <code>DateTimeUpdate</code></b> — decoded{" "}
        <code>DateTime.Utc</code>, driver-encoded <code>Date</code>; create/update variants
        overrideable with <code>DateTime.now</code> defaults.
      </li>
      <li>
        Legacy: <code>DateRawInsert</code> / <code>DateRawUpdate</code> only for type-only models;
        the pair deletes with the last type-only consumer.
      </li>
    </ul>

    <SectionTitle>Relation algebra</SectionTitle>
    <ul className="kv">
      <li>
        <b><code>Relation.One(() =&gt; T)</code></b> — to-one, decoded non-null. Over a PSL-optional
        relation this <em>is</em> the domain refinement: null at decode = defect, by ordinary schema
        failure.
      </li>
      <li>
        <b><code>Relation.OneNullable(() =&gt; T)</code></b> — honest <code>T | null</code>. Positive
        naming; no NonNull concept.
      </li>
      <li>
        <b><code>Relation.Many(() =&gt; T)</code></b> — <code>ReadonlyArray&lt;T&gt;</code>,
        include-only.
      </li>
      <li>
        <b><code>Relation.OneWith(&#123;…&#125;)(…)</code></b> — config escape hatch. Stub is shaped
        by the <em>referenced field</em>; PK is the inferred default and the only supported path
        today (non-PK unique references fail generation loudly until a consumer exists).
      </li>
      <li>
        Thunks + suspend for mutual recursion; type-only models can neither host relation fields nor
        be targets.
      </li>
    </ul>

    <SectionTitle>FK subsumption</SectionTitle>
    <ul className="kv">
      <li>
        FK-owning <code>One</code>/<code>OneNullable</code> <b>subsume their FK column</b>: base row
        and write variants carry a PK-stub <code>&#123; id &#125;</code>; handlers write{" "}
        <code>liveVersion: &#123; id &#125;</code>.
      </li>
      <li>
        Column inferred <b><code>&lt;use-site property name&gt;Id</code></b>; enricher vets
        declarations against DMMF (target, cardinality, optionality, column, PK).
      </li>
      <li>Granular adoption — undeclared models are untouched.</li>
    </ul>

    <SectionTitle>Projections</SectionTitle>
    <ul className="kv">
      <li>
        <b><code>Model.X.$(&#123;…&#125;)</code></b> — value-position selection; carries{" "}
        <code>.select</code>. Relations: <code>true | nested Target.$(&#123;…&#125;)</code>, wrapped
        per cardinality; nested ownership is nominal (literal model name).
      </li>
      <li>
        <b><code>Model.X.Select</code></b> — class-position twin preserving <code>.select</code> +
        the selection-owner marker. Named stable shapes live on the Success side only.
      </li>
      <li>
        <b>Payloads are passthroughs</b> — no payload classes; key-shaped payloads are direct{" "}
        <code>$</code> selections; create/update collapse waits on variant-aware <code>$</code>{" "}
        (HEA-4858); revise keeps hand-written patch-optionality permanently.
      </li>
    </ul>

    <SectionTitle>Cell end-state (what this buys)</SectionTitle>
    <ul className="kv">
      <li>
        <code>query.ts</code> deleted; decode defect replaces <code>requireLiveVersion</code>; cell
        model becomes a <code>Select</code> class; <code>models/</code> keeps only invariant-bearing
        or non-persisted concepts.
      </li>
      <li>Wire changes free while the cell is unmounted.</li>
    </ul>
  </>
)

/* ──────────────────────── Lane 2 · Cell compaction ──────────────────────── */

const compactionFlights = (
  <Flights>
    <Board>
      <Card className="border-you">
        <CardLabel className="text-you">Awaiting Jason</CardLabel>
        <CardBody>
          L3 evidence pass — research dispatch on the GQL-islands questions{" "}
          <Signal variant="you">go / park</Signal>
        </CardBody>
      </Card>
      <Card>
        <CardLabel>Mode</CardLabel>
        <CardBody>
          Spitball — no directions locked; caller-site demos over n turns; explicit alignment before
          any batch
        </CardBody>
      </Card>
    </Board>
    <LaneAddress>
      thread <code>.session/thread.dw-cell-compaction/</code> · plan.md (spine) · design-inputs.md ·
      audit-dw.md · audit-pages.md · derivations.md · l3-boundary.md
    </LaneAddress>
  </Flights>
)

const compactionCanon = (
  <>
    <li>
      <b>No jagged consumer paths</b> — never shape the general surface around specific consumers;
      consumer-specific concern lives in tooling only.
    </li>
    <li>
      <b>v4 supplies the algebra, we supply the nouns</b> — ergonomic surfaces over v4 machinery;
      always droppable one level to vanilla values.
    </li>
  </>
)

const compactionSpec = (
  <>
    <Lede>
      Why can't the cell be an order of magnitude more compact with zero loss — and, flipped, why
      aren't we demanding <em>less</em> code with <em>more</em> power?
    </Lede>

    <Concept name="the three layers">
      <LayerStack>
        <Layer tag="L3" note="the gate · triage first · gates ↓ the L2 definer">
          <b>Boundary protocol</b> — what the cell speaks at its edge. Effect RPC + tRPC bridge
          today; GQL islands the live divergence.
        </Layer>
        <Layer tag="L2" note="candidates · this lane">
          <b>Cell interior derivation</b> — prims deriving the ceremony: crud, scoping, definer,
          shells.
        </Layer>
        <Layer tag="L1" note="executing · Lane 1 · transport-agnostic, feeds every future">
          <b>Model / persistence expressiveness</b> — codecs, relations, projections.
        </Layer>
      </LayerStack>
    </Concept>
  </>
)

const compactionThreads = [
  {
    id: "prims",
    title: "prims",
    state: "open" as const,
    position: (
      <>
        Lean: cell = layout convention over <b>namespace-extension prims</b> on vanilla v4 rpc — not
        a wrapper framework; audits say 60–70% of the cell is derivable ceremony.
      </>
    ),
    body: (
      <>
        <ul className="kv">
          <li>
            <b>Baseline: cell on v4 effect rpc — vanilla already measured.</b> The DW cell IS the
            vanilla-rpc experiment; the audit is the measurement. Old <code>libs/cell</code>{" "}
            survives only for events.
          </li>
          <li>
            <b>Candidates (L2 derivations):</b> CRUD derivation · scoping policy · spec definer
            (gated by L3) · shell derivation · source.ts compression (lib-prim extraction).
          </li>
        </ul>

        <SectionTitle className="mt-6 text-[15.5px]">Sketchpad — typed speculation (hover everything)</SectionTitle>
        <Lede>The stubs above the cut are the design; hovers carry the claims the prose used to.</Lede>
        <Snippet id="prims-shape" />

        <SectionTitle className="mt-6 text-[15.5px]">Evidence — two cell audits</SectionTitle>
        <p>
          <b>DW baseline (≈ 820 LOC excl. tests):</b> compressible ≈ 60–70%; stubborn block is{" "}
          <code>lib/source.ts</code>. Ceremony compresses ~10×; whole cell nearer 3–4× unless
          source.ts's generic machinery extracts to a lib prim.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Files</TableHead>
              <TableHead>LOC</TableHead>
              <TableHead>After pipeline</TableHead>
              <TableHead>Irreducible?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Domain logic</TableCell>
              <TableCell>create/revise orchestration</TableCell>
              <TableCellNum>~150</TableCellNum>
              <TableCellNum>~120</TableCellNum>
              <TableCell>YES — multi-write + compensation (HEA-4806)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Domain lib</TableCell>
              <TableCell>lib/source.ts</TableCell>
              <TableCellNum>161</TableCellNum>
              <TableCellNum>161</TableCellNum>
              <TableCell>Logic yes; SIZE suspect — lib-prim extraction candidate</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Domain concepts</TableCell>
              <TableCell>CompiledWorkflow, UL, errors/</TableCell>
              <TableCellNum>~50</TableCellNum>
              <TableCellNum>~50</TableCellNum>
              <TableCell>YES</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CRUD handlers</TableCell>
              <TableCell>get/list/delete/update</TableCell>
              <TableCellNum>~95</TableCellNum>
              <TableCellNum>~80</TableCellNum>
              <TableCell>NO — derivable</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spec bodies</TableCell>
              <TableCell>6 procedure specs</TableCell>
              <TableCellNum>~155</TableCellNum>
              <TableCellNum>~110</TableCellNum>
              <TableCell>PARTLY</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spec ceremony</TableCell>
              <TableCell>statics + type mirror</TableCell>
              <TableCellNum>64</TableCellNum>
              <TableCellNum>64</TableCellNum>
              <TableCell>NO — derive the mirror</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wiring shells</TableCell>
              <TableCell>client/handlers/index*</TableCell>
              <TableCellNum>~45</TableCellNum>
              <TableCellNum>~45</TableCellNum>
              <TableCell>NO — convention-derivable</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Query glue</TableCell>
              <TableCell>query.ts + re-projection</TableCell>
              <TableCellNum>~45</TableCellNum>
              <TableCellNum>0</TableCellNum>
              <TableCell>dying (batch 9)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>
          <b>Pages at scale (~17,720 LOC — 21× DW):</b> cautionary tale + repair target. Middlemen
          grow superlinearly (45 lines of query glue ↔ 2.6k of projectors). Every candidate passes{" "}
          <b>"would this have survived Pages?"</b>. Estimate to validate: ~17.7k → ~8–9k.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area</TableHead>
              <TableHead>LOC</TableHead>
              <TableHead>Reading</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><code>lib/</code></TableCell>
              <TableCellNum>6,945</TableCellNum>
              <TableCell>Generation/template/prompt — legitimate mass</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code>operations/</code></TableCell>
              <TableCellNum>6,339</TableCellNum>
              <TableCell>Legacy layout: 4,149-line monolith + 1,778-line slotValueChange</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code>projectors/</code></TableCell>
              <TableCellNum>2,586</TableCellNum>
              <TableCell>Middlemen at scale: Version.ts 1,220; VersionNotDecodable.ts 474</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code>models/</code></TableCell>
              <TableCellNum>1,546</TableCellNum>
              <TableCell>16 files — re-projection vs concept ratio TBD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code>errors/</code></TableCell>
              <TableCellNum>288</TableCellNum>
              <TableCell>fine</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    ),
    address: (
      <>
        <code>.session/thread.dw-cell-compaction/</code> · design-inputs.md · audit-dw.md ·
        audit-pages.md · derivations.md
      </>
    ),
  },
  {
    id: "scoping",
    title: "scoping",
    state: "open" as const,
    position: (
      <>
        Scoping is <b>data-access, not middleware</b> — open: is tenancy+visibility one concept or
        two, and does tenancy live model-level or cell-level?
      </>
    ),
    body: (
      <ul className="kv">
        <li>
          <code>RpcMiddleware</code> covers transport cross-cutting natively; tenancy + visibility
          inject Prisma <code>where</code> fragments — the Model×handler-derivation seam.
        </li>
        <li>
          Goal shape: declared once; missing-scope bugs unrepresentable.
        </li>
      </ul>
    ),
    address: (
      <>
        <code>.session/thread.dw-cell-compaction/design-inputs.md</code> — scoping position
      </>
    ),
  },
  {
    id: "sdk",
    title: "sdk",
    state: "open" as const,
    position: (
      <>
        <b>The spec is the SDK</b> — every client is a derivation over the spec value; tension with
        tree-shaking is resolved by general solutions only (no jagged consumer paths).
      </>
    ),
    body: (
      <ul className="kv">
        <li>
          ts-checker precedent; DW client = <code>RpcClient.FromGroup</code>;{" "}
          <code>index.iso.ts</code> membrane. Accrues to whichever L3 future wins.
        </li>
        <li>
          Spec surfaces are DCE-hostile by construction. General remedies: uniformly static
          authoring, a uniform rolldown-plugin transform, or the codegen sibling. Tooling is the only
          home for consumer-specific concern.
        </li>
      </ul>
    ),
  },
  {
    id: "events",
    title: "events",
    state: "open" as const,
    position: (
      <>
        Unexplored — does the events consumer fold into the declaration surface, or stay the last
        legitimate resident of old <code>libs/cell</code>?
      </>
    ),
  },
  {
    id: "boundary",
    title: "boundary",
    state: "open" as const,
    decision: {
      prompt: "L3 evidence pass — dispatch the research on the GQL-islands questions?",
      options: ["go", "park"],
    },
    position: (
      <>
        L3 is the gate; <b>awaiting go/park</b> on the evidence pass (GQL islands / effectified
        Graffle).
      </>
    ),
    body: (
      <p>
        Effect RPC + tRPC bridge today; <b>GQL islands → federation</b> is the live divergence
        (in-memory resolver queries; effectified Graffle as client — selection sets taking native
        Effects). The <code>$</code>/<code>Select</code> grammar IS selection-set semantics; DW can
        be <em>born</em> an island while unmounted. Lock mechanism: dual demo — the same cell both
        ways, caller-site code only.
      </p>
    ),
    address: (
      <>
        <code>.session/thread.dw-cell-compaction/l3-boundary.md</code>
      </>
    ),
  },
]

/* ────────────────────────────── the workbench ────────────────────────────── */

export const content: WorkbenchContent = {
  ul: [
    ["Workbench", <>This interface — operated, not read. A document tells; a workbench is where the work is visible and actionable.</>],
    ["Node", <>THE structural unit — nodes all the way down; the root is the worktree. A node is a directory (under <code>.session/</code>); its contents are files in that dir. Nodes hold facets (Spec, Canon, Flights, Signal) and children; closed nodes recede on the map, never vanish. At any node, an execution can be requested for what that node-and-down <b>locks</b> — ratchet-approve one vertical while sibling branches stay dirty.</>],
    ["Spec", <>A node's standing truth — incremental, always-current, <b>standalone</b>: it survives deletion of every closed descendant. Locked content only; grows by encoding closed nodes. Specs do not aggregate — truth stays put.</>],
    ["Detail", <>A node's on-demand pane — opens on node click, holds the prose facets (Decision, Flights, Spec, body, address); the map stays labels + signals. Prose is detail-on-demand. The ✉ toolbar summons the Message compose as its pinned footer — no standing form.</>],
    ["Canon", <>The rule-shaped strip of the Spec: terse locked postures. Changes only by explicit lock.</>],
    ["Flight", <>An execution run currently in the air, launched from a node — it executes what that node-and-down locks. The node's Flights strip is its live surface: what's flying, what's next, anything awaiting you.</>],
    ["Address", <>Where things live: each node's dir/files, tucked quiet in its detail. The root node's address carries the worktree facts (PR, worktree, worker, Updated = last publish). Quiet by default.</>],
    ["Concept", <>A named mental object in a node's pool; lives in the Spec. The diagram IS the concept — its canonical form, without exception; prose references it. Standard: Tufte (direct labels, minimal ink).</>],
    ["Decision", <>The first reified input: a choice awaiting you at a node. An open Decision <em>is</em> the node's awaiting-you Signal (options as the label); respond in the node's Detail — the recorded choice enters the inbox queue the agent processes.</>],
    ["Message", <>The universal escape hatch, node-scoped: freeform text to the agent — an ack or a big ask. Messages are a QUEUE, not annotations: each stays pending (✉ counter on its node) until the agent processes it and writes a receipt. Repeated message patterns get reified into controls (Decision was first). Hover a node for the ✉ toolbar.</>],
    ["Signal", <>THE status indicator. Flight states: <Signal variant="done">done</Signal> <Signal variant="run">running</Signal> <Signal variant="wait">queued</Signal> · attention: <Signal variant="you">awaiting you</Signal> (your decision is the blocker) · node states: <Signal variant="open">open</Signal> <Signal variant="closed">closed</Signal>. Signals aggregate up the tree (state rolls up) and <b>order</b> every node's children — awaiting-you rises.</>],
  ],
  root: {
    id: "root",
    title: "DynamicWorkflow",
    kicker: "worktree",
    spec: (
      <dl className="text-[13px]">
        <dt className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground first:mt-0">PR</dt>
        <dd className="m-0 mt-0.5"><a href="https://github.com/heartbeat-chat/Heartbeat/pull/1571">#1571</a></dd>
        <dt className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Worktree</dt>
        <dd className="m-0 mt-0.5"><code>codex/dynamic-workflow-cell-stacked</code> · batches absorbed into rachet + refactor commits · manual work dirty</dd>
        <dt className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Worker</dt>
        <dd className="m-0 mt-0.5"><span className="font-mono text-xs">codex dispatch paused · normal tier on resume</span></dd>
        <dt className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Updated</dt>
        <dd className="m-0 mt-0.5"><b>%%STAMP%%</b></dd>
      </dl>
    ),
    children: [
      {
        id: "schema",
        title: "TS Schema iteration",
        kicker: "executing",
        signal: { variant: "run", label: "manual control" },
        flights: schemaFlights,
        canon: schemaCanon,
        spec: schemaSpec,
        children: [
          {
            id: "model-relations",
            title: "model-relations",
            state: "closed",
            encoded: "partly",
            position: (
              <>
                Relation algebra, FK subsumption, payload passthrough, and the 1:1 rule locked over
                7 batches — the spec above stands alone; the verbose stream (batch briefs, fork
                resolutions, DMMF vetting detail) remains in the node's files.
              </>
            ),
            address: (
              <>
                <code>.session/thread.dw-model-relations/</code> · plan.md
              </>
            ),
          },
        ],
      },
      {
        id: "compaction",
        title: "Cell compaction",
        kicker: "speculative",
        /* no authored signal — derived from the subtree (boundary node) */
        flights: compactionFlights,
        canon: compactionCanon,
        spec: compactionSpec,
        children: compactionThreads,
      },
    ],
  },
}
