"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as React from "react";

export default function Intro() {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.1", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const cloud4X = useTransform(springProgress, [0, 1], ["0rem", "-30rem"]);
  const cloud5X = useTransform(springProgress, [0, 1], ["0rem", "30rem"]);

  return (
    <>
      <div ref={ref} className="relative">
        <motion.div
          id="cloud-4"
          className="absolute left-[-10rem] top-[40rem] z-30 pointer-events-none"
          style={{ x: cloud4X }}
        >
          <img src="/assets/icons/cloud-4.svg" alt="cloud" className="h-[12rem] lg:h-[20rem]" />
        </motion.div>

        <motion.div
          id="cloud-5"
          className="absolute right-[-7rem] top-[60rem] z-30 pointer-events-none"
          style={{ x: cloud5X }}
        >
          <img src="/assets/icons/cloud-5.svg" alt="cloud" className="h-[12rem] lg:h-[20rem]" />
        </motion.div>
      </div>

      <div className="absolute mt-[22rem] mx-[12.5vw] text-3xl md:text-4xl w-[75vw] md:w-[40rem]">
        We welcome you to join us for the ninth iteration of DurHack, Durham University Computing Society's annual
        flagship hackathon.
      </div>
    </>
  );
}
