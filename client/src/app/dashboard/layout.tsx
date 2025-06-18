import type { Metadata } from "next"
import type * as React from "react"

import { DashboardLayoutClient } from "./layout-client"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
