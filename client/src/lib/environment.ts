import { isString } from "@/lib/type-guards"

const environments = ["staging", "production", "development", "test"] as const
const environmentsSet = new Set<string>(environments)
type Environment = (typeof environments)[number]

function isEmptyOrWhitespaceString(value: string): boolean {
  return value.replace(/\s/g, "").length === 0
}

function isSet(value: string | undefined): value is string {
  return isString(value) && !isEmptyOrWhitespaceString(value)
}

function isEnvironment(value: string | undefined): value is Environment {
  if (value == null) return false
  return environmentsSet.has(value)
}

function resolveEnvironment(): Environment {
  if (isEnvironment(process.env.NEXT_PUBLIC_APP_ENV)) return process.env.NEXT_PUBLIC_APP_ENV
  return process.env.NODE_ENV
}

export const environment = resolveEnvironment()
export const isDevelopment = environment === "development"
export const isProduction = environment === "production"
export const isStaging = environment === "staging"

export const noLocalServer = isSet(process.env.NO_LOCAL_SERVER)
