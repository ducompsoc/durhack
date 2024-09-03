import * as React from "react";

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
    applicationStatus: string
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
    return (
        <div>
            Details
        </div>
    )
}
