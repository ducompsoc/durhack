import * as React from "react"

import {faqs} from "@/config/faqs"
import {Accordion, AccordionContent, AccordionTrigger, AccordionItem} from "@durhack/web-components/ui/accordion"
import {SectionHeader} from "@/components/section-header";

import {cn} from "@/lib/utils";
import Image from "next/image";
import "@/styles/accordion.css"
import {spaceGrotesk} from "@/lib/google-fonts";

export function Faqs(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="block lg:hidden">
        <SectionHeader>FAQs</SectionHeader>
      </div>

      <div className="hidden lg:block">
        <SectionHeader>Frequently Asked Questions</SectionHeader>
      </div>

      <div className="flex justify-center my-10">
        <div className="w-[90%] max-w-[50rem]">
          <Accordion type="single" collapsible>
            {faqs.map((question, index) => (
              <AccordionItem className={cn("border-none")} value={`item-${index}`} key={index}>
                <div className={cn("flex w-full px-3 py-1.5")}>
                  <Image src={question.icon_path} width={38.75} height={38.75} alt="icon" className={cn("mx-10 relative")}/>
                  <AccordionTrigger className={cn(spaceGrotesk.className, "text-[#006793] text-left w-full text-xl font-medium m-auto grow-1 px-5")}>{question.question}</AccordionTrigger>
                </div>
                <AccordionContent className={cn("text-[#006793] text-base")}>{question.answer}</AccordionContent>
              </AccordionItem>
           ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
