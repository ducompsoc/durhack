import { durhackConfig } from "@/config";
import type { UserInfo } from "@/database";

export function isFriendUniversity(userInfo: UserInfo): boolean {
  if (!userInfo.university) return false
  return Object.hasOwn(durhackConfig.friendUniversities, userInfo.university)
}
