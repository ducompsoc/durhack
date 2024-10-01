type Sponsor = {
  image: string,
  link: string,
  tier: "platinum" | "gold" | "silver" | "partner"
}

export const sponsors = [] satisfies Sponsor[]
