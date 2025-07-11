import {PickAttributesToCsvTransform} from "@/routes/applications/data-export/pick-attributes-to-csv-transform";
import {UserInfo} from "@/database";
import { AgeAugment } from "./user-age-augmenting-transform";
import {KeycloakAugments} from "@/lib/keycloak-augmenting-transform";
import {ConsentAugments} from "./consent-augmenting-transform";
import {AttendanceAugments} from "./attendance-augmenting-transform";

export class AnonymousCsvTransform extends PickAttributesToCsvTransform<UserInfo & AgeAugment & AttendanceAugments> {
  constructor(){
    super({
      attributes: [
        {name: "countryOfResidence", label: "country_of_residence"},
        {name: "university", label: "university"},
        {name: "levelOfStudy", label: "level_of_study"},
        {name: "ageGroup", label: "age_group"},
        {name: "hackathonExperience", label: "hackathon_experience"},
        {name: "tShirtSize", label: "t_shirt_size"},
        {name: "isCheckedIn", label: "has_attended"}
      ],
    })
  }
}
