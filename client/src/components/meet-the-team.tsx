import React from "react";
import {cn} from "@/lib/utils";
import {SectionHeader} from "@/components/section-header";

export function MeetTheTeam({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full flex", className)} {...props}>
      <SectionHeader>Meet the Team</SectionHeader>
    </div>
  )
}
