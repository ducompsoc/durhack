import type { Metadata } from "next";
import { Electrolize } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const electrolize = Electrolize({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DurHack",
    template: `%s - DurHack`,
  },
  metadataBase: new URL("https://durhack.com"),
  description: "Durham University Computing Society presents the 9th version of Durhack!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn(electrolize.className, "dark min-h-screen antialiased bg-background")}>
      <a id="mlh-trust-badge"
         style={{display: "block", maxWidth: "100px", minWidth: "60px", position: "fixed", right: "50px", top: "0", width: "10%", zIndex: "10000"}}
         href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
         target="_blank">
        <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                              alt="Major League Hacking 2025 Hackathon Season" className="w-full"/>
      </a>
    <div className="relative flex min-h-screen flex-col bg-background">
      {children}
      <footer/>
    </div>
    </body>
    </html>
  );
}
