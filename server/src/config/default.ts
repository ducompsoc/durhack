import type { ConfigIn } from "./schema"

export default {
  listen: {
    host: "127.0.0.1",
    port: 3001, // DurHack project has ports 3000-3099
  },
  origin: "http://api.durhack-dev.com",
  frontendOrigin: "http://durhack-dev.com",
  session: {
    cookie: {
      name: "durhack-session",
      domain: ".durhack-dev.com",
      secure: false,
      path: "/",
      sameSite: "lax",
    },
  },
  cookieSigning: {
    secret: "cookie_signing_secret",
  },
  keycloak: {
    realm: "durhack-dev",
    baseUrl: "https://auth.durhack.com",
    adminBaseUrl: "https://admin.auth.durhack.com",
    clientId: "not-a-real-client-id",
    clientSecret: "not-a-real-client-secret",
    responseTypes: ["code"],
    redirectUris: ["http://api.durhack-dev.com/auth/keycloak/callback"],
  },
  mailgun: {
    username: "api",
    key: "not-a-real-api-key",
    domain: "mailgun.compsoc.tech",
    sendAsDomain: "compsoc.tech",
    url: "https://api.eu.mailgun.net",
  },
  durhack: {
    maximumTicketAssignment: 900,
  },
} satisfies ConfigIn
