import nextSession from "next-session"
import { sign, unsign } from "@otterhttp/cookie-signature"

import { sessionConfig, cookieSigningConfig } from "@/config"

export type DurHackSessionRecord = Record<string, unknown> & {
  keycloakOAuth2FlowCodeVerifier?: string | undefined
}

export const getSession = nextSession<DurHackSessionRecord>({
  store: undefined,
  encode: (value: string): string => `s:${sign(value, cookieSigningConfig.secret)}`,
  decode: (encodedValue: string): string | null => unsign(encodedValue.slice(2), cookieSigningConfig.secret) || null,
  autoCommit: false,
  ...sessionConfig,
})
