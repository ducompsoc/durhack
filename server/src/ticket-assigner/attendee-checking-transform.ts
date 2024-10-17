import { Transform, type TransformCallback } from 'node:stream'

import type { UserInfo } from "@/database"
import { isString } from "@/lib/type-guards";

export class AttendeeCheckingTransform extends Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true // the stream expects its _transform implementation to push objects, not a string/binary data
    })
  }

  isPermittedAttendee(userInfo: UserInfo): boolean {
    if (userInfo.applicationStatus === "unsubmitted") return false
    if (userInfo.age == null || userInfo.age < 18) return false
    return true
  }

  async filterChunkForPermittedAttendees(chunk: UserInfo[]): Promise<UserInfo[]> {
    return chunk.filter((userInfo) => this.isPermittedAttendee(userInfo))
  }

  _transform(chunk: UserInfo[], encoding: never, callback: TransformCallback): void {
    this.filterChunkForPermittedAttendees(chunk)
      .then((filteredChunk) => callback(null, filteredChunk satisfies UserInfo[]))
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
