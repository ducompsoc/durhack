import type * as React from "react"

import { audiowide, darkerGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

function GettingThereBtn({ text, className, ...props }: { text: string } & React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        className,
        audiowide.className,
        "uppercase bg-[#1A611B] rounded-full py-3 px-12 text-xl font-bold hover:bg-[#114612] outline-solid outline-white outline-[1px] transition-colors duration-300",
      )}
      {...props}
    >
      {text}
    </a>
  )
}

export default function GettingThere({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center z-10 text-white text-xl md:text-4xl font-medium",
        darkerGrotesk.className,
        className,
      )}
      {...props}
    >
      <div className="container max-w-[70rem] text-center mt-20 space-y-8">
        <p className="outlined">
          DurHack takes place in the Teaching and Learning Centre at Durham University. It’s just a short walk or bus
          ride from Durham Train Station, with direct connections to major UK cities. To make your journey easier, we
          are coordinating coaches to the event from London, Manchester, Leeds, Sheffield and Nottingham. We also offer
          travel reimbursements for participants* travelling from elsewhere (see the FAQs for more details) — so getting
          here is one less thing to worry about.
        </p>
        <div className="w-full items-center justify-center flex my-15">
          <GettingThereBtn
            href="https://maps.app.goo.gl/H3qypQFBy88CQa7N9"
            text="Google Maps"
            className={cn("mr-10")}
          />
          <GettingThereBtn href="" text="Book Coach Tickets" />
        </div>
      </div>
    </div>
  )
}
