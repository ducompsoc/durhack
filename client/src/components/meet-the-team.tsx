"use client"
import React from "react"
import { SectionHeader } from "@/components/section-header"
import { type Teammate, teammates } from "@/config/teammates"
import { audiowide } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@durhack/web-components/ui/carousel";
import {TeammateCard} from "@/components/ui/teammate-card";

function TeammatesCarousel({ className, ...props }: React.ComponentProps<"div">) {
  const [flippedCard, setFlippedCard] = React.useState("")

  return (
      <Carousel className={cn("w-full", className)} opts={{loop: true, align: "center", dragFree: true}} {...props}>
        <CarouselContent className="justify-around">
          {teammates.map((teammate: Teammate) => {
            const flipped = teammate.teammateName === flippedCard
            return (
              <CarouselItem key={teammate.teammateName} className={cn("flex justify-center pl-8 basis-auto")}>
              <TeammateCard
                key={teammate.teammateName}
                flipped={flipped}
                onClick={() => setFlippedCard(flipped ? "" : teammate.teammateName)}
                {...teammate}
              />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
  )
}

export function MeetTheTeam({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div className={cn("w-full flex flex-col justify-center items-center", className)} {...props}>
        <SectionHeader>Meet the Team</SectionHeader>

        <div className={cn("container font-medium text-center py-20 text-xl", audiowide.className)}>
          <p>Find out more about the outstanding team responsible for organising DurHack 2026!</p>
        </div>
      </div>

      <div className="w-full min-w-full">
        <TeammatesCarousel className="w-full" />
      </div>
    </>
  )
}
