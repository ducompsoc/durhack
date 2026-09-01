import About from "@/components/about"
import Hero from "@/components/hero"
import Info from "@/components/info"
import Location from "@/components/location"

export default function HomePage() {
  return (
    <main className="flex flex-col relative overflow-x-clip">
      {/* Hero */}
      <Hero />

      <div className="h-[10vh] md:h-[50vh] min-h-[100px] w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Skyline */}
      <section className="relative bg-[#0E4A0F]">
        {/* Info */}
        <Info />

        {/* Getting There */}
        <Location />

        {/* About */}
        <About />
      </section>

      {/* Plaza */}
      <section className="relative z-20 bg-black">
        {/* Sponsors */}
        <div className="flex items-start justify-center">
          <h1 className="text-white text-5xl font-bold">Sponsors</h1>
        </div>

        {/* Partners */}
        <div className="flex items-start justify-center">
          <h1 className="text-white text-5xl font-bold">Partners</h1>
        </div>

        {/* FAQ */}
        <div className="flex items-start justify-center">
          <h1 className="text-white text-5xl font-bold">FAQ</h1>
        </div>

        {/* Guilds */}
        <div className="flex items-start justify-center hidden">
          <h1 className="text-white text-5xl font-bold">Guilds</h1>
        </div>

      </section>

      {/* Meet The Team */}
      <div className="flex items-start justify-center hidden">
        <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
      </div>
    </main>
  )
}
