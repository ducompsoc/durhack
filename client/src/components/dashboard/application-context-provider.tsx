"use client"

import ModuleError from "module-error"
import { useRouter } from "next/navigation"
import * as React from "react"
import type { KeyedMutator } from "swr"

import { type Application, useApplication } from "@/hooks/use-application"
import { isLoaded } from "@/lib/is-loaded"

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

  if (!isLoaded(application, applicationIsLoading))
    return (
      <ApplicationContextContext.Provider
        value={{
          application,
          applicationIsComplete: false,
          mutateApplication,
          applicationIsLoading,
        }}
      >
        {children}
      </ApplicationContextContext.Provider>
    )

  if (applicationError != null && applicationError instanceof ModuleError) {
    if (applicationError.code === "ERR_UNAUTHENTICATED") {
      router.push("/")
      return <></>
    }
  }

  let applicationIsComplete = true
  if (application.age == null) applicationIsComplete = false // personal section
  if (application.phone == null) applicationIsComplete = false // contact section
  if (application.tShirtSize == null) applicationIsComplete = false // extra section
  if (application.graduationYear == null) applicationIsComplete = false // extra section
  if (application.cvUploadChoice === "indeterminate") applicationIsComplete = false // CV section

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
    >
      {children}
    </ApplicationContextContext.Provider>
  )
}
