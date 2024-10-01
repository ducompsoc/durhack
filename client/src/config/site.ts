import { PHASE_DEVELOPMENT_SERVER } from "next/constants"
import type * as React from "react"

import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, TikTokIcon, XIcon } from "@/components/icons"

type socialLink = { key: string; href: string; icon: React.FC }

export const siteConfig = {
  name: "DurHack",
  url: "https://durhack.com",
  apiUrl: "https://api.durhack.com",
  authUrl: "https://auth.durhack.com",
  themeColor: "#1d1934",
  description:
    "DurHack is an annual hackathon event hosted by Durham University Computing Society (compsoc.tech), which is a student society affiliated with Durham Students' Union.",
  openGraphImage: "/branding/opengraph-image.png",
  socials: [
    { key: "github", href: "https://github.com/ducompsoc", icon: GitHubIcon },
    { key: "instagram", href: "https://www.instagram.com/durhackevent/", icon: InstagramIcon },
    { key: "facebook", href: "https://www.facebook.com/DurHackEvent/", icon: FacebookIcon },
    { key: "tiktok", href: "https://www.tiktok.com/@durhack", icon: TikTokIcon },
    { key: "linkedin", href: "https://www.linkedin.com/company/durhack/mycompany/", icon: LinkedInIcon },
    { key: "x", href: "https://x.com/durhackevent", icon: XIcon },
  ] as const satisfies readonly socialLink[],
}

/* needed in development but is breaking production
if (PHASE_DEVELOPMENT_SERVER) {
  Object.assign(siteConfig, {
    url: "http://durhack-dev.com",
    apiUrl: "http://api.durhack-dev.com",
    authUrl: "https://auth.durhack.com/dev",
  })
}
*/
