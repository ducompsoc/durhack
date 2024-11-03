import * as React from "react"

import { cn } from "@/lib/utils"
import {electrolize, spaceGrotesk} from "@/lib/google-fonts"

export function AboutSlide({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <article className={cn("absolute size-full flex items-center justify-center", className)} {...props}>
      <div className="max-w-[40rem] mx-16 flex flex-col space-y-1.5 items-center justify-center">
        <h1 className={cn(electrolize.className, "text-5xl pb-5")}>DurHack X</h1>
        <h2 className={cn(spaceGrotesk.className, "text-3xl")}>600 Attendees</h2>
        <h2 className={cn(spaceGrotesk.className, "text-3xl")}>150 Projects</h2>
        <div className={cn(spaceGrotesk.className)}>
          <p className="mb-2 italic">Make Hackathon History</p>
          <p className="mb-2">
            DurHack is one of Europe&apos;s largest &amp; most recognised student hackathons.<br/>
            DurHack is all about learning something new and we&apos;re proud to be the UK&apos;s leading student hackathon for
            community, collaboration and innovation.
          </p>
          <p> Provisional dates: 1<sup>st</sup>-2<sup>nd</sup> November 2025</p>
          <div className="pt-5" />
          <h2 className={cn(electrolize.className, "text-3xl")}>Benefits</h2>
          <ul>
            <li>
              <strong>Talent Recruitment:</strong> access the UK&apos;s best students
              (with CVs, challenges, workshops and more).
            </li>
            <li>
              <strong>Brand Awareness:</strong> feature in our opening ceremony, social media, and event stash.
            </li>
            <li>
              <strong>Product Development:</strong> present a challenge using your technologies or tools,
              mentor teams, and judge their projects.
            </li>
            <li>
              <strong>Community Outreach:</strong> support pioneering students, and invest in the community with
              events and workshops.
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}
