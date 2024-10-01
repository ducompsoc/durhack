import * as React from "react"

import { ApplicationContextContext } from "@/components/dashboard/application-context-provider"

export function useApplicationContext() {
  const context = React.useContext(ApplicationContextContext)

  if (!context) {
    throw new Error("useApplicationContext must be used within a <ApplicationContextProvider />")
  }

  return context
}
