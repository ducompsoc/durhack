import type * as React from "react"

import { ApplicationCvContextProvider } from "@/components/dashboard/application-cv-context-provider"

export default function CvPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApplicationCvContextProvider>
      <h2 className="text-2xl">CV Submission</h2>
      {children}
    </ApplicationCvContextProvider>
  )
}
