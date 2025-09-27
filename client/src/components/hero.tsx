import type React from "react"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function Hero(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="hero relative flex items-start justify-center">
      <div className="flex-row items-center">
        <h1
          className={cn(
            audiowide.className,
            "text-white uppercase mt-44 mb-12 lg:text-9xl md:text-7xl text-5xl text-shadow-lg/25 text-center text-shadow-black font-normal",
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
    </div>
  )
}
