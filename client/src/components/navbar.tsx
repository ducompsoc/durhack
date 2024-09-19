import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/google-fonts"

export default function Navbar() {
  return (
    <nav className={cn(audiowide.className, "hidden md:flex px-16 py-5 mx-auto relative")}>
      <a href="/" className="flex pr-32 space-x-4 hover:cursor-pointer absolute">
        <img src="/assets/icons/logo.svg" className="w-16 h-16" />
        <div className="text-2xl pt-3.5 hidden xl:block uppercase" id="title">
          DurHack
        </div>
      </a>

      <ul className="flex py-5 pl-16 space-x-8 lg:space-x-16 mx-auto *:uppercase">
        <li>Home</li>
        <li>About</li>
        <li>FAQs</li>
        <li>Sponsors</li>
        <li>Schedule</li>
        <li>Team</li>
      </ul>
    </nav>
  )
}
