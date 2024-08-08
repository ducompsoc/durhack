import { Sidebar } from "@/app/details/sidebar";
import Header from "@/app/details/header";

import { Input } from "@durhack/web-components/ui/input"
import { Label } from "@durhack/web-components/ui/label";

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

export default async function DetailsPage() {
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
            <Sidebar />
            <div className="ml-64 py-16 pl-16 pr-64">
                <Label>First Name</Label>
                <Input placeholder={ mockProfile.firstNames }/>
            </div>
        </main>
    )
}
