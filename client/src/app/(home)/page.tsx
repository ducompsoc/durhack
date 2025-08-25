import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"


export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <div className="hero relative w-screen h-[100svh] overflow-hidden md:overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative h-full aspect-[1920/1405]">
             <img
              src="/assets/hero/text-phone.svg"
              alt="sun-glow"
              className="absolute bottom-[68%] right-[32.5%] w-[35%] md:hidden"
            />
            <img
              src="/assets/hero/sun-glow.svg"
              alt="sun-glow"
              className="absolute bottom-[15%] right-[18%] w-[60.1%] md:bottom-[-5%] md:right-[5%] md:w-[91.1%] h-auto"
            />
            <img
              src="/assets/hero/sun.svg"
              alt="sun"
              className="absolute bottom-[25%] right-[36.5%] w-[25%] md:bottom-[39.5%] md:right-[38.45%] md:w-[18.375%] h-auto"
            />
            <img
              src="/assets/hero/cloud-right.svg"
              alt="cloud-right"
              className="absolute bottom-[1%] left-[49%] w-[55%] md:bottom-[13%] md:left-[51.5%] md:w-[76%] h-auto"
            />
            <img
              src="/assets/hero/cloud-left-back.svg"
              alt="cloud-left-back"
              className="absolute bottom-[-1%] right-[37%] w-[60%] md:bottom-[-2%] md:right-[33.5%] md:w-[83%] h-auto rotate-[-11.2deg]"
            />
            <img
              src="/assets/hero/cloud-left-front.svg"
              alt="cloud-left-front"
              className="absolute bottom-[2%] right-[45%] w-[55%] md:bottom-[-2%] md:right-[42%] md:w-[82%] h-auto"
            />
            <img
              src="/assets/hero/hill4.svg"
              alt="hill4"
              className="hidden md:block absolute bottom-[-14.5%] right-[12.7%] max-w-none w-[108%] h-auto rotate-[2.7deg]"
            />
            <img
              src="/assets/hero/hill3.svg"
              alt="hill3"
              className="hidden md:block absolute bottom-[-15.3%] left-[16.5%] max-w-none w-[120%] h-auto"
            />
            <img
              src="/assets/hero/turbines.svg"
              alt="turbines"
              className="hidden md:block absolute bottom-[47%] right-[4.726%] w-[21.3%] h-auto"
            />
            <img
              src="/assets/hero/glass-dome.svg"
              alt="glass-dome"
              className="hidden md:block absolute bottom-[42.7%] left-[84%] w-[17.9%] h-auto"
            />
            <img
              src="/assets/hero/3-reflectors.svg"
              alt="3-reflectors"
              className="hidden md:block absolute bottom-[40.2%] right-[14.5%] w-[5.57%] h-auto"
            />
            <img
              src="/assets/hero/reflector-grass.svg"
              alt="reflector-grass"
              className="hidden md:block absolute bottom-[36.7%] right-[1%] w-[8%] h-auto"
            />
            <img
              src="/assets/hero/hill2.svg"
              alt="hill2"
              className="hidden md:block absolute bottom-[-18.4%] right-[23.1%] w-[97.9%] h-auto"
            />
            <img
              src="/assets/hero/cathedral.svg"
              alt="cathedral"
              className="hidden md:block absolute bottom-[25.4%] left-[-5.5%] w-[45.3%] h-auto"
            />
            <img
              src="/assets/hero/bushes.svg"
              alt="bushes"
              className="hidden md:block absolute bottom-[20.7%] left-[-4.5%] w-[46.2%] h-auto"
            />
            <img
              src="/assets/hero/hill1.svg"
              alt="hill1"
              className="hidden md:block absolute bottom-[-16.6%] left-[14%] max-w-none w-[118%] h-auto rotate-[-3.5deg]"
            />
            <img
              src="/assets/hero/anex.svg"
              alt="anex"
              className="hidden md:block absolute bottom-[18.7%] left-[63%] w-[14.3%] h-auto"
            />
            <img
              src="/assets/hero/house.svg"
              alt="house"
              className="hidden md:block absolute bottom-[1.5%] left-[46%] w-[24.3%] h-auto"
            />
            <img
              src="/assets/hero/sunflowers.svg"
              alt="sunflowers"
              className="hidden md:block absolute bottom-[-15%] left-[65%] w-[44.5%] h-auto"
            />
            <img
              src="/assets/hero/text.svg"
              alt="text"
              className="hidden md:block absolute bottom-[68.5%] left-[9.375%] w-[75%] h-auto"
            />
          </div>
        </div>
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
