import type * as React from "react"
import type { Viewport } from "next"

import { Footer } from "@/components/footer"
import { MLHBanner } from "@/components/mlh-banner"
import { SiteHeader } from "@/components/site-header"

export const viewport = {
  themeColor: "#BFEAFD",
  colorScheme: "dark light",
} satisfies Viewport

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <>
      <MLHBanner variant="white" season={2026} region="eu" />
      <div>
        <div className="w-full min-h-[110px] 2xl:hidden" />
        {children}
        <div className="w-full min-h-[110px] 2xl:hidden" />
      </div>
      <Footer />
    </>
  )
}
