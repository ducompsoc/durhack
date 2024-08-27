"use client"

import type { Profile } from "@/app/details/page";
import { LinkBox } from "@/app/details/linkbox";
import { Label } from "@durhack/web-components/ui/label";
import { Input } from "@durhack/web-components/ui/input";

export default function HomePage(profile: Profile) {
    return (
        <>
            <h2 className="text-2xl">
                Details
            </h2>
            <div className="columns-2 mb-4">
                <Label>First Name</Label>
                <Input placeholder={ profile.firstNames }/>
                <Label>Last Name</Label>
                <Input placeholder={ profile.lastNames }/>
            </div>
            <div className="columns-2 mb-4">
                <Label>Phone Number</Label>
                <Input placeholder={ profile.phoneNumber }/>
                <Label>Email</Label>
                <Input placeholder={ profile.email }/>
            </div>
            <div className="mb-4">
                <Label>Age</Label>
                <Input placeholder={ profile.email }/>
            </div>
            <div className="mb-4">
                <Label>Graduation Year</Label>
                <Input placeholder={ profile.graduationYear }/>
            </div>
            <div className="mb-4">
                <Label>Level of Study</Label>
                <Input placeholder={ profile.levelOfStudy }/>
            </div>
            <div className="mb-8">
                <Label>Place of Education</Label>
                <Input placeholder={ profile.school }/>
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
    )
}