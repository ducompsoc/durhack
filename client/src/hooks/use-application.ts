import useSWR from "swr"
import type { Application } from "@durhack/durhack-common/types/application"
import ModuleError from "module-error"

import { siteConfig } from "@/config/site"

export type { Application }

async function applicationFetcher(path: string): Promise<Application> {
  const url = new URL(path, siteConfig.apiUrl).toString()
  const response = await fetch(url, { credentials: "include" })

  if (response.status === 401) throw new ModuleError("Couldn't fetch user registration details because user is not logged in", { code: "ERR_UNAUTHENTICATED" })
  if (!response.ok) throw new Error("Couldn't fetch user registration details for unknown reason")

  return (await response.json()).data as Application
}

export function useApplication() {
  return useSWR<Application, unknown | undefined>("/application", applicationFetcher)
}
