import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@durhack/web-components/ui/accordion"

import { faqs } from "@/config/faqs"
import { SectionHeader } from "@/components/section-header"

export function Faqs(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="block lg:hidden">
        <SectionHeader>FAQs</SectionHeader>
      </div>

      <div className="hidden lg:block">
        <SectionHeader>Frequently Asked Questions</SectionHeader>
      </div>

      <div className="flex justify-center">
        <div className="w-[90%] max-w-[50rem]">
          <Accordion type="single" collapsible>
            {faqs.map((question, index) => (
              <AccordionItem className="border-white" value={`item-${index}`} key={index}>
                <AccordionTrigger>{question.question}</AccordionTrigger>
                <AccordionContent>{question.answer} </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
