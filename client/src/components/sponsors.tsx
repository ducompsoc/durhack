import Image from "next/image"
import type * as React from "react"
import {
  activePartners,
  goldSponsors,
  type Partner,
  platinumSponsors,
  type Sponsor,
  silverSponsors,
} from "@/config/sponsors"
import { cn } from "@/lib/utils"
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
  platinum: 360,
  gold: 235,
  silver: 200,
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
          height: `${Math.round(tierWidths[sponsor.tier] * 1.1)}px`,
        }}
        className="relative flex flex-col items-center justify-center border-b-0"
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
    <div className="sponsor biggest m-2" {...props}>
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

function SilverSponsor({ sponsor, renderTierTitle = false, ...props }: SponsorProps) {
  return (
    <div className="sponsor biggest mb-5" {...props}>
      {renderTierTitle && (
        <div>
          <p className="bg-platinumGradient uppercase text-transparent bg-clip-text font-bold text-[20px] absolute">
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

const partnerWidth = 250
const partnerScale = 0.75

function Partner({ partner, ...props }: PartnerProps) {
  if (partner.image === null) return null
  const PartnerImage = partner.image

  return (
    <div className="sponsor biggest" {...props}>
      <a
        href={partner.link}
        target="_blank"
        className="relative flex flex-col items-center justify-center"
        rel="noreferrer"
        style={{ width: `${partnerWidth}px`, height: `${partnerWidth}px` }}
      >
        <PartnerImage
          className="relative z-40"
          style={{
            width: `${Math.round(partnerWidth * partnerScale)}px`,
            height: `${Math.round(partnerWidth * partnerScale)}px`,
          }}
        />
        <Image
          src={"/assets/sponsors/tiles/partner.svg"}
          alt="partner tile"
          width={240}
          height={240}
          className="absolute z-30"
        />
      </a>
    </div>
  )
}

export function Sponsors() {
  return (
    <>
      <div className="sponsors flex relative items-start justify-center">
        <div className="flex-row">
          <SectionHeader className="mb-4">Sponsors</SectionHeader>
          <Image
            src="/assets/blimp1.svg"
            alt="blimp"
            className={cn("absolute right-0 bottom-3/5 hidden lg:block")}
            width="679"
            height="902"
          />

          <div className="platinum flex flex-wrap justify-center">
            {platinumSponsors.map((sponsor, index) => (
              <PlatinumSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0} />
            ))}
          </div>
          <div className="gold flex flex-wrap justify-center gap-6">
            {goldSponsors.map((sponsor, index) => (
              <GoldSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0} />
            ))}
          </div>

          <div className="platinum flex flex-wrap justify-center gap-6">
            {silverSponsors.map((sponsor, index) => (
              <SilverSponsor key={sponsor.slug} sponsor={sponsor} renderTierTitle={index === 0} />
            ))}
          </div>
        </div>
      </div>

      <div className="partners relative flex items-start justify-center">
        <div className="flex-row">
          <SectionHeader className="mb-4">Partners</SectionHeader>
          <Image
            src="/assets/blimp2.svg"
            alt="blimp"
            className={cn("absolute left-0 bottom-1/5 hidden lg:block")}
            width="408"
            height="1072"
          />

          <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-evenly w-2/4">
              {activePartners.map((partner) => (
                <Partner key={partner.slug} partner={partner} className={cn("m-2")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
