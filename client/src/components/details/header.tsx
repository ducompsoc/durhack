"use client"

import * as React from "react";
import { FaBars } from 'react-icons/fa';
import { SidebarContext } from "@/app/details/layout";

export default function Header() {
    const { toggleSidebar } = React.useContext(SidebarContext)

    return (
        <div className="px-8 py-8 border-b-2 h-32 flex row">
            <div className="pr-8 h-full content-center md:hidden">
                <div className="p-3 rounded-md bg-white bg-opacity-20" onClick={() => (toggleSidebar())}>
                    <FaBars />
                </div>
            </div>
            <div>
                <div className="h-full content-center">
                    <h1 className="text-4xl font-semibold">Details</h1>
                    <p className="hidden sm:block">Edit and update information concerning your Durhack profile.</p>
                </div>
            </div>
        </div>
    )
}
