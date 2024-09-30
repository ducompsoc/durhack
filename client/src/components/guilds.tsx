import {
  GuildAtlantisIcon,
  GuildCentreOfTheEarthIcon,
  GuildMoonIcon,
  GuildMysteriousIslandIcon,
} from "@/components/graphics/guild-icons"
import { SectionHeader } from "@/components/section-header"

export default function Guilds() {
  return (
    <div className="text-center px-8 sm:px-16 py-[24rem]">
      <SectionHeader>GUILDS</SectionHeader>

      <div className="text-center pt-8 pb-24 text-lg md:text-2xl px-4 sm:px-8 md:px-12 lg:px-24">
        These will put each of the hacking teams into larger groups, where they all can collect points for their guild
        towards a small prize.
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-16 md:gap-6 lg:gap-16 w-full">
          <GuildCentreOfTheEarthIcon className="w-full h-auto mx-auto drop-shadow-lg" />
          <GuildAtlantisIcon className="w-full h-auto mx-auto drop-shadow-lg" />
          <GuildMoonIcon className="w-full h-auto mx-auto drop-shadow-lg" />
          <GuildMysteriousIslandIcon className="w-full h-auto mx-auto drop-shadow-lg" />
        </div>
      </div>
    </div>
  )
}
