"use client"
import * as React from "react"

import { ApplicationContextProvider } from "@/components/dashboard/application-context-provider"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"

import { SidebarContext } from "./sidebar-context"

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isOpen, setIsOpen] = React.useState(false)

  function toggleIsOpen() {
    setIsOpen((prevOpen) => !prevOpen)
  }

  return (
    <ApplicationContextProvider>
      <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleIsOpen }}>
        <div className="min-h-[100vh] relative z-10">
          <Header/>
          <Sidebar/>
          <div className={cn("md:ml-64 py-16 pl-16 pr-16 2xl:pr-64", isOpen ? "hidden md:block" : "")}>
            {children}
          </div>
        </div>
      </SidebarContext.Provider>
    </ApplicationContextProvider>
  )
}
