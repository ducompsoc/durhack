'use client'
import {
  Accordion,
  AccordionChevron,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@durhack/web-components/ui/accordion";
import {faqs} from "@/config/faqs";
import {cn} from "@/lib/utils";
import Image from "next/image"
import {spaceGrotesk} from "@/lib/google-fonts";
import React, {useEffect} from "react";

export default function FaqAccordion() {
  const [value, setValue] = React.useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', "")
      if (hash) setValue(hash)
    }

    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)
  }, []);

  const handleValueChange = (newValue: string) => {
    setValue(newValue)

    if (newValue) window.history.pushState(null, "", `#${newValue}`)
    else window.history.pushState(null, "", '/')
  }

  return (
  <Accordion type="single" collapsible value={value} onValueChange={handleValueChange}>
    {faqs.map((question, index) => (
      <AccordionItem className={cn("border-none")} key={question.slug} value={`faq-${index}`} id={`faq-${index}`}>
        <div className={cn("flex-row justify-between items-center w-full")}>
          <AccordionTrigger
            className={cn(
              spaceGrotesk.className,
              "text-white text-left text-xl font-medium px-5 flex w-full flex-1 justify-between",
            )}
          >
            <Image
              src={question.icon_path}
              width={38.75}
              height={38.75}
              alt="icon"
              className={cn("shrink-0 mr-10")}
            />
            {question.question}
            <AccordionChevron className={cn("fill-current text-white accordion-chevron ml-auto")} />
          </AccordionTrigger>
        </div>
        <AccordionContent className={cn("text-white text-base")}>{question.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
  )
}
