import * as React from "react"

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type ProfileQrCodeProps = {
  userId: string,
} & React.HTMLAttributes<HTMLImageElement>

export function ProfileQrCode({ userId, className, ...props }: ProfileQrCodeProps): React.ReactNode {
  const profileUrl = new URL(`/profile/${userId}`, siteConfig.url)
  const svgProfileQrCodeSearchParams = new URLSearchParams({
    format: "svg",
    qzone: "4",
    data: profileUrl.href,
  })
  const svgProfileQrCodeUrl = new URL(`/v1/create-qr-code/?${svgProfileQrCodeSearchParams}`, "https://api.qrserver.com")

  // this is intentionally not an `Image` from "next/image" as the `src` is dynamic
  return <img
    src={svgProfileQrCodeUrl.toString()}
    className={cn("rounded-md", className)}
    width={1000}
    height={1000}
    alt="your DurHack profile QR code"
    {...props}
  />
}
