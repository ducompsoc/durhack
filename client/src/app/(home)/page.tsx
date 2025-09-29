import { Hero } from "@/components/hero"
import { Faqs } from "@/components/faqs"
import { Guilds } from "@/components/guilds"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <Hero />

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
      <Faqs className={cn("faq")} />

      {/* History */}
      <div className="history flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">History</h1>
      </div>

      {/* Guilds */}
      <Guilds />

      {/* Schedule */}
      <div className="schedule flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Schedule</h1>
      </div>

      {/* Past Projects */}
      <div className="past-projects flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Past Projects</h1>
      </div>

      {/* Meet the Team */}
      <div className="meet-team flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
      </div>

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
