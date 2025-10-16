import type * as React from "react"

import { darkerGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

type LocationBtnProps = {
  innerText: string
  href: string
} & React.ComponentProps<"a">

function LocationBtn({ innerText, href, className, ...props }: LocationBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        className,
        "border-[1px] border-white text-[#207ea7] bg-[#cce8f9]/35 hover:bg-[#cce8f9]/100 transition duration-300 ease-in-out rounded-full text-2xl uppercase px-10 py-4 mx-4",
      )}
      {...props}
    >
      {innerText}
    </a>
  )
}

export function Location({ className, ...props }: React.ComponentProps<"div">) {
  const SU_LINK =
    "https://www.durhamsu.com/groups/computing-766e/events/durhack-coach-tickets-manchester-leeds-nottingham-sheffield"
  const MAPS_LINK = "https://maps.app.goo.gl/H3qypQFBy88CQa7N9"

  return (
    <div className={cn(className)} {...props}>
      <div className="flex-row">
        <p
          className={cn(
            "px-60 my-13 text-center text-[#207ea7] font-medium text-[32px]/[100%]",
            darkerGrotesk.className,
          )}
        >
          DurHack takes place in the Teaching and Learning Centre at Durham University. It’s just a short walk or bus
          ride from Durham Train Station, with direct connections to major UK cities. To make your journey easier, we
          are coordinating coaches to the event from Leeds, Manchester, Sheffield and Nottingham. We also offer travel
          reimbursements for participants<sup>*</sup> travelling from elsewhere — so getting here is one less thing to
          worry about.
        </p>
        <p>* see FAQs for details.</p>
        <div className={cn("flex justify-center items-center px-4 my-10")}>
          <LocationBtn href={MAPS_LINK} innerText="Google Maps" />
          <LocationBtn href={SU_LINK} innerText="Book Coach Tickets" />
        </div>
      </div>
    </div>
  )
}
