import type * as React from "react"
import { darkerGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function Location({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "location flex flex-col justify-center text-[#238CBA] text-3xl",
        darkerGrotesk.className,
        className,
      )}
      {...props}
    >
      <div className="container max-w-[60rem] text-center">
        <p>
          DurHack takes place in the Teaching and Learning Centre at Durham University. It’s just a short walk or bus
          ride from Durham Train Station, with direct connections to major UK cities. To make your journey easier, we
          are coordinating coaches to the event from Leeds, Manchester, Sheffield and Nottingham. We also offer travel
          reimbursements for participants<sup>*</sup> travelling from elsewhere — so getting here is one less thing to
          worry about.
        </p>
        <p>* see FAQs for details.</p>
      </div>
    </div>
  )
}
