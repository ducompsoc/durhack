import countries3to2 from "countries-list/minimal/countries.3to2.min.json"
import { type core, z } from "zod/v4"

const iso3Codes = new Set(Object.keys(countries3to2))

function isValidIso3(maybeIso3: string): boolean {
  return iso3Codes.has(maybeIso3)
}

export function zodIso3(params?: string | core.$ZodCustomParams): z.ZodString {
  params ??= { error: "Invalid country" }
  return z.string().refine(isValidIso3, params)
}
