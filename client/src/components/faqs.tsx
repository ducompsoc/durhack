"use client"

import * as React from "react"

import configJson from "@/components/componentInfo"
import { SectionHeader } from "@/components/section-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = configJson.faqs

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
          <ul className="list-none mb-5 py-1">
            {faqs.map((question) => (
              <Accordion type="single" collapsible>
                <AccordionItem value="item">
                  <AccordionTrigger>{question.question}</AccordionTrigger>
                  <AccordionContent>{question.answers} </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
