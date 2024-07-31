import type { ConfigIn } from "./schema";

export default {
  listen: {
    host: "localhost",
    port: 3021
  },
  url: "https://api.durhack.com",
  siteUrl: "https://durhack.com",
} satisfies ConfigIn
