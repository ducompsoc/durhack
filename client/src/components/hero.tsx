import type React from "react"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function Hero(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="hero relative flex items-start justify-center h-screen">
      <div className="flex-row items-center">
        <h1
          className={cn(
            audiowide.className,
            "text-white uppercase mt-34 mb-12 lg:text-9xl md:text-7xl text-5xl text-shadow-lg/25 z-50 text-center text-shadow-black font-normal",
          )}
        >
          DurHack X
        </h1>
        <h2
          className={cn(
            spaceGrotesk.className,
            "text-[#238CBA] lg:text-7xl md:text-5xl text-3xl font-extralight text-center z-50",
          )}
        >
          1st-2nd November
        </h2>
        <div className="w-full items-center justify-center flex">
          <a
            href="/dashboard"
            className={cn(
              spaceGrotesk.className,
              "uppercase bg-[#6DB7D2] rounded-full mt-10 py-3 px-12 lg:text-3xl text-xl z-50 font-medium hover:bg-[#238CBA] transition-colors duration-300",
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
    </div>
  )
}
