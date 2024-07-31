import { sign, unsign } from "@tinyhttp/cookie-signature"
import nextSession from "next-session"

import { sessionConfig } from "@/config"

const { signingSecret, ...sessionOptions } = sessionConfig

export type DurHackLiveSessionRecord = Record<string, unknown>

export const getSession = nextSession<DurHackLiveSessionRecord>({
  store: undefined,
  encode: (raw: string): string => `s:${sign(raw, signingSecret)}`,
  decode: (signed: string): string | null => unsign(signed.slice(2), signingSecret) || null,
  autoCommit: false,
  ...sessionOptions,
})
