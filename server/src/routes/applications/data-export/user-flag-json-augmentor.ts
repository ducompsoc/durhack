import stream from "node:stream"

import { prisma } from "@/database"
import { isString } from "@/lib/type-guards"

export type FlagAugments<Namespace extends string> = Record<Namespace, string | undefined>

type FlagAugmentedUserInfo<Namespace extends string> = FlagAugments<Namespace> & { userId: string }

export class UserFlagAugmentor<Namespace extends string> extends stream.Transform {
  namespaces: Namespace[]

  constructor(flags: Record<Namespace, "">) {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })

    this.namespaces = Object.keys(flags) as Namespace[]
  }

  async augmentUserInfo(userInfo: { userId: string }): Promise<FlagAugmentedUserInfo<Namespace>> {
    const flags = await prisma.userFlag.findMany({ where: { userId: userInfo.userId } })

    const result = Object.fromEntries(this.namespaces.map((namespace) => [namespace, ""])) as Record<
      Namespace,
      string | undefined
    >

    for (const namespace of this.namespaces) {
      const namespace_arr: string[] = []
      for (const flag of flags) {
        const [flagNamespace, flagName]: string[] = flag.flagName.split(":")
        if (flagNamespace === namespace) namespace_arr.push(flagName)
      }
      result[namespace] = JSON.stringify(namespace_arr)
    }

    return { ...userInfo, ...result }
  }

  async augmentChunk(chunk: { userId: string }[]): Promise<FlagAugmentedUserInfo<Namespace>[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: { userId: string }[], _encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies FlagAugmentedUserInfo<Namespace>[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
