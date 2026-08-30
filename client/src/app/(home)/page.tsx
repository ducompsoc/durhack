import Location from "@/components/location"
import Hero from "@/components/hero"
import Info from "@/components/info"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <Hero />

      {/* Info */}
      <Info />

      {/* Getting There */}
      <Location />

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
  )
}
