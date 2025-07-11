import assert from "node:assert/strict"
import stream from "node:stream"
import type { UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"

export type AgeAugment = {
  ageGroup: "<18" | "18-21" | "22-25" | "26-29" | "30-39" | "40-59" | "60+"
}

type AgeAugmentedUserInfo = { userId: string } & AgeAugment

export class UserAgeAugmentingTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    })
  }

  augmentUserInfo(userInfo: UserInfo): AgeAugmentedUserInfo {
    const age = userInfo.age
    let ageGroupAugment: AgeAugment
    // If the user has submitted, the age must have been provided
    assert(userInfo.applicationSubmittedAt)
    assert(age)

    if (age < 18) {
      ageGroupAugment = { ageGroup: "<18" }
    } else if (age < 22) {
      ageGroupAugment = { ageGroup: "18-21" }
    } else if (age < 26) {
      ageGroupAugment = { ageGroup: "22-25" }
    } else if (age < 30) {
      ageGroupAugment = { ageGroup: "26-29" }
    } else if (age < 40) {
      ageGroupAugment = { ageGroup: "30-39" }
    } else if (age < 60) {
      ageGroupAugment = { ageGroup: "40-59" }
    } else {
      ageGroupAugment = { ageGroup: "60+" }
    }

    return { ...userInfo, ...ageGroupAugment }
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
