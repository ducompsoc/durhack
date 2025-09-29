'use client';

import type React from "react"
import { useState } from "react"
import { audiowide, spaceGrotesk } from "@/lib/google-fonts"
import { cn } from "@/lib/utils"

export function FAQ(props: React.HTMLAttributes<HTMLDivElement>) {
  const faqs = [
    {
      q: "Should I attend DurHack?",
      a: "If you've thought at all about attending DurHack, yes! DurHack is welcoming to people of all abilities, all that's important is a willingness to get stuck in with your team. DurHack is designed to have an inclusive and encouraging environment, so don't be afraid to ask anyone for help at the event! DurHack is completely free to attend, and could not run without the generosity of our sponsors. We provide the space, WiFi, meals, snacks, and free swag.",
      icon: <img src="/faq/icon-clover.svg" alt="" className="h-5 w-5" />
    },
    { 
      q: "Where is DurHack happening?", 
      a: "DurHack will be hosted at Durham University's Teaching and Learning Centre, South Road, Durham, DH1 3LS, England. Google Maps: Teaching and Learning Centre • Durham University what3words: thank.shop.merit",
      icon: <img src="/faq/icon-leaf.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "Will I be able to get my travel costs reimbursed?",
      a: "DurHack will be offering partial-to-full travel reimbursement (depending on your region). Please keep your receipt(s): we will release a form shortly after 5th November for you to put in your details and upload the receipt(s). Reimbursement should come through by 17th December. We have the following regional caps: 20 miles (e.g. Newcastle) - £10, 20-100 miles (e.g. Leeds, Lancaster) - £40, 100+ miles (e.g. London, Oxford) - £65 (These should cover most standard train tickets - if you need to travel in an alternative way that may be more expensive, or your train is more than the price above and you need extra support in paying for it, please reach out to us providing more information).",
      icon: <img src="/faq/icon-flower.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "Do I need to be able to code to attend DurHack?",
      a: "The most important thing when attending a hackathon is your enthusiasm for technology. DurHack is passionate about being very welcoming and beginner-friendly, and you'll learn loads at the event! We'll also be running several lead-up workshops with CompSoc to prepare people for DurHack.",
      icon: <img src="/faq/icon-leaves.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "What can I eat?",
      a: "We'll provide you with meals, snacks and drinks throughout the weekend, leaving you to concentrate on your projects. If you have special dietary requirements, please let us know when you register. For allergy reasons, please don't bring any products containing nuts (including peanuts) into the venue.",
      icon: <img src="/faq/icon-clover.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "What if I don't have a team?",
      a: "Don't worry! Part of the fun of a hackathon is meeting new people. We'll have a team-forming event before hacking begins for those who want to meet and form new teams.",
      icon: <img src="/faq/icon-leaf.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "What should I bring?",
      a: "All attendees will need to show valid student ID (other photo ID is acceptable for graduates) at registration. You'll also need a laptop and a charger, and you might want to bring toiletries.",
      icon: <img src="/faq/icon-flower.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "How large can my team be?",
      a: "There's absolutely no obligation for you to come to DurHack with a pre-made team. Many attendees won't, and we'll run team-forming exercises at the start to make sure everyone is part of an awesome team. However, if you are already looking for teammates, there is a maximum of 4 people allowed per team. Remember that, of course, each member of your team needs to have their own DurHack ticket.",
      icon: <img src="/faq/icon-leaves.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "Can I take a break overnight?",
      a: "You'll have 24 hours to create your project. It's important to take regular breaks, and that's why we'll be providing a relaxation room for attendees to have a rest if they want. Part of the fun of the hackathon is coding through the night!",
      icon: <img src="/faq/icon-clover.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "What can I build and who owns the IP?",
      a: "Web apps, mobile apps, hardware, anything! Projects will be judged based on their creativity, technical accomplishments, polish and usefulness by our judges. The IP of your work remains with you, the attendees.",
      icon: <img src="/faq/icon-leaf.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "Do you have a code of conduct?",
      a: "Everybody at DurHack will be expected to abide by the MLH Code of Conduct. TL;DR: be respectful to each other.",
      icon: <img src="/faq/icon-flower.svg" alt="" className="h-5 w-5" />
    },
    {
      q: "What if I have other questions?",
      a: "If you're still not sure about something, drop us a line at hello@durhack.com and we'll be very happy to help!",
      icon: <img src="/faq/icon-leaves.svg" alt="" className="h-5 w-5" />
    }
  ]

  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="faq relative flex items-start justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <h1
          className={cn(
            audiowide.className,
            "text-[#238CBA] uppercase mt-44 mb-12 lg:text-5xl md:text-3xl text-2xl text-center font-normal"
          )}
        >
          Frequently Asked Questions
        </h1>

        <ul className="divide-y divide-white/0">
          {faqs.map((faq, index) => {
            const isOpen = selected === index

            return (
              <li key={index} className="border-b-0">
                <button
                  onClick={() => setSelected(isOpen ? null : index)}
                  className={cn(
                    spaceGrotesk.className,
                    "w-full flex justify-between items-center py-5 text-left font-medium focus:outline-none focus-visible:ring transition-colors",
                    isOpen ? "underline text-[#006793]" : "text-[#006793] hover:underline"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <div className="flex items-center gap-2">
                    {faq.icon}
                    <span className="text-lg md:text-xl pr-6">{faq.q}</span>
                  </div>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 text-[#006793]">{faq.a}</div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
