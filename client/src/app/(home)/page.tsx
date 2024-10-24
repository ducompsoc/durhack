import * as React from "react"

import "@/styles/background.css"
import "@/styles/splash.css"

import { About } from "@/components/about"
import { End } from "@/components/end"
import { Faqs } from "@/components/faqs";
import { Gallery } from "@/components/gallery"
import { Guilds } from "@/components/guilds"
import { Splash } from "@/components/splash"
import { Sponsors } from "@/components/sponsors"
import { Teams } from "@/components/teams"

import { AnimatedMountain } from "./animated-mountain";

export default function HomePage() {
  return (
    <main>
      <section id="splash">
        <Splash />
      </section>

      <section id="about" className="ellipse">
        <About />
      </section>

      <section id="faqs">
        <div className="absolute overflow-hidden w-full h-full">
          <div id="background" className="ellipse" />
        </div>
        <AnimatedMountain />
        <Faqs className="z-30 relative pt-16 lg:pt-32"/>
      </section>

      <section id="sponsors">
        <Sponsors/>
      </section>

      <section id="guilds">
        <Guilds />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="teams">
        <Teams />
      </section>

      <section id="end">
        <End />
      </section>
    </main>
  )
}
