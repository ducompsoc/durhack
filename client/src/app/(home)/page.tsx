import { Button } from "@durhack/web-components/ui/button"
import Link from "next/link"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import { RegisterInterestForm } from "./register-interest-form"


export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <div className="hero relative h-[100svh] overflow-hidden ">
        <div className="absolute inset-0 flex justify-center items-center ">
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
            {/* EXAMPLE ONLY */}
            <img
              src="/assets/hero/text.svg"
              alt="text"
              className="hidden md:block absolute bottom-[68.5%] left-[9.375%] w-[75%] h-auto"
            />
          </div>
        </div>
      </div>
        
      

      {/* Getting There */}
      <div className="getting-there relative flex rounded-t-[9.375vw] overflow-hidden min-h-[899px] md:min-h-[2483px] aspect-[1920/2483]">
        <div className="">
          <div className="">
        <img
          src="/assets/getting-there/city-background.svg"
          alt="City Skyline Background"
          className="absolute bottom-[38.9%] left-[0%] w-[102.3%] max-w-none h-auto"
        />
        <img
          src="/assets/getting-there/city-foreground.svg"
          alt="City Skyline Foreground"
          className="absolute bottom-[32.4%] left-[-0.5%] w-[85.7%] h-auto"
        />
        <img
          src="/assets/getting-there/train-bridge.svg"
          alt="Train On A Bridge"
          className="absolute bottom-[11.5%] left-[0%] w-[100%] h-[56%]"
        />
        <img
          src="/assets/getting-there/cloud-background.svg"
          alt="Cloud"
          className="absolute bottom-[10.1%] left-[17.5%] w-[93.4%] h-auto rotate-[0deg]"
        />
        <img
          src="/assets/getting-there/cloud-foreground.svg"
          alt="Cloud Shadow"
          className="absolute bottom-[0%] left-[-28.4%] w-[138%] max-w-none h-auto rotate-[-12.9deg]"
        />
        <img
          src="/assets/getting-there/leaves-bottom-right.svg"
          alt="Leaves"
          className="absolute bottom-[2.5%] left-[83.3%] w-[26%] h-auto"
        />
        <img
          src="/assets/getting-there/leaves-top-right.svg"
          alt="Leaves"
          className="absolute bottom-[62%] left-[88.4%] w-[18.75%] h-auto"
        />
        <img
          src="/assets/getting-there/leaves-left.svg"
          alt="Leaves"
          className="absolute bottom-[8.2%] left-[-6.5%] w-[25.8%] h-auto"
        />
      
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="info relative flex overflow-hidden min-h-[778px] md:min-h-[1928px] aspect-[1920/1928]">
        <h1 className="text-white text-5xl font-bold">Info</h1>
        <img
          src="/assets/info/hexagons-right.svg"
          alt="Hexagons showing images"
          className="absolute bottom-[69%] left-[58.3%] w-[32.9%] h-auto"
        />
        <img
          src="/assets/info/hexagons-left.svg"
          alt="Hexagons showing images"
          className="absolute bottom-[19.8%] left-[8.3%] w-[36.1%] h-auto"
        />
        <img
          src="/assets/info/zepplins.svg"
          alt="Proppoler Zepplins"
          className="absolute bottom-[2%] left-[64.6%] w-[22.7%] h-auto"
        />
        {/* EXAMPLE ONLY */}
        <img
          src="/assets/info/info-numbers.svg"
          alt="Impressive nubmers"
          className="absolute bottom-[52%] left-[21.7%] w-[63.125%] h-auto"
        />
      </div>

      {/* Sponsors - EXAMPLE ONLY*/}
      <div className="sponsors relative flex overflow-hidden min-h-[624px] md:min-h-[1355px] aspect-[1920/1355]">
        <h1 className="text-white text-5xl font-bold">Sponsors</h1>
        <img
          src="/assets/sponsors-assets/sponsors-example.svg"
          alt="Sponsors"
          className="absolute bottom-[19.3%] left-[21.2%] w-[57.8%] h-auto"
        />
        <img
          src="/assets/sponsors-assets/zepplin.svg"
          alt="Zepplin"
          className="absolute bottom-[0%] left-[-2.7%] w-[23.7%] h-auto"
        />
      </div>

      {/* Partners */}
      <div className="partners relative flex overflow-hidden min-h-[657px] md:min-h-[879px] aspect-[1920/879]">
        <h1 className="text-white text-5xl font-bold">Partners</h1>
        <img
          src="/assets/partners/partners-example.svg"
          alt="Partners"
          className="absolute bottom-[38%] left-[19.5%] w-[61.5%] h-auto"
        />
      
      </div>

      {/* FAQ */}
      <div className="faq relative flex overflow-hidden min-h-[570px] md:min-h-[1063px] aspect-[1920/1063]">
        <h1 className="text-white text-5xl font-bold">FAQ</h1>
        <img
          src="/assets/faq/text-example.svg"
          alt="FAQ"
          className="absolute bottom-[2%] left-[21%] w-[67.7%] h-auto"
        />
      </div>

      {/* History */}
      <div className="history relative flex overflow-hidden min-h-[1039px] md:min-h-[2679px] aspect-[1920/2679]">
        <h1 className="text-white text-5xl font-bold">History</h1>
        <img
          src="/assets/history/left-branch.svg"
          alt="Branches"
          className="absolute bottom-[70.9%] left-[-2.7%] w-[36.5%] h-auto"
        />
         <img
          src="/assets/history/right-branch.svg"
          alt="Branches"
          className="absolute bottom-[65.4%] left-[72.9%] w-[30.2%] h-auto"
        />
        <img
          src="/assets/history/hill.svg"
          alt="Hill"
          className="absolute bottom-[11.5%] left-[-0.5%] w-[103.75%] max-w-none h-auto z-1"
        />
        <img
          src="/assets/history/grass.svg"
          alt="Branches"
          className="absolute bottom-[50%] left-[-7%] w-[112%] max-w-none h-auto z-2"
        />
        <img
          src="/assets/history/bushes.svg"
          alt="Bushes"
          className="absolute bottom-[6.6%] left-[-7%] w-[112%] max-w-none h-auto z-2"
        />
        <img
          src="/assets/history/tree1.svg"
          alt="Tree"
          className="absolute bottom-[52%] left-[14.1%] w-[19.6%] h-auto"
        />
        <img
          src="/assets/history/tree2.svg"
          alt="Tree"
          className="absolute bottom-[54.2%] left-[16.7%] w-[38.75%] h-auto z-1"
        />
        <img
          src="/assets/history/tree3.svg"
          alt="Tree"
          className="absolute bottom-[51.8%] left-[35.8%] w-[29.1%] h-auto z-3"
        />
         <img
          src="/assets/history/tree4.svg"
          alt="Tree"
          className="absolute bottom-[53.6%] left-[54.375%] w-[23.125%] h-auto z-1"
        />
        <img
          src="/assets/history/tree5.svg"
          alt="Tree"
          className="absolute bottom-[52.4%] left-[63.6%] w-[21.8%] h-auto"
        />
      </div>

      {/* Guilds */}
      <div className="guilds relative flex overflow-hidden min-h-[877px] md:min-h-[1055px] aspect-[1920/1055]">
        <h1 className="text-white text-5xl font-bold">Guilds</h1>
        <img
          src="/assets/guilds/guilds-example.svg"
          alt="Guild logos"
          className="absolute bottom-[23.5%] left-[18.75%] w-[62.3%] h-auto"
        />
      </div>

      {/* Schedule */}
      <div className="schedule relative flex overflow-hidden min-h-[947px] md:min-h-[1356px] aspect-[1920/1356]">
        <h1 className="text-white text-5xl font-bold">Schedule</h1>
        <img
          src="/assets/schedule/schedule-example.svg"
          alt="Schedule"
          className="absolute bottom-[22.2%] left-[14.1%] w-[73.6%] h-auto"
        />
      </div>

      {/* Past Projects */}
      <div className="past-projects relative flex overflow-hidden min-h-[523px] md:min-h-[1321px] aspect-[1920/1321]">
        <h1 className="text-white text-5xl font-bold">Past Projects</h1>
        <img
          src="/assets/past-projects/past-projects-example.svg"
          alt="Schedule"
          className="absolute bottom-[18.4%] left-[9.5%] w-[79.2%] h-auto"
        />
      </div>

      {/* Meet the Team */}
      <div className="meet-team relative flex overflow-hidden min-h-[442px] md:min-h-[1094px] aspect-[1920/1094]">
        <h1 className="text-white text-5xl font-bold">Meet the Team</h1>
        <img
          src="/assets/meet-the-team/team-example.svg"
          alt="Team"
          className="absolute bottom-[69.2%] left-[-77.6%] w-[243%] max-w-none h-auto"
        />
        <img
          src="/assets/meet-the-team/descriptor-left-example.svg"
          alt="Descriptor"
          className="absolute bottom-[44.1%] left-[12.2%] w-[30.2%] h-auto"
        />
        <img
          src="/assets/meet-the-team/descriptor-right-example.svg"
          alt="Descriptor"
          className="absolute bottom-[44.1%] left-[56.7%] w-[30.2%] h-auto"
        />
      </div>

      {/* Medium */}
      <div className="medium relative flex overflow-hidden min-h-[620px] md:min-h-[1284px] aspect-[1920/1284]">
        <h1 className="text-white text-5xl font-bold">Medium</h1>
        <img
          src="/assets/medium/medium-example.svg"
          alt="Medium"
          className="absolute bottom-[36.6%] left-[13.9%] w-[79.8%] h-auto"
        />
        <img
          src="/assets/medium/cloud.svg"
          alt="Cloud"
          className="absolute top-[18.9%] left-[-11.5%] w-[139.3%] max-w-none h-auto rotate-[18.11deg]"
        />
      </div>

      {/* Footer */}
      <div className="footer flex items-start justify-center">
        <h1 className="text-white text-5xl font-bold">Footer</h1>
      </div>
    </main>
  );
}
