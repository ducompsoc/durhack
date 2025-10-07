import type { Viewport } from "next"
import type * as React from "react"

import { MLHBanner } from "@/components/mlh-banner"
import { SiteHeader } from "@/components/site-header"
import { navConfig } from "@/config/nav"

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
      <SiteHeader navConfig={navConfig} />
      <MLHBanner variant="white" season={2026} region="eu" />
      <div>{children}</div>
    </>
  )
}
