import Image from "next/image"
import type * as React from "react"
import { goldSponsors, platinumSponsors, type Sponsor } from "@/config/sponsors"
import { SectionHeader } from "./section-header"

const tierTiles: Record<Sponsor["tier"], React.FC<Omit<React.ComponentProps<typeof Image>, "src" | "alt">>> = {
  platinum: (props) => (
    <Image src="/assets/sponsors/tiles/platinum.svg" alt="platinum sponsor tile" width={400} height={432} {...props} />
  ),
  gold: (props) => (
    <Image src="/assets/sponsors/tiles/gold.svg" alt="gold sponsor tile" width={271} height={312} {...props} />
  ),
  silver: (props) => (
    <Image src="/assets/sponsors/tiles/silver.svg" alt="silver sponsor tile" width={194} height={224} {...props} />
  ),
  partner: () => undefined,
}

type SponsorProps = {
  sponsor: Sponsor
  renderTierTitle?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const tierWidths = {
  platinum: 200,
  gold: 150,
  silver: 100,
  partner: 0,
}

const sponsorScale = 0.581

function SponsorContent({ sponsor }: { sponsor: Sponsor }) {
  const TierTile = tierTiles[sponsor.tier]
  const SponsorImage = sponsor.image
  return (
    <>
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
            height: `${Math.round(tierWidths[sponsor.tier] * sponsorScale)}px`,
          }}
          className="relative z-40"
        />
        <TierTile
          style={{
            width: `${Math.round(tierWidths[sponsor.tier])}px`,
            height: "auto",
          }}
          className="absolute z-30"
        />
      </a>
    </>
  )
}

function PlatinumSponsor({ sponsor, renderTierTitle = false, ...props }: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p className="bg-platinumGradient uppercase text-transparent bg-clip-text font-bold text-[20px] absolute">
            Platinum
          </p>
        </div>
      )}
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

function GoldSponsor({ sponsor, renderTierTitle = false, ...props }: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p className="bg-goldGradient uppercase text-transparent bg-clip-text font-bold text-[20px] absolute">Gold</p>
        </div>
      )}
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

export function Sponsors() {
  return (
    <>
      <div className="sponsors flex items-start justify-center">
        <div className="flex-row">
          <SectionHeader className="mb-4">Sponsors</SectionHeader>

          <div className="platinum flex flex-wrap justify-center gap-6">
            {platinumSponsors.map((sponsor, index) => (
              <PlatinumSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0} />
            ))}
          </div>

          <div className="gold flex flex-wrap justify-center gap-6">
            {goldSponsors.map((sponsor, index) => (
              <PlatinumSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0} />
            ))}
          </div>
        </div>
      </div>

      <div className="partners flex items-start justify-center">
        <SectionHeader className="mb-4">Partners</SectionHeader>
      </div>
    </>
  )
}
