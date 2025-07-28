import type * as React from "react"

export default function TravelReimbursementFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Travel Reimbursement Form
      </h2>
      {children}
    </>
  )
}
