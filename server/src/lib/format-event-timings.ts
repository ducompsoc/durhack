import { durhackConfig } from "@/config"
import { getOrdinalSuffix } from "@/lib/ordinal-suffix"

export type DurHackEventTimingInfo = {
  currentEventYear: number

  startMonth: string
  startDate: number
  startDateOrdinalSuffix: string
  startDay: string

  endMonth: string
  endDate: number
  endDateOrdinalSuffix: string
  endDay: string
}

export function getEventTimingInfo(): DurHackEventTimingInfo {
  const currentEventYear = durhackConfig.currentEventStart.getFullYear()

  const startMonth = durhackConfig.currentEventStart.toLocaleString("en-GB", { month: "long" })
  const startDate = durhackConfig.currentEventStart.getDate()
  const startDateOrdinalSuffix = getOrdinalSuffix(startDate)
  const startDay = durhackConfig.currentEventStart.toLocaleString("en-GB", { weekday: "long" })

  const endMonth = durhackConfig.currentEventEnd.toLocaleString("en-GB", { month: "long" })
  const endDate = durhackConfig.currentEventEnd.getDate()
  const endDateOrdinalSuffix = getOrdinalSuffix(endDate)
  const endDay = durhackConfig.currentEventEnd.toLocaleString("en-GB", { weekday: "long" })

  return {
    currentEventYear,
    startMonth,
    startDate,
    startDateOrdinalSuffix,
    startDay,
    endMonth,
    endDate,
    endDateOrdinalSuffix,
    endDay,
  }
}
