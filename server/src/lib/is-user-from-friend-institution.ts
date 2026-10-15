import {durhackConfig, type FriendInstitution} from "@/config";
import type { UserInfo } from "@/database";

export function isUserFromFriendInstitution(userInfo: UserInfo): boolean {
  if (!(userInfo.university)) return false
  const userUni = userInfo.university
  return durhackConfig.friendInstitutionsGroups.reduce((acc, group) =>
    acc || group.institutions.includes(userUni), false)
}
