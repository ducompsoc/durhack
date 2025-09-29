import { createHash } from "node:crypto"
import { getCountryDataList } from "countries-list"
import countriesEmoji from "countries-list/minimal/countries.emoji.min.json" with { type: "json" }

import type { Middleware } from "@/types"

const countryOptions = getCountryDataList().map((country) => ({
  label: country.name,
  emoji: countriesEmoji[country.iso2],
  value: country.iso3,
}))

const countryOptionsETagSource = countryOptions.map((option) => option.value).join(";")
const countryOptionsETag = createHash("sha256").update(countryOptionsETagSource).digest("hex")

export function getApplicationCountryOptions(): Middleware {
  return async (_request, response) => {
    response.setHeader("etag", countryOptionsETag)
    response.validatePreconditions()

    response.json({
      data: countryOptions,
    })
  }
}
