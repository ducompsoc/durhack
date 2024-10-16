import type { Application } from "@durhack/durhack-common/types/application"
import type { Gender } from "@prisma/client"

const toDatabaseMapping = new Map<Application["gender"], Gender>([
  ["male", "male"],
  ["female", "female"],
  ["non-binary", "nonBinary"],
  ["other", "other"],
  ["prefer-not-to-answer", "preferNotToAnswer"],
])

export function adaptGenderToDatabase(gender: Application["gender"]): Gender {
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return toDatabaseMapping.get(gender)!
}

const fromDatabaseMapping = new Map<Gender, Application["gender"]>([
  ["male", "male"],
  ["female", "female"],
  ["nonBinary", "non-binary"],
  ["other", "other"],
  ["preferNotToAnswer", "prefer-not-to-answer"],
])

export function adaptGenderFromDatabase(gender: Gender | null | undefined): Application["gender"] | null {
  if (gender == null) return null
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return fromDatabaseMapping.get(gender)!
}
