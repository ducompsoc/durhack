import About from "@/components/about"
import Hero from "@/components/hero"
import Info from "@/components/info"
import Location from "@/components/location"
import { Sponsors, Partners } from "@/components/sponsors"
import { Faqs } from "@/components/faqs"
import Image from "next/image"

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
      <section className="relative z-20 bg-gradient-to-b from-[#F0EEEE] from-15% to-[#3C97CF] to-41%">
        <div className="absolute top-0 left-0 w-full aspect-[1920/830] -translate-y-[65%] pointer-events-none z-0">
          <Image className="object-cover" fill priority alt="clouds" src="/assets/clouds.svg" />
        </div>

        {/* Sponsors */}
        <Sponsors className="pt-70 pb-20" />


        {/* Partners */}
        <Partners className="pb-20" />

        {/* FAQ */}
        <Faqs className="pb-20" />

        {/* Guilds */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Guilds</h1>
        </div>

      </section>

      {/* Meet The Team */}
      <div className="flex items-start justify-center hidden">
        <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
      </div>
    </main>
  )
}
