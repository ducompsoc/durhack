"use client"

import { useState } from "react";

import { Sidebar } from "@/app/details/sidebar";
import Header from "@/app/details/header";

import { LinkBox } from "@/app/details/linkbox";
import PersonalPage from "@/app/details/personalpage";
import ContactPage from "@/app/details/contactpage";

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

export default function DetailsPage() {
    const [page, setPage] = useState("home");

    function selectPage(name: string) {
        setPage(name);
    }

    const mockProfile: Profile = {
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
        countryOfResidence: "United Kingdom"
    }

    return (
        <main className="min-h-[100vh]">
            <Header />
            <Sidebar selectPage={selectPage}/>
            <div className="ml-64 py-16 pl-16 pr-64">
                { page == "home" &&
                    PersonalPage(mockProfile)
                }
                { page == "contact" &&
                    ContactPage(mockProfile)
                }
                { page == "accounts" &&
                    <LinkBox links={["GitHub", "LinkedIn"]} />
                }
                { page == "complete" && 
                    <>
                    </>
                }
            </div>
        </main>
    )
}
