import { Faqs } from "@/components/faqs"
import { Footer } from "@/components/footer"
import { Guilds } from "@/components/guilds"
import { Hero } from "@/components/hero"
import { Info } from "@/components/info"
import { Partners, Sponsors } from "@/components/sponsors"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <Hero />

      {/* Info */}
      <Info />

      {/* Location */}
      <div className="location flex items-start justify-center ">
        <h1 className="text-white text-5xl font-bold">Location</h1>
      </div>

      {/* Sponsors & Partners */}
      <Sponsors />
      <Partners />

      {/* FAQ */}
      <Faqs />

      {/* History */}
      <div className="history flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">History</h1>
      </div>

      {/* Guilds */}
      <Guilds className="hidden" />

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

      {/* Footer - temporarily using the dashboard one */}
      <Footer />
    </main>
  )
}
