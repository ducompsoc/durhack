import stream from "node:stream"
import { isString } from "@/lib/type-guards"

export type IdAugments = { id: number }

type IdAugmentedUserInfo = IdAugments & { userId: string }

export class AnonymousIdAugmentingTransform extends stream.Transform {
  counter: number

  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })

    this.counter = 0
  }

  augmentUserInfo(userInfo: { userId: string; id?: number }): IdAugmentedUserInfo {
    userInfo.id = this.counter++
    return userInfo as IdAugmentedUserInfo
  }

  async augmentChunk(chunk: { userId: string }[]): Promise<IdAugmentedUserInfo[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: { userId: string }[], _encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies IdAugmentedUserInfo[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
