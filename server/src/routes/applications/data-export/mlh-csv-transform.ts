import type { UserInfo } from "@/database"
import type { KeycloakAugments } from "@/lib/keycloak-augmenting-transform"

import type { ConsentAugments } from "./consent-augmenting-transform"
import { PickAttributesToCsvTransform } from "./pick-attributes-to-csv-transform"

export class MlhCsvTransform extends PickAttributesToCsvTransform<
  UserInfo & KeycloakAugments & ConsentAugments<"mlhCodeOfConduct" | "mlhTerms" | "mlhMarketing">
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
        { name: "applicationStatus", label: "application_status" },
        { name: "mlhCodeOfConduct", label: "mlh_coc_consent" },
        { name: "mlhTerms", label: "mlh_t&cs_consent" },
        { name: "mlhMarketing", label: "mlh_marketing_consent" },
      ],
    })
  }
}
