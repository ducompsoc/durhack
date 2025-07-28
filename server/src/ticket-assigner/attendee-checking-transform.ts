import { Transform, type TransformCallback } from "node:stream"

import { durhackConfig } from "@/config"
import type { UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"

export class AttendeeCheckingTransform extends Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true, // the stream expects its _transform implementation to push objects, not a string/binary data
    })
  }

  isStudentOrRecentGraduate(userInfo: UserInfo): boolean {
    if (userInfo.graduationYear == null) return false
    if (userInfo.graduationYear < durhackConfig.currentEventYear) return false
    if (userInfo.graduationYear > durhackConfig.currentEventYear + 6) return false
    return true
  }

  isPermittedAttendee(userInfo: UserInfo): boolean {
    if (userInfo.applicationStatus === "unsubmitted") return false
    if (userInfo.age == null || userInfo.age < 18) return false
    if (!this.isStudentOrRecentGraduate(userInfo)) return false
    return true
  }

  async filterChunkForPermittedAttendees(chunk: UserInfo[]): Promise<UserInfo[]> {
    return chunk.filter((userInfo) => this.isPermittedAttendee(userInfo))
  }

  _transform(chunk: UserInfo[], _encoding: never, callback: TransformCallback): void {
    this.filterChunkForPermittedAttendees(chunk)
      .then((filteredChunk) => callback(null, filteredChunk satisfies UserInfo[]))
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
