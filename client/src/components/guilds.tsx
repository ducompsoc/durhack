import Image from "next/image"
import type React from "react"

import { SectionHeader } from "@/components/section-header"
import { type GuildConfig, guilds } from "@/config/guilds"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

import "@/styles/guilds.css"

type NamePos = "above" | "below"

type GuildTileConfig = {
  name_pos: NamePos
} & GuildConfig &
  React.HTMLAttributes<HTMLDivElement>

function GuildTile({ name, name_pos, icon_path, ...props }: GuildTileConfig) {
  return (
    <div
      data-pos={name_pos}
      className={cn(props.className, "group w-40 h-auto relative flex flex-col items-center justify-center")}
    >
      <Image
        className="w-30 absolute lg:-top-1/24 top-3/24 h-auto group-data-[pos=below]:lg:hidden"
        src="/assets/guilds/guild-name-underline-down.svg"
        alt="underline"
        width={211}
        height={65}
      />
      <p className={cn(audiowide.className, "text-[#e1fffc] uppercase group-data-[pos=below]:lg:hidden")}>{name}</p>
      <Image className="" src="/assets/guilds/guild-tile.svg" alt="guild tile" width={262} height={244} />
      {/*TODO add guild icon here*/}
      <Image
        className="w-30 absolute hidden group-data-[pos=below]:lg:block bottom-3/24 h-auto"
        src="/assets/guilds/guild-name-underline-down.svg"
        alt="underline"
        width={211}
        height={65}
      />
      <p className={cn(audiowide.className, "text-[#e1fffc] uppercase hidden group-data-[pos=below]:lg:block")}>
        {name}
      </p>
    </div>
  )
}

export function Guilds({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("guilds flex items-start justify-center", className)} {...props}>
      <div className="flex-row justify-center items-center w-2/3">
        <SectionHeader className={cn("text-white")}>Guilds</SectionHeader>

        <p className={cn(spaceGrotesk.className, "py-5 text-center")}>
          This year, to add to the fun, we're bringing back Guilds with a renewable theme - think of them like hackathon
          houses where you'll take on challenges as a team and earn rewards in addition to your group project.
        </p>

        <div className="mt-10 align-center justify-center flex flex-wrap md:flex-row">
          {guilds.map((guild, index) => (
            <GuildTile
              key={guild.name}
              className={cn(index % 2 === 0 ? "lg:-mt-20" : "")}
              name={guild.name}
              name_pos={index % 2 === 0 ? "below" : "above"}
              icon_path={guild.icon_path}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
