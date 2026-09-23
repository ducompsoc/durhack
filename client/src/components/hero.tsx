import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/hero.css"
import Image from "next/image"
import type React from "react"
import { DurhackDate, DurhackTitle } from "@/components/hero-titles"

function SubtitleText({ text, ...props }: { text: string } & React.ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(spaceGrotesk.className, "text-shadow-lg text-white text-3xl md:text-5xl text-center font-semibold")}
    >
      {text}
    </h2>
  )
}

function SignupButton({ ...props }: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <a
        href="/dashboard"
        className={cn(
          audiowide.className,
          "uppercase bg-[#982272] rounded-full py-3 px-12 text-xl font-medium hover:bg-[#611545] outline-solid outline-[#611545] transition-colors duration-300",
        )}
      >
        Sign Up Now
      </a>
    </div>
  )
}

export default function Hero() {
  return (
    <div className="relative w-full z-1">
      <div className="grid grid-rows-2 items-stretch justify-center bg-[#E566B0] min-h-screen relative">
        {/* Top half */}
        <div className="z-10 flex flex-col justify-center items-center w-full mt-40">
          <div className="w-full max-w-4xl flex justify-center items-center pb-6">
            <DurhackTitle />
          </div>
          <div className="w-full max-w-1/2 mb-8 flex justify-center items-center">
            <DurhackDate />
          </div>
          <div className="pb-6">
            <SubtitleText text="14th-15th November" />
            <SubtitleText text="Durham University, TLC" />
          </div>
          <SignupButton className="w-full items-center justify-center flex" />
        </div>

        {/* Bottom half */}
        <div className="flex-1 z-1 flex justify-center items-center pointer-events-none w-full -translate-y-20">
          <div className="relative w-[clamp(300px,80vmin,900px)] aspect-square flex justify-center items-center z-10">
            <Image className="object-contain" fill priority alt="sun" src="/assets/hero/sun.svg" />
            <Image className="object-contain" fill priority alt="sun aura" src="/assets/hero/sun-aura.svg" />
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image className="object-fill" fill priority alt="sun rays" src="/assets/hero/sun-rays.svg" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[13%] w-[100vmax] min-w-[1000px] z-1 h-auto aspect-square pointer-events-none">
        <Image
          className="object-contain"
          width={100}
          height={100}
          layout="responsive"
          priority
          alt="sun rays"
          src="/assets/hero/buildings.svg"
        />
      </div>
    </div>
  )
}
