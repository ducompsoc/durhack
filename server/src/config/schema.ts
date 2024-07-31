import { z } from "zod"

export const listenOptionsSchema = z.object({
  host: z.string(),
  port: z.number().int().positive(),
})

export const cookieOptionsSchema = z.object({
  sameSite: z.union([z.literal("none"), z.literal("lax"), z.literal("strict")]).optional(),
  path: z.string().optional(),
  secure: z.boolean(),
  domain: z.string().optional(),
})

export const sessionOptionsSchema = z.object({
  name: z.string(),
  signingSecret: z.string(),
  cookie: cookieOptionsSchema,
})

export const keycloakOptionsSchema = z.object({
  url: z.string().url(),
  clientId: z.string(),
  clientSecret: z.string(),
  redirectUris: z.array(z.string()),
  responseTypes: z.array(z.union([z.literal("code"), z.literal("token"), z.literal("id_token"), z.literal("none")])),
})

export const configSchema = z.object({
  listen: listenOptionsSchema,
  hostname: z.string().url(),
  frontendHostname: z.string().url(),
  session: sessionOptionsSchema,
  keycloak: keycloakOptionsSchema,
})

export type Config = z.infer<typeof configSchema>
export type ConfigIn = z.input<typeof configSchema>
