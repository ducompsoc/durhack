import type { GenerateUserInfoArgs } from "@/lib/user-info-async-generator"

export default {
  where: {
    applicationStatus: "waitingList",
  },
} satisfies GenerateUserInfoArgs
