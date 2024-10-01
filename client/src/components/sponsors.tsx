import * as React from "react"
import Image from "next/image"

import {
  type Sponsor,
  type Partner,
  platinumSponsors,
  goldSponsors,
  silverSponsors,
  partners,
} from "@/config/sponsors"
import { SectionHeader } from "@/components/section-header"

const sponsorScale = 0.7
const tierWidths = {
  platinum: 200,
  gold: 150,
  silver: 100,
}

const partnerScale = 0.75
const partnerWidth = 200

type SponsorProps = {
  sponsor: Sponsor
  renderTierTitle?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function SponsorContent({ sponsor }: { sponsor: Sponsor }) {
  return <>
    <a
      href={sponsor.link}
      target="_blank"
      style={{
        width: `${Math.round(tierWidths[sponsor.tier] * 1.1)}px`,
        height: `${Math.round(tierWidths[sponsor.tier] * 1.3)}px`,
      }}
      className={"relative flex flex-col items-center justify-center border-b-0 m-[10px] mx-[5px]"}
      rel="noreferrer"
    >
      <Image
        src={`/assets/sponsors/${sponsor.image}`}
        alt="logo"
        style={{
          width: `${Math.round((tierWidths[sponsor.tier] * 0.83) * sponsorScale)}px`,
          maxHeight: `${Math.round((tierWidths[sponsor.tier] * 0.83) * sponsorScale)}px`,
        }}
        className="relative z-40"
      />
      <Image
        src={`/assets/sponsors/tiles/${sponsor.tier}.svg`}
        alt="platinum sponsor tile"
        style={{
          width: `${tierWidths[sponsor.tier]}px`,
          height: "auto",
        }}
        className="absolute z-30"
      />
    </a>
  </>
}

function PlatinumSponsor({sponsor, renderTierTitle = false, ...props}: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p
            className="bg-platinumGradient uppercase text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] translate-x-2 translate-y-6 absolute">
            Platinum
          </p>
        </div>
      )}
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

function GoldSponsor({sponsor, renderTierTitle = false, ...props}: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p
            className="bg-goldGradient uppercase text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] translate-x-3 translate-y-3 absolute">
            Gold
          </p>
        </div>
      )}
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

function SilverSponsor({sponsor, renderTierTitle = false, ...props}: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p
            className="bg-silverGradient uppercase text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] -translate-x-1.5 absolute">
            Silver
          </p>
        </div>
      )}
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

type PartnerProps = {
  partner: Partner
} & React.HTMLAttributes<HTMLDivElement>

function Partner({partner, ...props}: PartnerProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      <a
        href={partner.link}
        target="_blank"
        style={{
          width: `${partnerWidth}px`,
          height: `${Math.round(partnerWidth * partnerScale)}px`
        }}
        className={"relative flex flex-col items-center justify-center border-b-0 m-[10px] mx-[5px]"}
        rel="noreferrer"
      >
        <img
          src={`/assets/sponsors/${partner.image}`}
          alt="logo"
          style={{
            width: `${Math.round(partnerWidth * partnerScale)}px`,
            maxHeight: `${Math.round(partnerWidth * partnerScale)}px`
          }}
          className="relative z-40"
        />
        <img
          src={`/assets/sponsors/tiles/partner.svg`}
          alt="logo"
          style={{
            width: `${partnerWidth}px`,
            height: `${partnerWidth}px`
          }}
          className="absolute z-30"
        />
      </a>
    </div>
  )
}

export default function Sponsors() {
  return (
    <section className="section sponsors">
      <div>
        <SectionHeader>Sponsors</SectionHeader>

        <div className="text-center">
          <div className="platinum flex flex-wrap justify-center gap-6">
            {platinumSponsors.map((sponsor, index) => (
              <PlatinumSponsor sponsor={sponsor} renderTierTitle={index === 0}/>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="platinum flex flex-wrap justify-center gap-6">
            {goldSponsors.map((sponsor, index) => (
              <GoldSponsor sponsor={sponsor} renderTierTitle={index === 0}/>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="platinum flex flex-wrap justify-center gap-6">
            {silverSponsors.map((sponsor, index) => (
              <SilverSponsor sponsor={sponsor} renderTierTitle={index === 0}/>
            ))}
          </div>
        </div>

        <div className="text-center">
          <SectionHeader>Partners</SectionHeader>

          <div className="platinum flex flex-wrap justify-center gap-6">
            {partners.map((partner) => (
              <Partner partner={partner}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
