import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/hero.css"
import Image from "next/image"

function TitleText({ text, className, ...props }: { text: string } & React.ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      data-text={text.toUpperCase()}
      className={cn(
        audiowide.className,
        "text-white text-center font-bold durhack-title relative uppercase leading-none",
        className,
      )}
    >
      {text}
    </h1>
  )
}

function SubtitleText({ text, ...props }: { text: string } & React.ComponentProps<"h2">) {
  return (
    <h2 {...props} className={cn(spaceGrotesk.className, "subtitle text-white text-3xl md:text-5xl text-center font-semibold")}>
      {text}
    </h2>
  )
}

export default function Hero() {
  return (
    <>
      <div className="grid grid-rows-2 items-stretch justify-center bg-[#E566B0] min-h-screen relative overflow-x-hidden">
        {/* Top half */}
        <div className="z-10 flex flex-col justify-center translate-y-[5vh] items-center z-30 gap-8 h-full w-full">
          <div className="flex flex-col items-center justify-center gap-12 md:gap-25 mb-5 md:mb-10">
            <TitleText text="DurHack" className="text-6xl md:text-9xl" />
            <TitleText text="2026" className="text-5xl md:text-8xl" />
          </div>
          <div>
            <SubtitleText text="14th-15th November" />
            <SubtitleText text="Durham University, TLC" />
          </div>
          <div className="w-full items-center justify-center flex">
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
        </div>

        {/* Bottom half */}
        <div className="flex-1 z-1 flex justify-center items-center pointer-events-none w-full">
          <div className="relative w-[clamp(300px,80vmin,900px)] aspect-square flex justify-center items-center z-10">
            <Image className="object-contain" fill priority alt="sun" src="/assets/hero/sun.svg" />
            <Image className="object-contain" fill priority alt="sun aura" src="/assets/hero/sun-aura.svg" />
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image className="object-fill" fill priority alt="sun rays" src="/assets/hero/sun-rays.svg" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[8%] w-[100vmax] min-w-[1000px] z-1 h-auto aspect-square pointer-events-none">
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

    </>
  )
}
