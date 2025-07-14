import assert from "node:assert/strict"
import stream from "node:stream"
import type { UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"

type AgeGroup = "<18" | "18-21" | "22-25" | "26-29" | "30-39" | "40-59" | "60+"

export type AgeAugment = {
  ageGroup: AgeGroup
}

type AgeAugmentedUserInfo = { userId: string } & AgeAugment

export class UserAgeAugmentingTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })
  }

  resolveAgeGroup(age: number): AgeGroup {
    if (age < 18) {
      return "<18"
    }
    if (age <= 21) {
      return "18-21"
    }
    if (age <= 25) {
      return "22-25"
    }
    if (age <= 29) {
      return "26-29"
    }
    if (age <= 39) {
      return "30-39"
    }
    if (age <= 59) {
      return "40-59"
    }
    return "60+"
  }

  augmentUserInfo(userInfo: UserInfo): AgeAugmentedUserInfo {
    assert(userInfo.applicationSubmittedAt)
    assert(userInfo.age)

    const ageGroup: AgeGroup = this.resolveAgeGroup(userInfo.age)

    return { ...userInfo, ageGroup }
  }

  async augmentChunk(chunk: UserInfo[]): Promise<AgeAugmentedUserInfo[]> {
    return await Promise.all(chunk.map((userInfo) => this.augmentUserInfo(userInfo)))
  }

  _transform(chunk: UserInfo[], _encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies AgeAugmentedUserInfo[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) return callback(error)
        if (isString(error)) return callback(new Error(error))
        return callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
