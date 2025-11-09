import type { GenerateUserInfoArgs } from "@/lib/user-info-async-generator"

export default {
  where: {
    user: {
      userFlags: {
        some: { flagName: "attendance" },
      },
    },
  },
} satisfies GenerateUserInfoArgs
