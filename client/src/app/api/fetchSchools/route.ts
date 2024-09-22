import { getVerifiedSchoolsList } from "@/data/verified-schools"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const schoolOptions = (await getVerifiedSchoolsList()).map((schoolName) => ({
      label: schoolName,
      value: schoolName,
    }))

    return NextResponse.json({ schoolOptions })
  } catch (error) {
    return NextResponse.error()
  }
}
