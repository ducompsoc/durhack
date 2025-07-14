import type * as React from "react"
import "@/styles/home.css"

import { Footer } from "@/components/footer"
import { MLHBanner } from "@/components/mlh-banner"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <>
      <MLHBanner variant="white" season={2026} region="eu" />
      <div className="bg-homepage-gradient min-h-screen flex-1 flex flex-col content-center items-center justify-center">
        <div className="w-full min-h-[110px] 2xl:hidden" />
        {children}
        <div className="w-full min-h-[110px] 2xl:hidden" />
      </div>
      <Footer />
    </>
  )
}
