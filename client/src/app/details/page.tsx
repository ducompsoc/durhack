"use client"

import * as React from "react";

import { Sidebar } from "@/app/details/sidebar";
import Header from "@/app/details/header";

import PersonalPage from "@/app/details/personalpage";
import ContactPage from "@/app/details/contactpage";
import EducationPage from "@/app/details/educationpage";
import AuthPage from "@/app/details/authpage";
import SubmitPage from "@/app/details/submitpage";

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

export default function DetailsPage() {
    const [page, setPage] = React.useState("home");
    const [isFinalSubmitHovering, setIsFinalSubmitHovering] = React.useState(false);
    const [schoolData, setSchoolData] = React.useState<schoolOptionsType[]>([]);
    const [countryData, setCountryData] = React.useState<countryOptionsType[]>([]);

    function selectPage(name: string) {
        setPage(name);
    }

    function setHover(condition: boolean) {
      console.log("Hovering")
      setIsFinalSubmitHovering(condition);
    }

    async function getRegisterData() {
      const schoolOptions = (await getVerifiedSchoolsList()).map(schoolName => ({
        label: schoolName,
        value: schoolName,
      }))
    
      const countryOptions = getCountryDataList().map(country => ({
        label: country.name,
        emoji: countriesEmoji[country.iso2],
        value: country.iso3,
      }))
    
      setSchoolData(schoolOptions);
      setCountryData(countryOptions);
    }
    getRegisterData();

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
        <main className="min-h-[100vh] relative">
          <div className={`absolute top-0 bottom-0 left-0 right-0 h-full transition-all duration-1000 ease-in-out bg-gradient-to-t from-green-500/40 to-transparent to-50% z-0 ${isFinalSubmitHovering ? "opacity-100" : "opacity-0"}`}></div>
          <div className="min-h-[100vh] relative z-10">
            <Header />
            <Sidebar selectPage={selectPage}/>
            <div className="ml-64 py-16 pl-16 pr-64">
                { page == "home" &&
                    PersonalPage(mockProfile)
                }
                { page == "contact" &&
                    ContactPage(mockProfile)
                }
                { page == "education" &&
                    EducationPage({schoolOptions: schoolData, countryOptions: countryData, profile: mockProfile})
                }
                { page == "auth" &&
                    AuthPage(mockProfile)
                }
                { page == "submit" && 
                    SubmitPage({profile: mockProfile, setHoverState: setHover})
                }
            </div>
          </div>
        </main>
    )
}
