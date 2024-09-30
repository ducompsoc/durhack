import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@durhack/web-components/ui/carousel"
import Image from "next/image"

import { SectionHeader } from "@/components/section-header"

export default function Gallery() {
  return (
    <div className="w-full px-16 lg:pb-[32rem]">
      <SectionHeader>Gallery</SectionHeader>

      <div className="flex flex-row justify-center">
        <div className="w-full max-w-[60rem]">
          <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
            <CarouselContent className="h-[60vw] max-h-[40rem]">
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/anders-jilden-uwbajDCODj4-unsplash.jpg"
                  alt="golden hour photograph of docking pier on body of water"
                  width={2400}
                  height={1600}
                  className="h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/daniel-leone-g30P1zcOzXo-unsplash.jpg"
                  alt="photograph of a snowy mountain before sunrise"
                  width={4928}
                  height={3264}
                  className="h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/qingbao-meng-01_igFr7hd4-unsplash.jpg"
                  alt="bird's eye view photograph of green mountains"
                  width={2600}
                  height={1548}
                  className="h-full object-cover"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
