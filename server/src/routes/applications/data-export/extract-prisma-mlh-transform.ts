import stream from "node:stream"

import { prisma } from "@/database"
import type { MLHDataExportBase } from "./data-export-handlers"

export class ExtractPrismaMLHTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: false, // the stream expects its _transform implementation to push a string
    })
  }

  _transform(chunk: MLHDataExportBase[], encoding: never, callback: stream.TransformCallback): void {
    this._transformAsync(chunk)

      .then((MLHPrismaData) => {
        MLHPrismaData.forEach((field) => {
          this.push(
            `${field.firstNames},${field.lastNames},${field.email},${field.phone},${field.age ?? ""},${field.university ?? ""},${field.countryOfResidence ?? ""},${field.levelOfStudy ?? ""},${field.isCheckedIn}\r`,
          )
        })
        callback(null)
      })

      .catch((e) => {
        if (e instanceof Error) return callback(e)
        return callback(new Error())
      })
  }

  // async portion, wait for and process what was obtained via prisma, join it into a comma separated line
  async _transformAsync(chunk: MLHDataExportBase[]): Promise<MLHDataExportBase[]> {
    const MLHPrismaData = await Promise.all(
      chunk.map(async (item) => {
        const isCheckedIn = await this._getAttendanceData(item.userId)
        return { ...item, isCheckedIn }
      }),
    )
    return MLHPrismaData
  }

  async _getAttendanceData(userId: string): Promise<boolean> {
    const foundAttendance = await prisma.userFlag.findFirst({
      where: {
        userId: userId,
        flagName: "attendance",
      },
    })

    return foundAttendance != null
  }
}
