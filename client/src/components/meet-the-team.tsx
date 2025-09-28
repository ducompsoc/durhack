"use client"

import React from "react"
import { SectionHeader } from "./section-header"
import {cn} from "@/lib/utils";
import {teammates} from "@/config/teammates";

function TeamCarousel({...props}: React.HTMLAttributes<HTMLDivElement>) {
  const [scrolling, setScrolling] = React.useState(true)
  function pauseScroll() {
    setScrolling(false)
  }

  function startScroll() {
    setScrolling(true)
  }

  return (
    <div className={cn(props.className, "w-full inline-flex flex-nowrap overflow-x-hidden")}>
      <ul className={cn("flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll", !scrolling && "animation-paused")}>
        {teammates.map((teammate, index) => (
          <li key={index}><img onMouseEnter={pauseScroll} onMouseLeave={startScroll} className={cn("rounded-full")} src={teammate.img_path} alt="teammate image"/></li>
        ))}
      </ul>
      <ul className={cn("flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll", !scrolling && "animation-paused")} aria-hidden="true">
        {teammates.map((teammate, index) => (
          <li key={index}><img onMouseEnter={pauseScroll} onMouseLeave={startScroll} className={cn("rounded-full")} src={teammate.img_path} alt="teammate image"/></li>
        ))}
      </ul>
      <ul className={cn("flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll", !scrolling && "animation-paused")} aria-hidden="true">
        {teammates.map((teammate, index) => (
          <li key={index}><img onMouseEnter={pauseScroll} onMouseLeave={startScroll} className={cn("rounded-full")} src={teammate.img_path} alt="teammate image"/></li>
        ))}
      </ul>
      <ul className={cn("flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll", !scrolling && "animation-paused")} aria-hidden="true">
        {teammates.map((teammate, index) => (
          <li key={index}><img onMouseEnter={pauseScroll} onMouseLeave={startScroll} className={cn("rounded-full")} src={teammate.img_path} alt="teammate image"/></li>
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
        <TeamCarousel className="mt-10"/>
      </div>
    </div>
  )
}
