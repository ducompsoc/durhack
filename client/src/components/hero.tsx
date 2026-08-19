import { audiowide } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/hero.css"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="flex flex-col items-stretch justify-center h-screen bg-[#EB3DA2] max-h-screen relative overflow-hidden">
      {/* Top half */}
      <div className="flex-1 z-10 flex justify-center items-center">
        <h1
          data-text="DURHACK"
          className={cn(
            audiowide.className,
            "text-white text-6xl md:text-8xl font-bold durhack-title relative uppercase",
          )}
        >
          DurHack
        </h1>
      </div>

      {/* Bottom half */}
      <div className="flex-1 z-0 flex justify-center items-center w-full">
        <div className="relative w-full flex justify-center items-center ">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] w-[100vmax] min-w-[1000px] h-auto aspect-square">
            <Image
              className="object-contain"
              width={100}
              height={100}
              layout="responsive"
              priority
              alt="sun rays"
              src="/assets/hero/sun-rays.svg"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[15%] w-[100vmax] min-w-[1000px] z-1 h-auto aspect-square">
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
          <div className="relative w-[clamp(300px,80vw,900px)] aspect-square flex justify-center items-center translate-y-[10vmax]">
            <Image className="object-contain" fill priority alt="sun" src="/assets/hero/sun.svg" />
            <Image className="object-contain" fill priority alt="sun aura" src="/assets/hero/sun-aura.svg" />
          </div>
        </div>
      </div>
    </div>
  )
}
