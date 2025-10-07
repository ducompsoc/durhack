import type { UserInfo } from "@/database"
import { generateUserInfo } from "@/lib/user-info-async-generator"

export async function* generateUserInfoByTicketAssignmentOrder(): AsyncGenerator<UserInfo[], undefined> {
  yield* generateUserInfo({
    where: { applicationStatus: { in: ["submitted", "waitingList"] } },
    orderBy: [{ applicationSubmittedAt: "asc" }],
  })
}
