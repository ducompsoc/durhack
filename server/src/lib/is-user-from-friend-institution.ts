import { durhackConfig } from "@/config";
import type { UserInfo } from "@/database";

export function isUserFromFriendInstitution(userInfo: UserInfo): boolean {
  if (!(userInfo.university)) return false
  const userUni = userInfo.university
  return durhackConfig.friendInstitutionsGroups.some((group) => group.institutions.includes(userUni))
}
