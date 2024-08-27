import { sign, unsign } from "@otterhttp/cookie-signature"

import { cookieSigningConfig } from "@/config"

export function signCookie(value: string): string {
  return `s:${sign(value, cookieSigningConfig.secret)}`
}

export function matchSignedCookie(value: string): boolean {
  return value.startsWith("s:")
}

export function unsignCookie(encodedValue: string): string | null {
  return unsign((encodedValue).slice(2), cookieSigningConfig.secret) || null
}

export function unsignCookieOrThrow(encodedValue: string): string {
  const result = unsignCookie(encodedValue)
  if (result == null) throw new Error("Failed to unsign cookie")
  return result
}
