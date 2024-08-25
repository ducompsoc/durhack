import nextSession from "next-session"

import { sessionConfig } from "@/config"
import {signCookie, unsignCookie} from "@/lib/cookies";

export type DurHackLiveSessionRecord = Record<string, unknown>

export const getSession = nextSession<DurHackLiveSessionRecord>({
  store: undefined,
  encode: signCookie,
  decode: unsignCookie,
  autoCommit: false,
  ...sessionConfig,
})
