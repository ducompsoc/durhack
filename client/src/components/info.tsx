import type * as React from "react"

import { darkerGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export default function Info({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center z-10 text-white text-3xl font-medium relative z-10 bg-transparent",
        darkerGrotesk.className,
        className,
      )}
      {...props}
    >
      <div className="container max-w-[90rem] text-center mt-20 space-y-8 stroke">
        <p>Welcome to DurHack 2026 - the 11th iteration of Durham University Computing Society’s flagship hackathon!</p>
        <p>
          DurHack is a 24 hour tech project creation competition where students from all over the country come team up
          to build innovative projects, learn new skills, and have fun creating together.
        </p>
      </div>
    </div>
  )
}
