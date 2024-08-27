"use client"

import { useState } from "react";

import { Sidebar } from "@/app/details/sidebar";
import Header from "@/app/details/header";

import { Input } from "@durhack/web-components/ui/input"
import { Label } from "@durhack/web-components/ui/label";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@durhack/web-components/ui/form"
import Link from "next/link"
import { Button } from "@durhack/web-components/ui/button"
import { Checkbox } from "@durhack/web-components/ui/checkbox"

import { LinkBox } from "@/app/details/linkbox";
import HomePage from "@/app/details/homepage";

export type Profile = {
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
                    HomePage(mockProfile)
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
