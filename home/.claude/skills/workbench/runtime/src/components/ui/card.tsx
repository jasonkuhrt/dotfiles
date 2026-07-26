import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-background px-[0.95rem] py-[0.8rem]", className)}
      {...props}
    />
  )
}

function CardLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-[0.35rem] text-[10.5px] font-bold uppercase tracking-[0.09em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm", className)} {...props} />
}

export { Card, CardLabel, CardBody }
