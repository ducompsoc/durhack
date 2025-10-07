import { getOrdinalSuffix } from "@/util/ordinal-suffix"

export type TimeFormattingValues = {
  month: string
  date: number
  dateOrdinalSuffix: string
  day: string
  hour: number
  minute: number
  time: string
}

export function getTimeFormattingValues(forWhen: Date): TimeFormattingValues {
  const month = forWhen.toLocaleString("en-GB", { month: "long" })
  const date = forWhen.getDate()
  const dateOrdinalSuffix = getOrdinalSuffix(date)
  const day = forWhen.toLocaleString("en-GB", { weekday: "long" })
  const hour = forWhen.getHours()
  const minute = forWhen.getMinutes()
  const time = forWhen.toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" })
  return { month, date, dateOrdinalSuffix, day, hour, minute, time }
}
