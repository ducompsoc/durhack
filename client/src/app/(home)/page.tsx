import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { MeetTheTeam } from "@/components/meet-the-team"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <div className="hero relative flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Hero</h1>
      </div>

      {/* Getting There */}
      <div className="getting-there flex items-start justify-center z-10">
        <h1 className="text-white text-5xl font-bold">Getting There</h1>
      </div>

      {/* Info */}
      <div className="info flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Info</h1>
      </div>

      {/* Sponsors */}
      <div className="sponsors flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Sponsors</h1>
      </div>

      {/* Partners */}
      <div className="partners flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Partners</h1>
      </div>

      {/* FAQ */}
      <div className="faq flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">FAQ</h1>
      </div>

      {/* History */}
      <div className="history flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">History</h1>
      </div>

      {/* Guilds */}
      <div className="guilds flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Guilds</h1>
      </div>

      {/* Schedule */}
      <div className="schedule flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Schedule</h1>
      </div>

      {/* Past Projects */}
      <div className="past-projects flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Past Projects</h1>
      </div>

      <MeetTheTeam />

      {/* Medium */}
      <div className="medium flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Medium</h1>
      </div>

      {/* Footer */}
      <div className="footer flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Footer</h1>
      </div>
    </main>
  )
}
