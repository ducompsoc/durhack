import { z } from "zod/v4"

import { recordEntries } from "@/util/record-entries"

export const dietaryRequirementSchema = z.enum([
  "vegan",
  "vegetarian",
  "pescatarian",
  "halal",
  "kosher",
  "no-beef",
  "no-pork",
  "gluten-free",
  "dairy-free",
  "egg-allergy",
  "fish-allergy",
  "shellfish-allergy",
  "tree-nut-allergy",
  "peanut-allergy",
  "wheat-allergy",
  "soy-allergy",
  "sesame-allergy",
  // at DurHack 2024 we had *one* attendee with an onion allergy.
  // they don't graduate until 2026 (iirc) so, at least for now, this is maybe worth having
  "onion-allergy",
  "other",
])

export type DietaryRequirement = z.output<typeof dietaryRequirementSchema>

const dietaryRequirementMetadata: Record<DietaryRequirement, { label: string }> = {
  vegan: { label: "Vegan" },
  vegetarian: { label: "Vegetarian" },
  pescatarian: { label: "Pescatarian" },
  halal: { label: "Halal" },
  kosher: { label: "Kosher" },
  "no-beef": { label: "No beef" },
  "no-pork": { label: "No pork" },
  "gluten-free": { label: "Gluten Free" },
  "dairy-free": { label: "Dairy Free" },
  "egg-allergy": { label: "Egg Allergy" },
  "fish-allergy": { label: "Fish Allergy" },
  "shellfish-allergy": { label: "Shellfish Allergy" },
  "tree-nut-allergy": { label: "Tree Nut Allergy" },
  "peanut-allergy": { label: "Peanut Allergy" },
  "wheat-allergy": { label: "Wheat Allergy" },
  "soy-allergy": { label: "Soy Allergy" },
  "sesame-allergy": { label: "Sesame Allergy" },
  "onion-allergy": { label: "Onion Allergy" },
  other: { label: "Other" },
}

export const dietaryRequirementOptions = recordEntries(dietaryRequirementMetadata).map(([value, metadata]) => ({
  value,
  label: metadata.label,
})) satisfies Array<{
  value: DietaryRequirement
  label: string
}>
