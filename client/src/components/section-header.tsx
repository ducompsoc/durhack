import type * as React from "react"

import {audiowide} from "@/lib/google-fonts"
import {cn} from "@/lib/utils"

import "@/styles/section-header.css"


export function SectionHeader({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn(audiowide.className, "section-header text-[#006793] uppercase text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold w-fit", className)} {...props}/>
  )
}
