import session, { type SessionStore, type SessionData } from "@otterhttp/session"
import { Prisma } from "@prisma/client"

import { signCookie, unsignCookieOrThrow } from "@/lib/cookies"

import { sessionConfig } from "@/config"
import { prisma } from "@/database"

const { cookie: cookieOptions, ...sessionOptions } = sessionConfig

class PrismaSessionStore implements SessionStore {
  async destroy(sid: string): Promise<void> {
    try {
      await prisma.sessionRecord.delete({
        where: { sessionRecordId: sid },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // if the record didn't exist to be deleted, that's fine
        if (error.code === "P2025") return
      }
      throw error
    }
  }

  async get(sid: string): Promise<SessionData | null> {
    const sessionRecord = await prisma.sessionRecord.findUnique({
      where: { sessionRecordId: sid },
    })
    if (!sessionRecord) return null
    const sessionData = sessionRecord.data as SessionData | null
    if (sessionData == null) return null
    if (sessionData.cookie.expires && sessionData.cookie.expires.getTime() <= Date.now()) {
      await this.destroy(sid)
      return null
    }
    return sessionData
  }

  async set(sid: string, sess: SessionData<Record<string, Prisma.InputJsonValue>> & { userId: string }): Promise<void> {
    await prisma.sessionRecord.upsert({
      where: { sessionRecordId: sid },
      update: {
        userId: sess.userId ?? null,
        expiresAt: sess.cookie.expires,
        data: sess,
      },
      create: {
        sessionRecordId: sid,
        userId: sess.userId ?? null,
        expiresAt: sess.cookie.expires ?? null,
        data: sess,
      },
    })
  }

  async touch(sid: string, sess: SessionData): Promise<void> {
    await prisma.sessionRecord.update({
      where: { sessionRecordId: sid },
      data: {
        expiresAt: sess.cookie.expires,
      },
    })
  }
}

export type DurHackSessionRecord = Record<string, unknown> & {
  keycloakOAuth2FlowCodeVerifier?: string | undefined
}

export const getSession = session<DurHackSessionRecord>({
  store: new PrismaSessionStore(),
  ...sessionOptions,
  cookie: {
    ...cookieOptions,
    sign: signCookie,
    unsign: unsignCookieOrThrow,
  },
})
