import Image from "next/image"
import type React from "react"

import { SectionHeader } from "@/components/section-header"
import { guilds } from "@/config/guilds"
import { cn } from "@/lib/utils"

import "@/styles/guilds.css"

export function Guilds({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("guilds flex items-start justify-center", className)} {...props}>
      <div className="flex-row justify-center items-center w-90 sm:w-135 md:w-180">
        <SectionHeader>Guilds</SectionHeader>

        <div className="my-10 align-center justify-center flex flex-col">
          {guilds.map((guild, index) => (
            <Image src={guild.imgSrc} key={guild.name} alt={`${guild.name} tile`} />
          ))}
        </div>
      </div>
    </div>
  )
}
