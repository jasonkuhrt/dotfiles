import * as React from "react"
import { cn } from "../../lib/utils"

/* Wide content scrolls inside its own container — the page body never scrolls sideways. */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="my-4 mb-[1.6rem] overflow-x-auto rounded-lg border border-border bg-card">
      <table className={cn("w-full border-collapse text-[13.5px]", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn(className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&>tr:last-child>td]:border-b-0", className)} {...props} />
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn(className)} {...props} />
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border-b border-border px-[0.9rem] py-[0.55rem] text-left align-top text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("border-b border-border px-[0.9rem] py-[0.55rem] text-left align-top", className)}
      {...props}
    />
  )
}

/* numeric cell — tabular figures, mono */
function TableCellNum({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <TableCell
      className={cn("whitespace-nowrap font-mono text-[12.5px] tabular-nums", className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCellNum }
