"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import * as React from "react"

import { Cloud1Graphic, Cloud2Graphic, Cloud3Graphic, StarsGraphic } from "@/components/graphics"
import { MoonGraphic } from "@/components/graphics/moon"
import { audiowide } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export default function Splash() {
  const ref = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  const cloud1X = useTransform(springProgress, [0, 1], ["0rem", "100rem"])
  const cloud2X = useTransform(springProgress, [0, 1], ["0rem", "-100rem"])
  const cloud3X = useTransform(springProgress, [0, 1], ["0rem", "-150rem"])

  return (
    <>
      <div ref={ref} className="overflow-hidden relative">
        <div id="stars" className="absolute h-full w-full z-20">
          <StarsGraphic className="h-full max-w-[none] xl:w-full absolute" />
        </div>

        <div id="outer-ring" className="rounded-[50%] absolute h-[94rem] w-[94rem] top-[-55rem] md:top-[-35rem] z-10" />
        <div id="inner-ring" className="rounded-[50%] absolute h-[56rem] w-[56rem] top-[-36rem] md:top-[-16rem] z-10" />
        <MoonGraphic
          className="h-[32rem] w-[32rem] top-[-24rem] md:top-[-4rem] translate-x-[-50%] left-1/2 z-20"
          priority={true}
          id="moon"
        />

        <motion.div
          id="cloud-1"
          className="absolute right-[-6rem] xl:right-[-2rem] top-[8rem] md:top-[16rem] z-30 pointer-events-none"
          style={{ x: cloud1X }}
        >
          <Cloud1Graphic className="h-[6rem] xl:h-64" />
        </motion.div>

        <motion.div
          id="cloud-2"
          className="absolute left-[-29rem] xl:left-[-24rem] top-[5rem] md:top-[13rem] z-30 pointer-events-none"
          style={{ x: cloud2X }}
        >
          <Cloud2Graphic className="h-[15rem] xl:h-[25rem]" />
        </motion.div>

        <motion.div
          id="cloud-3"
          className="absolute left-[-19rem] xl:left-[-9rem] top-[11rem] md:top-[23rem] z-30 pointer-events-none"
          style={{ x: cloud3X }}
        >
          <Cloud3Graphic className="h-[11rem] xl:h-[21rem]" />
        </motion.div>

        <div className="relative top-[-10rem] md:top-[10rem]">
          <div className="pb-8">
            <h2
              id="title"
              className={cn(audiowide.className, "text-5xl md:text-8xl text-center relative uppercase z-20")}
            >
              DurHack 2024
            </h2>
            <h4
              id="subtitle"
              className={cn(audiowide.className, "text-3xl md:text-6xl text-center relative uppercase z-20")}
            >
              2-3 November
            </h4>
          </div>
          <div className="flex justify-center pt-8 pb-64">
            <Link
              href="/dashboard"
              id="book"
              className="relative px-12 sm:px-16 py-4 sm:py-6 rounded-[4.8rem] text-xl sm:text-4xl text-center backdrop-blur-lg bg-white bg-opacity-40 hover:scale-110 z-50 transition-all uppercase cursor-pointer"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </div>

      <div className="pb-[20rem]" />
    </>
  )
}
