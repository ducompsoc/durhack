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
                  src="/assets/photos/ceremony.jpg"
                  alt="opening ceremony"
                  width={1000}
                  height={667}
                  className="h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/hacking_1.jpg"
                  alt="hacking"
                  width={1000}
                  height={667}
                  className="h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/hacking_2.jpg"
                  alt="hacking"
                  width={1000}
                  height={667}
                  className="h-full object-cover"
                />
              </CarouselItem>
              <CarouselItem className="h-[inherit] max-h-[inherit]">
                <Image
                  src="/assets/photos/hacking_3.jpg"
                  alt="hacking"
                  width={1000}
                  height={667}
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
