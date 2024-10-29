import type { UserInfo } from "@/database"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"

import { PickAttributesToCsvTransform } from "./pick-attributes-to-csv-transform"

export class HukCsvTransform extends PickAttributesToCsvTransform<UserInfo & KeycloakAugments> {
  constructor() {
    super({
      attributes: [
        { name: "firstNames", label: "first_names" },
        { name: "lastNames", label: "last_names" },
        { name: "email", label: "email" },
        { name: "phone", label: "phone" },
        { name: "university", label: "university" },
        { name: "graduationYear", label: "graduation_year" },
        { name: "ethnicity", label: "ethnicity" },
        { name: "gender", label: "gender" },
        { name: "applicationStatus", label: "application_status" },
      ],
    })
  }
}
