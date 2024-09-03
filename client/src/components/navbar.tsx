import { Audiowide } from "next/font/google"
import { cn } from "@/lib/utils";

const audiowide = Audiowide({ weight: "400",  subsets: ["latin"] });

export default function Navbar() {
    return (
        <nav className={cn(audiowide.className, "flex px-16 py-4 mx-auto relative")}>
            <div className="flex pl-8 pr-32 hover:cursor-pointer absolute">
                <div>Icon</div>
                <div className="text-2xl">DURHACK</div>
            </div>

            <ul className="flex py-4 space-x-16 mx-auto">
                <li>HOME</li>
                <li>ABOUT</li>
                <li>FAQs</li>
                <li>SPONSORS</li>
                <li>SCHEDULE</li>
                <li>TEAM</li>
            </ul>
        </nav>
    )
}