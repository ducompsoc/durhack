import stream from "node:stream"

import { isString } from "@/lib/type-guards"

export class FilteringTransform<Item> extends stream.Transform {
  filterPredicate: (item: Item) => boolean

  constructor(filterPredicate: (item: Item) => boolean) {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true, // the stream expects its _transform implementation to push an object (array)
    })
    this.filterPredicate = filterPredicate
  }

  _transform(chunk: Item[], encoding: never, callback: stream.TransformCallback): void {
    try {
      const filteredChunk = chunk.filter((item) => this.filterPredicate(item))
      callback(null, filteredChunk satisfies Item[])
    } catch (error) {
      if (error instanceof Error) callback(error)
      if (isString(error)) callback(new Error(error))
      callback(new Error(`Something really strange happened. Error object: ${error}`))
    }
  }
}
