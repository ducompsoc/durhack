import type { UserInfo } from "@/database"

export function isExternalApplicant(userInfo: UserInfo): boolean {
  return userInfo.university !== "Durham University"
}
