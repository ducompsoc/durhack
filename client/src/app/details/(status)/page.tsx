"use client"

import * as React from "react";
import useUser from "@/lib/useUser";

export default function EducationPage() {
    const profile = useUser()
    
    return (
        <div>
            { profile.applicationStatus }
        </div>
    )
}