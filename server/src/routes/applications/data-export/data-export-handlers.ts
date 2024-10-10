import { ServerError } from "@otterhttp/errors"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { createWriteStream } from "node:fs"
import { rm } from "node:fs/promises"
import { join as pathJoin } from "node:path"

import { Group, onlyGroups } from "@/decorators/authorise"
import { getTempDir } from "@/lib/temp-dir";
import type { Middleware } from "@/types"

import { generateUserInfo } from "./user-info-async-generator"
import { ExtractIdFromUserInfoTransform } from "./extract-id-from-user-info-transform"

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
        const fileDestination = pathJoin(tempDir, "major-league-hacking-data-export.txt") // the name of the temporary file doesn't actually matter

        await pipeline(
          Readable.from(generateUserInfo()), // this source yields 'chunks' of 10 `UserInfo` as `UserInfo[]`s
          new ExtractIdFromUserInfoTransform(), // this transform consumes `UserInfo` chunks and yields a single string for each chunk
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, "major-league-hacking-data-export.txt")
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
      throw new ServerError("Hackathons UK data export is not implemented", {
        statusCode: 501,
        exposeMessage: true,
      })
    }
  }
}

const dataExportHandlers = new DataExportHandlers()
export { dataExportHandlers }
