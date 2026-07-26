import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"

export function Shell({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-[1060px] px-6", className)} {...props} />
}

/* the uppercase micro-label idiom — used by Ops, Canon, Concept, Address, cards */
export function MicroLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-[0.7rem] text-[10.5px] font-bold uppercase tracking-[0.09em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("mb-2 mt-[2.6rem] text-[19px] font-semibold tracking-[-0.01em]", className)} {...props} />
}

export function Lede({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-[74ch] text-muted-foreground", className)} {...props} />
}

export function Note({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "my-5 max-w-[74ch] rounded-r-lg border-l-[3px] border-primary bg-card px-4 py-[0.7rem]",
        className,
      )}
      {...props}
    />
  )
}

/* Flights — the lane's live strip: what's flying, what's next, anything
   awaiting you. Lane-scoped facts only; global facts live in the Address. */
export function Flights({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mb-9 rounded-b-[10px] border border-t-0 border-border bg-card px-[1.2rem] pb-[1.1rem] pt-4", className)}>
      <MicroLabel>Flights</MicroLabel>
      {children}
    </div>
  )
}

export function Board({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[0.8rem]", className)}
      {...props}
    />
  )
}

/* Canon — the rule-shaped strip OF the Spec: terse normative postures */
export function Canon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-[10px] border border-primary bg-card px-[1.1rem] py-[0.8rem]">
      <MicroLabel className="mb-[0.45rem] text-primary">Canon</MicroLabel>
      <ul className="m-0 list-disc pl-[1.1rem] [&>li]:mb-1 [&>li]:text-[13.5px]">{children}</ul>
    </div>
  )
}

/* Spec — the lane's standing truth: incremental, always-current, STANDALONE
   (survives deletion of every closed thread). Canon renders inside it. */
export function Spec({ canon, children }: { canon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <MicroLabel className="mb-4 text-primary">Spec</MicroLabel>
      {canon && <Canon>{canon}</Canon>}
      <div className="[&>h2:first-child]:mt-0">{children}</div>
    </section>
  )
}

/* Concept — the diagram IS the concept (Tufte: direct labels, hairlines, no junk) */
export function Concept({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="my-6 mb-8 rounded-[10px] border border-dashed border-border bg-card px-[1.1rem] pb-2 pt-[0.9rem]">
      <MicroLabel className="mb-[0.6rem]">
        Concept · <b className="normal-case text-foreground">{name}</b>
      </MicroLabel>
      {children}
    </div>
  )
}

export function LayerStack({ children }: { children: React.ReactNode }) {
  return <div className="grid [&>*+*]:border-t [&>*+*]:border-border">{children}</div>
}

export function Layer({ tag, note, children }: { tag: string; note: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] items-baseline gap-x-5 py-[0.65rem] md:grid-cols-[3rem_1fr_minmax(10rem,auto)]">
      <div className="font-mono text-[13px] font-bold text-primary">{tag}</div>
      <div className="text-[13.5px]">{children}</div>
      <div className="text-xs text-muted-foreground md:text-right">{note}</div>
    </div>
  )
}

/* Quiet disclosure — zen rule: the right information at the right time */
export function Quiet({
  summary,
  children,
  className,
}: {
  summary: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <Collapsible className={cn("mt-[0.9rem]", className)}>
      <CollapsibleTrigger className="group flex cursor-pointer items-center gap-1 text-[12.5px] font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
        <ChevronRight className="size-3 transition-transform group-data-[state=open]:rotate-90" />
        {summary}
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}

/* lane address — quiet by default; source-of-truth paths */
export function LaneAddress({ children }: { children: React.ReactNode }) {
  return (
    <Quiet
      summary={<span className="text-[10.5px] font-bold uppercase tracking-[0.09em] opacity-70 group-data-[state=open]:text-primary group-data-[state=open]:opacity-100">address</span>}
      className="mt-[0.7rem]"
    >
      <div className="mt-[0.3rem] text-[12.5px] text-muted-foreground">{children}</div>
    </Quiet>
  )
}

/* prerendered shiki/twoslash html, injected at build */
declare global {
  interface Window {
    __WB_SNIPPETS__?: Record<string, string>
  }
}

export function Snippet({ id }: { id: string }) {
  const html = window.__WB_SNIPPETS__?.[id]
  if (!html) return <div className="codepanel text-[12.5px] text-destructive">snippet missing: {id}</div>
  return <div className="codepanel" dangerouslySetInnerHTML={{ __html: html }} />
}
