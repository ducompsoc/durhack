import type { Application } from "@durhack/durhack-common/types/application"
import type { HackathonExperience } from "@prisma/client"

const toDatabaseMapping = new Map<Application["hackathonExperience"], HackathonExperience>([
  ["zero", "zero"],
  ["up-to-two", "upToTwo"],
  ["three-to-seven", "threeToSeven"],
  ["eight-or-more", "eightOrMore"],
])

export function adaptHackathonExperienceToDatabase(experience: Application["hackathonExperience"]): HackathonExperience {
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return toDatabaseMapping.get(experience)!
}

const fromDatabaseMapping = new Map<HackathonExperience, Application["hackathonExperience"]>([
  ["zero", "zero"],
  ["upToTwo", "up-to-two"],
  ["threeToSeven", "three-to-seven"],
  ["eightOrMore", "eight-or-more"],
])

export function adaptHackathonExperienceFromDatabase(experience: HackathonExperience | null | undefined): Application["hackathonExperience"] | null {
  if (experience == null) return null
  // biome-ignore: lint/suspicious/noNonNullAssertion: we know it's not null because the map is fully populated
  return fromDatabaseMapping.get(experience)!
}
