import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex gap-1", className)} {...props} />
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "group relative flex cursor-pointer items-center gap-[0.55rem] rounded-t-lg border border-b-0 border-border bg-background px-[1.1rem] py-[0.7rem] text-left text-[13.5px] font-semibold leading-tight text-muted-foreground",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2",
        "data-[state=active]:text-foreground",
        "data-[state=active]:after:absolute data-[state=active]:after:-top-px data-[state=active]:after:inset-x-0 data-[state=active]:after:h-[3px] data-[state=active]:after:rounded-t-[3px] data-[state=active]:after:bg-primary data-[state=active]:after:content-['']",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("pt-[0.4rem] outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
