"use client"

import * as React from "react";

import { useApplication } from "@/hooks/useApplication";

export default function EducationPage() {
    const { data } = useApplication()
    
    return (
        <>
            <h2 className="text-2xl">
                Form Status
            </h2>
            <p>The current status of your application is:</p>
            <div className="mx-auto w-64 py-16">
                <p className="text-center font-bold text-xl">{ data?.applicationStatus }</p>
            </div>
        </>
    )
}