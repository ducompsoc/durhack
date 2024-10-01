import * as React from "react"

export type SidebarContextProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
  toggleIsOpen: () => void
}

export const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebarContext() {
  const context = React.useContext(SidebarContext)

  if (context == null) {
    throw new Error("useSidebarContext can only be used within the dashboard layout")
  }

  return context
}
