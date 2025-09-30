import { Toaster } from "@durhack/web-components/ui/toaster"
import type { Metadata, Viewport } from "next"
import type * as React from "react"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export const viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark light",
} satisfies Viewport

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  icons: {
    icon: ["/icon/favicon.svg", "/icon/favicon.ico", "/icon/favicon.png"],
    apple: "/icon/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en-GB",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.openGraphImage }],
  },
} satisfies Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="apple-mobile-web-app-title" content="DurHack" />
      </head>
      <body className={cn(spaceGrotesk.className, "dark antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
