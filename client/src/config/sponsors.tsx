import { OrganisationSlug } from "@/config/organisations"

export type Sponsor = {
  organisationSlug: OrganisationSlug
  tier: "platinum" | "gold" | "silver" | "partner"
  active: boolean
}

export const sponsors: Sponsor[] = [
  {
    organisationSlug: "tekgem",
    tier: "silver",
    active: true,
  },
  {
    organisationSlug: "marshall-wace",
    tier: "platinum",
    active: true,
  },
  {
    organisationSlug: "rewriting-the-code",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "waterstons",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "qube-research-and-tech",
    tier: "platinum",
    active: true,
  },
  {
    organisationSlug: "assured-data-protection",
    tier: "silver",
    active: true,
  },
  {
    organisationSlug: "accenture",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "atom-bank",
    tier: "platinum",
    active: true,
  },
  {
    organisationSlug: "durham-uni-venture-lab",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "major-league-hacking",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-computing-society",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "overleaf",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "keyboard-co",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "rs-group",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "pragmatic-semi",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-computer-science",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "stand-out-stickers",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-esports-and-gaming",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-student-union",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-county-council",
    tier: "partner",
    active: false,
  },
  {
    organisationSlug: "intel",
    tier: "partner",
    active: false,
  },
  {
    organisationSlug: "hackathons-uk",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "amazon-web-services",
    tier: "partner",
    active: false,
  },
  {
    organisationSlug: "github",
    tier: "partner",
    active: false,
  },
  {
    organisationSlug: "barclays",
    tier: "partner",
    active: false,
  },
  {
    organisationSlug: "netcraft",
    tier: "partner",
    active: false,
  },
]

export const signedSponsors = sponsors.filter((sponsor) => sponsor.active)

export const platinumSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "platinum")
export const goldSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "gold")
export const silverSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "silver")
export const partners = signedSponsors.filter((sponsor) => sponsor.tier === "partner")
