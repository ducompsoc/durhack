import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"

export default function HomePage() {
  return (
    <>
      <main className="max-w-[20rem] items-center dark leading-8 flex flex-col text-center justify-center lg:max-w-full lg:grid lg:grid-cols-2 lg:text-left">
        <section className="text-white pb-3 border-b border-white lg:pb-0 lg:pr-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-col h-full justify-center">
            <h1 className={cn(audiowide.className, "text-6xl lg:text-8xl")}>DurHack</h1>
            <h1
              className={cn(audiowide.className, "text-6xl lg:text-8xl text-transparent")}
              style={{ WebkitTextStroke: ".04em white" }}
            >
              2026
            </h1>
            <p className="lg:text-xl">The UK&apos;s Leading Student Hackathon</p>
          </div>
        </section>
        <section className="text-white pt-3 pb-3 border-b border-white lg:pt-0 lg:pb-0 lg:pl-5 lg:border-b-0">
          <div className="flex flex-col h-full justify-center text-center lg:text-right">
            <h2 className={cn(spaceGrotesk.className, "date text-4xl lg:text-6xl")}>
              ?<sup>??</sup>-?<sup>??</sup> November
            </h2>
          </div>
        </section>
        <section className="pt-3 2xl:col-span-2">
          <RegisterInterestForm className="grid grid-cols-1 2xl:grid-cols-4 2xl:gap-3" />
        </section>
      </main>

      <div className="mt-16 text-xl mx-auto">Tickets and full details coming soon!</div>

      <Button asChild={true} className="mt-16">
        <Link href="https://2025.durhack.com">See last year&apos;s website</Link>
      </Button>
    </>
  )
}
