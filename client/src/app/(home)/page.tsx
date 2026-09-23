import Image from "next/image"
import About from "@/components/about"
import { Faqs } from "@/components/faqs"
import { Guilds } from "@/components/guilds"
import Hero from "@/components/hero"
import Info from "@/components/info"
import Location from "@/components/location"
import { MeetTheTeam } from "@/components/meet-the-team"
import { Partners, Sponsors } from "@/components/sponsors"

export default function HomePage() {
  return (
    <main className="flex flex-col relative overflow-x-clip">
      {/* Hero */}
      <Hero />

      <div className="h-[10vh] md:h-[50vh] min-h-[100px] w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Skyline */}
      <section className="relative bg-[#0E4A0F] pb-[calc(21.6vw+10rem)]">
        {/* Info */}
        <Info />

        {/* Getting There */}
        <Location />

        {/* About */}
        <About />
      </section>

      {/* Plaza */}
      <section className="relative w-full z-20 bg-linear-to-b from-[#F0EEEE] from-15% to-[#3C97CF] to-41%">
        <div className="absolute top-0 left-0 w-full aspect-1920/830 -translate-y-[65%] pointer-events-none z-0">
          <Image className="object-cover" fill priority alt="clouds" src="/assets/clouds.svg" />
        </div>

        <div className="absolute w-full inset-0 h-full pointer-events-none -z-10 overflow-hidden">
          <Image className="object-cover object-top" fill priority alt="sky-streaks" src="/assets/sky-streaks.svg" />
        </div>

        {/* Sponsors */}
        <Sponsors className="pt-70 pb-20" />

        {/* Partners */}
        <Partners className="pb-20" />

        {/* FAQ */}
        <Faqs className="pb-20" />

        {/* Guilds */}
        <Guilds className="pb-130" />
      </section>

      {/* Meet The Team */}
      <section className="relative w-full z-30 overflow-hidden -mt-[20vmax] md:-mt-[10vmax]">
        <div className="absolute top-0 left-0 w-full pointer-events-none">
          <Image
            className="w-full h-auto object-top"
            width={2204}
            height={3468}
            priority
            alt="dirt"
            src="/assets/dirt.svg"
          />
        </div>

        <MeetTheTeam className="relative z-10 pt-100" />
      </section>
    </main>
  )
}
