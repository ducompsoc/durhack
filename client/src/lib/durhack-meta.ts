import { z } from "zod/v4"

import { siteConfig } from "@/config/site"
import { isObject } from "@/lib/type-guards"

const timestampToDateSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value))
const eventTimingsSchema = z.object({
  start: timestampToDateSchema,
  checkInCloses: timestampToDateSchema,
  end: timestampToDateSchema,
})

export async function getEventTimings() {
  function failResponseOk(): never {
    throw new Error(`Got status ${response.status} when trying to fetch event timings. Response: ${body}`)
  }
  function failResponseBody(): never {
    throw new Error(`Unexpected response structure when trying to fetch event timings. Response: ${body}`)
  }

  const response = await fetch(`${siteConfig.apiUrl}/meta/event-timings`)
  const body: unknown = await response.json()
  if (!response.ok) failResponseOk()

  if (!isObject(body)) failResponseBody()
  if (!Object.hasOwn(body, "data")) failResponseBody()

  return eventTimingsSchema.parse(body.data)
}
