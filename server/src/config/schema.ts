import { z } from "zod"

export const listenOptionsSchema = z.object({
  host: z.string(),
  port: z.number().int().positive(),
})

export const configSchema = z.object({
  listen: listenOptionsSchema,
  url: z.string().url(),
  siteUrl: z.string().url(),
})

export type Config = z.infer<typeof configSchema>
export type ConfigIn = z.input<typeof configSchema>
