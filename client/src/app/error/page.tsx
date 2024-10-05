import * as React from "react"
import type { Metadata } from "next"

import ErrorPageClient from "@/app/error/error-page-client";

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
