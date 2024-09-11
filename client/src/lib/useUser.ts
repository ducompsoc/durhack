import * as React from "react";

export type Profile = {
    firstNames: string
    lastNames: string
    preferredName: string
    pronouns: string
    age: string | number
    phoneNumber: string
    email: string
    school: string
    graduationYear: string | number
    levelOfStudy: string
    countryOfResidence: string
    mlhCodeOfConductAcceptance: boolean | 'indeterminate'
    mlhPoliciesAcceptance: boolean | 'indeterminate'
    mlhMarketingAcceptance: boolean | 'indeterminate'
    applicationStatus: string
    authenticated: boolean
}

export default function useUser() {
    // Should be fetched from the server
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
        mlhCodeOfConductAcceptance: false,
        mlhPoliciesAcceptance: false,
        mlhMarketingAcceptance: false,
        applicationStatus: "Submitted",
        authenticated: false,
    })

    async function updateProfile(newProfile: Partial<Profile>) {
        const updatedProfile: Profile = {...profile, ...newProfile}

        // POST to server
    }

    return { profile, updateProfile }
}