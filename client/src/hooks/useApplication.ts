import useSWR from "swr";

import { siteConfig } from "@/config/site";

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
  graduation?: string
  levelOfStudy?: string
  country?: string
  mlhCode: boolean
  mlhTerms: boolean
  mlhMarketing: boolean
}

async function applicationFetcher(url: string): Promise<Application | null> {
  const uri = new URL(url, siteConfig.apiUrl).toString()
  const response = await fetch(uri, { credentials: "include" });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Couldn't fetch application!");

  return (await response.json()).data as Application;
}

export function useApplication() {
  return useSWR<Application | null, unknown | undefined>("/application", applicationFetcher);
}
