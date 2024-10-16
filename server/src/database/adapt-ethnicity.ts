import type { Application } from "@durhack/durhack-common/types/application"
import type { Ethnicity } from "@prisma/client"

const toDatabaseMapping = new Map<Application["ethnicity"], Ethnicity>([
  ["american", "american"],
  ["asian", "asian"],
  ["black", "black"],
  ["hispanic", "hispanic"],
  ["white", "white"],
  ["other", "other"],
  ["prefer-not-to-answer", "preferNotToAnswer"],
])

export function adaptEthnicityToDatabase(ethnicity: Application["ethnicity"]): Ethnicity {
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return toDatabaseMapping.get(ethnicity)!
}

const fromDatabaseMapping = new Map<Ethnicity, Application["ethnicity"]>([
  ["american", "american"],
  ["asian", "asian"],
  ["black", "black"],
  ["hispanic", "hispanic"],
  ["white", "white"],
  ["other", "other"],
  ["preferNotToAnswer", "prefer-not-to-answer"],
])

export function adaptEthnicityFromDatabase(ethnicity: Ethnicity | null | undefined): Application["ethnicity"] | null {
  if (ethnicity == null) return null
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return fromDatabaseMapping.get(ethnicity)!
}
