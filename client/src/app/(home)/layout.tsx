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
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}
