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
    const teamContainer = " min-h-full flex flex-col h-full justify-between py-4 bg-gradient-to-b from-blue-700 via-cyan-500 to-orange-700 bg-opacity-25 rounded-3xl p-4 "

    const titleText = `${audiowide.className} xl:text-5xl lg:text-4xl sm:text-3xl text-2xl font-bold md:text-end text-center px-4 pt-8`
    const teamText = "text-sm sm:text-lg xl:text-xl md:px-4 md:text-end text-center "
    const teamHeadContainer = "flex flex-col md:flex-row items-center lg:h-[30vh] md:h-[25vh]  h-[20vh] w-auto xl:mt-[-10rem] md:mt-[-5rem]"
    const teamHeadImage = "h-full w-auto p-1 bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-500"

    const memberImageContainer = "flex justify-center items-center align-center w-full "
    const memberImageWrapper = "flex flex-wrap justify-center gap-2 w-4/5 py-2 "
    const memberImage = "flex-1 h-auto xl:max-w-[16%] md:max-w-[23%] sm:max-w-[25%] max-w-[35%] object-cover p-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-amber-400"

    return (
        <div className="w-full px-8 ">
            <SectionHeader>Teams</SectionHeader>
            <div className="flex flex-row justify-center pt-8">
                <div className="w-full xl:max-w-[80rem] max-w-[60rem]">
                    <Carousel opts={{ align: "start", direction: "ltr", loop: true }} orientation="vertical" className="my-20">
                        <CarouselContent className="h-[120vw] max-h-[40rem]">
                            <CarouselItem className="h-[inherit] max-h-[inherit] ">
                                <div className={teamContainer}>
                                    <div className={titleText}>
                                        Tech Team
                                    </div>
                                    <div className={teamHeadContainer}>
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
                                    <div className={memberImageContainer}>
                                        <div className={memberImageWrapper}>
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
                                <div className={teamContainer}>
                                    <div className={titleText}>
                                        Not Tech Team
                                    </div>
                                    <div className={teamHeadContainer}>
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
                                    <div className={memberImageContainer}>
                                        <div className={memberImageWrapper}>
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
