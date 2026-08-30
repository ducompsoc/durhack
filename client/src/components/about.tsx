import { HoneycombSVG } from "./honeycomb"
import { cn } from "@/lib/utils"
import { darkerGrotesk } from "@/lib/google-fonts"

export default function About() {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-wrap justify-center items-center align-center w-[80vw]">
                <div className={cn("container max-w-[60rem] mx-auto mb-20 text-center md:text-left text-3xl font-medium", darkerGrotesk.className)}>
                    <p>
                        DurHack is one of the UK’s leading student hackathons - an action-packed weekend which welcomes over 600
                        hackers. With 15 sponsors hosting workshops, challenges, and mentorship, you’ll pick up new skills, meet
                        amazing people, and bring your ideas to life
                    </p>
                </div>

                <div className="w-full max-w-[600px] mx-auto">
                    <HoneycombSVG />
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full mx-auto py-10 gap-20">
                <div className="flex flex-col text-center align-center justify-center">
                    <h3 className="font-bold text-6xl">600+</h3>
                    <h5 className="font-normal text-6xl uppercase">Hackers</h5>
                </div>
                <div className="flex flex-col text-center align-center justify-center">
                    <h3 className="font-bold text-6xl">15+</h3>
                    <h5 className="font-normal text-6xl uppercase">Sponsors</h5>
                </div>
                <div className="flex flex-col text-center align-center justify-center">
                    <h3 className="font-bold text-6xl">150+</h3>
                    <h5 className="font-normal text-6xl uppercase">Projects</h5>
                </div>
            </div>
        </div>
    )
}
