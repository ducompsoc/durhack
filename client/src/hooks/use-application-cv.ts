import type { Application } from "@durhack/durhack-common/types/application"
import type { FileInfo } from "@durhack/durhack-common/types/file-info"
import ModuleError from "module-error"
import useSWR from "swr"
import { siteConfig } from "@/config/site"

export type { Application }

async function applicationCvFetcher(path: string): Promise<FileInfo | null> {
  const url = new URL(path, siteConfig.apiUrl)
  const response = await fetch(url, { credentials: "include" })

  if (response.status === 401)
    throw new ModuleError("Couldn't fetch user CV file info because user is not logged in", {
      code: "ERR_UNAUTHENTICATED",
    })
  if (!response.ok) throw new Error("Couldn't fetch user CV file info for unknown reason")

  return (await response.json()).data.cvFileInfo as FileInfo | null
}

export function useApplicationCv() {
  return useSWR<FileInfo | null, unknown | undefined>("/application/cv", applicationCvFetcher)
}
