"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { ApplicationContextProvider } from "@/components/dashboard/application-context-provider"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

export const BackgroundContext = React.createContext({
  isFinalSubmitHovering: false,
  setIsFinalSubmitHovering: (hovering: boolean) => {},
})

export const SidebarContext = React.createContext({
  isOpen: false,
  setIsOpen: (open: boolean) => {},
  toggleSidebar: () => {},
})

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isFinalSubmitHovering, setIsFinalSubmitHovering] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  function toggleSidebar() {
    setIsOpen((prevOpen) => !prevOpen)
  }

  return (
    <ApplicationContextProvider>
      <BackgroundContext.Provider value={{ isFinalSubmitHovering, setIsFinalSubmitHovering }}>
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
          <main className="min-h-[100vh] relative">
            <div
              className={cn(
                "absolute top-0 bottom-0 left-0 right-0 h-full transition-all duration-1000 ease-in-out bg-gradient-to-t from-green-500/40 to-transparent to-50% z-0",
                isFinalSubmitHovering ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="min-h-[100vh] relative z-10">
              <Header />
              <Sidebar />
              <div className={cn("md:ml-64 py-16 pl-16 pr-16 2xl:pr-64", isOpen ? "hidden md:block" : "")}>
                {children}
              </div>
            </div>
          </main>
        </SidebarContext.Provider>
      </BackgroundContext.Provider>
    </ApplicationContextProvider>
  )
}