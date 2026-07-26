import * as React from "react"
import { BookA, Maximize, MoreHorizontal, X } from "lucide-react"
import { Signal } from "../components/ui/signal"
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { MapView, effectiveSignal, findNode } from "./Map"
import { Spec, MicroLabel } from "./prims"
import { Button } from "../components/ui/button"
import type { Node, WorkbenchContent } from "./types"

/* write transport, tiered: same-origin POST when served by serve.ts (the
   inbox — agent reads the file next turn), clipboard fallback otherwise. */
type Recorded = "posted" | "copied" | false
async function record(payload: object): Promise<Recorded> {
  const json = JSON.stringify(payload)
  try {
    const r = await fetch("/record", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
    })
    if (r.ok) return "posted"
  } catch {
    /* not served — fall through to clipboard */
  }
  try {
    await navigator.clipboard.writeText(json)
    return "copied"
  } catch {
    return false
  }
}

/* Decision — the first reified input: a choice awaiting the user. */
function Decision({ workbench, node }: { workbench: string; node: Node }) {
  const decision = node.decision!
  const [note, setNote] = React.useState("")
  const [recorded, setRecorded] = React.useState<string | null>(null)
  const [how, setHow] = React.useState<Recorded>(false)
  const [attempted, setAttempted] = React.useState(false)

  const choose = async (choice: string) => {
    setAttempted(true)
    const result = await record({
      workbench,
      kind: "decision",
      node: node.id,
      decision: decision.prompt ?? decision.options.join(" / "),
      choice,
      note: note || undefined,
      at: new Date().toISOString(),
    })
    setRecorded(result ? choice : null)
    setHow(result)
  }

  return (
    <div className="mt-5 rounded-[10px] border border-you bg-card px-[1.1rem] py-[0.9rem]">
      <MicroLabel className="mb-2 text-you">Decision</MicroLabel>
      {decision.prompt && <div className="mb-3 text-[13.5px]">{decision.prompt}</div>}
      <div className="flex flex-wrap items-center gap-2">
        {decision.options.map((o) => (
          <Button key={o} size="sm" variant={recorded === o ? "default" : "outline"} onClick={() => choose(o)}>
            {o}
          </Button>
        ))}
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="note (optional)"
          className="h-8 min-w-40 flex-1 rounded-md border border-border bg-background px-2 text-[12.5px] placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </div>
      {recorded && how === "posted" && (
        <div className="mt-2 text-[12px] text-primary">
          "{recorded}" recorded — the agent reads it next turn.
        </div>
      )}
      {recorded && how === "copied" && (
        <div className="mt-2 text-[12px] text-primary">
          "{recorded}" copied — paste it in the session to deliver.
        </div>
      )}
      {attempted && how === false && (
        <div className="mt-2 text-[12px] text-destructive">
          transport unavailable — tell the agent "{node.id}: …" directly
        </div>
      )}
    </div>
  )
}

/* Message — node-scoped queue to the agent: target context + freeform text
   can express any ask (an ack or a big task) before that verb exists as UI.
   A message stays PENDING (node counter) until the agent processes it and
   writes a receipt (inbox/ → processed/). */
function Message({
  workbench,
  node,
  autoFocus,
  onSent,
}: {
  workbench: string
  node: Node
  autoFocus?: boolean
  onSent: () => void
}) {
  const [text, setText] = React.useState("")
  const [state, setState] = React.useState<"idle" | Recorded>("idle")

  const send = async () => {
    if (!text.trim()) return
    const result = await record({
      workbench,
      kind: "message",
      node: node.id,
      text: text.trim(),
      at: new Date().toISOString(),
    })
    setState(result)
    if (result) {
      setText("")
      onSent()
    }
  }

  return (
    <div>
      <MicroLabel className="mb-2">Message</MicroLabel>
      <div className="flex items-start gap-2">
        <textarea
          value={text}
          autoFocus={autoFocus}
          onChange={(e) => {
            setText(e.target.value)
            if (state !== "idle") setState("idle")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void send()
          }}
          placeholder={`to the agent, about ${node.id} — ⌘↵ to send`}
          rows={2}
          className="min-h-16 flex-1 resize-y rounded-md border border-border bg-background px-2 py-1.5 text-[13px] placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
        <Button size="sm" variant="outline" onClick={() => void send()} disabled={!text.trim()}>
          send
        </Button>
      </div>
      {state === "posted" && (
        <div className="mt-2 text-[12px] text-primary">
          queued — pending until the agent processes it and writes a receipt.
        </div>
      )}
      {state === "copied" && (
        <div className="mt-2 text-[12px] text-primary">
          copied — paste it in the session to deliver.
        </div>
      )}
      {state === false && (
        <div className="mt-2 text-[12px] text-destructive">
          transport unavailable — select the text and copy manually.
        </div>
      )}
    </div>
  )
}

/* corner — one quiet control; flyout holds UL / fullscreen (dark-only: no theme) */
function Corner({ onOpenUl }: { onOpenUl: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Workbench controls"
        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground data-[state=open]:border-primary data-[state=open]:text-primary focus-visible:outline-2 focus-visible:outline-ring"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={onOpenUl}>
          <BookA className="size-3.5" /> UL — vocabulary
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            if (document.fullscreenElement) void document.exitFullscreen()
            else void document.documentElement.requestFullscreen()
          }}
        >
          <Maximize className="size-3.5" /> Fullscreen focus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UlDialog({
  content,
  open,
  onOpenChange,
}: {
  content: WorkbenchContent
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="text-[13px]">
        <DialogTitle>UL — the vocabulary</DialogTitle>
        <dl>
          {content.ul.map(([term, def]) => (
            <React.Fragment key={term}>
              <dt className="mt-[0.55rem] font-semibold text-primary first:mt-0">{term}</dt>
              <dd className="m-0 mt-[0.1rem] text-muted-foreground">{def}</dd>
            </React.Fragment>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}

/* detail-on-demand — uniform over nodes; the prose lives here, never on the map */
function Detail({
  content,
  nodeId,
  focusMessage,
  onSent,
  onClose,
}: {
  content: WorkbenchContent
  nodeId: string
  focusMessage: boolean
  onSent: () => void
  onClose: () => void
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const node = findNode(content.root, nodeId)
  if (!node) return null
  const signal = node.state === "closed" ? undefined : effectiveSignal(node)
  const kicker = [
    node.kicker,
    node.state,
    node.encoded ? `encoded → spec (${node.encoded})` : undefined,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <aside className="absolute inset-y-0 right-0 z-20 flex w-[min(640px,52vw)] flex-col border-l border-border bg-background/95 backdrop-blur-sm">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 inline-flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <X className="size-3.5" />
      </button>
      <div className="flex-1 overflow-y-auto px-7 py-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.09em] text-muted-foreground">
          {kicker}
        </div>
        <h2 className="mb-1 mt-0.5 flex items-center gap-3 text-xl font-bold tracking-[-0.015em]">
          {node.title}
          {signal && (
            <Signal variant={signal.variant} size="tab">
              {signal.label ?? signal.variant}
            </Signal>
          )}
        </h2>
        <div className="prose">
          {node.decision && node.state !== "closed" && (
            <Decision workbench={content.root.title} node={node} />
          )}
          {node.flights}
          {(node.canon || node.spec) && <Spec canon={node.canon}>{node.spec}</Spec>}
          {node.position && (
            <div className="mt-4 text-[13px] text-muted-foreground">{node.position}</div>
          )}
          {node.body && <div className="mt-2">{node.body}</div>}
          {node.address && (
            <div className="mt-5 text-[11.5px] text-muted-foreground opacity-80">{node.address}</div>
          )}
        </div>
      </div>
      {/* compose is ON DEMAND — the hover-toolbar ✉ summons it as a pinned
          footer; no standing form on node bodies */}
      {focusMessage && (
        <div className="border-t border-border px-7 pb-5 pt-3.5">
          <Message workbench={content.root.title} node={node} autoFocus onSent={onSent} />
        </div>
      )}
    </aside>
  )
}

export function App({ content }: { content: WorkbenchContent }) {
  const [ulOpen, setUlOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string | null>(
    () => (location.hash.length > 1 ? decodeURIComponent(location.hash.slice(1)) : null),
  )
  const [focusMessage, setFocusMessage] = React.useState(false)
  /* pending queue — served by serve.ts; absent (file://) → no counters */
  const [pending, setPending] = React.useState<Array<{ id: string; node?: string }>>([])
  const refreshQueue = React.useCallback(() => {
    try {
      fetch("/messages")
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => j && setPending(j.pending))
        .catch(() => {})
    } catch {
      /* no fetch in this environment — counters stay empty */
    }
  }, [])
  React.useEffect(refreshQueue, [refreshQueue])
  const messageCounts: Record<string, number> = {}
  for (const m of pending) {
    if (m.node) messageCounts[m.node] = (messageCounts[m.node] ?? 0) + 1
  }

  const select = (id: string | null) => {
    setSelected(id)
    setFocusMessage(false)
    history.replaceState(null, "", id ? `#${encodeURIComponent(id)}` : location.pathname)
  }
  const message = (id: string) => {
    setSelected(id)
    setFocusMessage(true)
    history.replaceState(null, "", `#${encodeURIComponent(id)}`)
  }

  return (
    <div className="prose fixed inset-0 overflow-hidden bg-background">
      <MapView
        content={content}
        selected={selected}
        messageCounts={messageCounts}
        onSelect={select}
        onMessage={message}
      />

      {/* banner overlay — quiet: identity + freshness + corner */}
      <header className="pointer-events-none absolute left-6 top-5 z-10 flex items-baseline gap-4">
        <h1 className="text-[17px] font-bold tracking-[-0.015em]">{content.root.title}</h1>
        <span className="text-[11.5px] text-muted-foreground">%%STAMP%%</span>
      </header>
      <div className="absolute right-5 top-5 z-10">
        <Corner onOpenUl={() => setUlOpen(true)} />
      </div>

      {selected && (
        <Detail
          content={content}
          nodeId={selected}
          focusMessage={focusMessage}
          onSent={refreshQueue}
          onClose={() => select(null)}
        />
      )}
      <UlDialog content={content} open={ulOpen} onOpenChange={setUlOpen} />
    </div>
  )
}
