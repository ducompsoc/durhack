import { z } from "zod/v4"

import { recordEntries } from "@/util/record-entries"

export const travelOriginSchema = z.enum([
  "prefer-not-to-answer",
  "less-than-5-miles",
  "5-to-20-miles",
  "20-to-60-miles",
  "60-to-150-miles",
  "more-than-150-miles",
  "abroad",
])

export type TravelOrigin = z.output<typeof travelOriginSchema>
type TravelOriginMetadataEntry = { label: string }

const travelOriginMetadata: Record<TravelOrigin, TravelOriginMetadataEntry> = {
  "prefer-not-to-answer": { label: "Prefer Not To Say" },
  "less-than-5-miles": { label: "<5 miles (e.g. Durham)" },
  "5-to-20-miles": { label: "5-20 miles (e.g. Newcastle)" },
  "20-to-60-miles": { label: "20-60 miles (e.g. Middlesbrough)" },
  "60-to-150-miles": { label: "60-150 miles (e.g. Lancaster)" },
  "more-than-150-miles": { label: ">150 miles (e.g. Oxford, London)" },
  abroad: { label: "Abroad (e.g. Paris, Dublin)" },
}

export const travelOriginOptions = recordEntries(travelOriginMetadata).map(([value, metadata]) => ({
  value,
  ...metadata,
})) satisfies Array<{ value: TravelOrigin } & TravelOriginMetadataEntry>
