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
    | "less-than-secondary"
    | "secondary"
    | "undergraduate-2-year"
    | "undergraduate-3-or-more-years"
    | "graduate"
    | "bootcamp"
    | "vocational-or-apprenticeship"
    | "post-doctorate"
    | "other"
    | "not-a-student"
    | "prefer-not-to-answer"
  countryOfResidence: string | null
  consents: Consent[]
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "noUpload"
}