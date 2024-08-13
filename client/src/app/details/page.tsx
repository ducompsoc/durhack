"use client"

import { useState } from "react";

import { Sidebar } from "@/app/details/sidebar";
import Header from "@/app/details/header";

import { Input } from "@durhack/web-components/ui/input"
import { Label } from "@durhack/web-components/ui/label";
import { LinkBox } from "./linkbox";

type Profile = {
    firstNames: string
    lastNames: string
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
        age: "20",
        phoneNumber: "phone number",
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
                    <>
                        <h2 className="text-2xl">
                            Details
                        </h2>
                        <div className="columns-2 mb-4">
                            <Label>First Name</Label>
                            <Input placeholder={ mockProfile.firstNames }/>
                            <Label>Last Name</Label>
                            <Input placeholder={ mockProfile.lastNames }/>
                        </div>
                        <div className="columns-2 mb-4">
                            <Label>Phone Number</Label>
                            <Input placeholder={ mockProfile.phoneNumber }/>
                            <Label>Email</Label>
                            <Input placeholder={ mockProfile.email }/>
                        </div>
                        <div className="mb-8">
                            <Label>Email</Label>
                            <Input placeholder={ mockProfile.email }/>
                        </div>

                        <h2 className="text-2xl">
                            Authentication
                        </h2>
                        <LinkBox links={["Keycloak"]} />
                        <div className="mt-16">
                            <div className="mx-[45%] py-2 px-4 text-center rounded-sm bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all">
                                Submit
                            </div>
                        </div>
                    </>
                }
                { page == "accounts" &&
                    <LinkBox links={["GitHub", "LinkedIn"]} />
                }
            </div>
        </main>
    )
}
