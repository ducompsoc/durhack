import useSWR from "swr"

import { siteConfig } from "@/config/site"

export type Application = {
  email: string
  preferredNames?: string
  pronouns?: string
  phone?: string
  firstNames?: string
  lastNames?: string
  applicationStatus?: string
  age?: string
  university?: string
  graduationYear?: string
  levelOfStudy?: string
  countryOfResidence?: string
  mlhCode: boolean
  mlhTerms: boolean
  mlhMarketing: boolean
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "noUpload"
}

async function applicationFetcher(path: string): Promise<Application | null> {
  const url = new URL(path, siteConfig.apiUrl).toString()
  const response = await fetch(url, { credentials: "include" })

  if (response.status === 401) return null
  if (!response.ok) throw new Error("Couldn't fetch application!")

  return (await response.json()).data as Application
}

export function useApplication() {
  return useSWR<Application | null, unknown | undefined>("/application", applicationFetcher)
}
