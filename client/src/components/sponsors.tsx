import * as React from "react"
import {type Sponsor} from "@/config/sponsors"

import Image from "next/image"
import { SectionHeader } from "./section-header"

const tierTiles: Record<Sponsor["tier"], React.FC<Omit<React.ComponentProps<typeof Image>, "src" | "alt" >>> = {
  platinum: (props) => (
    <Image
      src="/assets/sponsors/tiles/platinum.svg"
      alt="platinum sponsor tile"
      width={400}
      height={432}
      {...props}
    />
  ),
  gold: (props) => (
    <Image
      src="/assets/sponsors/tiles/gold.svg"
      alt="gold sponsor tile"
      width={271}
      height={312}
      {...props}
    />
  ),
  silver: (props) => (
    <Image
      src="/assets/sponsors/tiles/silver.svg"
      alt="silver sponsor tile"
      width={194}
      height={224}
      {...props}
    />
  ),
  partner: () => undefined
}

export function Sponsors() {
  return (
    <>
      <div className="sponsors flex items-start justify-center">
        <SectionHeader className="mb-4">Sponsors</SectionHeader>
      </div>

      <div className="partners flex items-start justify-center">
        <SectionHeader className="mb-4">Partners</SectionHeader>
      </div>
    </>
  )
}
