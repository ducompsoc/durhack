import Link from "next/link"
import { CloudsFooterGraphic } from "./graphics/clouds-footer"
import { cn } from "@/lib/utils"
import Image from "next/image";
import { patrickHand, spaceGrotesk } from "@/lib/google-fonts"
import { siteConfig } from "@/config/site";

function SocialsBar() {
  return (
    <div className="flex gap-1 sm:gap-1 md:gap-1 items-center justify-center mt-4">
      {siteConfig.socials.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 sm:p-2 md:p-3 rounded-full"
          >
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#006793]" />
          </Link>
        );
      })}
    </div>
  );
}

export function Footer ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const mlhCodeOfConduct = (
    <Link className="underline text-[#3CA3BC]" href="https://mlh.io/code-of-conduct">
      MLH Code of Conduct
    </Link>
  )
  const CompSoc = (
    <Link className="underline text-[#3CA3BC]" href="https://compsoc.tech">
      compsoc.tech
    </Link>
  )
  const StudentUnion = (
    <Link className="underline text-[#3CA3BC]" href="https://durhamsu.com">
      durhamsu.com
    </Link>
  )
  return (
    <div
      className={cn(
        "footer h-[calc(50rem+30vw)] sm:h-200 md:h-200 lg:h-200 xl:h-210 2xl:h-230 relative flex items-start justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="absolute h-full hidden 2xl:contents 2xl:w-full top-10">
        <CloudsFooterGraphic className="absolute bottom-[-20%] w-full" />
      </div>

      <div className="absolute left-[-5%] left-[0%] top-[180%] w-[140%]">
        <CloudsFooterGraphic className="absolute left-[-5%] bottom-0 w-full" />
      </div>

      <div className="relative z-10 rounded-3xl w-[90%] h-[90%] translate-y-32 flex flex-col items-center px-8 py-12 sm:py-16" style={{ backgroundColor: "#DCF4FF" }}>
        
        <div>
          <Image
            src="/assets/graphics/DurhackLogo.svg"
            alt="Durhack Logo"
            width={416}
            height={115}
            className="absolute left-[10%] top-[20%] w-1/4 max-w-150"
          />

          <div className="absolute items-center text-center right-[10%] top-[10%] max-w-250">
            <h2 className={cn(
              patrickHand.className,
              "section-header text-[#006793] uppercase text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold w-fit",
              className,
            )} style={{ color: "#006793" }}>CONTACT US!</h2>
            <br></br>
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ color: "#006793" }}>hello@durhack.com</h1>
            <div>
              <SocialsBar />
            </div>
          </div>
        </div>
        <div className="w-3/4 h-[1px] bg-gray-300 mt-65"></div>
          <div className="relative items-center text-center bottom-[-10%]">
            <p className={cn(
              spaceGrotesk.className,
              "text-[#006793] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal px-6",
            )}>
              DurHack follows the {mlhCodeOfConduct}. Photos and videos taken at events in 2024.
            </p>
            <br></br>
            <p className={cn(
              spaceGrotesk.className,
              "text-[#006793] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal px-6",
            )}>
              DurHack is an event hosted by Durham University Computing Society ({CompSoc}), which is a student society affiliated with Durham Students' Union ({StudentUnion}). Durham Students' Union is registered in England as a company limited by guarantee (07689815) and a charity (1145400), with VAT number 119733690 and registered office Dunelm House, New Elvet, Durham DH1 3AN.
            </p>
        </div>
      
      </div>
    </div>
  )
}

/**
 * DurHack follows the __MLH Code of Conduct__. Photos and videos taken at events in 2024 .
 *
 * DurHack is an event hosted by Durham University Computing Society (__compsoc.tech__), which is a student society affiliated with Durham Students' Union (__durhamsu.com__). Durham Students' Union is registered in England as a company limited by guarantee (07689815) and a charity (1145400), with VAT number 119733690 and registered office Dunelm House, New Elvet, Durham DH1 3AN.
 */
