import type React from "react"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"

export function Guilds(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("guilds flex items-start justify-center")}>
      <div className="flex-row justify-center items-center w-1/2">
        <SectionHeader className={cn("text-white")}>Guilds</SectionHeader>
        <p className={cn("py-5 text-center")}>
          This year, to add to the fun, we're bringing back Guilds with a renewable theme - think of them like hackathon
          houses where you'll take on challenges as a team and earn rewards in addition to your group project.
        </p>
        <div className="flex justify-center items-center">
          <img className={cn("lg:block hidden")} src="/assets/guilds/guilds-lg.svg" alt="Guilds LG" />
          <img className={cn("lg:hidden block")} src="/assets/guilds/guilds-sm.svg" alt="Guilds LG" />
        </div>
      </div>
    </div>
  )
}
