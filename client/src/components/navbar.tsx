import Image from "next/image"
import * as React from "react"

import { audiowide } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"
import "@/styles/navbar.css"

export function Navbar() {
  return (
    <nav className={cn(audiowide.className, "hidden md:flex px-16 py-5 mx-auto relative")}>
      <a href="#splash" className="flex pr-32 space-x-4 hover:cursor-pointer absolute">
        <Image
          src="/assets/branding/durhack-2024-mark.svg"
          width={290}
          height={402}
          alt="DurHack 2024"
          className="w-16 h-16"
        />
        <div className="text-2xl pt-3.5 hidden xl:block uppercase" id="title">
          DurHack
        </div>
      </a>

      <ul className="flex py-5 pl-16 space-x-8 lg:space-x-16 mx-auto *:uppercase">
        <li>
          <a href="#splash">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#faqs">FAQs</a>
        </li>
        <li>
          <a href="#sponsors">Sponsors</a>
        </li>
        <li>
          <a href="#gallery">Gallery</a>
        </li>
        <li className="hidden">
          <a href="#end">Team</a>
        </li>
      </ul>
    </nav>
  )
}
