import { createHash } from "node:crypto"

import type { Middleware } from "@/types"

const schoolNameRegex = /^"(.+)"$|^(.+)$/gm

export async function getVerifiedInstitutionsSet(): Promise<Set<string>> {
  const response = await fetch("https://github.com/MLH/mlh-policies/raw/main/schools.csv")
  const body = await response.text()
  const matches = body.matchAll(schoolNameRegex)
  matches.next() // ignore the header line
  const schoolNames = Array.from(matches).map((match) => match[1] ?? match[2])
  return new Set(schoolNames)
}

export const verifiedInstitutionsSet = await getVerifiedInstitutionsSet()
const verifiedInstitutionsList = Array.from(verifiedInstitutionsSet)

const institutionOptions = verifiedInstitutionsList.map((institutionName) => ({
  label: institutionName,
  value: institutionName,
}))

const institutionOptionsETagSource = institutionOptions.map((option) => option.value).join(";")
const institutionOptionsETag = createHash("sha256").update(institutionOptionsETagSource).digest("hex")

export function getApplicationInstitutionOptions(): Middleware {
  return async (request, response) => {
    response.setHeader("etag", institutionOptionsETag)
    response.validatePreconditions()

    response.json({
      data: institutionOptions,
    })
  }
}
