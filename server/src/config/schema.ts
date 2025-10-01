import { z } from "zod/v4"

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
  realm: z.string(),
  baseUrl: z.url(),
  adminBaseUrl: z.url(),
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

export const stashEligibilityConditionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("points-threshold"),
    thresholdQuantity: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal("quest-completion"),
    questId: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal("cv-upload"),
  }),
])

export const durhackOptionsSchema = z.object({
  maximumTicketAssignment: z.number().nonnegative(),
  currentEventStart: z.date(),
  currentEventEnd: z.date(),
  interopMutualTls: z.object({
    clientCertificateFile: z.string(),
    clientCertificateKeyFile: z.string(),
  }),
  stashItems: z.record(
    z.string(), // 'slug'
    z.object({
      name: z.string(),
      eligibilityCondition: stashEligibilityConditionSchema,
    }),
  ),
})

export const configSchema = z.object({
  listen: listenOptionsSchema,
  origin: z.url(),
  frontendOrigin: z.url(),
  session: sessionOptionsSchema,
  cookieSigning: cookieSigningOptionsSchema,
  keycloak: keycloakOptionsSchema,
  mailgun: mailgunOptionsSchema,
  durhack: durhackOptionsSchema,
})

export type Config = z.infer<typeof configSchema>
export type ConfigIn = z.input<typeof configSchema>
