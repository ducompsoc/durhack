import type { DisciplineOfStudy } from "@durhack/durhack-common/input/discipline-of-study"
import type { DietaryRequirement } from "@durhack/durhack-common/types/application"
import type { UserInfo } from "@/database"
import { PickAttributesToCsvTransform } from "@/routes/applications/data-export/pick-attributes-to-csv-transform"
import type { UserCvAugment } from "@/routes/applications/data-export/user-cv-augmenting-transform"
import type { FlagAugments } from "@/routes/applications/data-export/user-flag-augmenting-transform"
import type { AttendanceAugments } from "./attendance-augmenting-transform"
import type { ConsentAugments } from "./consent-augmenting-transform"
import type { AgeAugment } from "./user-age-augmenting-transform"

type Source = UserInfo &
  AgeAugment &
  AttendanceAugments &
  ConsentAugments<"media" | "dsuPrivacy"> &
  UserCvAugment &
  FlagAugments<"discipline-of-study", DisciplineOfStudy> &
  FlagAugments<"dietary-requirement", DietaryRequirement>

export class AnonymousCsvTransform extends PickAttributesToCsvTransform<Source> {
  constructor() {
    super({
      attributes: [
        { name: "countryOfResidence", label: "country_of_residence" },
        { name: "university", label: "university" },
        { name: "levelOfStudy", label: "level_of_study" },
        { name: "tShirtSize", label: "t_shirt_size" },
        { name: "gender", label: "gender" },
        { name: "ethnicity", label: "ethnicity" },
        { name: "hackathonExperience", label: "hackathon_experience" },
        { name: "dietary-requirement", label: "dietary_requirements" },
        { name: "discipline-of-study", label: "discipline_of_study" },
        { name: "ageGroup", label: "age_group" },
        { name: "dsuPrivacy", label: "dsu_privacy" },
        { name: "media", label: "photo_media_consent" },
        { name: "is_cv_uploaded", label: "did_upload_cv" },
        { name: "cv_update_time", label: "cv_last_updated_at" },
        { name: "applicationSubmittedAt", label: "application_submitted_at" },
        { name: "applicationStatus", label: "application_status" },
        { name: "isCheckedIn", label: "attendance" },
      ],
    })
  }
}
