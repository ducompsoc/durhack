import { prisma, type UserCV } from "@/database"

export async function* generateUserCv(): AsyncGenerator<UserCV[], undefined> {
  let cursor: string | undefined
  do {
    const results = await prisma.userCV.findMany({
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: cursor == null ? undefined : { userId: cursor },
      orderBy: {
        userId: "asc",
      },
    })

    cursor = results[9]?.userId
    yield results
  } while (cursor != null)
}
