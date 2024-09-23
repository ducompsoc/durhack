import Image from "next/image"
import type * as React from "react"

import { cn } from "@/lib/utils"

type StarsGraphicProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  priority?: boolean;
}

export function LeftStarsGraphic({ className, priority, ...props }: StarsGraphicProps): React.ReactElement {
  return (
    <div className={cn("relative aspect-square isolate", className)} {...props}>
      <Image
        src="/assets/graphics/left_stars.png"
        width={4096}
        height={4096}
        alt="photograph of sun"
        priority={priority}
      />
    </div>
  )
}

export function RightStarsGraphic({ className, priority, ...props }: StarsGraphicProps): React.ReactElement {
    return (
      <div className={cn("relative aspect-square isolate", className)} {...props}>
        <Image
          src="/assets/graphics/right_stars.png"
          width={4096}
          height={4096}
          alt="photograph of sun"
          priority={priority}
        />
      </div>
    )
  }