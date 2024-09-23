import type * as React from "react"

import { MLHBanner } from "@/components/mlh-banner"
import { Navbar } from "@/components/navbar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <>
      <div className="fixed top-0 overflow-visible w-[100%] z-50">
        <MLHBanner variant="white" />
        <Navbar />
      </div>
      <div className="relative bg-background">{children}</div>
    </>
  )
}
