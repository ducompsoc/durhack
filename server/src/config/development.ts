import type { ConfigIn } from "@/config/schema"
import type { DeepPartial } from "@/types/deep-partial"

export default {
  origin: "http://localhost:3021",
  frontendOrigin: "http://localhost:3020",
  keycloak: {
    redirectUris: ["http://localhost:3021/auth/keycloak/callback"],
  },
} satisfies DeepPartial<ConfigIn>
