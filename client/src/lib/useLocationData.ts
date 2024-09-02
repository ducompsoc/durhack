"use server"

import { getCountryDataList } from "countries-list";
import countriesEmoji from 'countries-list/minimal/countries.emoji.min.json'
import { getVerifiedSchoolsList } from "@/data/verified-schools";

export type schoolOptionsType = {
    label: string
    value: string
}

export type countryOptionsType = {
    label: string
    emoji: string
    value: string
}

async function getData() {
    const schoolOptions = (await getVerifiedSchoolsList()).map(schoolName => ({
        label: schoolName,
        value: schoolName,
    }))

    const countryOptions = getCountryDataList().map(country => ({
        label: country.name,
        emoji: countriesEmoji[country.iso2],
        value: country.iso3,
    }))

    return { schoolOptions, countryOptions }
}

export default async function useLocationData() {
    const { schoolOptions, countryOptions } = await getData();

    return { schoolOptions, countryOptions }
}
