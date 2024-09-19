import * as React from "react"
import Image from "next/image"

import "@/styles/moon.css"
import { cn } from "@/lib/utils";

type MoonGraphicProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  priority?: boolean
}

export function MoonGraphic({ className, priority, ...props }: MoonGraphicProps): React.ReactElement {
  return (
    <div className={cn("relative aspect-square isolate", className)} {...props}>
      <div className="moon-backdrop clip-circle w-full h-full" />
      <div className="moon absolute w-full h-full">
        <div className="clip-circle moon-shadow">
          <Image
            src="/assets/graphics/sun.png"
            width={4096}
            height={4096}
            alt="photograph of moon"
            className="moon-image"
            priority={priority}
          />
          <svg viewBox="0 0 632 632" fill="none" className="absolute w-full h-full">
            <defs>
              <radialGradient
                id="moon-shadow" cx="0" cy="0" r="1"
                gradientTransform="matrix(215.5 343.5 -343.5 215.5 200.95 230.5)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1E2536" offset=".915"/>
                <stop stopColor="#fff" offset=".95367"/>
              </radialGradient>
              <radialGradient
                id="moon-highlight" cx="0" cy="0" r="1"
                gradientTransform="matrix(453 382.5 -382.5 453 45.946 130.5)"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff" offset=".30976"/>
                <stop offset=".63004"/>
                <stop stopOpacity=".83215" offset=".70931"/>
                <stop stopOpacity="0" offset=".95101"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#moon-shadow)" fillOpacity={.25}/>
            <rect width="100%" height="100%" fill="url(#moon-highlight)" fillOpacity={.3}/>
          </svg>
        </div>
      </div>
    </div>
  )
}
