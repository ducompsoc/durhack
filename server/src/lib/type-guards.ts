export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String
}

export function isObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object") return false
  if (value == null) return false
  if (Array.isArray(value)) return false
  return true
}

export function hasCode(value: unknown): value is { code: unknown } {
  if (value == null) return false
  if (typeof value !== "object") return false
  return Object.hasOwn(value, "code")
}
