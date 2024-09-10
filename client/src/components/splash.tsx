"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import { Audiowide } from "next/font/google"
import { cn } from "@/lib/utils";

const audiowide = Audiowide({ weight: "400",  subsets: ["latin"] });

export default function Splash() {
    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const springProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    const cloud1X = useTransform(springProgress, [0, 1], ["0rem", "100rem"]);
    const cloud1Y = useTransform(scrollYProgress, [0, 1], ["0rem", "0rem"]);
    const cloud2X = useTransform(springProgress, [0, 1], ["0rem", "-100rem"]);
    const cloud2Y = useTransform(scrollYProgress, [0, 1], ["0rem", "0rem"]);
    const cloud3X = useTransform(springProgress, [0, 1], ["0rem", "-150rem"]);
    const cloud3Y = useTransform(scrollYProgress, [0, 1], ["0rem", "0rem"]);

    return (
        <div ref={ref} className="overflow-hidden relative">
            <div id="stars" className="absolute h-full w-full z-20">
                <img src="/assets/icons/stars.png" className="h-full w-full" />
            </div>

            <div id="outer-ring" className="rounded-[50%] absolute h-[94rem] w-[94rem] top-[-35rem] z-10"></div>
            <div id="inner-ring" className="rounded-[50%] absolute h-[56rem] w-[56rem] top-[-16rem] z-10"></div>
            <img src="/assets/icons/moon.png" alt="splash" className="h-[32rem] w-[32rem] top-[-4rem] mx-auto rounded-[50%] transition-all duration-500 hover:transition-all hover:duration-300 absolute z-20" id="moon"/>
        
            <motion.div id="cloud-1" className="absolute right-[-2rem] top-[16rem] z-30 pointer-events-none" style={{ x: cloud1X, y: cloud1Y }}>
                <img src="/assets/icons/cloud-1.png" alt="cloud" className="" />
            </motion.div>

            <motion.div id="cloud-2" className="absolute left-[-24rem] top-[13rem] z-30 pointer-events-none" style={{ x: cloud2X, y: cloud2Y }}>
                <img src="/assets/icons/cloud-2.png" alt="cloud" className="" />
            </motion.div>

            <motion.div id="cloud-3" className="absolute left-[-9rem] top-[23rem] z-30 pointer-events-none" style={{ x: cloud3X, y: cloud3Y }}>
                <img src="/assets/icons/cloud-3.png" alt="cloud" className="" />
            </motion.div>

            <div className="relative">
                <div className="pt-[40rem] pb-[8rem]">
                    <h2 id="title" className={cn(audiowide.className, "text-8xl text-center relative z-20")}>DURHACK 2024</h2>
                    <h4 id="subtitle" className={cn(audiowide.className, "text-6xl text-center relative z-20")}>2-3 NOVEMBER</h4>
                </div>
                <div className="flex justify-center pt-32 pb-64">
                    <motion.a id="book" 
                        className="px-16 py-6 rounded-[4.8rem] text-4xl text-center backdrop-blur-lg bg-white bg-opacity-40 hover:scale-110 z-50 transition-all cursor-pointer">
                        BOOK TICKETS
                    </motion.a>
                </div>
            </div>
            <div>
                Test div
            </div>
        </div>
    )
}