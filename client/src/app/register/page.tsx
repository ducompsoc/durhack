import { getCountryDataList } from "countries-list"
import countriesEmoji from "countries-list/minimal/countries.emoji.min.json"

import { RegisterForm } from "@/app/register/register-form"
import { getVerifiedSchoolsList } from "@/data/verified-schools"

export default async function RegisterPage() {
  const schoolOptions = (await getVerifiedSchoolsList()).map((schoolName) => ({
    label: schoolName,
    value: schoolName,
  }))

  const countryOptions = getCountryDataList().map((country) => ({
    label: country.name,
    emoji: countriesEmoji[country.iso2],
    value: country.iso3,
  }))

  return (
    <main className="container py-5">
      <RegisterForm schoolOptions={schoolOptions} countryOptions={countryOptions} />
    </main>
  )
}
