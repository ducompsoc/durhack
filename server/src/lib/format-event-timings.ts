import { durhackConfig } from "@/config"
import { getOrdinalSuffix } from "@/lib/ordinal-suffix"

export type TimeFormattingValues = {
  month: string
  date: number
  dateOrdinalSuffix: string
  day: string
  hour: number
  minute: number
}

export function getTimeFormattingValues(time: Date): TimeFormattingValues {
  const month = time.toLocaleString("en-GB", { month: "long" })
  const date = time.getDate()
  const dateOrdinalSuffix = getOrdinalSuffix(date)
  const day = time.toLocaleString("en-GB", { weekday: "long" })
  const hour = time.getHours()
  const minute = time.getMinutes()
  return { month, date, dateOrdinalSuffix, day, hour, minute }
}

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
