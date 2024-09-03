import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"

import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  icons: {
    icon: "/icon/favicon.ico",
    shortcut: "/icon/favicon-16x16.png",
    apple: "/icon/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn(space_grotesk.className, "dark antialiased")}>
      <div className="fixed top-0 overflow-visible w-[100%] z-50">
        <a id="mlh-trust-badge"
          style={{display: "block", maxWidth: "100px", minWidth: "60px", position: "absolute", right: "50px", top: "0", width: "10%", zIndex: "10000"}}
          href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
          target="_blank">
          <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
            alt="Major League Hacking 2025 Hackathon Season" className="w-full"/>
        </a>
        <Navbar />
      </div>
      <div className="relative bg-background">
        {children}
        <Footer />
      </div>
    </body>
    </html>
  );
}
