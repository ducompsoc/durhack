"use client"

import * as React from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/details/sidebar";
import Header from "@/components/details/header";
import { useApplication } from "@/hooks/useApplication";

export const BackgroundContext = React.createContext({
    isFinalSubmitHovering: false,
    setIsFinalSubmitHovering: (hovering: boolean) => {}
})

export const SidebarContext = React.createContext({
  isOpen: false,
  setIsOpen: (open: boolean) => {},
  toggleSidebar: () => {},
})

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [isFinalSubmitHovering, setIsFinalSubmitHovering] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const { isLoading, data } = useApplication()
    const router = useRouter()

    React.useEffect(() => {
      if (!isLoading && !data) router.push("/")
    }, [isLoading, data])

    function toggleSidebar() {
      setIsOpen(prevOpen => !prevOpen)
    }

    return (
      <BackgroundContext.Provider value={{ isFinalSubmitHovering, setIsFinalSubmitHovering}}>
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar}}>
          <main className="min-h-[100vh] relative">
            <div className={`absolute top-0 bottom-0 left-0 right-0 h-full transition-all duration-1000 ease-in-out bg-gradient-to-t from-green-500/40 to-transparent to-50% z-0 ${isFinalSubmitHovering ? "opacity-100" : "opacity-0"}`}></div>
              <div className="min-h-[100vh] relative z-10">
                <Header />
                <Sidebar />
                  <div className={`md:ml-64 py-16 pl-16 pr-16 2xl:pr-64 ${isOpen ? "hidden md:block" : ""}`}>
                      {children}
                  </div>
              </div>
          </main>
        </SidebarContext.Provider>
      </BackgroundContext.Provider>
    );
  }
  