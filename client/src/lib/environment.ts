export const environment = process.env.NODE_ENV as string
export const isDevelopment = environment === "development"
export const isProduction = environment === "production"
export const isStaging = environment === "staging"
