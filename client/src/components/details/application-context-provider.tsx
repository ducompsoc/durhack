"use client"

import * as React from "react"
import type { KeyedMutator } from "swr"

import { type Application, useApplication } from "@/hooks/useApplication"
import { useRouter } from "next/navigation"

type ApplicationContextProps = {
  application: Application | null | undefined
  applicationError: unknown | undefined
  mutateApplication: KeyedMutator<Application | null>
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

  // biome-ignore lint/correctness/useExhaustiveDependencies(router.push): useRouter() is stable across renders
  React.useEffect(() => {
    if (!applicationIsLoading && !application) router.push("/")
  }, [applicationIsLoading, application])

  return (
    <ApplicationContextContext.Provider
      value={{
        application,
        applicationError,
        mutateApplication,
        applicationIsLoading,
      }}
    >
      {children}
    </ApplicationContextContext.Provider>
  )
}
