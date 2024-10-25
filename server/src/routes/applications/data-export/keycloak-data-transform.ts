import stream from 'node:stream'
import ModuleError from 'module-error'

import { groupPromiseSettledResultsByStatus } from "@/lib/group-promise-settled-results-by-status"
import { isNetworkError } from "@/lib/is-network-error"
import { getKeycloakAdminClient, unpackAttribute } from "@/lib/keycloak-client"
import { isString } from "@/lib/type-guards"

import { UserInfo } from '@prisma/client'

export type KeycloakInfo = UserInfo & {
  firstNames: string
  lastNames: string
  email: string
  phone: string | undefined
}


export class KeycloakDataTransform extends stream.Transform {
  constructor() {
    super({
      writableObjectMode: true, // the stream expects to receive objects, not a string/binary data
      readableObjectMode: true // the stream expects its _transform implementation to push an object (array)
    })
  }

  async augmentUserInfo(userInfo: UserInfo): Promise<KeycloakInfo> {
    const adminClient = await getKeycloakAdminClient()
    const profile = await adminClient.users.findOne({ id: userInfo.userId })
    if (profile == null) throw new ModuleError("Keycloak user does not exist", { code: "ERR_KEYCLOAK_USER_NOT_FOUND" })

    const firstNames = unpackAttribute(profile, "firstNames")
    const lastNames = unpackAttribute(profile, "lastNames")
    const email = profile.email
    const phone = unpackAttribute(profile, "phone")

    if (firstNames == null)
      throw new ModuleError("Keycloak user missing first names", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })
    if (lastNames == null)
      throw new ModuleError("Keycloak user missing last names", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })
    if (email == null)
      throw new ModuleError("Keycloak user missing email address", { code: "ERR_KEYCLOAK_USER_MISSING_REQUIRED_FIELD" })

    return {
      firstNames,
      lastNames,
      email,
      phone,
      ...userInfo,
    }
  }

  async augmentUserInfoWithRetry(userInfo: UserInfo): Promise<KeycloakInfo> {
    const errors: Error[] = []
    for (let i = 0; i < 3; i++) {
      try {
        return await this.augmentUserInfo(userInfo)
      } catch (error) {
        if (!isNetworkError(error)) throw error
        errors.push(error)
      }
    }
    throw new AggregateError(errors)
  }

  async augmentChunk(chunk: UserInfo[]): Promise<KeycloakInfo[]> {
    const results = await Promise.allSettled(chunk.map((userInfo) => this.augmentUserInfoWithRetry(userInfo)))
    const { fulfilled, rejected } = groupPromiseSettledResultsByStatus(results)
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

  _transform(chunk: UserInfo[], encoding: never, callback: stream.TransformCallback): void {
    this.augmentChunk(chunk)
      .then((filteredChunk) => {
        callback(null, filteredChunk satisfies KeycloakInfo[])
      })
      .catch((error: unknown) => {
        if (error instanceof Error) callback(error)
        if (isString(error)) callback(new Error(error))
        callback(new Error(`Something really strange happened. Error object: ${error}`))
      })
  }
}