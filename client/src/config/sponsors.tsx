import * as React from "react"
import Image from "next/image"

export type Sponsor = {
  slug: string,
  image: React.FC<React.HTMLAttributes<HTMLElement>>,
  link: string,
  tier: "platinum" | "gold" | "silver" | "partner"
  active: boolean
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
  },
  {
    slug: "accenture",
    image: (props) => (
      <Image
        src="/assets/sponsors/accenture.svg"
        alt="Accenture"
        width={909}
        height={240}
        {...props}
      />
    ),
    link: "https://www.accenture.com/gb-en",
    tier: "gold",
    active: true,
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
    active: true,
  },
  {
    slug: "durham-uni-venture-lab",
    image: (props) => (
      <Image
        src="/assets/sponsors/venture-lab.svg"
        alt="Durham University Venture Lab"
        width={120}
        height={120}
        {...props}
      />
    ),
    link: "https://www.durham.ac.uk/venturelab",
    tier: "gold",
    active: true,
  },
  {
    slug: "major-league-hacking",
    image: (props) => (
      <Image
        src="/assets/sponsors/mlh-logo-color.svg"
        alt="Major League Hacking"
        width={310.59}
        height={130.78}
        {...props}
      />
    ),
    link: "https://mlh.io/",
    tier: "partner",
    active: true,
  },
  {
    slug: "durham-uni-computing-society",
    image: (props) => (
      <Image
        src="/assets/sponsors/compsoc-v5-with-text.svg"
        alt="Durham University Computing Society"
        width={534.81}
        height={169.33}
        {...props}
      />
    ),
    link: "https://compsoc.tech",
    tier: "partner",
    active: true,
  },
  {
    slug: "overleaf",
    image: (props) => (
      <Image
        src="/assets/sponsors/overleaf.svg"
        alt="Overleaf"
        width={130}
        height={38}
        {...props}
      />
    ),
    link: "https://www.overleaf.com/",
    tier: "partner",
    active: true,
  },
  {
    slug: "keyboard-co",
    image: (props) => (
      <Image
        src="/assets/sponsors/keyboard-company.svg"
        alt="The Keyboard Company"
        width={566.9}
        height={198.4}
        {...props}
      />
    ),
    link: "https://www.keyboardco.com/",
    tier: "partner",
    active: true,
  },
  {
    slug: "rs-components",
    image: (props) => (
      <Image
        src="/assets/sponsors/rs-components.svg"
        alt="RS Components"
        width={24}
        height={24}
        {...props}
      />
    ),
    link: "https://uk.rs-online.com/web/",
    tier: "partner",
    active: true,
  },
  {
    slug: "pragmatic-semi",
    image: (props) => (
      <Image
        src="/assets/sponsors/pragmatic-semi.svg"
        alt="Pragmatic Semiconductor"
        width={703.7}
        height={258.4}
        {...props}
      />
    ),
    link: "https://www.pragmaticsemi.com/",
    tier: "partner",
    active: true,
  },
  {
    slug: "durham-uni-computer-science",
    image: (props) => (
      <Image
        src="/assets/sponsors/durham-uni.svg"
        alt="Durham University Computer Science"
        width={703.7}
        height={258.4}
        {...props}
      />
    ),
    link: "https://www.durham.ac.uk/departments/academic/computer-science/",
    tier: "partner",
    active: true,
  },
  {
    slug: "stand-out-stickers",
    image: (props) => (
      <Image
        src="/assets/sponsors/stand-out-stickers.svg"
        alt="StandOut Stickers"
        width={230}
        height={122.55}
        {...props}
      />
    ),
    link: "https://hackp.ac/mlh-standoutstickers-hackathons",
    tier: "partner",
    active: true,
  },
  {
    slug: "durham-uni-esports-and-gaming",
    image: (props) => (
      <Image
        src="/assets/sponsors/dueg.svg"
        alt="Durham University Esports & Gaming"
        width={24}
        height={24}
        {...props}
      />
    ),
    link: "https://www.durham.ac.uk/colleges-and-student-experience/enrichment-activities/esports/dueg-info-page/",
    tier: "partner",
    active: true,
  },
  {
    slug: "durham-uni-student-union",
    image: (props) => (
      <Image
        src="/assets/sponsors/durham-student-union.svg"
        alt="Durham Student Union"
        width={1920}
        height={1080}
        {...props}
      />
    ),
    link: "https://www.durhamsu.com/",
    tier: "partner",
    active: true,
  },
  {
    slug: "intel",
    image: (props) => (
      <Image
        src="/assets/sponsors/intel.svg"
        alt="Intel"
        width={395.4}
        height={155.9}
        {...props}
      />
    ),
    link: "https://www.intel.com",
    tier: "partner",
    active: true,
  },
  {
    slug: "hackathons-uk",
    image: (props) => (
      <Image
        src="/assets/sponsors/hackathonsuk.svg"
        alt="Hackathons UK"
        width={282.43}
        height={77.11}
        {...props}
      />
    ),
    link: "https://www.hackathons.org.uk/",
    tier: "partner",
    active: true,
  },
]

export const signedSponsors = sponsors.filter((sponsor) => sponsor.active)

export const platinumSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "platinum")
export const goldSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "gold")
export const silverSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "silver")

export type Partner = {
  slug: string,
  image: React.FC<React.HTMLAttributes<HTMLElement>> | null,
  link: string,
  active: boolean
}

export const partners: Partner[] = sponsors.filter((sponsor) => sponsor.tier === "partner")

export const activePartners = partners.filter(partner => partner.active)
