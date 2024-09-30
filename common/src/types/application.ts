export type Consent = {
  name: string,
  choice: boolean,
}

export type Application = {
  keycloakUserId: string
  email: string
  preferredNames: string | null
  pronouns: null
    | "he/him"
    | "she/her"
    | "they/them"
    | "xe/xem"
    | "other"
    | "prefer-not-to-answer"
  phone: string | null
  firstNames: string
  lastNames: string
  applicationStatus: "unsubmitted" | "submitted" | "accepted" | "waitingList"
  age: number | null
  university: string | null
  graduationYear: number | null
  levelOfStudy: null
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
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "noUpload"
}
