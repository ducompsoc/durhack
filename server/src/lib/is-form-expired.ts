import {FormLink} from "@/config";

export function isFormExpired(formSchema: FormLink): boolean {
  return formSchema.expiration < new Date()
}
