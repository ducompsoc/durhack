"use client"

import ModuleError from "module-error"
import { useRouter } from "next/navigation"
import * as React from "react"
import type { KeyedMutator } from "swr"

import { type User, useUser } from "@/hooks/use-user"
import { isLoaded } from "@/lib/is-loaded"

export type UserContextProps = {
  user: User | undefined
  mutateUser: KeyedMutator<User>
  userIsLoading: boolean
}

export const UserContextContext = React.createContext<UserContextProps | null>(null)

export function UserContextProvider({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const { data: user, error: userError, mutate: mutateUser, isLoading: userIsLoading } = useUser()

  if (!isLoaded(user, userIsLoading))
    return (
      <UserContextContext.Provider
        value={{
          user,
          mutateUser,
          userIsLoading,
        }}
      >
        {children}
      </UserContextContext.Provider>
    )

  if (userError != null && userError instanceof ModuleError) {
    if (userError.code === "ERR_UNAUTHENTICATED") {
      router.push("/")
      return null
    }
  }

  // throw the error to the nearest error boundary
  if (userError != null) throw userError

  return (
    <UserContextContext.Provider
      value={{
        user,
        mutateUser,
        userIsLoading,
      }}
    >
      {children}
    </UserContextContext.Provider>
  )
}
