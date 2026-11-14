"use client"

import {
  type DietaryRequirement,
  getDietaryRequirementMetadata,
} from "@durhack/durhack-common/input/dietary-requirement"
import ModuleError from "module-error"
import useSWR from "swr"
import { siteConfig } from "@/config/site"
import { isLoaded } from "@/lib/is-loaded"
import { HttpStatus } from "@/lib/status-codes"
import { hasCode } from "@/lib/type-guards"

const dietaryRequirementFetcher = async (url: string): Promise<DietaryRequirement[]> => {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
    credentials: "include",
  })
  if (response.status === HttpStatus.NotFound)
    throw new ModuleError("Dietary requirements not found", { code: "ERR_NOT_FOUND" })
  if (!response.ok) throw new Error("Failed to fetch data")
  const payload: unknown = await response.json()
  if (typeof payload !== "object" || Array.isArray(payload))
    throw new Error(`Expected response type 'object', got '${typeof payload}'`)
  if (payload === null) throw new Error("Unexpected null response")
  if (!Object.hasOwn(payload, "data")) throw new Error("Response missing expected member `data`")
  return payload.data as DietaryRequirement[]
}

export function DietaryRequirementsDisplay({ userId }: { userId: string }): React.ReactNode {
  const {
    data: dietaryRequirements,
    isLoading: dietaryRequirementsAreLoading,
    error: dietaryRequirementsError,
  } = useSWR<DietaryRequirement[], unknown>(
    `${siteConfig.apiUrl}/profile/${userId}/dietary-requirements`,
    dietaryRequirementFetcher,
  )

  if (hasCode(dietaryRequirementsError) && dietaryRequirementsError.code === "ERR_NOT_FOUND") return <p>Unknown</p>
  if (!isLoaded(dietaryRequirements, dietaryRequirementsAreLoading, dietaryRequirementsError)) {
    return <p>...</p>
  }

  if (dietaryRequirements.length === 0) return <p>None</p>

  return (
    <p className="comma-separate">
      {dietaryRequirements.map((item) => (
        <span>{getDietaryRequirementMetadata(item).label}</span>
      ))}
    </p>
  )
}
