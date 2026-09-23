import type React from "react"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"

export function MeetTheTeam({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full flex", className)} {...props}>
      <SectionHeader>Meet the Team</SectionHeader>
    </div>
  )
}
