import { PHASE_DEVELOPMENT_SERVER } from "next/constants"

export const siteConfig = {
  name: "DurHack",
  url: "https://durhack.com",
  apiUrl: "https://api.durhack.com",
  authUrl: "https://auth.durhack.com",
  description: "DurHack is an annual hackathon event hosted by Durham University Computing Society (compsoc.tech), which is a student society affiliated with Durham Students' Union.",
  links: {
    "github": "https://github.com/ducompsoc"
  }
}

if (PHASE_DEVELOPMENT_SERVER) {
  Object.assign(siteConfig, {
    apiUrl: "http://api.durhack.com",
  })
}
