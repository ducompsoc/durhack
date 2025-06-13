import ModuleError from "module-error"
import useSWR from "swr"

import { siteConfig } from "@/config/site"

export type User = {
  id: string
  email: string
  preferred_names: string
  roles: string[]
}

async function userFetcher(path: string): Promise<User> {
  const url = new URL(path, siteConfig.apiUrl)
  const response = await fetch(url, { credentials: "include" })

  if (response.status === 401)
    throw new ModuleError("Couldn't fetch user registration details because user is not logged in", {
      code: "ERR_UNAUTHENTICATED",
    })
  if (!response.ok) throw new Error("Couldn't fetch user!")

  return (await response.json()).data as User
}

export function useUser() {
  return useSWR<User, unknown>("/user", userFetcher)
}
