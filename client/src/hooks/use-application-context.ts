import * as React from "react"

import { ApplicationContextContext } from "@/components/dashboard/application-context-provider"

export type { Application } from "@/hooks/use-application"

export function useApplicationContext() {
  const context = React.useContext(ApplicationContextContext)

  if (!context) {
    throw new Error("useApplicationContext must be used within a <ApplicationContextProvider />")
  }

  return context
}
