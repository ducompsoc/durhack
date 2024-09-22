import type { ConfigIn } from "./schema"

export default {
  listen: {
    host: "localhost",
    port: 3021,
  },
  origin: "https://api.durhack.com",
  frontendOrigin: "https://durhack.com",
  session: {
    cookie: {
      name: "durhack-session",
      secure: false,
    },
  },
  cookieSigning: {
    secret: "cookie_signing_secret",
  },
  keycloak: {
    url: "https://auth.durhack.com/realms/durhack",
    adminBaseUrl: "https://admin.auth.durhack.com",
    clientId: "not-a-real-client-id",
    clientSecret: "not-a-real-client-secret",
    responseTypes: ["code"],
    redirectUris: ["https://api.durhack.com/auth/keycloak/callback"],
  },
  mailgun: {
    username: "api",
    key: "yourAPIKeyHere",
    domain: "mailgun.durhack.com",
    sendAsDomain: "durhack.com",
    url: "https://api.eu.mailgun.net",
  },
} satisfies ConfigIn
