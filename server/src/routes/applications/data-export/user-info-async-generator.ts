import { prisma, type UserInfo } from "@/database"

export async function* generateUserInfo(): AsyncGenerator<UserInfo[], undefined> {
  let cursor: string | undefined
  do {
    const results = await prisma.userInfo.findMany({
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: cursor == null ? undefined : { userId: cursor },
      where: {
        applicationStatus: {
          not: "unsubmitted",
        },
      },
      orderBy: {
        userId: "asc",
      },
    })

    cursor = results[9]?.userId
    yield results
  } while (cursor != null)
}
