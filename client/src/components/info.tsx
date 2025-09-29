import type * as React from "react"
import {cn} from "@/lib/utils";
import {darkerGrotesk} from "@/lib/google-fonts";

export function Info({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div className={cn("info flex flex-col justify-center z-10 text-[#238CBA] text-3xl", darkerGrotesk.className, className)} {...props}>
      <div className="container max-w-[60rem] text-center">
        <p className="pb-4">
          Welcome to DurHack X - the 10th anniversary edition Durham University Computing Society’s flagship hackathon!
        </p>
        <p>
          DurHack is a 24 hour tech project creation competition where students from all over the country come team up to
          build innovative projects, learn new skills, and have fun creating together.
        </p>
      </div>

      <div className="relative h-[15rem] lg:h-[50rem]" role="img" aria-label="futuristic train driving through a glass tunnel over an arch bridge">
        <div className="brace brace-backs" />
        <div className="train" />
        <div className="train-end" />
        <div className="brace brace-fronts" />
        <div className="viaduct" />
      </div>
    </div>
  )
}
