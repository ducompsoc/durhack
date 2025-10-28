"use client"

import type { FileInfo } from "@durhack/durhack-common/types/file-info"
import * as React from "react"
import type { KeyedMutator } from "swr"
import { useApplicationCv } from "@/hooks/use-application-cv"

export type ApplicationCvContextProps = {
  cvFileInfo: FileInfo | undefined
  mutateCvFileInfo: KeyedMutator<FileInfo>
  cvFileInfoIsLoading: boolean
}

export const ApplicationCvContextContext = React.createContext<ApplicationCvContextProps | null>(null)

export function ApplicationCvContextProvider({ children }: { children?: React.ReactNode }) {
  const {
    data: cvFileInfo,
    error: cvFileInfoError,
    mutate: mutateCvFileInfo,
    isLoading: cvFileInfoIsLoading,
  } = useApplicationCv()

  if (cvFileInfoError != null) throw cvFileInfoError

  return (
    <ApplicationCvContextContext.Provider
      value={{
        cvFileInfo,
        cvFileInfoIsLoading,
        mutateCvFileInfo,
      }}
    >
      {children}
    </ApplicationCvContextContext.Provider>
  )
}
