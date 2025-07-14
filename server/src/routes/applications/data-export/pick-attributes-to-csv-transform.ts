import stream from "node:stream"

import { isBoolean, isNumber, isString } from "@/lib/type-guards"

type Attribute<Source extends Record<string, unknown>> = { name: keyof Source; label: string }

const nullSentry = "NULL"

export class PickAttributesToCsvTransform<Source extends Record<string, unknown>> extends stream.Transform {
  attributes: Attribute<Source>[]
  headerLinePrepended: boolean

  constructor({ attributes }: { attributes: Attribute<Source>[] }) {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: false, // the stream expects its _transform implementation to push a string/binary data
    })

    this.attributes = attributes
    this.headerLinePrepended = false
  }

  pickAttributesToCsv(item: Source): string {
    const values: string[] = []
    for (const attribute of this.attributes) {
      const attributeValue = item[attribute.name]

      if (attributeValue == null) {
        values.push(nullSentry)
        continue
      }

      if (isString(attributeValue)) {
        values.push(`"${attributeValue}"`)
        continue
      }

      if (isNumber(attributeValue)) {
        values.push(String(attributeValue))
        continue
      }

      if (isBoolean(attributeValue)) {
        values.push(String(attributeValue))
        continue
      }

      throw new Error(`Unsupported value ${attributeValue} for ${String(attribute.name)}`)
    }

    return values.join(";")
  }

  computeHeaderLine(): string {
    const labels = this.attributes.map((attribute) => attribute.label)
    return labels.join(";")
  }

  _transform(chunk: Source[], _encoding: never, callback: stream.TransformCallback) {
    try {
      const transformedChunk = chunk.map((item) => this.pickAttributesToCsv(item))
      if (!this.headerLinePrepended) {
        const headerLine = this.computeHeaderLine()
        transformedChunk.unshift(headerLine)
        this.headerLinePrepended = true
      }
      transformedChunk.push("") // hack to ensure trailing newline
      callback(null, transformedChunk.join("\n"))
    } catch (error) {
      if (error instanceof Error) return callback(error)
      if (isString(error)) return callback(new Error(error))
      return callback(new Error(`Something really strange happened. Error object: ${error}`))
    }
  }
}
