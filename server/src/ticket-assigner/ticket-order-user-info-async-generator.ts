import { prisma, type UserInfo } from "@/database"

export async function* generateUserInfoByTicketAssignmentOrder(): AsyncGenerator<UserInfo[], undefined> {
  let cursor: string | undefined
  do {
    const results = await prisma.userInfo.findMany({
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: cursor == null ? undefined : { userId: cursor },
      where: {
        OR: [{ applicationStatus: { in: ["submitted", "waitingList"] } }, { userId: cursor }],
      },
      orderBy: [{ applicationSubmittedAt: "asc" }, { userId: "asc" }],
    })

    cursor = results[9]?.userId
    console.log(`query returned ${results.length}, cursor is ${cursor}`)
    yield results
  } while (cursor != null)
}
