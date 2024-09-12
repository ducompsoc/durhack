import Link from "next/link";
import { Facebook, Instagram, LinkedIn, TikTok, X } from "../../public/icon/social";

export function Footer() {
  return (
    <footer >
      <p className="text-center text-lg sm:text-1xl md:text-2xl lg:text-4xl pb-6"><a href="mailto:hello@durhack.com">hello@durhack.com</a></p>
      <div className="flex justify-center w-full max-w-screen-lg mx-auto gap-x-6 pb-20">
        <Instagram className="w-[8%] max-w-[55px] h-auto object-cover" />
        <Facebook className="w-[8%] max-w-[55px] h-auto object-cover" />
        <TikTok className="w-[8%] max-w-[55px] h-auto object-cover" />
        <LinkedIn className="w-[8%] max-w-[55px] h-auto object-cover" />
        <X className="w-[8%] max-w-[55px] h-auto object-cover" />
      </div>
      <div className="text-center justify-center pb-24 w-screen px-8 sm:px-16 md:px-24 lg:px-20 xl:34">
        <div className="flex flex-col w-fill">
          <p className="text-xs text-start sm:text-sm md:text-md lg:text-lg xl:text-xl">
            DurHack follows the{' '}
            <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" className="underline" target="_blank" rel="noopener noreferrer">
              MLH Code of Conduct
            </a>
            . Photos and videos taken at events in 2019 and 2022.
            <br />
            <br />
            DurHack is an event hosted by Durham University Computing Society (
            <a href="https://compsoc.tech" className="underline" target="_blank" rel="noopener noreferrer">compsoc.tech</a>
            ), which is a student society affiliated with Durham Students' Union (
            <a href="https://durhamsu.com" className="underline" target="_blank" rel="noopener noreferrer">
              durhamsu.com
            </a>
            ). Durham Students' Union is registered in England as a company limited by guarantee (07689815) and a charity
            (1145400), with VAT number 119733690 and registered office Dunelm House, New Elvet, Durham DH1 3AN.
          </p>
        </div>
      </div>
    </footer>
  )
}
