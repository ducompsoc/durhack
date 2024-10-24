import { ServerError } from "@otterhttp/errors"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { createWriteStream } from "node:fs"
import { rm } from "node:fs/promises"
import { join as pathJoin } from "node:path"

import { Group, onlyGroups } from "@/decorators/authorise"
import { getTempDir } from "@/lib/temp-dir"
import type { Middleware } from "@/types"

import { generateUserInfo } from "./user-info-async-generator"
import { KeycloakDataTransform } from "./keycloak-data-transform"
import { ExtractPrismaMLHTransform } from "./extract-prisma-mlh-transform"
import { ExtractPrismaHUKTransform } from "./extract-prisma-huk-transform"

import { profilesHandlers } from "@/routes/profiles/profiles-handlers"
import { CreateMLHHeaderTransform, CreateHUKHeaderTransform } from "./create-header-transform"

export type ethnicityEnum = "american" | "asian" | "black" | "hispanic" | "white" | "other" | "prefer_not_to_answer" | undefined
export type genderEnum = "male" | "female" | "non_binary" | "other" | "prefer_not_to_answer" | undefined

export type MLHDataExportBase = {
  firstNames: string
  lastNames: string
  email: string
  phone: string | undefined
  
  userId: string
  age: number | null
  university: string | null
  countryOfResidence: string | null
  levelOfStudy: string | null
  isCheckedIn: boolean
}

export type HUKDataExportBase = {
  firstNames: string
  lastNames: string
  email: string
  phone: string | undefined

  userId: string
  university: string | null
  graduationYear: number | null
  ethnicity: ethnicityEnum | null
  gender: genderEnum
  isCheckedIn: boolean
}

class DataExportHandlers {
  /**
   * Returns a middleware that handles a GET request by responding with a `.csv` payload containing
   * exported application data for Major League Hacking with <code>Content-Disposition: attachment</code>.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getMajorLeagueHacking(): Middleware {
    return async (request, response) => {
      const tempDir = await getTempDir()
      try {
        const fileDestination = pathJoin(tempDir, "major-league-hacking-data-export.csv") // the name of the temporary file doesn't actually matter

        await pipeline(
          Readable.from(generateUserInfo()), // this source yields 'chunks' of 10 `UserInfo` as `UserInfo[]`s
          new KeycloakDataTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new ExtractPrismaMLHTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the MLH data
          new CreateMLHHeaderTransform(), // this transform adds a header to the start of the csv file
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, "major-league-hacking-data-export.csv")
      }
      finally {
        await rm(tempDir, { recursive: true, force: true })
      }
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a `.csv` payload containing
   * exported application data for Hackathons UK with <code>Content-Disposition: attachment</code>.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getHackathonsUk(): Middleware {
    return async (request, response) => {
      const tempDir = await getTempDir()
      try {
        const fileDestination = pathJoin(tempDir, "hackathons-uk-data-export.csv") // the name of the temporary file doesn't actually matter

        await pipeline(
          Readable.from(generateUserInfo()), // this source yields 'chunks' of 10 `UserInfo` as `UserInfo[]`s
          new KeycloakDataTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new ExtractPrismaHUKTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the HUK data
          new CreateHUKHeaderTransform(), // this transform adds a header to the start of the csv file
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, "hackathons-uk-data-export.csv")
      }
      finally {
        await rm(tempDir, { recursive: true, force: true })
      }
    }
  }
}

const dataExportHandlers = new DataExportHandlers()
export { dataExportHandlers }
