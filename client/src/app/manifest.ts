import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: "/icon/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64 96x96 128x128 256x256",
        type: "image/x-icon",
      },
      {
        src: "/icon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon/mstile-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "/icon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon/safari-pinned-tab.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "monochrome",
      },
    ],
  }
}
