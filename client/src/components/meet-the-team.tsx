import type React from "react"
import { SectionHeader } from "./section-header"

export function MeetTheTeam({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="meet-team flex items-start justify-center">
      <SectionHeader className="text-white">Meet The team</SectionHeader>
    </div>
  )
}
