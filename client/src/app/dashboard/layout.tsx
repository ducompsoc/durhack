import * as React from "react"
import type { Metadata } from "next";

import { DashboardLayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  )
}
