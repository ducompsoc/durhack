import type { UnknownFunction, UnknownObject } from "@/types/extra-utility-types"

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

export function isFunction(value: unknown): value is UnknownFunction {
  return typeof value === "function" || value instanceof Function
}

export function isModuleWithObjectDefaultExport(
  maybeModule: unknown,
): maybeModule is UnknownObject & { default: UnknownObject } {
  if (!isObject(maybeModule)) return false
  if (!Object.hasOwn(maybeModule, "default")) return false
  return isObject(maybeModule.default)
}

export function hasCode(value: unknown): value is UnknownObject & { code: unknown } {
  if (value == null) return false
  if (typeof value !== "object") return false
  return Object.hasOwn(value, "code")
}
