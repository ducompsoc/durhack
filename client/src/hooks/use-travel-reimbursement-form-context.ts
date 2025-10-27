import type { TravelReimbursementForm } from "@durhack/durhack-common/types/application"
import ModuleError from "module-error"
import useSWR from "swr"

import { siteConfig } from "@/config/site"

export type { TravelReimbursementForm }

async function applicationFetcher(path: string): Promise<TravelReimbursementForm> {
  const url = new URL(path, siteConfig.apiUrl)
  const response = await fetch(url, { credentials: "include" })

  if (response.status === 401)
    throw new ModuleError("Couldn't fetch user registration details because user is not logged in", {
      code: "ERR_UNAUTHENTICATED",
    })
  if (!response.ok) throw new Error("Couldn't fetch user registration details for unknown reason")

  return (await response.json()).data as TravelReimbursementForm
}

export function useTravelReimbursementForm() {
  return useSWR<TravelReimbursementForm, unknown | undefined>("/travel-reimbursement-form", applicationFetcher)
}
