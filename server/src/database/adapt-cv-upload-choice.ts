import type { Application } from "@durhack/durhack-common/types/application"
import type { CvUploadChoice } from "@prisma/client"

const toDatabaseMapping = new Map<Application["cvUploadChoice"], CvUploadChoice>([
  ["indeterminate", "indeterminate"],
  ["upload", "upload"],
  ["remind", "remind"],
  ["no-upload", "noUpload"]
])

export function adaptCvUploadChoiceToDatabase(choice: Application["cvUploadChoice"]): CvUploadChoice {
  // biome-ignore lint/style/noNonNullAssertion: we know it's not null because the map is fully populated
  return toDatabaseMapping.get(choice)!
}

const fromDatabaseMapping = new Map<CvUploadChoice, Application["cvUploadChoice"]>([
  ["indeterminate", "indeterminate"],
  ["upload", "upload"],
  ["remind", "remind"],
  ["noUpload", "no-upload"]
])

export function adaptCvUploadChoiceFromDatabase(
  choice: CvUploadChoice | undefined,
): Application["cvUploadChoice"] {
  if (choice === undefined) return "indeterminate"
  // biome-ignore lint/style/noNonNullAssertion: we know it's not null because the map is fully populated
  return fromDatabaseMapping.get(choice)!
}
