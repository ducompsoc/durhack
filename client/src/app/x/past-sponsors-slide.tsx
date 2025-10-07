import type * as React from "react"

import { getOrganisationBySlug, type OrganisationSlug } from "@/config/organisations"
import { electrolize } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

function SponsorCard({ organisationSlug }: { organisationSlug: OrganisationSlug }): React.ReactNode {
  const organisation = getOrganisationBySlug(organisationSlug)
  const { image: SponsorImage } = organisation
  return (
    <div className="relative bg-linear from-[#EDDDFD] via-[#A7AFBD] to-[#E5EDFE]">
      <div className="absolute hexagon top-[5%] left-[5%] size-[90%] bg-white flex items-center justify-center">
        <SponsorImage className="max-h-[70%] max-w-[90%]" />
      </div>
    </div>
  )
}

export function PastSponsorsSlide({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <article
      className={cn("absolute size-full flex flex-col space-y-1.5 items-center justify-center", className)}
      {...props}
    >
      <section className="flex flex-col space-y-1">
        <h1 className={cn(electrolize.className, "text-4xl")}>Past Sponsors</h1>
        <div className="hex-grid w-[20rem] lg:w-220">
          {/*
          2025-06-24: On Safari, the `shape-outside` CSS property is ignored unless the target element
          has a sibling text element.
          Presumably, this is an optimisation mistake; `shape-outside` affects positioning of all sibling elements
          which are displayed in-line, i.e. `display: inline` or `display: inline-block`.
          Removing the following empty 'p' tag breaks the hex grid layout on Safari.
          */}
          <p />
          <SponsorCard organisationSlug="amazon-web-services" />
          <SponsorCard organisationSlug="waterstons" />
          <SponsorCard organisationSlug="github" />
          <SponsorCard organisationSlug="barclays" />
          <SponsorCard organisationSlug="qube-research-and-tech" />
          <SponsorCard organisationSlug="marshall-wace" />
          <SponsorCard organisationSlug="netcraft" />
          <SponsorCard organisationSlug="durham-county-council" />
          <SponsorCard organisationSlug="accenture" />
          <SponsorCard organisationSlug="atom-bank" />
        </div>
      </section>
    </article>
  )
}
