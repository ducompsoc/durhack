import type { Metadata } from "next"
import * as React from "react"

import ErrorPageClient from "@/app/error/error-page-client"

export const metadata: Metadata = {
  title: "Error",
}

export default function ErrorPage() {
  return (
    <React.Suspense fallback={null}>
      <ErrorPageClient />
    </React.Suspense>
  )
}
