import { durhackConfig } from "@/config"
import { getOrdinalSuffix } from "@/lib/ordinal-suffix"

export type DurHackEventTimingInfo = {
  currentEventYear: number

  startMonth: string
  startDate: number
  startDateOrdinalSuffix: string
  startDay: string
  startHour: number
  startMinute: number

  endMonth: string
  endDate: number
  endDateOrdinalSuffix: string
  endDay: string
  endHour: number
  endMinute: number
}

export function getEventTimingInfo(): DurHackEventTimingInfo {
  const currentEventYear = durhackConfig.currentEventStart.getFullYear()

  new Date().getHours()

  const startMonth = durhackConfig.currentEventStart.toLocaleString("en-GB", { month: "long" })
  const startDate = durhackConfig.currentEventStart.getDate()
  const startDateOrdinalSuffix = getOrdinalSuffix(startDate)
  const startDay = durhackConfig.currentEventStart.toLocaleString("en-GB", { weekday: "long" })
  const startHour = durhackConfig.currentEventStart.getHours()
  const startMinute = durhackConfig.currentEventStart.getMinutes()

  const endMonth = durhackConfig.currentEventEnd.toLocaleString("en-GB", { month: "long" })
  const endDate = durhackConfig.currentEventEnd.getDate()
  const endDateOrdinalSuffix = getOrdinalSuffix(endDate)
  const endDay = durhackConfig.currentEventEnd.toLocaleString("en-GB", { weekday: "long" })
  const endHour = durhackConfig.currentEventEnd.getHours()
  const endMinute = durhackConfig.currentEventEnd.getMinutes()

  return {
    currentEventYear,
    startMonth,
    startDate,
    startDateOrdinalSuffix,
    startDay,
    startHour,
    startMinute,
    endMonth,
    endDate,
    endDateOrdinalSuffix,
    endDay,
    endHour,
    endMinute,
  }
}
