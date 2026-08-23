import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/hero.css"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="grid grid-rows-2 items-stretch justify-center h-screen bg-[#E566B0] max-h-screen relative overflow-hidden">
      {/* Top half */}
      <div className="z-10 flex flex-col justify-center items-center gap-8 h-full w-full">
        <div className="flex flex-col items-center justify-center gap-10 md:gap-15">
          <h1
            data-text="DURHACK"
            className={cn(
              audiowide.className,
              "text-white text-6xl md:text-8xl font-bold durhack-title relative uppercase leading-none",
            )}
          >
            DurHack
          </h1>
          <h1
            data-text="2026"
            className={cn(
              audiowide.className,
              "text-white text-4xl md:text-6xl font-bold durhack-title relative uppercase leading-none",
            )}
          >
            2026
          </h1>
        </div>
        <div>
          <h2 className={cn(spaceGrotesk.className, "subtitle text-white text-3xl text-center font-semibold")}>
            14th-15th November
          </h2>
          <h2 className={cn(spaceGrotesk.className, "subtitle text-white text-3xl text-center font-semibold")}>
            Durham University, TLC
          </h2>
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
      <div className="flex-1 z-10 flex justify-center items-center w-full">
        <div className="relative w-full flex justify-center items-center ">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12%] w-[100vmax] min-w-[1000px] z-1 h-auto aspect-square">
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
          <div className="relative w-[clamp(300px,80vw,900px)] aspect-square flex justify-center items-center translate-y-[25vmax] md:translate-y-[10vmax]">
            <Image className="object-contain" fill priority alt="sun" src="/assets/hero/sun.svg" />
            <Image className="object-contain" fill priority alt="sun aura" src="/assets/hero/sun-aura.svg" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image className="object-fill" fill priority alt="sun rays" src="/assets/hero/sun-rays.svg" />
      </div>
    </div>
  )
}
