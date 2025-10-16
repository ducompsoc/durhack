import Image from "next/image"
import type React from "react"

import { CloudsLeftGraphic } from "@/components/graphics/clouds-left"
import { CloudsRightGraphic } from "@/components/graphics/clouds-right"
import { HillBottomLeftGraphic } from "@/components/graphics/hill-bottom-left"
import { HillRightGraphic } from "@/components/graphics/hill-right"
import { HillTopLeftGraphic } from "@/components/graphics/hill-top-left"
import { DomeLeftGraphic } from "@/components/graphics/dome-left";
import { DomeRightGraphic } from "./graphics/dome-right";
import { SunflowerGraphic } from "./graphics/sunflower";
import { TreeGraphic } from "./graphics/tree";
import { TreeSmallGraphic } from "./graphics/tree-small";
import { WindmillLeftGraphic } from "./graphics/windmill-left";
import { WindmillCentreGraphic } from "./graphics/windmill-centre";
import { WindmillRightGraphic } from "./graphics/windmill-right";
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function Hero({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "hero h-[calc(40rem+35vw)] sm:h-220 md:h-240 lg:h-260 xl:h-300 2xl:h-260 relative flex items-start justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
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
          src="/assets/graphics/cathedral.svg"
          alt="Durham Cathedral"
          width={724}
          height={582}
          className="absolute left-0 top-100"
        />

        <Image
          src="/assets/graphics/sunflower.svg" alt="Sunflower" width={482} height={589}
          className="absolute right-0 bottom-[-20%]"
        />

        <Image
          src="/assets/graphics/windmill.svg" alt="Left Windmill" width={173} height={354}
          className="absolute right-[18%] bottom-[35%]"
        />
        <Image
          src="/assets/graphics/windmill.svg" alt="Centre Windmill" width={224} height={463}
          className="absolute right-[10%] bottom-[40%]"
        />
        <Image
          src="/assets/graphics/windmill.svg" alt="Right Windmill" width={122} height={253}
          className="absolute right-[5%] bottom-[45%]"
        />

        <Image
          src="/assets/graphics/dome-left.svg" alt="Left Dome" width={224} height={160}
          className="absolute right-[20%] bottom-[30%]"
        />
        <Image
          src="/assets/graphics/dome-right.svg" alt="Right Dome" width={412} height={287}
          className="absolute right-[3%] bottom-[29%]"
        />

        <Image
          src="/assets/graphics/trees.svg" alt="Trees" width={209} height={343}
          className="absolute left-0 bottom-0"
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
          src="/assets/graphics/cathedral.svg"
          alt="Durham Cathedral"
          width={724}
          height={582}
          className="absolute left-[-15%] md:left-0 top-[calc(40rem+30vw)] -translate-y-full w-2/3 max-w-140"
        />

        <Image
          src="/assets/graphics/sunflower.svg" alt="Sunflower" width={482} height={589}
          className="absolute right-0 top-[calc(35rem+20vw)] w-1/4 max-w-80"
        />

        <Image
          src="/assets/graphics/dome-left.svg" alt="Left Dome" width={322} height={203}
          className="absolute right-[5%] top-[calc(35rem+5vw)] w-1/3 max-w-100"
        />

        <Image
          src="/assets/graphics/trees.svg" alt="Trees" width={209} height={343}
          className="absolute left-0  top-[calc(40rem+15vw)] w-1/6 max-w-40"
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
        <h2 className={cn(spaceGrotesk.className, "text-[#238CBA] md:text-5xl text-3xl font-extralight text-center")}>
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
