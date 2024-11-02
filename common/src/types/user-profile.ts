export type UserProfile = {
  userId: string
  checkedIn: boolean
  email: string
  preferredNames: string | undefined
  firstNames: string
  lastNames: string
  pronouns: "he/him" | "she/her" | "they/them" | "xe/xem" | "Please Ask" | "Unspecified"
  applicationStatus: 'unsubmitted' | 'submitted' | 'accepted' | 'waiting-list'
  uploadedCv: boolean
  /** epoch timestamp in milliseconds, or 'null' when not checked in */
  checkedInAt: number | null
}
