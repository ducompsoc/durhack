import type * as React from "react"
import "@/styles/home.css"

import { MLHBanner } from "@/components/mlh-banner"
import { Footer } from "@/components/footer"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <>
      <MLHBanner variant="white" season={2026} region="eu" />
      <div className="bg-homepage-gradient min-h-[100vh] flex-1 flex flex-col content-center items-center justify-center">
        <div className="w-full min-h-[110px] 2xl:hidden" />
        {children}
        <div className="w-full min-h-[110px] 2xl:hidden" />
      </div>
      <Footer />
    </>
  )
}
