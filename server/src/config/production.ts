import type { ConfigIn } from "@/config/schema"
import type { DeepPartial } from "@/types/deep-partial"

export default {
  session: {
    cookie: {
      secure: true,
      sameSite: "strict",
      domain: ".durhack.com",
    },
  },
} satisfies DeepPartial<ConfigIn>
