import * as React from "react"
import { cn } from "../lib/utils"
import { Signal } from "../components/ui/signal"
import type { Node, WorkbenchContent } from "./types"

/* ── the spatial model ──────────────────────────────────────────────────────
   The workbench is a MAP: the node tree laid out in 2D, position carrying
   meaning (depth = column, stack order = attention), prose demoted to
   detail-on-demand. Closed nodes recede — low opacity, off the flow —
   closed up, not gone. Nodes all the way down; no per-depth concepts. */

const signalRank: Record<string, number> = { you: 0, run: 1, wait: 2, done: 3 }

/* Signal aggregation — state rolls up. Closed subtrees don't signal (their
   own chip shows closed/encoded instead). Authored signals are leaf inputs;
   an interior node's authored signal is only a fallback for state not yet
   modeled as data. */
/* an open Decision IS a you-signal — authored signal wins if both exist */
function ownSignal(node: Node): Node["signal"] | undefined {
  if (node.signal) return node.signal
  if (node.decision && node.state !== "closed") {
    return { variant: "you", label: node.decision.options.join(" / ") }
  }
  return undefined
}

function subtreeSignals(node: Node): Array<NonNullable<Node["signal"]>> {
  if (node.state === "closed") return []
  const own = ownSignal(node)
  return (own ? [own] : []).concat((node.children ?? []).flatMap(subtreeSignals))
}

/* The OWNING node shows its authored label verbatim; ancestors show
   aggregate framing ("N awaiting you") — provenance reads naturally as you
   drill toward the source. */
export function effectiveSignal(node: Node): Node["signal"] | undefined {
  if (node.state === "closed") return undefined
  const descendants = (node.children ?? []).flatMap(subtreeSignals)
  const own = ownSignal(node)
  if (descendants.length === 0) return own
  const all = (own ? [own] : []).concat(descendants)
  const youCount = all.filter((s) => s.variant === "you").length
  if (youCount > 0) return { variant: "you", label: `${youCount} awaiting you` }
  const top = [...all].sort(
    (a, b) => (signalRank[a.variant] ?? 4) - (signalRank[b.variant] ?? 4),
  )[0]!
  return { variant: top.variant, label: top.label ?? top.variant }
}

const nodeRank = (n: Node) => {
  if (n.state === "closed") return 9
  const s = effectiveSignal(n)
  return s ? (signalRank[s.variant] ?? 4) : 4
}

/* Stacking — every node orders its children the same way, at every depth. */
export const stackChildren = (nodes: Node[]) => [...nodes].sort((a, b) => nodeRank(a) - nodeRank(b))

export interface Placed {
  node: Node
  id: string
  depth: number
  receded: boolean
  chip?: { variant: "run" | "you" | "done" | "wait" | "open" | "closed"; label?: string }
  x: number
  y: number
  w: number
  h: number
}

const COL_W = 360
const size = (depth: number) =>
  depth === 0 ? { w: 250, h: 84 } : depth === 1 ? { w: 280, h: 72 } : { w: 250, h: 56 }
/* sibling gap fits the hover toolbar that reveals under each node */
const GAP = { sibling: 38, block: 48, recede: 70 }

function chipFor(node: Node): Placed["chip"] {
  if (node.state === "closed") {
    return { variant: "closed", label: node.encoded ? `encoded ${node.encoded}` : "closed" }
  }
  return effectiveSignal(node)
}

export function layout(root: Node): { placed: Placed[]; edges: Array<[Placed, Placed]> } {
  const placed: Placed[] = []
  const edges: Array<[Placed, Placed]> = []

  const place = (node: Node, depth: number, y0: number, inheritReceded: boolean): { block: number; self: Placed } => {
    const receded = inheritReceded || node.state === "closed"
    const { w, h } = size(depth)
    const kids = stackChildren(node.children ?? [])
    let block: number
    let selfY: number
    const childPlaced: Placed[] = []
    if (kids.length === 0) {
      block = h
      selfY = y0
    } else {
      let cy = y0
      for (const kid of kids) {
        const r = place(kid, depth + 1, cy, receded)
        childPlaced.push(r.self)
        cy += r.block + GAP.sibling
      }
      const kidsBlock = cy - GAP.sibling - y0
      block = Math.max(kidsBlock, h)
      selfY = y0 + block / 2 - h / 2
    }
    const self: Placed = {
      node,
      id: node.id,
      depth,
      receded,
      chip: chipFor(node),
      x: depth * COL_W + (receded && node.state === "closed" ? GAP.recede : 0),
      y: selfY,
      w,
      h,
    }
    placed.push(self)
    for (const c of childPlaced) edges.push([self, c])
    return { block, self }
  }

  place(root, 0, 0, false)
  return { placed, edges }
}

/* pan/zoom: wheel pans, pinch (ctrl/cmd+wheel) zooms toward cursor, drag pans */
function usePanZoom(initial = { x: 80, y: 80, k: 1 }) {
  const [t, setT] = React.useState(initial)
  const ref = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ px: number; py: number } | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        const rect = el.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top
        setT((t) => {
          const k = Math.min(2, Math.max(0.35, t.k * Math.exp(-e.deltaY * 0.01)))
          const s = k / t.k
          return { k, x: mx - (mx - t.x) * s, y: my - (my - t.y) * s }
        })
      } else {
        setT((t) => ({ ...t, x: t.x - e.deltaX, y: t.y - e.deltaY }))
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return
    drag.current = { px: e.clientX, py: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const { px, py } = drag.current
    drag.current = { px: e.clientX, py: e.clientY }
    setT((t) => ({ ...t, x: t.x + e.clientX - px, y: t.y + e.clientY - py }))
  }
  const onPointerUp = () => {
    drag.current = null
  }
  return { t, ref, handlers: { onPointerDown, onPointerMove, onPointerUp } }
}

const chipGlow: Record<string, string> = {
  you: "border-you shadow-[0_0_24px_rgba(200,140,224,0.25)]",
  run: "border-run/60",
  open: "border-primary/50",
  closed: "",
  done: "border-done/50",
  wait: "",
}

function NodeView({
  p,
  selected,
  messageCount,
  onSelect,
  onMessage,
}: {
  p: Placed
  selected: boolean
  messageCount: number
  onSelect: (id: string) => void
  onMessage: (id: string) => void
}) {
  return (
    <div
      className={cn("group absolute", p.receded && "opacity-[0.14] hover:opacity-70")}
      style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
    >
      <button
        onClick={() => onSelect(p.id)}
        className={cn(
          "flex size-full cursor-pointer flex-col justify-center rounded-[10px] border border-border bg-card px-4 text-left",
          p.depth === 0 && "bg-background",
          p.chip && chipGlow[p.chip.variant],
          selected && "outline-2 outline-primary outline",
        )}
      >
        {p.node.kicker && (
          <span className="text-[9.5px] font-bold uppercase tracking-[0.09em] text-muted-foreground">
            {p.node.kicker}
          </span>
        )}
        <span className={cn("truncate font-semibold", p.depth >= 2 ? "text-[13px]" : "text-[15px]")}>
          {p.node.title}
        </span>
      </button>
      {p.chip && (
        <span className="absolute -right-2 -top-2">
          <Signal variant={p.chip.variant} size="tab">
            {p.chip.label ?? p.chip.variant}
          </Signal>
        </span>
      )}
      {/* message counter — pending queue at this node; visible until receipts land */}
      {messageCount > 0 && (
        <span className="absolute -bottom-2 -right-2 rounded-full border border-border bg-secondary px-[0.55em] py-[0.15em] text-[10px] font-bold text-foreground">
          ✉ {messageCount}
        </span>
      )}
      {/* hover toolbar — lives in the sibling gap */}
      <div className="pointer-events-none absolute left-1 top-full flex gap-1 pt-[3px] opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
        <button
          onClick={() => onMessage(p.id)}
          className="cursor-pointer rounded-md border border-border bg-card px-2 py-0.5 text-[10.5px] font-semibold text-muted-foreground hover:text-foreground"
        >
          ✉ message
        </button>
      </div>
    </div>
  )
}

export function MapView({
  content,
  selected,
  messageCounts,
  onSelect,
  onMessage,
}: {
  content: WorkbenchContent
  selected: string | null
  messageCounts: Record<string, number>
  onSelect: (id: string | null) => void
  onMessage: (id: string) => void
}) {
  const { placed, edges } = React.useMemo(() => layout(content.root), [content])
  const { t, ref, handlers } = usePanZoom()
  const H = Math.max(...placed.map((n) => n.y + n.h)) + 100
  const W = Math.max(...placed.map((n) => n.x + n.w)) + 100
  return (
    <div
      ref={ref}
      {...handlers}
      className="absolute inset-0 touch-none overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onSelect(null)
      }}
    >
      <div
        className="absolute origin-top-left"
        style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.k})`, width: W, height: H }}
      >
        <svg className="pointer-events-none absolute" width={W} height={H}>
          {edges.map(([p, c]) => {
            const x1 = p.x + p.w
            const y1 = p.y + p.h / 2
            const x2 = c.x
            const y2 = c.y + c.h / 2
            const mx = (x1 + x2) / 2
            return (
              <path
                key={`${p.id}->${c.id}`}
                d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="currentColor"
                className={cn("text-border", c.receded && "opacity-30")}
                strokeWidth={1}
              />
            )
          })}
        </svg>
        {placed.map((p) => (
          <NodeView
            key={p.id}
            p={p}
            selected={selected === p.id}
            messageCount={messageCounts[p.id] ?? 0}
            onSelect={onSelect}
            onMessage={onMessage}
          />
        ))}
      </div>
    </div>
  )
}

export function findNode(root: Node, id: string): Node | undefined {
  if (root.id === id) return root
  for (const c of root.children ?? []) {
    const hit = findNode(c, id)
    if (hit) return hit
  }
  return undefined
}
