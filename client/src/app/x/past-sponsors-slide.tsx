import * as React from "react"

import "@/styles/durhack-x-past-sponsors-slide.css"

import { cn } from "@/lib/utils"
import { electrolize } from "@/lib/google-fonts"
import { sponsors } from "@/config/sponsors";

function SponsorCard({ sponsorSlug }: { sponsorSlug: string }): React.ReactNode {
  const sponsor = sponsors.find((sponsor) => sponsor.slug === sponsorSlug)
  if (!sponsor) return undefined
  const { image: SponsorImage } = sponsor
  return <div className="relative sponsor-card">
    <div className="absolute hexagon top-[5%] left-[5%] size-[90%] bg-white flex items-center justify-center">
      <SponsorImage className="max-h-[70%] max-w-[90%]" />
    </div>
  </div>
}

export function PastSponsorsSlide({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <article className={cn("absolute size-full flex flex-col space-y-1.5 items-center justify-center", className)} {...props}>
      <section className="flex flex-col space-y-1">
        <h1 className={cn(electrolize.className, "text-4xl")}>Past Sponsors</h1>
        <div className="hex-grid w-[20rem] lg:w-[55rem]">
          <SponsorCard sponsorSlug="amazon-web-services" />
          <SponsorCard sponsorSlug="waterstons" />
          <SponsorCard sponsorSlug="github" />
          <SponsorCard sponsorSlug="barclays" />
          <SponsorCard sponsorSlug="qube-research-and-tech" />
          <SponsorCard sponsorSlug="marshall-wace" />
          <SponsorCard sponsorSlug="netcraft" />
          <SponsorCard sponsorSlug="durham-county-council" />
          <SponsorCard sponsorSlug="accenture" />
          <SponsorCard sponsorSlug="atom-bank" />
        </div>
      </section>
    </article>
  )
}
