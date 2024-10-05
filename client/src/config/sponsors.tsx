import * as React from "react"
import Image from "next/image"

export type Sponsor = {
  slug: string,
  image: React.FC<React.HTMLAttributes<HTMLElement>>,
  link: string,
  tier: "platinum" | "gold" | "silver"
  signed: boolean
}

export const sponsors: Sponsor[] = [
  {
    slug: "tekgem",
    image: (props) => (
      <Image
        src="/assets/sponsors/tekgem-portrait-for-white-background.svg"
        alt="TekGem"
        width={119.96}
        height={145.56}
        {...props}
      />
    ),
    link: "https://www.tekgem.co.uk/",
    tier: "silver",
    signed: true,
  },
  {
    slug: "marshall-wace",
    image: (props) => (
      <Image
        src="/assets/sponsors/marshall-wace.svg"
        alt="Marshall Wace"
        width={1070}
        height={389}
        {...props}
      />
    ),
    link: "https://www.mwam.com/",
    tier: "platinum",
    signed: false,
  },
  {
    slug: "rewriting-the-code",
    image: (props) => (
      <Image
        src="/assets/sponsors/rewriting-the-code.svg"
        alt="Rewriting the Code"
        width={240}
        height={217.567}
        {...props}
      />
    ),
    link: "https://rewritingthecode.org/",
    tier: "gold",
    signed: true,
  },
  {
    slug: "waterstons",
    image: (props) => (
      <Image
        src="/assets/sponsors/waterstons.svg"
        alt="Waterstons"
        width={567.04}
        height={311.04}
        {...props}
      />
    ),
    link: "https://waterstons.com/",
    tier: "gold",
    signed: true,
  },
  {
    slug: "qube-research-and-tech",
    image: (props) => (
      <Image
        src="/assets/sponsors/qrt-stacked-for-white-background.svg"
        alt="Qube Research & Technologies"
        width={290}
        height={331.92}
        {...props}
      />
    ),
    link: "https://www.qube-rt.com/",
    tier: "platinum",
    signed: true,
  },
  {
    slug: "assured-data-protection",
    image: (props) => (
      <Image
        src="/assets/sponsors/assured-data-protection.svg"
        alt="Assured Data Protection"
        width={1800}
        height={600}
        {...props}
      />
    ),
    link: "https://assured-dp.com/",
    tier: "silver",
    signed: false,
  },
  {
    slug: "accenture",
    image: (props) => (
      <Image
        src="/assets/sponsors/accenture.svg"
        alt="Accenture"
        width={0}
        height={0}
        {...props}
      />
    ),
    link: "https://www.accenture.com/gb-en",
    tier: "gold",
    signed: false,
  },
  {
    slug: "atom-bank",
    image: (props) => (
      <Image
        src="/assets/sponsors/atom-bank.svg"
        alt="Atom Bank"
        width={599.96}
        height={243.2}
        {...props}
      />
    ),
    link: "https://www.atombank.co.uk/",
    tier: "platinum",
    signed: false,
  }
]

export const signedSponsors = sponsors.filter((sponsor) => sponsor.signed)

export const platinumSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "platinum")
export const goldSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "gold")
export const silverSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "silver")

export type Partner = {
  slug: string,
  image: React.FC<React.HTMLAttributes<HTMLElement>>,
  link: string,
}

export const partners: Partner[] = []
