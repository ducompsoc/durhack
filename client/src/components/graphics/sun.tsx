import Image from "next/image"
import type * as React from "react"

import "@/styles/sun.css"
import { cn } from "@/lib/utils"

type SunGraphicProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  priority?: boolean
}

export function SunGraphic({ className, priority, ...props }: SunGraphicProps): React.ReactElement {
  return (
    <div className={cn("relative aspect-square isolate", className)} {...props}>
      <div className="sun-backdrop clip-circle w-full h-full" />
      <div className="sun absolute w-full h-full">
        {/* biome-ignore lint/a11y/useSemanticElements: https://github.com/biomejs/biome/issues/3994 */}
        <div className="clip-circle" role="img" aria-label="the sun">
          <Image
            src="/assets/graphics/magma.png"
            width={4096}
            height={4096}
            alt="photograph of sun"
            className="sun-image"
            priority={priority}
          />
        </div>
      </div>
    </div>
  )
}
