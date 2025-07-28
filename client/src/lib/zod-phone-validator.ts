import { isValidPhoneNumber } from "libphonenumber-js"
import { type core, z } from "zod/v4"

export function zodPhoneNumberValidator(params?: string | core.$ZodCustomParams): z.ZodString {
  params ??= { error: "Invalid phone number" }
  return z.string().refine(isValidPhoneNumber, params)
}
