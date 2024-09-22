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

export const cookieSigningOptionsSchema = z.object({
  secret: z.string(),
})

export const sessionOptionsSchema = z.object({
  cookie: cookieOptionsSchema.extend({
    name: z.string().optional(),
  }),
})

export const keycloakOptionsSchema = z.object({
  url: z.string().url(),
  adminBaseUrl: z.string().url(),
  clientId: z.string(),
  clientSecret: z.string(),
  redirectUris: z.array(z.string()),
  responseTypes: z.array(z.union([z.literal("code"), z.literal("token"), z.literal("id_token"), z.literal("none")])),
})

export const mailgunOptionsSchema = z.object({
  username: z.string(),
  key: z.string(),
  domain: z.string(),
  sendAsDomain: z.string(),
  url: z.string(),
})

export const configSchema = z.object({
  listen: listenOptionsSchema,
  origin: z.string().url(),
  frontendOrigin: z.string().url(),
  session: sessionOptionsSchema,
  cookieSigning: cookieSigningOptionsSchema,
  keycloak: keycloakOptionsSchema,
  mailgun: mailgunOptionsSchema,
})

export type Config = z.infer<typeof configSchema>
export type ConfigIn = z.input<typeof configSchema>
