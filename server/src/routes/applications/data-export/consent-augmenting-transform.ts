import stream from "node:stream"

import { prisma } from "@/database"
import { isString } from "@/lib/type-guards"

export type ConsentAugments<Consent extends string> = Record<Consent, boolean | undefined>

type ConsentAugmentedUserInfo<Consent extends string> = ConsentAugments<Consent> & { userId: string }

export class ConsentAugmentingTransform<Consent extends string> extends stream.Transform {
  consents: Consent[]

  constructor(consents: Record<Consent, true>) {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true, // the stream expects its _transform implementation to push an object (array)
    })

    this.consents = Object.keys(consents) as Consent[]
  }

  async augmentUserInfo(userInfo: { userId: string }): Promise<ConsentAugmentedUserInfo<Consent>> {
    const consentQueries = this.consents.map((consent) => {
      return prisma.userConsent.findUnique({ where: { id: { userId: userInfo.userId, consentName: consent } } })
    })
    const consents = await Promise.all(consentQueries)

    const result = Object.fromEntries(this.consents.map((consent) => [consent, undefined])) as Record<
      Consent,
      boolean | undefined
    >
    for (const consent of consents) {
      if (consent == null) continue
      result[consent.consentName as Consent] = consent.choice
    }

    return {
      ...userInfo,
      ...result,
    }
  }

  async augmentChunk(chunk: { userId: string }[]): Promise<ConsentAugmentedUserInfo<Consent>[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: { userId: string }[], encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies ConsentAugmentedUserInfo<Consent>[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
