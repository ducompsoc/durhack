import * as React from "react"

export type BackgroundContextProps = {
  isFinalSubmitHovering: boolean
  setIsFinalSubmitHovering: (isFinalSubmitHovering: boolean) => void
}

export const BackgroundContext = React.createContext<BackgroundContextProps | null>(null)

export function useBackgroundContext() {
  const context = React.useContext(BackgroundContext)

  if (context == null) {
    throw new Error("useBackgroundContext can only be used within the dashboard layout")
  }

  return context
}
