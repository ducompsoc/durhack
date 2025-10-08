"use client"

import React from "react"
import { LeftTeamCard, RightTeamCard } from "@/components/team-card"
import { type Teammate, teammates } from "@/config/teammates"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

type HoverState = {
  teammate: Teammate
  orientation: "left" | "right"
  index: number
}

function TeamCarousel({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [scrolling, setScrolling] = React.useState(true)
  const [hoverState, setHoverState] = React.useState<HoverState | null>(null)

  const [isOpen, setIsOpen] = React.useState(false)

  const TRANSITION_DURATION = 300

  const getCardOrientation = React.useCallback((imageElement: HTMLImageElement): "left" | "right" => {
    const nodeRect = imageElement.getBoundingClientRect()

    return nodeRect.left + nodeRect.width / 2 < window.innerWidth / 2 ? "left" : "right"
  }, [])

  function onMouseEnter(e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number, teammate: Teammate) {
    const orientation = getCardOrientation(e.currentTarget)
    setHoverState({ teammate, orientation, index })

    setTimeout(() => {
      setIsOpen(true)
    }, 10)

    setScrolling(false)
    e.currentTarget.nextElementSibling?.classList.remove("opacity-0", "invisible")
  }

  function onMouseLeave(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setIsOpen(false)
    setScrolling(true)

    setTimeout(() => {
      setHoverState(null)
    }, TRANSITION_DURATION)

    e.currentTarget.nextElementSibling?.classList.add("opacity-0", "invisible")
  }

  const renderTeammateList = (isDuplicate: boolean) =>
    teammates.map((teammate, i) => {
      const isCardMounted = hoverState?.index === i && !isDuplicate

      return (
        <li key={i} teammate-ind={i} className={cn("relative")}>
          <img
            onMouseEnter={(e) => onMouseEnter(e, i, teammate)}
            onMouseLeave={onMouseLeave}
            className={cn("rounded-full")}
            src={teammate.img_path}
            alt="teammate image"
          />
          <img
            className={cn("absolute bottom-0 right-0 opacity-0 invisible transition duration-300 ease-in-out")}
            src="/assets/meet-the-team/teammate-pointer.svg"
            alt="teammate-pointer.svg"
          />

          {hoverState && isCardMounted && (
            <div
              className={cn(
                "absolute top-full mt-20 left-4/2 -translate-x-1/2 z-40 w-[300px] transition-opacity duration-300 ease-in-out",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            >
              {hoverState.orientation === "left" ? (
                <LeftTeamCard team={teammate.team} name={teammate.name} role={teammate.role} />
              ) : (
                <RightTeamCard team={teammate.team} name={teammate.name} role={teammate.role} />
              )}
            </div>
          )}
        </li>
      )
    })

  return (
    <>
      <div className={cn(props.className, "w-full inline-flex flex-nowrap")}>
        <ul
          className={cn(
            "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll",
            !scrolling && "animation-paused",
          )}
        >
          {renderTeammateList(false)}
        </ul>
        <ul
          className={cn(
            "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll",
            !scrolling && "animation-paused",
          )}
          aria-hidden="true"
        >
          {renderTeammateList(true)}
        </ul>
      </div>
    </>
  )
}

export function MeetTheTeam({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="meet-team" {...props}>
      <div className="flex-row items-start justify-center">
        <SectionHeader className="text-white">Meet The team</SectionHeader>
        <TeamCarousel className="mt-10" />
      </div>
    </div>
  )
}
