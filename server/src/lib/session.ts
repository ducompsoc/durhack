import nextSession from "@otterhttp/session"

import { signCookie, unsignCookieOrThrow } from "@/lib/cookies"

import { sessionConfig } from "@/config"

const { cookie: cookieOptions, ...sessionOptions } = sessionConfig

export type DurHackSessionRecord = Record<string, unknown> & {
  keycloakOAuth2FlowCodeVerifier?: string | undefined
}

export const getSession = nextSession<DurHackSessionRecord>({
  store: undefined,
  ...sessionOptions,
  cookie: {
    ...cookieOptions,
    sign: signCookie,
    unsign: unsignCookieOrThrow,
  },
})
