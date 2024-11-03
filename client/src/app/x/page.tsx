import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@durhack/web-components/ui/carousel"

import { TitleSlide } from "./title-slide"

export default function DurHackXPage() {
  return (
    <main className="w-full min-h-[100vh] m-0 bg-black">
      <Carousel opts={{ align: "start", direction: "ltr" }} orientation="horizontal">
        <CarouselContent className="w-full min-h-[100vh] m-0">
          <CarouselItem className="h-[inherit] max-h-[inherit] p-0">
            <TitleSlide className="size-full" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </main>
  )
}