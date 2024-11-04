import type { Application } from "@durhack/durhack-common/types/application"
import type { UserApplicationStatus } from "@prisma/client"

const fromDatabaseMapping = new Map<UserApplicationStatus, Application["applicationStatus"]>([
  ["unsubmitted", "unsubmitted"],
  ["submitted", "submitted"],
  ["accepted", "accepted"],
  ["waitingList", "waiting-list"],
])

export function adaptApplicationStatusFromDatabase(
  status: UserApplicationStatus | undefined,
): Application["applicationStatus"] {
  if (status === undefined) return "unsubmitted"
  // biome-ignore lint/style/noNonNullAssertion: we know it's not null because the map is fully populated
  return fromDatabaseMapping.get(status)!
}
