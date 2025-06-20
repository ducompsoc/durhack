import { z } from "zod/v4"

import { recordEntries } from "@/util/record-entries"

export const dietaryRequirementSchema = z.enum([
  "vegan",
  "vegetarian",
  "pescatarian",
  "halal",
  "kosher",
  "gluten-free",
  "dairy-free",
  "nut-allergy",
])

export type DietaryRequirement = z.output<typeof dietaryRequirementSchema>

const dietaryRequirementMetadata: Record<DietaryRequirement, { label: string }> = {
  "vegan": { label: "Vegan" },
  "vegetarian": { label: "Vegetarian" },
  "pescatarian": { label: "Pescatarian" },
  "halal": { label: "Halal" },
  "kosher": { label: "Kosher" },
  "gluten-free": { label: "Gluten Free" },
  "dairy-free": { label: "Dairy Free" },
  "nut-allergy": { label: "Nut Allergy" },
}

export const dietaryRequirementOptions = recordEntries(dietaryRequirementMetadata).map(([value, metadata]) => ({
  value,
  label: metadata.label,
})) satisfies Array<{
  value: DietaryRequirement
  label: string
}>
