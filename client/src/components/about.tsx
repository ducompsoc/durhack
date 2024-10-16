"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import * as React from "react"

import { Cloud4Graphic, Cloud5Graphic } from "@/components/graphics"

export function About() {
  const ref = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end start"],
  })

  const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  const cloud4X = useTransform(springProgress, [0, 1], ["-15rem", "15rem"])
  const cloud5X = useTransform(springProgress, [0, 1], ["15rem", "-15rem"])

  return (
    <>
      <div className="absolute w-full h-[50%]">
        <motion.div ref={ref}
          id="cloud-4"
          className="absolute left-[-10rem] top-[10rem] z-30 pointer-events-none"
          style={{ x: cloud4X }}
        >
          <Cloud4Graphic className="h-[12rem] lg:h-[20rem]" />
        </motion.div>

        <motion.div
          id="cloud-5"
          className="absolute right-[-7rem] top-[45rem] lg:top-[40rem] z-30 pointer-events-none"
          style={{ x: cloud5X }}
        >
          <Cloud5Graphic className="h-[12rem] lg:h-[20rem]" />
        </motion.div>
      </div>

      <div className="absolute top-[24rem] lg:top-[28rem] mx-[12.5vw] text-3xl md:text-4xl w-[75vw] md:w-[40rem]">
        We welcome you to join us for the ninth iteration of DurHack, Durham University Computing Society&apos;s annual
        flagship hackathon.
      </div>
    </>
  )
}
