import * as React from "react";

import { getCountryDataList } from "countries-list";
import countriesEmoji from 'countries-list/minimal/countries.emoji.min.json'
import { getVerifiedSchoolsList } from "@/data/verified-schools";

export type Profile = {
    firstNames: string
    lastNames: string
    preferredName: string
    pronouns: string
    age: string
    phoneNumber: string
    email: string
    school: string
    graduationYear: string
    levelOfStudy: string
    countryOfResidence: string
}

export type schoolOptionsType = {
    label: string
    value: string
}

export type countryOptionsType = {
    label: string
    emoji: string
    value: string
}

export default async function DetailsPage() {
    const schoolOptions = (await getVerifiedSchoolsList()).map(schoolName => ({
        label: schoolName,
        value: schoolName,
    }))

    const countryOptions = getCountryDataList().map(country => ({
        label: country.name,
        emoji: countriesEmoji[country.iso2],
        value: country.iso3,
    }))

    return (
            <div className="ml-64 py-16 pl-16 pr-64">
            </div>
    )
}
