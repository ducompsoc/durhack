import { ConfigIn } from "@/config/schema";
import { DeepPartial } from "@/types/deep-partial";

export default {
  hostname: "http://localhost:3021",
  frontendHostname: "http://localhost:3020",
  keycloak: {
    redirectUris: ["http://localhost:3021/auth/keycloak/callback"],
  },
} satisfies DeepPartial<ConfigIn>
