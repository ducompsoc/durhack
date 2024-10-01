"use client"

import { motion, useInView } from "framer-motion"
import * as React from "react"

import Faqs from "@/components/faqs"
import { MountainGraphic } from "@/components/graphics"

export function About() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div>
      <div ref={ref} className="w-full h-full absolute">
        <motion.div
          className="absolute flex justify-center top-[-7rem] md:top-[-10rem] lg:top-[-13rem] z-30 pointer-events-none w-full"
          style={{ transformOrigin: "50% 500rem" }}
          animate={{ rotate: isInView ? 0 : -30 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <MountainGraphic className="relative h-[12rem] md:h-[16rem] lg:h-[20rem]" />
        </motion.div>
      </div>

      <div className="pt-[30rem]" />

      <section id="faqs" className="z-30 relative">
        <Faqs />
      </section>
    </div>
  )
}
