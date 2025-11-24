import Image from "next/image"
import type React from "react"
import { cn } from "@/lib/utils"
import { patrickHand } from "@/lib/google-fonts"

export function Medium({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
      className={cn(
        "medium h-[calc(16rem+18vw)] sm:h-90 md:h-120 lg:h-130 xl:h-160 2xl:h-260 relative flex items-start justify-center overflow-hidden",
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
          className="absolute left-[15%] top-[30%] w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/stickyNote.svg"
          alt="Sticky Note"
          width={712}
          height={774}
          className="absolute left-[40%] top-[15%] w-1/3 max-w-200"
        />
        <Image
          src="/assets/medium/middlePolaroid.svg"
          alt="Middle Polaroid"
          width={397}
          height={494}
          className="absolute left-[30%] top-[10%] w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/rightPolaroid.svg"
          alt="Right Polaroid"
          width={374}
          height={478}
          className="absolute right-[12%] top-[30%] w-1/5 max-w-150"
        />
        <a href="https://medium.com/@DurHack_press/coding-for-good-in-durham-how-hackathons-are-building-the-next-generation-of-problem-solvers-bd5baf57fcef" target="_blank" rel="noopener noreferrer">
            <div className="absolute right-[-5%] text-center bottom-[5%] w-1/3 max-w-200">
                <p className={cn(
                    patrickHand.className,
                    "section-header font-bold text-[#006793] tracking-widest text-center uppercase w-fit text-[clamp(1.1rem,1.1vw+0.3rem,1.9rem)]",
                    className,
                    )}>READ MORE &rarr;
                </p>
                <Image
                    src="/assets/medium/mediumLink.svg"
                    alt="Medium Hyperlink"
                    width={286}
                    height={44}
                    className="mx-auto w-1/3 max-w-150"
                />
            </div>
        </a>
      </div>
      
      <div className="absolute h-full 2xl:hidden w-full top-0">
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
          className="absolute left-[39%] top-5 w-1/3 max-w-200"
        />
        <Image
          src="/assets/medium/middlePolaroid.svg"
          alt="Middle Polaroid"
          width={397}
          height={494}
          className="absolute left-[28%] top-5 w-1/5 max-w-150"
        />
        <Image
          src="/assets/medium/rightPolaroid.svg"
          alt="Right Polaroid"
          width={374}
          height={478}
          className="absolute right-[12%] top-25 w-1/5 max-w-150"
        />
        <a href="https://medium.com/@DurHack_press/coding-for-good-in-durham-how-hackathons-are-building-the-next-generation-of-problem-solvers-bd5baf57fcef" target="_blank" rel="noopener noreferrer">
            <div className="absolute right-[5%] text-center bottom-[10%] w-1/3 max-w-200">
                <p className={cn(
                    patrickHand.className,
                    "section-header font-bold text-[#006793] tracking-widest text-center uppercase w-fit text-[clamp(1.1rem,1.1vw+0.3rem,1.9rem)]",
                    className,
                    )}>READ MORE &rarr;
                </p>
                <Image
                    src="/assets/medium/mediumLink.svg"
                    alt="Medium Hyperlink"
                    width={286}
                    height={44}
                    className="mx-auto w-1/3 max-w-150"
                />
            </div>
        </a>
      </div>

    </div>
    )
}