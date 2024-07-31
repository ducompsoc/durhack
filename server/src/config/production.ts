import { DeepPartial } from "@/types/deep-partial";
import { ConfigIn } from "@/config/schema";

export default {
  session: {
    cookie: {
      secure: true,
      sameSite: "strict",
      domain: "durhack.com",
    },
  },
} satisfies DeepPartial<ConfigIn>
