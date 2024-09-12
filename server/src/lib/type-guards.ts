export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String
}

export function hasCode(value: unknown): value is { code: unknown } {
  if (value == null) return false
  if (typeof value !== "object") return false
  return Object.hasOwn(value, "code")
}
