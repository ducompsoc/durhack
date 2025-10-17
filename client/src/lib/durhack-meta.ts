import { z } from "zod/v4"

import { FetchError } from "@durhack/durhack-common/error/fetch-error"
import { ensureResponseMediaType } from "@durhack/durhack-common/util/ensure-media-type"
import { template, templateProp } from "@durhack/durhack-common/util/template"

import { siteConfig } from "@/config/site"
import { isObject } from "@/lib/type-guards"

const timestampToDateSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value))
const eventTimingsSchema = z.object({
  start: timestampToDateSchema,
  checkInCloses: timestampToDateSchema,
  end: timestampToDateSchema,
})

function getBodyData(body: unknown): unknown | null {
  if (!isObject(body)) return null
  if (!Object.hasOwn(body, "data")) return null
  return body.data
}

export async function getEventTimings() {
  const response = await fetch(`${siteConfig.apiUrl}/meta/event-timings`)
  await ensureResponseMediaType("application/json", response)
  if (!response.ok) {
    const options = await FetchError.populateOptions({ response })
    throw new FetchError(template`tried to fetch event timings, got ${templateProp("response")} with status ${templateProp("status")}`, options)
  }

  const body: unknown = await response.json()
  const data = getBodyData(body)
  if (data === null) {
    const options = await FetchError.populateOptions({ response, responseText: JSON.stringify(data) })
    throw new FetchError(template`tried to fetch event timings, got ${templateProp("response")} with unexpected body structure`, options)
  }

  return eventTimingsSchema.parse(data)
}
