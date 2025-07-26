import stream from "node:stream"

import { prisma } from "@/database"
import { isString } from "@/lib/type-guards"

export type FlagAugments<Namespace extends string, Member extends string> = { [K in Namespace]: Member[] }

type FlagAugmentedUserInfo<Namespace extends string, Member extends string> = FlagAugments<Namespace, Member> & {
  userId: string
}

export class UserFlagAugmentingTransform<Namespace extends string, Member extends string> extends stream.Transform {
  namespace: Namespace

  constructor(namespace: Namespace) {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })

    this.namespace = namespace
  }

  async augmentUserInfo(userInfo: { userId: string }): Promise<FlagAugmentedUserInfo<Namespace, Member>> {
    const flags = await prisma.userFlag.findMany({
      where: { userId: userInfo.userId, flagName: { startsWith: `${this.namespace}:` } },
    })

    const members: Member[] = []

    for (const flag of flags) {
      const flagName = flag.flagName.substring(this.namespace.length + 1) as Member
      members.push(flagName)
    }

    const result = { [this.namespace as Namespace]: members } satisfies FlagAugments<string, Member> as FlagAugments<
      Namespace,
      Member
    >
    return { ...userInfo, ...result }
  }

  async augmentChunk(chunk: { userId: string }[]): Promise<FlagAugmentedUserInfo<Namespace, Member>[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: { userId: string }[], _encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies FlagAugmentedUserInfo<Namespace, Member>[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
