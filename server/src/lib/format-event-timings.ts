import { getTimeFormattingValues, type TimeFormattingValues } from "@durhack/durhack-common/util/format-date"

import { durhackConfig } from "@/config"

export type DurHackEventTimingInfo = {
  currentEventYear: number
  start: TimeFormattingValues
  checkInCloses: TimeFormattingValues
  end: TimeFormattingValues
}

export function getEventTimingInfo(): DurHackEventTimingInfo {
  const currentEventYear = durhackConfig.currentEventStart.getFullYear()

  const start = getTimeFormattingValues(durhackConfig.currentEventStart)
  const checkInCloses = getTimeFormattingValues(durhackConfig.currentEventCheckInCloses)
  const end = getTimeFormattingValues(durhackConfig.currentEventEnd)

  return { currentEventYear, start, checkInCloses, end }
}
