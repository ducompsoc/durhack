import {Template} from "@/mailer/templates";
import {formLinksConfig} from "@/config";
import {isFormExpired} from "@/lib/is-form-expired";

export function checkTemplateFormUrlValidity(template: Template) {
  Object.entries(formLinksConfig).forEach(([formKey, formLink]) => {
    if (Object.hasOwn(template.simpleProps, `${formKey}.url`) && isFormExpired(formLink))
      throw new Error(`Form ${formKey} in template is expired`)
  })
}
