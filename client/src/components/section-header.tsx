import * as React from "react"

import { cn } from "@/lib/utils"
import { audiowide } from "@/lib/google-fonts"
import "@/styles/section-header.css"

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        audiowide.className,
        "section-header text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold w-fit"
      )}
    >
      {children}
    </h1>
  )
}
