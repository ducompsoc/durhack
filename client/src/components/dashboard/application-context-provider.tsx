"use client"

import * as React from "react"
import type { KeyedMutator } from "swr"
import ModuleError from "module-error"

import { type Application, useApplication } from "@/hooks/use-application"
import { useRouter } from "next/navigation"

export type ApplicationContextProps = {
  application: Application | undefined
  applicationIsComplete: boolean
  mutateApplication: KeyedMutator<Application>
  applicationIsLoading: boolean
}

export const ApplicationContextContext = React.createContext<ApplicationContextProps | null>(null)

export function ApplicationContextProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const {
    data: application,
    error: applicationError,
    mutate: mutateApplication,
    isLoading: applicationIsLoading,
  } = useApplication()

  if (applicationIsLoading) return (
    <ApplicationContextContext.Provider
      value={{
        application,
        applicationIsComplete: false,
        mutateApplication,
        applicationIsLoading,
      }}
      children={children}
    />
  )

  if (applicationError != null && applicationError instanceof ModuleError) {
    if (applicationError.code === "ERR_UNAUTHENTICATED") {
      router.push("/")
      return <></>
    }
  }

  // todo: implement client-side completeness computation
  const applicationIsComplete = false

  // throw the error to the nearest error boundary (error.tsx in app directory)
  if (applicationError != null) throw applicationError

  return (
    <ApplicationContextContext.Provider
      value={{
        application,
        applicationIsComplete,
        mutateApplication,
        applicationIsLoading,
      }}
      children={children}
    />
  )
}
