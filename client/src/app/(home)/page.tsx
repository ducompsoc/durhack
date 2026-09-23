import Image from "next/image"
import About from "@/components/about"
import { Faqs } from "@/components/faqs"
import { Guilds } from "@/components/guilds"
import Hero from "@/components/hero"
import Info from "@/components/info"
import Location from "@/components/location"
import { Partners, Sponsors } from "@/components/sponsors"
import {SectionHeader} from "@/components/section-header";
import type * as React from "react";

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

      <div className="relative z-20">
        <div className="absolute top-0 left-0 w-full aspect-1920/830 -translate-y-[65%] pointer-events-none">
          <Image className="object-cover" fill priority alt="clouds" src="/assets/clouds.svg" />
        </div>
      </div>

      {/* Plaza */}
      <section className="relative w-full z-20 bg-linear-to-b from-[#F0EEEE] from-[50rem] to-[#3C97CF] to-[100rem] overflow-clip">
        {/* Sponsors */}
        <Sponsors className="pt-70 pb-20" />

        {/* Partners */}
        <Partners className="pb-20" />

        {/* FAQ */}
        <Faqs className="pb-20" />

        {/* Guilds */}
        <Guilds />
      </section>

      {/* Meet The Team */}
      <div className="flex items-start justify-center hidden">
        <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
      </div>
    </main>
  )
}
