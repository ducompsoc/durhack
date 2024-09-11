import { Audiowide, Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils";
import { RegisterInterestForm } from "./register-interest-form";

const audiowide = Audiowide({ weight: "400",  subsets: ["latin"] });
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <main className="dark leading-8 grid grid-cols-1 text-center justify-center lg:grid-cols-2 lg:text-left">
        <section className="text-white pb-3 border-b border-white lg:pb-0 lg:pr-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-col h-full justify-center">
            <h1 className={cn(audiowide.className, "text-6xl lg:text-8xl")}>
              DurHack
            </h1>
            <h1
              className={cn(audiowide.className, "text-6xl lg:text-8xl text-transparent")}
              style={{WebkitTextStroke: ".04em white"}}
            >
              2024
            </h1>
            <p className="lg:text-xl">The UK&apos;s Leading Student Hackathon</p>
          </div>
        </section>
        <section className="text-white pt-3 pb-3 border-b border-white lg:pt-0 lg:pb-0 lg:pl-5 lg:border-b-0">
          <div className="flex flex-col h-full justify-center text-center lg:text-right">
            <h2 className={cn(space_grotesk.className, "date text-4xl lg:text-6xl")}>
              2<sup>nd</sup>-3<sup>rd</sup> November
            </h2>
          </div>
        </section>
        <section className="pt-3 lg:col-span-2">
          <RegisterInterestForm className="grid grid-cols-1 lg:grid-cols-4 lg:gap-3" />
        </section>
      </main>

      <div className="mt-16 text-xl mx-auto">
        Tickets and full details coming soon!
      </div>
    </>
  );
}
