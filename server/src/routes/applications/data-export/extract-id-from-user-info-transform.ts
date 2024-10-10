import stream from 'node:stream'

import type { UserInfo } from "@/database";

export class ExtractIdFromUserInfoTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: false // the stream expects its _transform implementation to push a string/binary data
    })
  }

  _transform(chunk: UserInfo[], encoding: never, callback: stream.TransformCallback): void {
    let userIds: string[]
    try {
      userIds = chunk.map((item) => item.userId)
    } catch (e) {
      if (e instanceof Error)
        return callback(e)
      return callback(new Error())
    }
    callback(null, userIds.join("\n"))
  }
}
