import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@durhack/web-components/ui/carousel"
import Image from "next/image"

import { SectionHeader } from "@/components/section-header"

export function Teams() {
    return (
        <div className="w-full px-8 ">
            <SectionHeader>Teams</SectionHeader>
            <div className="flex flex-row justify-center">
                <div className="w-full xl:max-w-[80rem] max-w-[60rem]">
                    <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
                        <CarouselContent className="h-[80vw] max-h-[40rem]">
                            <CarouselItem className="h-[inherit] max-h-[inherit]">
                                <div className="flex flex-col h-full">
                                    <div className="xl:text-8xl lg:text-7xl sm:text-4xl text-2xl font-bold md:text-end text-center px-4 underline md:no-underline">
                                        Tech Team
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center h-1/2 w-auto md:mt-[-70px] ">
                                        <Image
                                            src="/assets/photos/ceremony.jpg"
                                            alt="Opening Ceremony"
                                            width={1000}
                                            height={1500}
                                            className="h-full w-auto object-cover p-1 md:p-4"
                                        />
                                        <div className="text-xs sm:text-lg xl:text-xl md:px-4 md:text-end text-center">
                                            We do tech and stuff. I think... we do cool stuff, and here a random amount of text to fill in this section.
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center w-full h-full">
                                        <div className="flex flex-row grid xl:grid-cols-6 grid-cols-3 gap-4 md:gap-2 max-w-[80rem] w-full py-2 mx-auto">
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="h-full object-cover w-auto lg:h-[12vw] md:h-[15vw] h-[11.9vw]"
                                            />
                                        </div>
                                    </div>
                                </div>
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
