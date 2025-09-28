import type React from "react"
import { SectionHeader } from "@/components/section-header"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/guilds.css"

type NamePos = "above" | "below"

type GuildTileConfig = {
  name: string
  name_pos: NamePos
  img_path: string
} & React.HTMLAttributes<HTMLDivElement>

function GuildTile({ name, name_pos, img_path, ...props }: GuildTileConfig) {
  return (
    <div className={cn(props.className, "w-40 h-auto relative flex flex-col items-center justify-center")}>
      <img
        className="w-30 absolute lg:hidden block top-3/24 h-auto"
        src="/assets/guilds/gulid-name-underline-down.svg"
        alt="underline"
      />
      <p className={cn(audiowide.className, "text-[#e1fffc] uppercase lg:hidden block")}>{name}</p>
      {name_pos === "above" && (
        <>
          <img
            className="w-30 -top-1/24 lg:block hidden absolute h-auto"
            src="/assets/guilds/gulid-name-underline-up.svg"
            alt="underline"
          />
          <p className={cn(audiowide.className, "text-[#e1fffc] lg:block hidden uppercase")}>{name}</p>
        </>
      )}
      <img className="" src="/assets/guilds/guild-tile.svg" alt="guild tile" />
      {name_pos === "below" && (
        <>
          <img
            className="w-30 absolute lg:block hidden bottom-3/24 h-auto"
            src="/assets/guilds/gulid-name-underline-down.svg"
            alt="underline"
          />
          <p className={cn(audiowide.className, "text-[#e1fffc] uppercase lg:block hidden")}>{name}</p>
        </>
      )}
    </div>
  )
}

export function Guilds(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("guilds flex items-start justify-center")}>
      <div className="flex-row justify-center items-center w-2/3">
        <SectionHeader className={cn("text-white")}>Guilds</SectionHeader>

        <p className={cn(spaceGrotesk.className, "py-5 text-center")}>
          This year, to add to the fun, we're bringing back Guilds with a renewable theme - think of them like hackathon
          houses where you'll take on challenges as a team and earn rewards in addition to your group project.
        </p>

        <div className="mt-10 align-center justify-center flex flex-wrap md:flex-row">
          {/*<div className="w-40 h-auto lg:-mt-16">*/}
          {/*  <img src="/assets/guilds/guild-tile.svg" alt="guild tile"/>*/}
          {/*</div>*/}
          <GuildTile className={cn("lg:-mt-20")} name="Solaris" name_pos="below" img_path="asdfasd" />
          <GuildTile name="Zephyr" name_pos="above" img_path="asdfasd" />
          <GuildTile className={cn("lg:-mt-20")} name="Ember" name_pos="below" img_path="asdfasd" />
          <GuildTile name="Hydro" name_pos="above" img_path="asdfasd" />
        </div>
      </div>
    </div>
  )
}
