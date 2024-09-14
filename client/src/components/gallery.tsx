import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@durhack/web-components/ui/carousel"

import { SectionHeader } from "@/components/section-header";

export default function Gallery() {

  return (
    <div className="w-full px-4">

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">
        <span>Gallery</span>
      </h1>

      <div className="flex flex-row justify-center">
        <div className="w-full max-w-[60rem]">
          <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
            <CarouselContent className="h-[60vw] max-h-[40rem]">
              <CarouselItem>
                <Image
                  src="/assets/photos/anders-jilden-uwbajDCODj4-unsplash.jpg"
                  alt="golden hour photograph of docking pier on body of water"
                  width={2400}
                  height={1600}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/assets/photos/daniel-leone-g30P1zcOzXo-unsplash.jpg"
                  alt="photograph of a snowy mountain before sunrise"
                  width={4928}
                  height={3264}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/assets/photos/qingbao-meng-01_igFr7hd4-unsplash.jpg"
                  alt="bird's eye view photograph of green mountains"
                  width={2600}
                  height={1548}
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
