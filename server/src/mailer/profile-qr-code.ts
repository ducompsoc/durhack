import { frontendOrigin } from "@/config"

export function profileQrCodeImgTag(userId: string): string {
  const profileUrl = new URL(`/profile/${userId}`, frontendOrigin)

  const svgProfileQrCodeSearchParams = new URLSearchParams({
    format: "svg",
    data: profileUrl.href,
  })
  const svgProfileQrCodeUrl = new URL(`/v1/create-qr-code/?${svgProfileQrCodeSearchParams}`, "https://api.qrserver.com")

  const pngProfileQrCodeSearchParams = new URLSearchParams({
    format: "png",
    size: "600x600",
    data: profileUrl.href,
  })
  const pngProfileQrCodeUrl = new URL(`/v1/create-qr-code/?${pngProfileQrCodeSearchParams}`, "https://api.qrserver.com")

  return `<img src="${pngProfileQrCodeUrl}" srcset="${svgProfileQrCodeUrl}" alt="DurHack check in QR code" style="max-width: 20rem;" />`
}
