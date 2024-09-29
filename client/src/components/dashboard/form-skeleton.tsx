import * as React from "react"
import { Skeleton } from "@durhack/web-components/ui/skeleton"

import { cn } from "@/lib/utils"

export function FormSkeleton({ rows, className }: React.HTMLAttributes<HTMLDivElement> & { rows: number }) {
  return (
    <div className={cn("flex gap-7 flex-col items-center", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: elements are not distinct
        <Skeleton key={i} className="h-14 w-full" />
      ))}
      <Skeleton className="mt-10 h-9 w-40" />
    </div>
  )
}
