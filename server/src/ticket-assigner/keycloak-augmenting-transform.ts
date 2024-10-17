import { Transform, type TransformCallback } from "node:stream"
import ModuleError from "module-error"

import type { UserInfo } from "@/database"
import { isString } from "@/lib/type-guards"
import { getKeycloakAdminClient, unpackAttribute } from "@/lib/keycloak-client"
import { isNetworkError } from "@/lib/is-network-error"
import { groupPromiseSettledResultsByStatus } from "@/lib/group-promise-settled-results-by-status"


export type KeycloakAugmentedUserInfo = UserInfo & {
  firstNames: string,
  lastNames: string,
  preferredNames: string | undefined,
  pronouns: "he/him" | "she/her" | "they/them" | "xe/xem" | "Please Ask" | "Unspecified",
  email: string,
  phone: string | undefined,
}

export class KeycloakAugmentingTransform extends Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true // the stream expects its _transform implementation to push objects, not a string/binary data
    })
  }

  async augmentUserInfo(userInfo: UserInfo): Promise<KeycloakAugmentedUserInfo> {
    const adminClient = await getKeycloakAdminClient()
    const profile = await adminClient.users.findOne({ id: userInfo.userId })
    if (profile == null) throw new ModuleError("Keycloak user does not exist", { code: "ERR_KEYCLOAK_USER_NOT_FOUND" })

    const firstNames = unpackAttribute(profile, "firstNames")
    const lastNames = unpackAttribute(profile, "lastNames")
    const preferredNames = unpackAttribute(profile, "preferredNames")
    const pronouns = unpackAttribute<KeycloakAugmentedUserInfo["pronouns"]>(profile, "pronouns", "Unspecified")
    const email = profile.email
    const phone = unpackAttribute(profile, "phone")

    if (firstNames == null) throw new ModuleError("Keycloak user missing first names", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })
    if (lastNames == null) throw new ModuleError("Keycloak user missing last names", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })
    if (email == null) throw new ModuleError("Keycloak user missing email address", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })

    return {
      ...userInfo,
      firstNames,
      lastNames,
      preferredNames,
      pronouns,
      email,
      phone,
    }
  }

  async augmentUserInfoWithRetry(userInfo: UserInfo): Promise<KeycloakAugmentedUserInfo> {
    const errors: Error[] = []
    for (let i = 0; i < 3; i++) {
      try {
        return await this.augmentUserInfo(userInfo)
      }
      catch (error) {
        if (!isNetworkError(error)) throw error
        errors.push(error)
      }
    }
    throw new AggregateError(errors)
  }

  async augmentChunk(chunk: UserInfo[]): Promise<KeycloakAugmentedUserInfo[]> {
    const results = await Promise.allSettled(chunk.map((userInfo) => this.augmentUserInfoWithRetry(userInfo)))
    const {fulfilled, rejected} = groupPromiseSettledResultsByStatus(results)
    if (rejected.length === 0) return fulfilled.map((result) => result.value)

    const rejectedGroupedBySeverity = Object.groupBy(rejected, (result) => {
      if (isNetworkError(result.reason)) return "fatal"
      if (!(result.reason instanceof ModuleError)) return "fatal"
      // if the DurHack website database thinks a keycloak user exists, but they actually don't, just ignore that user
      if (result.reason.code === "ERR_KEYCLOAK_USER_NOT_FOUND") return "ignore"

      return "fatal"
    })

    if (Object.hasOwn(rejectedGroupedBySeverity, "fatal") && rejectedGroupedBySeverity.fatal != null) {
      throw new AggregateError(rejectedGroupedBySeverity.fatal.map((result) => result.reason))
    }

    return fulfilled.map((result) => result.value)
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
