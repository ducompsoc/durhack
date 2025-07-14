import stream from "node:stream"
import { prisma, type UserInfo } from "@/database"

import { isString } from "@/lib/type-guards"

export type UserCvAugment = {
  is_cv_uploaded: boolean
  cv_update_time: Date | null
}

type CvAugmentedUserInfo = { userId: string } & UserCvAugment

export class UserCvAugmentingTransform extends stream.Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: true })
  }

  async augmentUserInfo(userInfo: UserInfo): Promise<CvAugmentedUserInfo> {
    const foundCV = await prisma.userCV.findUnique({
      where: {
        userId: userInfo.userId,
      },
      select: {
        updatedAt: true,
      },
    })

    return { ...userInfo, is_cv_uploaded: !!foundCV, cv_update_time: foundCV ? foundCV.updatedAt : null }
  }

  async augmentChunk(chunk: UserInfo[]): Promise<CvAugmentedUserInfo[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: UserInfo[], _encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies CvAugmentedUserInfo[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
