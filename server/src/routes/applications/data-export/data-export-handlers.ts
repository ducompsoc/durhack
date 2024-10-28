import { createWriteStream } from "node:fs"
import { rm } from "node:fs/promises"
import { join as pathJoin } from "node:path"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

import { Group, onlyGroups } from "@/decorators/authorise"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { getTempDir } from "@/lib/temp-dir"
import type { Middleware } from "@/types"

import { HukCsvTransform } from "./huk-csv-transform"
import { MlhCsvTransform } from "./mlh-csv-transform"
import { generateUserInfo } from "./user-info-async-generator"

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
          new KeycloakAugmentingTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new MlhCsvTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the MLH data
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, "major-league-hacking-data-export.csv")
      } finally {
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
          new KeycloakAugmentingTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new HukCsvTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the HUK data
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, "hackathons-uk-data-export.csv")
      } finally {
        await rm(tempDir, { recursive: true, force: true })
      }
    }
  }
}

const dataExportHandlers = new DataExportHandlers()
export { dataExportHandlers }
