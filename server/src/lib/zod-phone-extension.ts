import { isValidPhoneNumber } from "libphonenumber-js"
import { type ZodEffects, ZodString, type ZodType } from "zod"

declare module "zod" {
  interface ZodString {
    phone(message?: Parameters<typeof ZodType.prototype.refine>[1]): ZodEffects<ZodString, string, string>
  }
}

ZodString.prototype.phone = function (message?: Parameters<typeof ZodType.prototype.refine>[1]) {
  return this.refine(isValidPhoneNumber, message ?? { message: "Invalid phone number" })
}
