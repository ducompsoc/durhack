"use client";

import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import * as React from "react";

export default function About() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <>
            <div className="absolute w-full top-[-1rem] md:top-[-3rem]">
                <img src="/assets/icons/waves.svg" className="w-full"/>
            </div>

            <div ref={ref} className="w-full h-full absolute">
                <motion.div 
                className="absolute flex justify-center top-[-7rem] md:top-[-10rem] lg:top-[-13rem] z-30 pointer-events-none w-full"
                style={{ transformOrigin: "50% 5400px" }}
                animate={{ rotate: isInView ? 0 : -20 }}
                transition={{ duration: 1, ease: "easeInOut" }}>
                    <img src="/assets/icons/mountains.svg" alt="mountains" className="relative h-[12rem] md:h-[16rem] lg:h-[20rem]" />
                </motion.div>
            </div>
        </>
    )
}