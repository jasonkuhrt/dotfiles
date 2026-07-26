import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

/* Signal — THE status indicator of the workbench UL, wherever it appears
   (tab, table cell, thread header, card). One concept, one component.
   Flight states: done / run / wait. Attention: you. Thread states: open / closed. */
const signalVariants = cva(
  "inline-flex items-center rounded-full font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        done: "bg-done-bg text-done",
        run: "bg-run-bg text-run",
        wait: "bg-wait-bg text-wait",
        you: "bg-you-bg text-you",
        open: "bg-primary/10 text-primary",
        closed: "bg-wait-bg text-wait",
      },
      size: {
        default: "px-[0.6em] py-[0.15em] text-[11px] tracking-[0.04em]",
        tab: "px-[0.55em] py-[0.2em] text-[10.5px] font-bold",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

function Signal({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof signalVariants>) {
  return <span className={cn(signalVariants({ variant, size }), className)} {...props} />
}

export { Signal, signalVariants }
