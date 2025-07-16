import type * as React from "react"

export default function PostTravelReimbursmentFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl">Post Travel Reimbursement Form
      </h2>
      {children}
    </>
  )
}
