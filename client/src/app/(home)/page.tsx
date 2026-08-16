import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"
import Hero from "./hero"

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col">
        {/* Hero */}
        <Hero />

        {/* Getting There */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Getting there</h1>
        </div>
        {/* Info */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Info</h1>
        </div>
        {/* Sponsors */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Sponsors</h1>
        </div>
        {/* Partners */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Partners</h1>
        </div>
        {/* FAQ */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">FAQ</h1>
        </div>
        {/* Past Projects */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Past Projects</h1>
        </div>
        {/* Meet The Team */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
        </div>
      </main>
    </>
  )
}
