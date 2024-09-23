import {
  GuildAtlantisIcon,
  GuildCentreOfTheEarthIcon,
  GuildMoonIcon,
  GuildMysteriousIslandIcon,
} from "@/components/graphics/guild-icons"
import { SectionHeader } from "@/components/section-header"

export function Guilds() {
  return (
    <div className="text-center px-16">
      <SectionHeader>Guilds</SectionHeader>

      <div className="text-center text-lg md:text-xl px-4 sm:px-8 md:px-12 lg:px-24">
        Guilds text goes here. needs to be rewritten for 2024
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full">
          <GuildCentreOfTheEarthIcon className="w-full h-auto mx-auto shadow-md" />
          <GuildAtlantisIcon className="w-full h-auto mx-auto shadow-md" />
          <GuildMoonIcon className="w-full h-auto mx-auto shadow-md" />
          <GuildMysteriousIslandIcon className="w-full h-auto mx-auto shadow-md" />
        </div>
      </div>
    </div>
  )
}
