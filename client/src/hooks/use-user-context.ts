import * as React from "react"

import { UserContextContext } from "@/components/dashboard/user-context-provider"

export type { User } from "@/hooks/use-user"

export function useUserContext() {
  const context = React.useContext(UserContextContext)

  if (!context) {
    throw new Error("useUserContext must be used within a <UserContextProvider />")
  }

  return context
}
