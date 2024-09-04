"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

export default function Splash() {
    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const cloud1 = useTransform(scrollYProgress, [0, 1], ["0rem", "100rem"]);

    return (
        <div ref={ref} className="">
            <div id="outer-ring" className="rounded-[50%] absolute h-[94rem] w-[94rem] top-[-35rem]"></div>
            <div id="inner-ring" className="rounded-[50%] absolute h-[56rem] w-[56rem] top-[-16rem]"></div>
            <img src="/assets/icons/moon.png" alt="splash" className="h-[32rem] w-[32rem] top-[-4rem] mx-auto rounded-[50%] transition-all duration-500 hover:transition-all hover:duration-300 absolute" id="moon"/>
        
            <motion.div id="cloud-1" className="absolute right-[-10rem] top-[16rem]" style={{ x: cloud1 }}>
                <img src="/assets/icons/cloud-1.png" alt="cloud" className="" />
            </motion.div>

            <div className="h-[300vh]"></div>
            <div>
                Test div
            </div>
        </div>
    )
}