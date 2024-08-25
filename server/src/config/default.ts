import type { ConfigIn } from "./schema"

export default {
  listen: {
    host: "localhost",
    port: 3021,
  },
  hostname: "https://api.durhack.com",
  frontendHostname: "https://durhack.com",
  session: {
    name: "durhack-session",
    cookie: {
      secure: false,
    },
  },
  cookieSigning: {
    secret: "cookie_signing_secret",
  },
  keycloak: {
    url: "https://auth.durhack.com/realms/durhack",
    clientId: "not-a-real-client-id",
    clientSecret: "not-a-real-client-secret",
    responseTypes: ["code"],
    redirectUris: ["https://api.durhack.com/auth/keycloak/callback"],
  },
} satisfies ConfigIn
