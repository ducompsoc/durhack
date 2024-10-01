import * as React from "react"

import { About } from "@/components/about"
import { End } from "@/components/end"
import { Gallery } from "@/components/gallery"
import { Guilds } from "@/components/guilds"
import { Intro } from "@/components/intro"
import { Splash } from "@/components/splash"
import { Sponsors } from "@/components/sponsors"

import "@/styles/background.css"
import "@/styles/splash.css"

export default function HomePage() {
  return (
    <main>
      <section id="splash">
        <Splash />
      </section>

      <section id="intro" className="ellipse">
        <Intro />
      </section>

      <section id="about">
        <div id="background" className="ellipse" />
        <About />
      </section>

      <section id="sponsors" className="h-[5rem]" />

      <section id="guilds">
        <Guilds />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="end">
        <End />
      </section>
    </main>
  )
}
