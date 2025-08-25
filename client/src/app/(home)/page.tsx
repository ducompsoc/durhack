import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <div className="hero relative flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Hero</h1>
        <img
          src="/assets/hero/sun.svg"
          alt="sun"
          className="absolute bottom-0 right-[38.45vw] translate-y-[-157.78%] w-[18.375vw] h-auto"
        />
        <img
          src="/assets/hero/cloud-right.svg"
          alt="hill3"
          className="absolute bottom-0 left-[48.3vw] translate-y-[-7.8%] w-[76vw] h-auto"
        />
        <img
          src="/assets/hero/cloud-left-back.svg"
          alt="hill3"
          className="absolute bottom-0 right-[33.5vw] translate-y-[5.5%] w-[83vw] h-auto rotate-[-11.2deg]"
        />
        <img
          src="/assets/hero/cloud-left-front.svg"
          alt="hill3"
          className="absolute bottom-0 right-[42vw] translate-y-[10%] w-[82vw] h-auto"
        />
        <img
          src="/assets/hero/hill4.svg"
          alt="hill3"
          className="absolute bottom-0 right-[12.7vw] translate-y-[21.5%] w-[108vw] h-auto rotate-[2.7deg]"
        />
        <img
          src="/assets/hero/hill3.svg"
          alt="hill3"
          className="absolute bottom-0 left-[16.5vw] translate-y-[20.3%] w-[120vw] h-auto"
        />
        <img
          src="/assets/hero/turbines.svg"
          alt="3 wind turbines"
          className="absolute bottom-0 right-[4.726vw] translate-y-[-110%] w-[21.3vw] h-auto"
        />
        <img
          src="/assets/hero/glass-dome.svg"
          alt="glass dome"
          className="absolute bottom-0 left-[84vw] translate-y-[-220%] w-[17.9vw] h-auto"
        />
        <img
          src="/assets/hero/3-reflectors.svg"
          alt="3 reflectors"
          className="absolute bottom-0 right-[14.5vw] translate-y-[-350%] w-[5.57vw] h-auto"
        />
        <img
          src="/assets/hero/reflector-grass.svg"
          alt="1 reflector and grass"
          className="absolute bottom-0 right-[1vw] translate-y-[-250%] w-[8vw] h-auto"
        />
        <img
          src="/assets/hero/hill2.svg"
          alt="hill2"
          className="absolute bottom-0 right-[23.1vw] translate-y-[30.6%] w-[97.9vw] h-auto"
        />
        <img
          src="/assets/hero/cathedral.svg"
          alt="cathedral"
          className="absolute bottom-0 left-[-5vw] translate-y-[-48.3%] w-[45.3vw] h-auto"
        />
        <img
          src="/assets/hero/bushes.svg"
          alt="bushes"
          className="absolute bottom-0 left-[-4.5vw] translate-y-[-88%] w-[46.2vw] h-auto"
        />
        <img
          src="/assets/hero/hill1.svg"
          alt="hill1"
          className="absolute bottom-0 left-[16.6vw] translate-y-[39.7%] w-[118vw] h-auto rotate-[-3.5deg]"
        />
        <img
          src="/assets/hero/anex.svg"
          alt="anex"
          className="absolute bottom-0 left-[63vw] translate-y-[-160%] w-[14.3vw] h-auto"
        />
        <img
          src="/assets/hero/house.svg"
          alt="house"
          className="absolute bottom-0 left-[48vw] translate-y-[-14.5%] w-[24.3vw] h-auto"
        />
        <img
          src="/assets/hero/sunflowers.svg"
          alt="sunflowers"
          className="absolute bottom-0 left-[63vw] translate-y-[35%] w-[44.5vw] h-auto"
        />
         <img
          src="/assets/hero/text.svg"
          alt="text"
          className="absolute bottom-0 left-[9.375vw] translate-y-[-240%] w-[75vw] h-auto"
        />
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
  );
}
