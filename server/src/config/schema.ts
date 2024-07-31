import { z } from "zod"

export const listenOptionsSchema = z.object({
  host: z.string(),
  port: z.number().int().positive(),
})

export const cookieOptionsSchema = z.object({
  sameSite: z.union([z.literal("none"), z.literal("lax"), z.literal("strict")]).optional(),
  path: z.string().optional(),
  secure: z.boolean(),
})

export const sessionOptionsSchema = z.object({
  name: z.string(),
  signingSecret: z.string(),
  cookie: cookieOptionsSchema,
})

export const configSchema = z.object({
  listen: listenOptionsSchema,
  url: z.string().url(),
  siteUrl: z.string().url(),
  session: sessionOptionsSchema,
})

export type Config = z.infer<typeof configSchema>
export type ConfigIn = z.input<typeof configSchema>
