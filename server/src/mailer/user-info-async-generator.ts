import type { Prisma } from "@prisma/client"

import { type UserInfo, prisma } from "@/database";

/**
 * Generate UserInfo using the provided Prisma query, with the intent to email each.
 * This **cannot** be used for sending email to applicants that have not submitted applications;
 * for that purpose, an implementation would need to iterate through the Keycloak admin API's 'list users'
 * endpoint.
 */
export async function* generateUserInfo({ where }: Pick<Prisma.UserInfoFindManyArgs, "where"> = {}): AsyncGenerator<UserInfo[], undefined> {
  let cursor: string | undefined

  do {
    const results = await prisma.userInfo.findMany({
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: cursor == null ? undefined : { userId: cursor },
      where: {
        OR: [
          { userId: cursor },
          { AND: [where ?? {}, { applicationStatus: { not: "unsubmitted" } }] },
        ],
      },
      orderBy: [{ userId: "asc" }],
    })

    cursor = results[9]?.userId
    console.log(`query returned ${results.length}, cursor is ${cursor}`)
    yield results
  } while (cursor != null)
}
