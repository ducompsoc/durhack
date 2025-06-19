import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"

export default function HomePage() {
  return (
    <>
      <main className="max-w-[20rem] items-center dark leading-8 flex flex-col text-center justify-center lg:max-w-full 2xl:grid 2xl:grid-cols-2 2xl:text-left">
        <section className="text-white pb-3 border-b border-white 2xl:pb-0 2xl:pr-5 2xl:border-b-0 2xl:border-r">
          <div className="flex flex-col h-full justify-center">
            <h1 className="text-nowrap uppercase text-5xl lg:text-7xl 2xl:text-8xl">
              <span className={cn(audiowide.className)}>DurHack </span>
              <span className={cn(audiowide.className, "text-transparent")} style={{ WebkitTextStroke: ".04em white" }}>
                X
              </span>
            </h1>
          </div>
        </section>
        <section className="text-white py-3 border-b border-white 2xl:pt-0 2xl:pb-0 2xl:pl-5 2xl:border-b-0">
          <div className="flex flex-col h-full justify-center text-center 2xl:text-right">
            <h2 className={cn(spaceGrotesk.className, "date text-3xl lg:text-5xl 2xl:text-[4rem]")}>
              1<sup>st</sup>-2<sup>nd</sup> November 2025
            </h2>
          </div>
        </section>
        <section className="py-3 text-center 2xl:text-xl 2xl:col-span-2">
          Celebrating 10 years of DurHack, the UK&apos;s Leading Student Hackathon
        </section>
        <section className="pt-3 2xl:col-span-2">
          <RegisterInterestForm className="grid grid-cols-1 2xl:grid-cols-4 2xl:gap-3" />
        </section>
      </main>

      <div className="mt-16 text-xl mx-auto">Tickets and full details coming soon!</div>

      <Button asChild={true} className="mt-16">
        <Link href="https://archive-2024--durhack.netlify.app">See last year&apos;s website</Link>
      </Button>
    </>
  )
}
