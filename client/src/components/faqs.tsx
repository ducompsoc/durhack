import Image from "next/image"
import type * as React from "react"

import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"
import FaqAccordion from "@/components/faq-accordion";

export function Faqs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("faq", className)} {...props}>
      <Image
        className="absolute top-0 left-0 w-full h-1700 md:h-1200 -z-10"
        width={1920}
        height={4812}
        priority
        alt="sky-streaks"
        src="/assets/sky-streaks.svg"
      />

      <div className="block lg:hidden">
        <SectionHeader className="text-white">FAQs</SectionHeader>
      </div>

      <div className="hidden lg:block">
        <SectionHeader className="text-white">Frequently Asked Questions</SectionHeader>
      </div>

      <div className="flex justify-center my-10">
        <div className="w-[90%] max-w-[50rem]">
          <FaqAccordion />
        </div>
      </div>
    </div>
  )
}
