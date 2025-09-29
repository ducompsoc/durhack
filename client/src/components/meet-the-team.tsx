"use client"

import React from "react"
import { type Teammate, teammates } from "@/config/teammates"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

type CardOrientation = "left" | "right"

function TeamCarousel({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [scrolling, setScrolling] = React.useState(true)
  const [teammate, setTeammate] = React.useState<Teammate>(teammates[0])
  const [screenHalf, setScreenHalf] = React.useState("")

  function pauseScroll(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setScrolling(false)
    e.currentTarget.nextElementSibling?.classList.remove("opacity-0")
    e.currentTarget.nextElementSibling?.classList.remove("invisible")
    let teammateIndex = Number(e.currentTarget.parentElement?.getAttribute("teammate-ind"))
    if (Number.isNaN(teammateIndex)) teammateIndex = -1
    const teammate = teammates[teammateIndex]

    const nodeRect = e.currentTarget.getBoundingClientRect()
    let card

    if (nodeRect.left + nodeRect.width / 2 < window.innerWidth / 2) {
      setScreenHalf("left")
      card = document.getElementById("left_card")
    } else {
      setScreenHalf("right")
      card = document.getElementById("right_card")
    }

    card?.classList.remove("opacity-0")
    card?.classList.remove("invisible")
  }

  function startScroll(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setScrolling(true)
    e.currentTarget.nextElementSibling?.classList.add("opacity-0")
    e.currentTarget.nextElementSibling?.classList.add("invisible")

    let card
    if (screenHalf === "left") {
      card = document.getElementById("left_card")
    } else {
      card = document.getElementById("right_card")
    }
    card?.classList.add("opacity-0")
    card?.classList.add("invisible")
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
          <li key={index} teammate-ind={index} className={cn("relative")}>
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
          <li key={index} teammate-ind={index} className={cn("relative")}>
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
    <div className="meet-team" {...props}>
      <div className="flex-row items-start justify-center">
        <SectionHeader className="text-white">Meet The team</SectionHeader>
        <TeamCarousel className="mt-10" />
        <div className="flex justify-center mt-10 px-5 align-center">
          <img
            src="/assets/meet-the-team/left-card.svg"
            id="left_card"
            className={cn("opacity-0 invisible transition duration-300 ease-in-out")}
            alt="left card"
          />
          <img
            src="/assets/meet-the-team/right-card.svg"
            id="right_card"
            className={cn("opacity-0 invisible transition duration-300 ease-in-out")}
            alt="right card"
          />
        </div>
        {/*<img id="right_card" className={cn("hidden")}/>*/}
      </div>
    </div>
  )
}
