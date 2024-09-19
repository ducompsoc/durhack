import type { Metadata, Viewport } from "next"

import "@/styles/globals.css"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar"
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
    <html lang="en">
      <body className={cn(spaceGrotesk.className, "dark antialiased")}>
        <div className="fixed top-0 overflow-visible w-[100%] z-50">
          <a
            id="mlh-trust-badge"
            style={{
              display: "block",
              maxWidth: "100px",
              minWidth: "60px",
              position: "absolute",
              right: "50px",
              top: "0",
              width: "10%",
              zIndex: "10000",
            }}
            href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
              alt="Major League Hacking 2025 Hackathon Season"
              className="w-full"
            />
          </a>
          <Navbar />
        </div>
        <div className="relative bg-background">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
