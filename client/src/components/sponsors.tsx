import * as React from "react"
import Image from "next/image"

import {
  type Sponsor,
  type Partner,
  platinumSponsors,
  goldSponsors,
  silverSponsors,
  activePartners,
} from "@/config/sponsors"
import { SectionHeader } from "@/components/section-header"

const sponsorScale = 0.581
const tierWidths = {
  platinum: 200,
  gold: 150,
  silver: 100,
}

const tierTiles: Record<Sponsor["tier"], React.FC<Omit<React.ComponentProps<typeof Image>, "src" | "alt">>> = {
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
}

const partnerScale = 0.75
const partnerWidth = 200

type SponsorProps = {
  sponsor: Sponsor
  renderTierTitle?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function SponsorContent({ sponsor }: { sponsor: Sponsor }) {
  const TierTile = tierTiles[sponsor.tier]
  const SponsorImage = sponsor.image
  return <>
    <a
      href={sponsor.link}
      target="_blank"
      style={{
        width: `${Math.round(tierWidths[sponsor.tier] * 1.1)}px`,
        height: `${Math.round(tierWidths[sponsor.tier] * 1.3)}px`,
      }}
      className="relative flex flex-col items-center justify-center border-b-0 m-[10px] mx-[5px]"
      rel="noreferrer"
    >
      <SponsorImage
        style={{
          width: `${Math.round(tierWidths[sponsor.tier] * sponsorScale)}px`,
          maxHeight: `${Math.round(tierWidths[sponsor.tier] * sponsorScale)}px`,
        }}
        className="relative z-40"
      />
      <TierTile
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
  if (partner.image == null) return null
  const PartnerImage = partner.image

  return (
    <div className="sponsor biggest" {...props}>
      <a
        href={partner.link}
        target="_blank"
        style={{
          width: `${partnerWidth}px`,
          height: `${partnerWidth / 2}px`
        }}
        className="relative flex flex-col items-center justify-center"
        rel="noreferrer"
      >
        <PartnerImage
          style={{
            width: `${Math.round(partnerWidth * partnerScale)}px`,
            maxHeight: `${Math.round(partnerWidth * partnerScale / 2)}px`,
          }}
          className="relative z-40"
        />
        <Image
          src={`/assets/sponsors/tiles/partner.svg`}
          alt="partner tile"
          width={240}
          height={98}
          className="absolute z-30"
        />
      </a>
    </div>
  )
}

export function Sponsors() {
  return (
    <div className="max-w-[60rem] m-auto">
      <SectionHeader className="mb-4">Sponsors</SectionHeader>

      <div>
        <div className="platinum flex flex-wrap justify-center gap-6">
          {platinumSponsors.map((sponsor, index) => (
            <PlatinumSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0}/>
          ))}
        </div>
      </div>

      <div>
        <div className="platinum flex flex-wrap justify-center gap-6">
          {goldSponsors.map((sponsor, index) => (
            <GoldSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0}/>
          ))}
        </div>
      </div>

      <div>
        <div className="platinum flex flex-wrap justify-center gap-6">
          {silverSponsors.map((sponsor, index) => (
            <SilverSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0}/>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader className="mb-4">Partners</SectionHeader>

        <div className="partners flex flex-wrap justify-evenly">
          {activePartners.map((partner) => (
            <Partner key={partner.slug} partner={partner}/>
          ))}
        </div>
      </div>
    </div>
  )
}
