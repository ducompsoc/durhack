import Image from "next/image"
import type React from "react"

import { SectionHeader } from "@/components/section-header"
import { guilds } from "@/config/guilds"
import { cn } from "@/lib/utils"

import "@/styles/guilds.css"
import { spaceGrotesk } from "@/lib/google-fonts"

function GuildsText({ innerText, className, ...props }: { innerText: string } & React.ComponentProps<"p">) {
  return (
    <p className={cn(spaceGrotesk.className, "py-5 text-center text-2xl", className)} {...props}>
      {innerText}
    </p>
  )
}

export function Guilds({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col content-center items-start justify-center", className)} {...props}>
      <div className="flex-row justify-center items-center self-center container">
        <SectionHeader>Guilds</SectionHeader>

        <GuildsText
          innerText={
            "Once again, we are bringing back guilds! Think of them like hackathon houses where you’ll take on challenges as a team and earn rewards in addition to your group project."
          }
        />
        <GuildsText
          innerText={
            "This year, we have transitioned from four to three guilds, more closely following the layout of our venue. The three floors will be home to the following guilds:"
          }
        />
      </div>
      <div className="py-5 align-center justify-center self-center w-90 sm:w-135 md:w-180 flex flex-col">
        {guilds.map((guild, _index) => (
          <Image src={guild.imgSrc} key={guild.name} alt={`${guild.name} tile`} />
        ))}
      </div>
    </div>
  )
}
