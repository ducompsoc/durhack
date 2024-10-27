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
    const containerDiv = " bg-gradient-to-b from-blue-700 via-cyan-500 to-orange-700 bg-opacity-25 rounded-3xl p-4"
    const titleDiv = `${audiowide.className} xl:text-5xl lg:text-5xl sm:text-4xl text-2xl font-bold md:text-end text-center px-4 underline md:no-underline lg:pb-8 pb-4`
    const teamText = "text-sm sm:text-lg xl:text-xl md:px-4 md:text-end text-center"
    const teamHeadImage = "h-full w-auto p-1 xl:h-[40vh] xl:h-[30vh] md:h-[25vh] h-[20vh] bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-500"
    const memberImage = "flex-1 h-auto xl:max-w-[15%] md:max-w-[23%] sm:max-w-[25%] max-w-[35%] object-cover p-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-amber-400"

    return (
        <div className="w-full px-8 ">
            <SectionHeader>Teams</SectionHeader>
            <div className="flex flex-row justify-center pt-8">
                <div className="w-full xl:max-w-[80rem] max-w-[60rem]">
                    <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
                        <CarouselContent className="h-[120vw] max-h-[40rem]">
                            <CarouselItem className="h-[inherit] max-h-[inherit] ">
                                <div className={containerDiv}>
                                    <div className={titleDiv}>
                                        Tech Team
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center w-auto md:mt-[-70px] bg-gradient-r from-yellow-800 via-yellow-600 to-amber-600">
                                        <Image
                                            src="/assets/photos/ceremony.jpg"
                                            alt="Opening Ceremony"
                                            width={1000}
                                            height={1500}
                                            className={teamHeadImage}
                                        />
                                        <div className={teamText}>
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
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="h-[inherit] max-h-[inherit]">
                                <div className={containerDiv}>
                                    <div className={titleDiv}>
                                        Not Tech Team
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center xl:h-[40vh] xl:h-[30vh] md:h-[25vh]  h-[20vh] w-auto md:mt-[-70px]">
                                        <Image
                                            src="/assets/photos/ceremony.jpg"
                                            alt="Opening Ceremony"
                                            width={1000}
                                            height={1500}
                                            className={teamHeadImage}
                                        />
                                        <div className={teamText}>
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
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
                                                />
                                                <Image
                                                    src="/assets/photos/hacking_1.jpg"
                                                    alt="hacking"
                                                    width={1000}
                                                    height={667}
                                                    className={memberImage}
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
    );
}
