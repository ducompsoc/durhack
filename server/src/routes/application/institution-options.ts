import { createHash } from "node:crypto"

import type { Middleware } from "@/types"

const schoolNameRegex = /^"?(.+)"?$/gm

export async function getVerifiedInstitutionsList(): Promise<string[]> {
  const response = await fetch("https://github.com/MLH/mlh-policies/raw/main/schools.csv")
  const body = await response.text()
  const matches = body.matchAll(schoolNameRegex)
  matches.next() // ignore the header line
  const schoolNames = Array.from(matches).map((match) => match[1])
  const uniqueSchoolNames = new Set(schoolNames)
  return Array.from(uniqueSchoolNames)
}

const institutionOptions = (await getVerifiedInstitutionsList()).map((institutionName) => ({
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
