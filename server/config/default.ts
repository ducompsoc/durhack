import type { ConfigIn } from "@/config/schema"

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
    additionalPermittedFrontendOrigins: new Set(),
  },
  mailgun: {
    username: "api",
    key: "not-a-real-api-key",
    domain: "mailgun.compsoc.tech",
    sendAsDomain: "mailgun.compsoc.tech",
    url: "https://api.eu.mailgun.net",
  },
  durhack: {
    interopMutualTls: {
      clientCertificateFile: "/dev/null",
      clientCertificateKeyFile: "/dev/null",
    },
    ticketAssignmentActive: false,
    maximumTicketAssignment: 900,
    maximumExternalTicketAssignment: 300,
    currentEventStart: new Date("2025-11-01T09:30:00+00:00"),
    currentEventCheckInCloses: new Date("2025-11-01T10:30:00+00:00"),
    currentEventEnd: new Date("2025-11-02T17:30:00+00:00"),
    stashItems: {
      keyring: {
        name: "CV Keyring",
        eligibilityCondition: { type: "cv-upload" },
      },
      "gilded-sticker": {
        name: "Gilded Sticker",
        eligibilityCondition: { type: "points-threshold", thresholdQuantity: 50 },
      },
      "drawstring-bag": {
        name: "Drawstring Bag",
        eligibilityCondition: { type: "points-threshold", thresholdQuantity: 100 },
      },
      "card-holder": {
        name: "Phone Wallet",
        eligibilityCondition: { type: "points-threshold", thresholdQuantity: 150 },
      },
    },
  },
} satisfies ConfigIn
