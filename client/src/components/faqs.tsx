"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@durhack/web-components/ui/accordion"

import { faqs } from "@/config/faqs"
import { SectionHeader } from "@/components/section-header"

export default function Faqs() {
  return (
    <div>
      <div className="block lg:hidden">
        <SectionHeader>FAQs</SectionHeader>
      </div>

      <div className="hidden lg:block">
        <SectionHeader>FREQUENTLY ASKED QUESTIONS</SectionHeader>
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
