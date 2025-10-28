import * as React from "react"

import { ApplicationCvContextContext } from "@/components/dashboard/application-cv-context-provider"

export function useApplicationCvContext() {
  const context = React.useContext(ApplicationCvContextContext)

  if (!context) {
    throw new Error("useApplicationCvContext must be used within a <ApplicationCvContextProvider />")
  }

  return context
}
