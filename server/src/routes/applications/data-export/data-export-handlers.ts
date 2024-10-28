import { exec } from "node:child_process"
import { createWriteStream } from "node:fs"
import { mkdir, rm } from "node:fs/promises"
import { join as pathJoin } from "node:path"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { ServerError } from "@otterhttp/errors"

import type { UserInfo } from "@/database"
import { Group, onlyGroups } from "@/decorators/authorise"
import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { getTempDir } from "@/lib/temp-dir"
import { waitForExit } from "@/lib/wait-for-exit"
import type { Middleware } from "@/types"

import { AttendanceAugmentingTransform, type AttendanceAugments } from "./attendance-augmenting-transform"
import { CvExportingWritable } from "./cv-exporting-writable"
import { FilteringTransform } from "./filtering-transform"
import { HukCsvTransform } from "./huk-csv-transform"
import { MlhCsvTransform } from "./mlh-csv-transform"
import { generateUserCv } from "./user-cv-async-generator"
import { generateUserInfo } from "./user-info-async-generator"

class DataExportHandlers {
  /**
   * Returns a middleware that handles a GET request by responding with a `.csv` payload containing
   * exported application data for Major League Hacking with <code>Content-Disposition: attachment</code>.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getMajorLeagueHacking(): Middleware {
    return async (request, response) => {
      const attendeesOnly = request.query.attendees != null
      const tempDir = await getTempDir()
      try {
        const fileName = attendeesOnly ? "major-league-hacking-attendees.csv" : "major-league-hacking-applicants.csv"
        const fileDestination = pathJoin(tempDir, fileName) // the name of the temporary file doesn't actually matter

        const filterTransform = attendeesOnly
          ? new FilteringTransform<UserInfo & AttendanceAugments>((item) => item.isCheckedIn)
          : new FilteringTransform(() => true)

        await pipeline(
          Readable.from(generateUserInfo()), // this source yields 'chunks' of 10 `UserInfo` as `UserInfo[]`s
          new AttendanceAugmentingTransform(),
          filterTransform,
          new KeycloakAugmentingTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new MlhCsvTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the MLH data
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, fileName)
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
      const attendeesOnly = request.query.attendees != null
      const tempDir = await getTempDir()
      try {
        const fileName = attendeesOnly ? "hackathons-uk-attendees.csv" : "hackathons-uk-applicants.csv"
        const fileDestination = pathJoin(tempDir, fileName) // the name of the temporary file doesn't actually matter

        const filterTransform = attendeesOnly
          ? new FilteringTransform<UserInfo & AttendanceAugments>((item) => item.isCheckedIn)
          : new FilteringTransform(() => true)

        await pipeline(
          Readable.from(generateUserInfo()), // this source yields 'chunks' of 10 `UserInfo` as `UserInfo[]`s
          new AttendanceAugmentingTransform(),
          filterTransform,
          new KeycloakAugmentingTransform(), // this transform consumes 'UserInfo's, then augments them with Keycloak data and yields the new object
          new HukCsvTransform(), // this transform consumes the augmented 'UserInfo's, picking out required fields for the HUK data
          createWriteStream(fileDestination), // this sink consumes single strings / Buffers at a time
        )

        await response.download(fileDestination, fileName)
      } finally {
        await rm(tempDir, { recursive: true, force: true })
      }
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a `.zip` payload containing
   * applicant CVs.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getCVArchive(): Middleware {
    return async (request, response) => {
      const tempDir = await getTempDir()
      try {
        const archiveDir = pathJoin(tempDir, "durhack-cvs")
        await mkdir(archiveDir)

        await pipeline(
          Readable.from(generateUserCv()),
          new KeycloakAugmentingTransform(),
          new CvExportingWritable(archiveDir),
        )

        const archivePath = pathJoin(tempDir, "durhack-cvs.zip")
        const zipProcess = exec(`zip -r '${archivePath}' .`, { cwd: archiveDir })
        await waitForExit(zipProcess)
        if (zipProcess.exitCode === 12)
          throw new ServerError("There are no CVs to include", { code: "ERR_NO_ARCHIVE_ENTRIES" })
        if (zipProcess.exitCode !== 0)
          throw new ServerError("Something went wrong during the `zip` operation", { code: "ERR_ZIP_FAILED" })

        await response.download(archivePath, "durhack-cvs.zip")
      } finally {
        await rm(tempDir, { recursive: true, force: true })
      }
    }
  }
}

const dataExportHandlers = new DataExportHandlers()
export { dataExportHandlers }
