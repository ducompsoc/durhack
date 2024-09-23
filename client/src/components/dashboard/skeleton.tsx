import { cn } from "@/lib/utils"

function SkeletonBase({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export function Skeleton({ rows, className }: React.HTMLAttributes<HTMLDivElement> & { rows: number }) {
  return (
    <div className={cn("flex gap-10 flex-col items-center", className)}>
      {[...Array(rows)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: elements are not distinct
        <SkeletonBase key={i} className="h-12 w-full" />
      ))}
      <SkeletonBase className="h-10 w-40" />
    </div>
  )
}
