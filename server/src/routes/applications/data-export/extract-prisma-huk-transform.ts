import stream from 'node:stream'

import { prisma, type UserInfo } from "@/database"

export class ExtractPrismaHUKTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: false // the stream expects its _transform implementation to push a string/binary data
    })
  }

_transform(chunk: UserInfo[], encoding: never, callback: stream.TransformCallback): void {
    try {
      this._transformAsync(chunk)
      .then((prismaFields)=>{
        prismaFields.forEach(field => this.push(field + "\r"))
        callback()
      })
    } catch (e) {
      if (e instanceof Error)
        return callback(e)
      return callback(new Error())
    }
  }

  // async portion, wait for and process what was obtained via prisma, join it into a comma separated line 
async _transformAsync(chunk: UserInfo[]): Promise<string[]> {
    const prismaFields = await Promise.all(chunk.map(async (item)=>{
      const result = await this._getPrismaField(item.userId)
      return Object.values(result).join(',')
    }))
    return prismaFields
} 

async _getPrismaField(userId: string): Promise<object>{
  const foundFields = await prisma.userInfo.findFirst({
    where: {
      userId: userId,
    },
    select:{
      university: true,
      graduationYear: true,
      ethnicity: true,
      gender: true,
    }
  })

  const foundAttendance = await prisma.userFlag.findFirst({
    where:{
      userId: userId,
      flagName: "attendance"
    }
  })

  if(foundAttendance == null)
    return {...foundFields, attendance: false} as object

  return {...foundFields, attendance: true} as object
}
}