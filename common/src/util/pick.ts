import type { UnknownObject } from "@/types/extra-utility-types";

export function pick<
  TFrom extends object,
  TPickKey extends keyof TFrom
>(from: TFrom, keys: Iterable<TPickKey>): Pick<TFrom, TPickKey> {
  const result: UnknownObject = {}
  for (const key of keys) {
    result[key] = from[key]
  }
  return result as Pick<TFrom, TPickKey>
}
