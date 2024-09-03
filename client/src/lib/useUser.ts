import * as React from "react";
import { set } from "zod";

export type Profile = {
    firstNames: string
    lastNames: string
    preferredName: string
    pronouns: string
    age: string | number
    phoneNumber: string
    email: string
    school: string
    graduationYear: string
    levelOfStudy: string
    countryOfResidence: string
    applicationStatus: string
}

export default function useUser() {
    const [profile, setProfile] = React.useState<Profile>({
        firstNames: "Will",
        lastNames: "Woodward",
        preferredName: "Will",
        pronouns: "He/Him",
        age: "20",
        phoneNumber: "+44 1234 567890",
        email: "Will's email",
        school: "Durham",
        graduationYear: "2026",
        levelOfStudy: "Level 3",
        countryOfResidence: "United Kingdom",
        applicationStatus: "Submitted",
    })

    async function updateProfile(newProfile: Partial<Profile>) {
        const updatedProfile: Profile = {...profile, ...newProfile}
        setProfile(updatedProfile)
    }

    return { profile, updateProfile }
}