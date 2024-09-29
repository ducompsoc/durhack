"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { BackgroundContext } from "./background-context"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wasFinalSubmitHoveredRef = React.useRef<boolean>(false)
  const [isFinalSubmitHovering, setIsFinalSubmitHovering] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!isFinalSubmitHovering) return
    wasFinalSubmitHoveredRef.current = true
  }, [isFinalSubmitHovering])

  return (
    <BackgroundContext.Provider value={{ isFinalSubmitHovering, setIsFinalSubmitHovering }}>
      <main className="min-h-[100vh] relative">
        <div
          className={cn(
            "absolute top-0 bottom-0 left-0 right-0 h-full bg-gradient-to-t from-green-500/40 to-transparent to-50% z-0",
            isFinalSubmitHovering ? "opacity-100" : "opacity-0",
            isFinalSubmitHovering || wasFinalSubmitHoveredRef.current ? "transition-all duration-1000 ease-in-out" : "",
          )}
        />
        {children}
      </main>
    </BackgroundContext.Provider>
  )
}
