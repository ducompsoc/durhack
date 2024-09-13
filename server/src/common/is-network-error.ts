import { hasCode, isString } from "@/common/type-guards"

const networkErrorCodes = new Set(["ETIMEDOUT", "ENETUNREACH", "ENETDOWN", "ENETRESET", "ECONNREFUSED", "ECONNRESET"])

export function isNetworkError(value: unknown): value is Error {
  if (!(value instanceof Error)) return false
  if (!hasCode(value)) return false
  if (!isString(value.code)) return false
  return networkErrorCodes.has(value.code)
}
