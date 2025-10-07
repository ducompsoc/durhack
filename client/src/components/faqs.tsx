import {
  Accordion,
  AccordionChevron,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@durhack/web-components/ui/accordion"
import Image from "next/image"
import type * as React from "react"
import { SectionHeader } from "@/components/section-header"
import { faqs } from "@/config/faqs"
import { cn } from "@/lib/utils"
import { spaceGrotesk } from "@/lib/google-fonts"

export function Faqs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("faq", className)} {...props}>
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
              <AccordionItem className={cn("border-none")} key={question.slug} value={`item-${index}`}>
                <div className={cn("flex-row justify-between items-center w-full")}>
                  <AccordionTrigger
                    className={cn(
                      spaceGrotesk.className,
                      "text-[#006793] text-left text-xl font-medium px-5 flex w-full flex-1 justify-between",
                    )}
                  >
                    <Image
                      src={question.icon_path}
                      width={38.75}
                      height={38.75}
                      alt="icon"
                      className={cn("shrink-0 mx-10")}
                    />
                    {question.question}
                    <AccordionChevron className={cn("fill-current text-[#006793] accordion-chevron ml-auto")} />
                  </AccordionTrigger>
                </div>
                  <AccordionContent className={cn("text-[#006793] text-base")}>
                    {question.answer}
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
