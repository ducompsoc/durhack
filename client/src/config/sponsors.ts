export type Sponsor = {
  slug: string,
  image: string,
  link: string,
  tier: "platinum" | "gold" | "silver"
}

export const sponsors: Sponsor[] = []

export const platinumSponsors = sponsors.filter((sponsor) => sponsor.tier === "platinum")
export const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "gold")
export const silverSponsors = sponsors.filter((sponsor) => sponsor.tier === "silver")

export type Partner = {
  slug: string,
  image: string,
  link: string,
}

export const partners: Partner[] = []
