"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as React from "react";

export default function Intro() {
    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        <div ref={ref} className="relative">
            <div id="cloud-4" className="absolute left-[-10rem] top-[30rem] z-30 pointer-events-none">
                <img src="/assets/icons/cloud-4.svg" alt="cloud" className="h-[6rem] xl:h-[20rem]" />
            </div>

            <div id="cloud-5" className="absolute right-[-7rem] top-[50rem] z-30 pointer-events-none">
                <img src="/assets/icons/cloud-5.svg" alt="cloud" className="h-[6rem] xl:h-[20rem]" />
            </div>
        </div>
    )
}