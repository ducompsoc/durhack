import type { UnknownObject } from "@/types/extra-utility-types"

export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" || value instanceof Number
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean" || value instanceof Boolean
}

export function isObject(value: unknown): value is UnknownObject {
  if (typeof value !== "object") return false
  if (value == null) return false
  if (Array.isArray(value)) return false
  return true
}
