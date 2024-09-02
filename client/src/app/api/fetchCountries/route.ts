import { NextResponse } from 'next/server';
import { getCountryDataList } from 'countries-list';
import countriesEmoji from 'countries-list/minimal/countries.emoji.min.json';

export async function GET() {
  try {
    const countryOptions = getCountryDataList().map(country => ({
      label: country.name,
      emoji: countriesEmoji[country.iso2],
      value: country.iso3,
    }));

    return NextResponse.json({ countryOptions });
  } catch (error) {
    return NextResponse.error();
  }
}