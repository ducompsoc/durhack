import countries3to2 from 'countries-list/minimal/countries.3to2.min.json'
import { ZodEffects, ZodString, ZodType } from 'zod'

declare module 'zod' {
  interface ZodString {
    iso3(message?: Parameters<typeof ZodType.prototype.refine>[1]): ZodEffects<ZodString, string, string>
  }
}

const iso3Codes = new Set(Object.keys(countries3to2));

function isValidIso3(maybeIso3: string): boolean {
  return iso3Codes.has(maybeIso3);
}

ZodString.prototype.iso3 = function(message?: Parameters<typeof ZodType.prototype.refine>[1]) {
  message ??= { message: "Invalid country" }
  return this.refine(isValidIso3, message)
}
