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
    currentEventStart: new Date("2026-11-14T09:30:00+00:00"),
    currentEventCheckInCloses: new Date("2026-11-14T10:30:00+00:00"),
    currentEventEnd: new Date("2026-11-15T17:30:00+00:00"),
    stashItems: {
      mug: {
        name: "Mug",
        eligibilityCondition: { type: "check-in" },
      },
      "t-shirt": {
        name: "T-shirt",
        eligibilityCondition: { type: "check-in" },
      },
      notebook: {
        name: "CV Notebook",
        eligibilityCondition: { type: "cv-upload" },
      },
      "gilded-sticker": {
        name: "Gilded Sticker",
        eligibilityCondition: { type: "points-threshold", thresholdQuantity: 60 },
      },
      handwarmer: {
        name: "Handwarmer",
        eligibilityCondition: { type: "points-threshold", thresholdQuantity: 120 },
      },
    },
  },
  form: {
    volunteerApplicationForm: {
      url: "https://forms.gle/76D9hCzVBkqgtPpv5",
      expiration: new Date("2025-31-12T23:59:59+00:00"),
    },
    organiserApplicationForm: {
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeOG1PTbqGNT6Edboqfh6p4gd4qG_-blfZTsVEg-O7eN19sAQ/viewform",
      expiration: new Date("2025-31-12T23:59:59+00:00"),
    },
    feedbackForm: {
      url: "https://forms.gle/nBT7ji27hrAmCgde6",
      expiration: new Date("2025-31-12T23:59:59+00:00"),
    },
    travelReimbursementForm: {
      url: "https://forms.gle/Hz9nctemyBTXd6GV6",
      expiration: new Date("2025-31-12T23:59:59+00:00"),
    },
  },
} satisfies ConfigIn
