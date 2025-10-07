import type { GenerateUserInfoArgs } from "@/lib/user-info-async-generator"

export default {
  where: {
    applicationAcceptedAt: {
      not: null,
    },
  },
} satisfies GenerateUserInfoArgs
