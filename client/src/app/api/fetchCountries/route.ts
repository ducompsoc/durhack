import { getCountryDataList } from "countries-list"
import countriesEmoji from "countries-list/minimal/countries.emoji.min.json"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const countryOptions = getCountryDataList().map((country) => ({
      label: country.name,
      emoji: countriesEmoji[country.iso2],
      value: country.iso3,
    }))

    countryOptions.sort((a, b) => {
      if (a.value === "GBR") return -1
      if (b.value === "GBR") return 1
      return a.label.localeCompare(b.label)
    })

    return NextResponse.json({ countryOptions })
  } catch (error) {
    return NextResponse.error()
  }
}
