"use client"

import React from "react"
import { TeamCard } from "@/components/team-card"
import { type Teammate, teammates } from "@/config/teammates"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

function Teammate({ teammate, leftHalfIntersectionObserver, ...props }: React.ComponentProps<"li"> & { teammate: Teammate, leftHalfIntersectionObserver: IntersectionObserver | null}) {
  const listItemRef = React.useRef<HTMLLIElement | null>(null)

  React.useLayoutEffect(() => {
    const listItem = listItemRef.current
    if (listItem == null) return () => undefined
    if (leftHalfIntersectionObserver == null) return () => undefined
    leftHalfIntersectionObserver.observe(listItem)
    return () => leftHalfIntersectionObserver.unobserve(listItem)
  }, [leftHalfIntersectionObserver])

  return (
    <li ref={listItemRef} data-pos="right" className={cn("relative group")}>
      <img
        className="rounded-full peer"
        src={teammate.img_path}
        alt="teammate image"
      />
      <img
        className={cn(
          "absolute bottom-0 group-data-[pos=left]:right-0 group-data-[pos=right]:left-0",
          "opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition-opacity duration-300 ease-in-out",
        )}
        src="/assets/meet-the-team/teammate-pointer.svg"
        alt="teammate-pointer.svg"
      />

      <div
        className={cn(
          "pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 ease-in-out",
          "z-40 absolute top-full mt-20 group-data-[pos=left]:left-0 group-data-[pos=right]:right-0 w-[300%]"
        )}
      >
        <TeamCard team={teammate.team} name={teammate.name} role={teammate.role} className="w-full" />
      </div>
    </li>
  )
}

function TeamCarousel({ leftHalfIntersectionObserver, ...props }: React.HTMLAttributes<HTMLDivElement> & { leftHalfIntersectionObserver: IntersectionObserver | null }) {
  const renderTeammateList = () =>
    teammates.map((teammate, i) => <Teammate key={teammate.name} teammate={teammate} leftHalfIntersectionObserver={leftHalfIntersectionObserver} />)

  return (
    <>
      <div className={cn(props.className, "w-full inline-flex flex-nowrap group")}>
        <ul
          className={cn(
            "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll group-hover:animation-paused",
          )}
        >
          {renderTeammateList()}
        </ul>
        <ul
          className={cn(
            "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-[150px] animate-infinite-scroll group-hover:animation-paused",
          )}
          aria-hidden="true"
        >
          {renderTeammateList()}
        </ul>
      </div>
    </>
  )
}

export function MeetTheTeam({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const leftHalfDivRef = React.useRef<HTMLDivElement | null>(null)
  const [intersectionObserver, setIntersectionObserver] = React.useState<IntersectionObserver | null>(null)

  function handleIntersectionChange(entry: IntersectionObserverEntry) {
    const entryTargetPosition = entry.isIntersecting ? "left" : "right"
    entry.target.setAttribute("data-pos", entryTargetPosition)
  }

  React.useLayoutEffect(() => {
    if (leftHalfDivRef == null) return () => undefined
    if (intersectionObserver == null) {
      const newIntersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => handleIntersectionChange(entry))
      }, { root: leftHalfDivRef.current, threshold: 0.5 })
      setIntersectionObserver(newIntersectionObserver)
    }
  }, [])

  return (
    <div className="meet-team" {...props}>
      <div className="absolute left w-1/2" ref={leftHalfDivRef}>
        <div className="w-[200%] flex-row items-start justify-center">
          <SectionHeader className="text-white">Meet The team</SectionHeader>
          <TeamCarousel className="mt-10" leftHalfIntersectionObserver={intersectionObserver} />
        </div>
      </div>
    </div>
  )
}
