import type { DisciplineOfStudy } from "@/input/discipline-of-study"
import type { DietaryRequirement } from "@/input/dietary-requirement"

export type { DisciplineOfStudy, DietaryRequirement }

export type Consent = {
  name: string
  choice: boolean
}

export type Application = {
  keycloakUserId: string
  email: string
  preferredNames: string | null
  pronouns: null | "he/him" | "she/her" | "they/them" | "xe/xem" | "other" | "prefer-not-to-answer"
  phone: string | null
  firstNames: string
  lastNames: string
  applicationStatus: "unsubmitted" | "submitted" | "accepted" | "waiting-list"
  age: number | null
  gender: "male" | "female" | "non-binary" | "other" | "prefer-not-to-answer" | null
  ethnicity: "american" | "asian" | "black" | "hispanic" | "white" | "other" | "prefer-not-to-answer" | null
  university: string | null
  graduationYear: number | null
  disciplinesOfStudy: null | DisciplineOfStudy[]
  levelOfStudy:
    | null
    | "secondary"
    | "undergraduate-first-year"
    | "undergraduate-second-year"
    | "undergraduate-third-year-or-higher"
    | "graduate"
    | "bootcamp"
    | "vocational-or-apprenticeship"
    | "other"
    | "not-a-student"
    | "prefer-not-to-answer"
  countryOfResidence: string | null
  consents: Consent[]
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "no-upload"
  tShirtSize: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "prefer-not-to-answer" | null
  hackathonExperience: "zero" | "up-to-two" | "three-to-seven" | "eight-or-more" | null
  dietaryRequirements: null | DietaryRequirement[]
  accessRequirements: string | null
}
