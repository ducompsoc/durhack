import { Transform, type TransformCallback } from "node:stream"

import type { UserInfo } from "@/database"
import type { KeycloakAugmentedUserInfo } from "@/lib/keycloak-augmenting-transform"
import { isString } from "@/lib/type-guards"

export class DummyAugmentingTransform extends Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true, // the stream expects its _transform implementation to push objects, not a string/binary data
    })
  }

  augmentUserInfo(userInfo: UserInfo): KeycloakAugmentedUserInfo {
    return {
      ...userInfo,
      firstNames: "John",
      lastNames: "Doe",
      preferredNames: undefined,
      pronouns: "he/him",
      email: "john.d@durhack.com",
      phone: "+44XXXXxxxxxx",
    }
  }

  async augmentChunk(chunk: UserInfo[]): Promise<KeycloakAugmentedUserInfo[]> {
    return chunk.map((userInfo) => this.augmentUserInfo(userInfo))
  }

  _transform(chunk: UserInfo[], encoding: never, callback: TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => callback(null, filteredChunk satisfies KeycloakAugmentedUserInfo[]))
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}
