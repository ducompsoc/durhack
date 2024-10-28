import type { UserInfo } from "@/database"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"

import { PickAttributesToCsvTransform } from "./pick-attributes-to-csv-transform"

export class MlhCsvTransform extends PickAttributesToCsvTransform<
  UserInfo & KeycloakAugments
> {
  constructor() {
    super({
      attributes: [
        { name: "firstNames", label: "first_names" },
        { name: "lastNames", label: "last_names" },
        { name: "email", label: "email" },
        { name: "phone", label: "phone" },
        { name: "age", label: "age" },
        { name: "university", label: "university" },
        { name: "countryOfResidence", label: "country_of_residence" },
        { name: "levelOfStudy", label: "level_of_study" },
      ],
    })
  }
}
