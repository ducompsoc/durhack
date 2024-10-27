import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@durhack/web-components/ui/carousel"
import Image from "next/image"

import { SectionHeader } from "@/components/section-header"

import { audiowide } from "@/lib/google-fonts"
import "@/styles/section-header.css"

export function Teams() {

    return (
        <div className="w-full px-8 ">
            <SectionHeader>Teams</SectionHeader>
            <div className="flex flex-row justify-center pt-8">
                <div className="w-full xl:max-w-[80rem] max-w-[60rem] bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-700 bg-opacity-75 rounded-3xl p-4">
                    <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
                        <CarouselContent className="h-[100vw] max-h-[40rem]">
                            <CarouselItem className="h-[inherit] max-h-[inherit]">

                                <div className="flex flex-col h-full">

                                    <div className={`${audiowide.className} xl:text-5xl lg:text-5xl sm:text-4xl text-2xlfont-bold md:text-end text-center px-4 underline md:no-underline py-8`}>
                                        Tech Team
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center md:h-[30vh] lg:h-[35vh] h-[25vh] w-auto md:mt-[-70px] ">
                                        <Image
                                            src="/assets/photos/ceremony.jpg"
                                            alt="Opening Ceremony"
                                            width={1000}
                                            height={1500}
                                            className="h-full w-auto p-1 md:p-4"
                                        />
                                        <div className="text-xs sm:text-lg xl:text-xl md:px-4 md:text-end text-center">
                                            We do tech and stuff. I think... we do cool stuff, and here a random amount of text to fill in this section.
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center align-center h-full w-full">
                                        <div className="flex flex-wrap justify-center gap-2 w-4/5 py-2 md:w-7/8 xl:w-full">
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="h-[inherit] max-h-[inherit]">

                                <div className="flex flex-col h-full">

                                <div className={`${audiowide.className} xl:text-5xl lg:text-5xl sm:text-4xl text-2xl font-bold md:text-end text-center px-4 underline md:no-underline`}>
                                        Not Tech Team
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center md:h-[35vh] lg:h-[40vh] h-[30vh] w-auto md:mt-[-70px] ">
                                        <Image
                                            src="/assets/photos/ceremony.jpg"
                                            alt="Opening Ceremony"
                                            width={1000}
                                            height={1500}
                                            className="h-full w-auto object-cover p-1 md:p-4"
                                        />
                                        <div className="text-xs sm:text-lg xl:text-xl md:px-4 md:text-end text-center">
                                            We do not tech and stuff. I know... we do not do cool stuff, and here a random fixed of text to not fill in this section.
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center align-center h-full w-full">
                                        <div className="flex flex-wrap justify-center gap-2 w-4/5 py-2 md:w-7/8 xl:w-full">
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
                                            />
                                            <Image
                                                src="/assets/photos/hacking_1.jpg"
                                                alt="hacking"
                                                width={1000}
                                                height={667}
                                                className="flex-1 h-auto max-w-[25%] xl:max-w-[15%] object-cover"
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
