import * as React from "react"

import { UserContextContext } from "@/components/user-context-provider"

export type { User } from "@/hooks/use-user"

export function useApplicationContext() {
  const context = React.useContext(UserContextContext)

  if (!context) {
    throw new Error("useUserContext must be used within a <UserContextProvider />")
  }

  return context
}
