import type { UserInfo } from "@/database"
import { PickAttributesToCsvTransform } from "@/routes/applications/data-export/pick-attributes-to-csv-transform"
import type { UserCvAugment } from "@/routes/applications/data-export/user-cv-augmenting-transform"
import type { AttendanceAugments } from "./attendance-augmenting-transform"
import type { ConsentAugments } from "./consent-augmenting-transform"
import type { AgeAugment } from "./user-age-augmenting-transform"

export class AnonymousCsvTransform extends PickAttributesToCsvTransform<
  UserInfo & AgeAugment & AttendanceAugments & ConsentAugments<"media" | "dsuPrivacy"> & UserCvAugment
> {
  constructor() {
    super({
      attributes: [
        { name: "countryOfResidence", label: "country_of_residence" },
        { name: "university", label: "university" },
        { name: "levelOfStudy", label: "level_of_study" },
        { name: "tShirtSize", label: "t_shirt_size" },
        { name: "hackathonExperience", label: "hackathon_experience" },
        { name: "ageGroup", label: "age_group" },
        { name: "dsuPrivacy", label: "dsu_privacy" },
        { name: "media", label: "photo_media_consent" },
        { name: "is_cv_uploaded", label: "has_uploaded_cv" },
        { name: "cv_update_time", label: "cv_update_time" },
        { name: "isCheckedIn", label: "has_attended" },
      ],
    })
  }
}
