"use client"
import React from "react"
import Image from "next/image"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"
import {Teammate, teammates} from "@/config/teammates";

type CardProps = Teammate & React.ComponentProps<"button">

function Card({ imgSrc, teammateName, teamPosition, funFact, quote, quoteSource, className, ...props }: CardProps) {
  const [flipped, setFlipped] = React.useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((flipped) => !flipped)}
      className={cn("w-50 h-70 shadow-md transition-all duration-200 hover:shadow-2xl perspective-[100rem]", className)}
      {...props}
    >
      <div
        className={cn(
          "relative size-full transition duration-500 transform-3d",
          flipped && "transform-[rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 size-full backface-hidden">
          <div className="flex h-full w-full flex-col items-center justify-center bg-white text-black">
            <div className="flex flex-col w-40">
              <div className="relative h-50 w-full">
                <Image className="w-full object-cover" fill alt="someone" src={imgSrc} />
              </div>
              <div className="relative flex flex-col text-left">
                <h1>{teammateName}</h1>
                <h3>{teamPosition}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 size-full backface-hidden transform-[rotateY(180deg)]">
          <div className="flex h-full w-full flex-col items-center justify-center bg-white text-black box-border p-8">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Something about me</p>
              <p className="text-sm text-gray-700 leading-relaxed">{funFact}</p>
            </div>

            <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-900">“{quote}”</p>
              <p className="text-xs text-right font-medium text-gray-500">— {quoteSource ?? "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function TeammatesGrid({ className, ...props }: React.ComponentProps<"div">) {
  const [flipped, setFlipped] = React.useState(false)

  return (
    <div className={cn(className, "flex flex-wrap justify-center gap-20 w-6/10")} {...props}>
      {teammates.map((team: Teammate, i) => (
        <Card key={i} {...team}/>
      ))}
    </div>
  )
}

export function MeetTheTeam({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full flex flex-col justify-center items-center", className)} {...props}>
      <SectionHeader className="mb-15">Meet the Team</SectionHeader>

      <TeammatesGrid className="mb-20" />
    </div>
  )
}
