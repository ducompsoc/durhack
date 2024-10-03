type Environment = "staging" | "production" | "development" | "test"

function resolveEnvironment(): Environment {
  if (process.env.APP_ENV === "staging") return "staging"
  return process.env.NODE_ENV
}

export const environment = resolveEnvironment()
export const isDevelopment = environment === "development"
export const isProduction = environment === "production"
export const isStaging = environment === "staging"
