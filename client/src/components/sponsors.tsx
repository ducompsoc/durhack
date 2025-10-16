import Image from "next/image"
import type * as React from "react"

import { getOrganisationBySlug } from "@/config/organisations"
import { goldSponsors, partners, platinumSponsors, type Sponsor, silverSponsors } from "@/config/sponsors"
import { darkerGrotesk } from "@/lib/google-fonts"
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

type SponsorType = "Platinum" | "Gold" | "Silver" | "Partner"

type SponsorProps = {
  sponsor: Sponsor
} & React.HTMLAttributes<HTMLDivElement>

type SponsorSectionProps = {
  sponsorType: SponsorType
  sponsors: Sponsor[]
} & React.HTMLAttributes<HTMLDivElement>

const tierWidths = {
  platinum: 360,
  gold: 150,
  silver: 100,
  partner: 0,
}

const sponsorScale = 0.581

function FoundingSponsorFlag({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-3xl bg-gradient-to-t from-50% from-[#A3C97D] to-100% to-[#1E8456] size-full", className)}
      style={{ clipPath: "polygon(0 0, 50% 0, 0 50%)", ...style }}
      {...props}
    >
      <span
        className={cn(
          "absolute top-3 -left-1 -rotate-45 w-16 text-white text-xs text-center uppercase font-extrabold",
          darkerGrotesk.className,
        )}
      >
        Founding Sponsor
      </span>
    </div>
  )
}

function SponsorContent({ sponsor }: { sponsor: Sponsor }) {
  const organisation = getOrganisationBySlug(sponsor.organisationSlug)
  const TierTile = tierTiles[sponsor.tier]
  const SponsorImage = organisation.image
  return (
    <>
      <a
        href={organisation.link}
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
        {sponsor.founding && <FoundingSponsorFlag className="absolute top-1 left-2 z-50" />}
      </a>
    </>
  )
}

function SponsorBox({ sponsor, ...props }: SponsorProps) {
  return (
    <div className="sponsor biggest m-2" {...props}>
      <SponsorContent sponsor={sponsor} />
    </div>
  )
}

function SponsorSection({ sponsors, ...props }: SponsorSectionProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {sponsors.map((sponsor) => (
        <SponsorBox key={sponsor.organisationSlug} sponsor={sponsor} {...props} />
      ))}
    </div>
  )
}

type PartnerProps = {
  partner: Sponsor
} & React.HTMLAttributes<HTMLDivElement>

const partnerWidth = 150
const partnerScale = 0.6

function PartnerBox({ partner, ...props }: PartnerProps) {
  const organisation = getOrganisationBySlug(partner.organisationSlug)
  if (organisation.image === null) return null
  const PartnerImage = organisation.image

  return (
    <div className="sponsor biggest" {...props}>
      <a
        href={organisation.link}
        target="_blank"
        className="relative flex flex-col items-center justify-center"
        rel="noreferrer"
        style={{ width: `${partnerWidth}px`, height: `${partnerWidth}px` }}
      >
        <PartnerImage
          className="relative -top-0.5 z-40"
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

export function Sponsors({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("sponsors flex relative items-start justify-center z-10", className)} {...props}>
      <div className="flex-row">
        <SectionHeader className="mb-4">Sponsors</SectionHeader>
        {/* hidden bc covering sponsors */}
        <Image
          src="/assets/blimp1.svg"
          alt="blimp"
          className={cn("absolute right-0 bottom-3/5 hidden")}
          width="679"
          height="902"
        />
        <SponsorSection sponsorType="Platinum" sponsors={platinumSponsors} />
        <SponsorSection sponsorType="Gold" sponsors={goldSponsors} />
        <SponsorSection sponsorType="Silver" sponsors={silverSponsors} />
      </div>
    </div>
  )
}

export function Partners({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("partners relative flex items-start justify-center z-10", className)} {...props}>
      <div className="flex-row">
        <SectionHeader className="mb-4">Partners</SectionHeader>
        {/* hidden bc covering sponsors */}
        <Image
          src="/assets/blimp2.svg"
          alt="blimp"
          className={cn("absolute left-0 bottom-1/5 hidden")}
          width="408"
          height="1072"
        />

        <div className="w-full flex justify-center">
          <div className="flex flex-wrap justify-evenly lg:w-2/4">
            {partners.map((partner) => (
              <PartnerBox key={partner.organisationSlug} partner={partner} className={cn("m-2")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
