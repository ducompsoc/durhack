import type { Metadata, Viewport } from "next"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export const viewport = {
  themeColor: siteConfig.themeColor,
} satisfies Viewport

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  icons: {
    icon: ["icon/favicon.svg", "/icon/favicon.ico", "/icon/favicon-16x16.png", "./icon/favicon-32x32.png"],
    shortcut: ["/icon/favicon-16x16.png", "./icon/favicon-32x32.png"],
    apple: "/icon/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/icon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#008987",
    "theme-color": siteConfig.themeColor,
  },
} satisfies Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <body className={cn(spaceGrotesk.className, "dark antialiased")}>
        {children}
      </body>
    </html>
  )
}
