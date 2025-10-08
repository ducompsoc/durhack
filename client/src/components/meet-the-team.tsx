"use client"

import type React from "react"
import { TeamCard } from "@/components/team-card"
import { type Teammate, teammates } from "@/config/teammates"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

function TeamCarousel({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const renderTeammateList = () =>
    teammates.map((teammate, i) => {
      return (
        <li key={i} teammate-ind={i} className={cn("relative")}>
          <img className="rounded-full peer" src={teammate.img_path} alt="teammate image" />
          <img
            className={cn(
              "absolute bottom-0 right-0 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition duration-300 ease-in-out",
            )}
            src="/assets/meet-the-team/teammate-pointer.svg"
            alt="teammate-pointer.svg"
          />

          <div
            className={cn(
              "pointer-events-none opacity-0 peer-hover:opacity-100 absolute top-full mt-20 left-4/2 -translate-x-1/2 z-40 w-[300px] transition-opacity duration-300 ease-in-out",
            )}
          >
            <TeamCard team={teammate.team} name={teammate.name} role={teammate.role} />
          </div>
        </li>
      )
    })

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
  return (
    <div className="meet-team" {...props}>
      <div className="flex-row items-start justify-center">
        <SectionHeader className="text-white">Meet The team</SectionHeader>
        <TeamCarousel className="mt-10" />
      </div>
    </div>
  )
}
