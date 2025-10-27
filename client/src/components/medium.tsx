import Image from "next/image"
import type React from "react"
import { cn } from "@/lib/utils"
import { patrickHand } from "@/lib/google-fonts"

export function Medium({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
      className={cn(
        "medium h-[calc(10rem+18vw)] sm:h-100 md:h-120 lg:h-140 xl:h-180 2xl:h-250 relative flex items-start justify-center overflow-hidden",
        className,
      )}
      {...props}
    >

      <div className="absolute h-full hidden 2xl:contents 2xl:w-full top-0">
      <Image
          src="/assets/medium/leftPolaroid.svg"
          alt="Left Polaroid"
          width={376}
          height={479}
          className="absolute left-[15%] top-40 w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/stickyNote.svg"
          alt="Sticky Note"
          width={712}
          height={774}
          className="absolute left-[40%] top-50 w-1/3 max-w-200"
        />
        <Image
          src="/assets/medium/middlePolaroid.svg"
          alt="Middle Polaroid"
          width={397}
          height={494}
          className="absolute left-[30%] top-50 w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/rightPolaroid.svg"
          alt="Right Polaroid"
          width={374}
          height={478}
          className="absolute right-[12%] top-100 w-1/5 max-w-150"
        />

        <div className="absolute left-[49%] top-85 w-1/5 max-w-200">
            <h2 className={cn(
                patrickHand.className,
                "section-header text-[#006793] text-center uppercase w-fit rotate-13 text-[clamp(1.0rem,1.0vw+0.1rem,1.8rem)]",
                className,
            )}>DurHack, Durham University’s flagship student-run hackathon, has ignited in a nation of computer science enthusiasts. The hackathon, which brings students together to build tech projects over 24-hours, has quickly become one of the most inspiring events of its kind to encourage innovation, collaboration, and of course: coding for good.
            </h2>
        </div>
      </div>
      
      <div className="absolute h-full 2xl:hidden w-full top-0">
        <Image
          src="/assets/medium/leftPolaroid.svg"
          alt="Left Polaroid"
          width={376}
          height={479}
          className="absolute left-[15%] top-50 w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/stickyNote.svg"
          alt="Sticky Note"
          width={712}
          height={774}
          className="absolute left-[40%] top-15 w-1/3 max-w-200"
        />
        <Image
          src="/assets/medium/middlePolaroid.svg"
          alt="Middle Polaroid"
          width={397}
          height={494}
          className="absolute left-[30%] top-15 w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/rightPolaroid.svg"
          alt="Right Polaroid"
          width={374}
          height={478}
          className="absolute right-[12%] top-50 w-1/5 max-w-150"
        />

        <div className="absolute left-[49%] top-45 w-1/5 max-w-200">
            <h2 className={cn(
                patrickHand.className,
                "section-header text-[#006793] text-center uppercase w-fit rotate-13 text-[clamp(0.2rem,0.9vw+0.1rem,1.0rem)]",
                className,
            )}>DurHack, Durham University’s flagship student-run hackathon, has ignited in a nation of computer science enthusiasts. The hackathon, which brings students together to build tech projects over 24-hours, has quickly become one of the most inspiring events of its kind to encourage innovation, collaboration, and of course: coding for good.
            </h2>
        </div>
      </div>

    </div>
    )
}