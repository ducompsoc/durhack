"use client"

import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { Button } from "@durhack/web-components/ui/button"

import { useSidebarContext } from "@/app/dashboard/(application)/sidebar-context";

export function Header() {
  const { toggleIsOpen: toggleSidebar } = useSidebarContext()

  return (
    <div className="px-8 py-8 border-b-2 h-32 flex row">
      <div className="pr-8 h-full content-center md:hidden">
        <Button className="aspect-square" onClick={() => toggleSidebar()}>
          <HamburgerMenuIcon />
        </Button>
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
