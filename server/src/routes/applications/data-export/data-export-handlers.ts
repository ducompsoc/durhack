import { ServerError } from "@otterhttp/errors"

import { Group, onlyGroups } from "@/decorators/authorise"
import { prisma, type UserInfo } from "@/database"
import type { Middleware } from "@/types"

async function* generateUserInfo(): AsyncGenerator<UserInfo[], undefined> {
  let cursor: string | undefined
  do {
    const results = await prisma.userInfo.findMany({
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: {
        userId: cursor
      },
      where: {
        applicationStatus: {
          equals: "submitted"
        }
      },
      orderBy: {
        userId: 'asc',
      },
    })

    cursor = results[9]?.userId
    yield results
  }
  while (cursor != undefined)
}

class DataExportHandlers {
  /**
   * Returns a middleware that handles a GET request by responding with a `.csv` payload containing
   * exported application data for Major League Hacking with <code>Content-Disposition: attachment</code>.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getMajorLeagueHacking(): Middleware {
    return async (request, response) => {
      throw new ServerError("Hackathons UK data export is not implemented", {
        statusCode: 501,
        exposeMessage: true,
      })
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
