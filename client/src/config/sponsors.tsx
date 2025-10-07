import type { OrganisationSlug } from "@/config/organisations"

export type Sponsor = {
  organisationSlug: OrganisationSlug
  tier: "platinum" | "gold" | "silver" | "partner"
  founding?: true | null | undefined
  active: boolean
}

export const sponsors: Sponsor[] = [
  {
    organisationSlug: "marshall-wace",
    tier: "platinum",
    active: true,
  },
  {
    organisationSlug: "qube-research-and-tech",
    tier: "platinum",
    active: true,
  },
  {
    organisationSlug: "accenture",
    tier: "platinum",
    active: false,
  },
  {
    organisationSlug: "g-research",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "rs-group",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "neptune-north",
    tier: "gold",
    active: false,
  },
  {
    organisationSlug: "talkjs",
    tier: "gold",
    active: true,
  },
  {
    organisationSlug: "waterstons",
    tier: "gold",
    active: true,
    founding: true,
  },
  {
    organisationSlug: "newton-consulting",
    tier: "silver",
    active: true,
  },
  {
    organisationSlug: "overleaf",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "rewriting-the-code",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-venture-lab",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-computer-science",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "keyboard-co",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "major-league-hacking",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "hackathons-uk",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "durham-uni-computing-society",
    tier: "partner",
    active: true,
  },
  {
    organisationSlug: "ibm",
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

]

export const signedSponsors = sponsors.filter((sponsor) => sponsor.active)

export const platinumSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "platinum")
export const goldSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "gold")
export const silverSponsors = signedSponsors.filter((sponsor) => sponsor.tier === "silver")
export const partners = signedSponsors.filter((sponsor) => sponsor.tier === "partner")
