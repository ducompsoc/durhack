import { isValidPhoneNumber } from "libphonenumber-js"
import { ZodEffects, ZodString, ZodType } from 'zod'

declare module 'zod' {
  interface ZodString {
    phone(message?: Parameters<typeof ZodType.prototype.refine>[1]): ZodEffects<ZodString, string, string>
  }
}

ZodString.prototype.phone = function(message?: Parameters<typeof ZodType.prototype.refine>[1]) {
  message ??= { message: "Invalid phone number" }
  return this.refine(isValidPhoneNumber, message)
}
