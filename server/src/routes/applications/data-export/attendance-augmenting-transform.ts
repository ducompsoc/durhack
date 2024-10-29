import stream from "node:stream"

import { type UserInfo, prisma } from "@/database"
import { isString } from "@/lib/type-guards"

export type AttendanceAugments = {
  isCheckedIn: boolean
}

type AttendanceAugmentedUserInfo = AttendanceAugments & { userId: string }

export class AttendanceAugmentingTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true, // the stream expects its _transform implementation to push an object (array)
    })
  }

  async augmentUserInfo(userInfo: UserInfo): Promise<AttendanceAugmentedUserInfo> {
    const foundAttendance = await prisma.userFlag.findUnique({
      where: {
        id: {
          userId: userInfo.userId,
          flagName: "attendance",
        },
      },
    })

    return {
      ...userInfo,
      isCheckedIn: foundAttendance != null,
    }
  }

  async augmentChunk(chunk: UserInfo[]): Promise<AttendanceAugmentedUserInfo[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: UserInfo[], encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies AttendanceAugmentedUserInfo[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
