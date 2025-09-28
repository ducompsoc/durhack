"use client"

import React from "react"
import { teammates } from "@/config/teammates"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

function TeamCarousel({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [scrolling, setScrolling] = React.useState(true)
  function pauseScroll(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setScrolling(false)
    e.currentTarget.nextElementSibling?.classList.remove("opacity-0")
    e.currentTarget.nextElementSibling?.classList.remove("invisible")
  }

  function startScroll(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setScrolling(true)
    e.currentTarget.nextElementSibling?.classList.add("opacity-0")
    e.currentTarget.nextElementSibling?.classList.add("invisible")
  }

  return (
    <div className={cn(props.className, "w-full inline-flex flex-nowrap overflow-x-hidden")}>
      <ul
        className={cn(
          "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll",
          !scrolling && "animation-paused",
        )}
      >
        {teammates.map((teammate, index) => (
          <li key={index} className={cn("relative")}>
            <img
              onMouseEnter={pauseScroll}
              onMouseLeave={startScroll}
              className={cn("rounded-full")}
              src={teammate.img_path}
              alt="teammate image"
            />
            <img
              className={cn("absolute bottom-0 right-0 opacity-0 invisible transition duration-300 ease-in-out")}
              src="/assets/meet-the-team/teammate-pointer.svg"
              alt="teammate-pointer.svg"
            />
          </li>
        ))}
      </ul>
      <ul
        className={cn(
          "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll",
          !scrolling && "animation-paused",
        )}
        aria-hidden="true"
      >
        {teammates.map((teammate, index) => (
          <li key={index} className={cn("relative")}>
            <img
              onMouseEnter={pauseScroll}
              onMouseLeave={startScroll}
              className={cn("rounded-full")}
              src={teammate.img_path}
              alt="teammate image"
            />
            <img
              className={cn("absolute bottom-0 right-0 opacity-0 invisible transition duration-300 ease-in-out")}
              src="/assets/meet-the-team/teammate-pointer.svg"
              alt="teammate-pointer.svg"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MeetTheTeam({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="meet-team">
      <div className="flex-row items-start justify-center">
        <SectionHeader className="text-white">Meet The team</SectionHeader>
        <TeamCarousel className="mt-10" />
      </div>
    </div>
  )
}
