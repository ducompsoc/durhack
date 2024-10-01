"use client"

import { HamburgerMenuIcon} from "@radix-ui/react-icons"
import * as React from "react"
import { Button } from "@durhack/web-components/ui/button"

import { useSidebarContext } from "@/app/dashboard/(application)/sidebar-context"
import { ApplicationStatusIndicator } from "@/components/dashboard/application-status-indicator";

export function Header() {
  const { toggleIsOpen: toggleSidebar } = useSidebarContext()

  return (
    <div className="px-8 py-8 border-b-2 h-32 flex flex-row justify-between">
      {/* left-aligned header items */}
      <div className="flex flex-row h-full items-center">
        <div className="pr-8 h-full content-center md:hidden">
          <Button variant="ghost" className="aspect-square" onClick={() => toggleSidebar()}>
            <HamburgerMenuIcon className="h-6 w-6"/>
          </Button>
        </div>
        <article>
          <div>
            <div className="h-full content-center">
              <h1 className="hidden sm:block text-2xl lg:text-4xl font-semibold">Dashboard</h1>
              <p className="hidden sm:block">Edit and update information concerning your DurHack profile.</p>
            </div>
          </div>
        </article>
      </div>

      {/* right-aligned header items */}
      <div className="flex flex-row h-full items-center">
        <ApplicationStatusIndicator/>
      </div>
    </div>
  )
}
