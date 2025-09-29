import type React from "react"

import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { HillTopLeftGraphic } from "@/components/graphics/hill-top-left";
import { HillRightGraphic } from "@/components/graphics/hill-right";
import { HillBottomLeftGraphic } from "@/components/graphics/hill-bottom-left";
import { CloudsLeftGraphic } from "@/components/graphics/clouds-left";
import { CloudsRightGraphic } from "@/components/graphics/clouds-right";
import Image from "next/image";

export function Hero({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("hero h-[calc(40rem+35vw)] sm:h-220 md:h-240 lg:h-260 xl:h-300 2xl:h-260 relative flex items-start justify-center overflow-hidden", className)} {...props}>
      <div className="absolute h-full hidden 2xl:contents 2xl:w-full top-10">
        <div className="absolute -translate-1/2 left-1/2 top-200 size-300 rounded-full bg-radial from-[#FFFAE1D4] from-30% to-[#FFE6FA00] to-70% overflow-visible" />
        <div className="absolute -translate-1/2 left-1/2 top-170 size-80 rounded-full bg-radial from-[#F7F2DB] to-[#FFD700]" />

        <CloudsLeftGraphic className="absolute left-[-5%] top-35 w-[56%]" />
        <CloudsLeftGraphic stroke="#FF5959" className="absolute left-[-10%] top-60 w-[56%] blur-sm text-[#C1E5FD]" />
        <CloudsRightGraphic className="absolute right-[-12%] top-5 w-[60%]" />
        <CloudsRightGraphic stroke="#FF5959" className="absolute right-[-17%] top-30 w-[60%] blur-sm text-[#C1E5FD]" />

        <HillTopLeftGraphic className="absolute left-[-20%] top-120 w-full" />
        <HillRightGraphic className="absolute right-[-20%] top-140 w-full" />
        <HillBottomLeftGraphic className="absolute left-[-20%] top-200 w-full" />

        <Image
          src="/assets/graphics/cathedral.svg" alt="Durham Cathedral" width={724} height={582}
          className="absolute left-0 top-100"
        />
      </div>

      <div className="absolute h-full 2xl:hidden w-full top-10">
        <div className="absolute -translate-1/2 left-1/2 top-180 size-300 rounded-full bg-radial from-[#FFFAE1D4] from-30% to-[#FFE6FA00] to-70% overflow-visible" />
        <div className="absolute -translate-1/2 left-1/2 top-130 sm:top-150 md:top-160 lg:top-180 xl:top-200 size-50 lg:size-70 rounded-full bg-radial from-[#F7F2DB] to-[#FFD700]" />

        <CloudsLeftGraphic className="absolute left-[-5%] top-105 w-[60%]" />
        <CloudsRightGraphic className="absolute right-[-12%] top-105 w-[70%]" />
        <CloudsLeftGraphic stroke="#FF5959" className="absolute left-[-10%] top-110 w-[56%] blur-sm text-[#C1E5FD]" />
        <CloudsRightGraphic stroke="#FF5959" className="absolute right-[-17%] top-110 w-[60%] blur-sm text-[#C1E5FD]" />

        <HillRightGraphic className="absolute right-[-40%] top-[calc(30rem+20vw)] w-[150%]" />
        <HillBottomLeftGraphic className="absolute left-[-30%] top-[calc(35rem+20vw)] w-[150%]" />

        <Image
          src="/assets/graphics/cathedral.svg" alt="Durham Cathedral" width={724} height={582}
          className="absolute left-[-15%] md:left-0 top-[calc(40rem+30vw)] -translate-y-full w-2/3 max-w-140"
        />
      </div>

      <div className="flex-row items-center z-10">
        <h1
          className={cn(
            audiowide.className,
            "text-white uppercase mt-44 mb-12 md:text-7xl text-5xl text-shadow-lg/25 text-center text-shadow-black font-normal",
          )}
        >
          DurHack X
        </h1>
        <h2
          className={cn(
            spaceGrotesk.className,
            "text-[#238CBA] md:text-5xl text-3xl font-extralight text-center",
          )}
        >
          1st-2nd November
        </h2>
        <div className="w-full items-center justify-center flex">
          <a
            href="/dashboard"
            className={cn(
              spaceGrotesk.className,
              "uppercase bg-[#6DB7D2] rounded-full mt-10 py-3 px-12 text-xl font-medium hover:bg-[#238CBA] transition-colors duration-300",
            )}
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  )
}
