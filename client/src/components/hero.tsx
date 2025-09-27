import type React from "react"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function Hero(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="hero relative flex items-start justify-center h-screen w-full">
      <div className="flex-row items-center z-50">
        <h1
          className={cn(
            audiowide.className,
            "text-white uppercase mt-34 mb-12 lg:text-9xl md:text-7xl text-5xl text-shadow-lg/25 text-center text-shadow-black font-normal",
          )}
        >
          DurHack X
        </h1>
        <h2
          className={cn(
            spaceGrotesk.className,
            "text-[#238CBA] lg:text-7xl md:text-5xl text-3xl font-extralight text-center",
          )}
        >
          1st-2nd November
        </h2>
        <div className="w-full items-center justify-center flex">
          <a
            href="/dashboard"
            className={cn(
              spaceGrotesk.className,
              "uppercase bg-[#6DB7D2] rounded-full mt-10 py-3 px-12 lg:text-3xl text-xl font-medium hover:bg-[#238CBA] transition-colors duration-300",
            )}
          >
            Sign Up Now
          </a>
        </div>
      </div>

      <img
        className={cn("absolute lg:bottom-2/6 lg:w-auto w-50 bottom-13/24 h-auto z-10")}
        src="/assets/hero/sun.svg"
        alt="sun"
      />
      <img
        className={cn("absolute lg:top-1/6 lg:w-auto top-3/12 w-[200%] z-5")}
        src="/assets/hero/sun-aura.svg"
        alt="sun aura"
      />
      <img className={cn("absolute left-0 bottom-0 lg:w-[55vw] w-[75vw] h-auto z-20")} src="/assets/hero/left-cloud.svg" alt="left cloud"/>
      <img className={cn("absolute left-0 bottom-0 h-auto z-20")} src="/assets/hero/left-cloud-shadow.svg" alt="left cloud shadow"/>
      <img className={cn("absolute right-0 bottom-0 lg:w-[53vw] w-[75vw] h-auto z-20")} src="/assets/hero/right-cloud.svg" alt="right cloud"/>
      <img className={cn("absolute right-0 bottom-0 lg:w-[45vw] h-auto z-20")} src="/assets/hero/right-cloud-shadow.svg" alt="right cloud shadow"/>
      <img className={cn("absolute bottom-0 left-0 w-full z-30")} src="/assets/hero/ground1.svg" alt="ground"/>
      <img className={cn("absolute bottom-0 right-0 w-full z-30")} src="/assets/hero/ground2.svg" alt="ground"/>
      <img className={cn("absolute bottom-0 left-0 w-full z-30")} src="/assets/hero/ground3.svg" alt="ground"/>
      <img className={cn("absolute left-0 bottom-2/12 h-auto z-40")} src="/assets/hero/cathedral.svg" alt="cathedral"/>
      <img className={cn("absolute left-0 bottom-2/12 h-auto z-40")} src="/assets/hero/left-bush.svg" alt="left bush"/>
      <img className={cn("absolute right-0 bottom-[-9vh] h-auto z-40")} src="/assets/hero/right-bush.svg" alt="left bush"/>
      <img className={cn("absolute bottom-2/6 right-1/12 h-auto z-40")} src="/assets/hero/biosphere1.svg" alt="biosphere 1"/>
      <img className={cn("absolute bottom-2/6 right-3/12 h-auto z-40")} src="/assets/hero/biosphere2.svg" alt="biosphere 2"/>
      <img className={cn("absolute bottom-6/12 right-6/24 h-[20rem] z-40")} src="/assets/hero/windmill.svg" alt="windmill"/>
      <img className={cn("absolute bottom-6/12 right-2/24 h-[15rem] z-40")} src="/assets/hero/windmill.svg" alt="windmill"/>
      <img className={cn("absolute bottom-6/12 right-7/24 h-[15rem] z-40")} src="/assets/hero/windmill.svg" alt="windmill"/>
    </div>
  )
}
