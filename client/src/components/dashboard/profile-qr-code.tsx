import type * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type ProfileQrCodeProps = {
  userId: string
} & React.ComponentProps<"img">

export function ProfileQrCode({ userId, className, alt, ...props }: ProfileQrCodeProps): React.ReactNode {
  const profileUrl = new URL(`/profile/${userId}`, siteConfig.url)
  const svgProfileQrCodeSearchParams = new URLSearchParams({
    format: "svg",
    qzone: "4",
    data: profileUrl.href,
  })
  const svgProfileQrCodeUrl = new URL(`/v1/create-qr-code/?${svgProfileQrCodeSearchParams}`, "https://api.qrserver.com")

  // this is intentionally not an `Image` from "next/image" as the `src` is dynamic
  return (
    // biome-ignore lint/performance/noImgElement: see above
    <img
      src={svgProfileQrCodeUrl.toString()}
      className={cn("rounded-md", className)}
      width={1000}
      height={1000}
      {...props}
      alt={alt ?? "your DurHack profile QR code"}
    />
  )
}
