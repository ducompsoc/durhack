import { writeFile } from "node:fs/promises"
import path from "node:path"
import stream from "node:stream"

import type { UserCV } from "@/database"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"
import { hasCode, isString } from "@/lib/type-guards"

type AugmentedUserCV = UserCV & KeycloakAugments

export class CvExportingWritable extends stream.Writable {
  directoryPath: string

  constructor(path: string) {
    super({
      objectMode: true, // the stream expects to receive objects, not a string/binary data
    })
    this.directoryPath = path
  }

  escapeName(name: string): string {
    return encodeURIComponent(name.replace(/\s+/g, "_").normalize())
  }

  contentTypeExtension(cvContentType: string): string {
    if (cvContentType === "application/pdf") return ".pdf"
    if (cvContentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return ".docx"
    if (cvContentType === "application/msword") return ".doc"
    throw new Error(`Unsupported CV file format: ${cvContentType}`)
  }

  filepathDiscriminator(attemptIndex: number): string {
    if (attemptIndex === 0) return ""
    return `_${attemptIndex}`
  }

  async writeCV(cv: AugmentedUserCV): Promise<void> {
    const escapedFirstNames = this.escapeName(cv.firstNames)
    const escapedLastNames = this.escapeName(cv.lastNames).toUpperCase()
    const filepathExtension = this.contentTypeExtension(cv.contentType)
    const filepathStem = `${escapedLastNames}_${escapedFirstNames}`

    let written = false
    let attemptIndex = 0

    while (!written) {
      const discriminator = this.filepathDiscriminator(attemptIndex)
      const filename = `${filepathStem}${discriminator}${filepathExtension}`

      try {
        await writeFile(path.join(this.directoryPath, filename), cv.content, { flag: "wx" })
      } catch (error) {
        if (!hasCode(error) || error.code !== "EEXIST") throw error
        attemptIndex += 1
        continue
      }

      written = true
    }
  }

  async writeManyCVs(chunk: AugmentedUserCV[]): Promise<void> {
    await Promise.all(chunk.map((cv) => this.writeCV(cv)))
  }

  _write(chunk: AugmentedUserCV[], encoding: never, callback: (error?: Error | null) => void) {
    this.writeManyCVs(chunk)
      .then(() => callback())
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
