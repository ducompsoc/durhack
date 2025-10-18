import { getTimeFormattingValues } from "@durhack/durhack-common/util/format-date"
import type * as React from "react"

import { getEventTimings } from "@/lib/durhack-meta"

const eventTimings = await getEventTimings()
const start = getTimeFormattingValues(eventTimings.start)
const checkInCloses = getTimeFormattingValues(eventTimings.checkInCloses)
const end = getTimeFormattingValues(eventTimings.end)

type FAQ = {
  slug: string
  question: React.ReactNode
  answer: React.ReactNode
  icon_path: string
}

export const faqs = [
  {
    slug: "should-i-attend",
    question: "Should I attend DurHack?",
    icon_path: "/assets/faq/icon-1.svg",
    answer: (
      <>
        <p>
          If you&apos;ve thought at all about attending DurHack, yes! DurHack is welcoming to people of all abilities,
          all that&apos;s important is a willingness to get stuck in with your team. DurHack is designed to have an
          inclusive and encouraging environment, so don&apos;t be afraid to ask anyone for help at the event!
        </p>
        <p>
          DurHack is completely free to attend, and could not run without the generosity of our sponsors. We provide the
          space, WiFi, meals, snacks, and free swag.
        </p>
      </>
    ),
  },
  {
    slug: "venue",
    question: "Where is DurHack happening?",
    icon_path: "/assets/faq/icon-2.svg",
    answer: (
      <>
        <p>
          DurHack will be hosted at Durham University&apos;s Teaching and Learning Centre, South Road, Durham, DH1 3LS,
          England.
        </p>
        <p>
          Google Maps:{" "}
          <a className="underline" href="https://maps.app.goo.gl/LCoCEsoYP45S6rVDA">
            Teaching and Learning Centre • Durham University
          </a>
        </p>
        <p>
          what3words:{" "}
          <a className="underline" href="https://what3words.com/thank.shop.merit">
            <code>thank.shop.merit</code>
          </a>
        </p>
      </>
    ),
  },
  {
    slug: "travel-costs",
    question: "Will I be able to get my travel costs reimbursed?",
    icon_path: "/assets/faq/icon-3.svg",
    answer: (
      <>
        <p>
          Hackers travelling from Manchester, Leeds, Nottingham or Sheffield can obtain reduced-price coaches directly
          to DurHack organised by us.
        </p>
         <br></br>
        <p>
          Book tickets{" "}
          <a
            className="font-bold underline"
            href="https://www.durhamsu.com/groups/computing-766e/events/durhack-coach-tickets-manchester-leeds-nottingham-sheffield"
          >
            here
          </a>
          .
        </p>
        <br></br>
        <p>Please note you must also have a ticket to DurHack to attend the event.</p>
        <p>
          Hackers from the above cities who do not travel via the DurHack organised coach will not be 
          
        </p>
        <p>eligible for travel reimbursement unless with prior written exception.</p>
        <br></br>
        <p>
          For hackers travelling from outside of these cities, we will reimburse 50% of your travel costs up to the
          following caps:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>&lt;20 miles (e.g. Newcastle) — £5</li>
          <li>20-60 miles — £15</li>
          <li>60–150 miles (e.g. Lancaster) — £30</li>
          <li>150+ miles (e.g. London, Oxford) — £55</li>
        </ul>
        <p>If you are travelling on our coaches, you will not be not eligible for any other travel reimbursement.</p>
        <br></br>
        <p>
          If you are travelling in a group by car, or have any other travel queries, please reach out to{" "}
          <a href="mailto:travel@durhack.com">travel@durhack.com</a>.
        </p>
        <br></br>
        <p>All travel reimbursement is conditional on:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Having a DurHack ticket</li>
          <li>Attending DurHack and being checked in at the event</li>
          <li>Devpost project submission</li>
        </ul>
        <br></br>
        <p>
          Please keep your receipt(s): we will release a form shortly after DurHack for you to put in your details and
          upload the receipt(s). Reimbursement should come through by the end of December.
        </p>
      </>
    ),
  },
  {
    slug: "timings",
    question: "What time does DurHack start and end?",
    icon_path: "/assets/faq/icon-4.svg",
    answer: (
      <>
        <p>
          Check-in for DurHack is {start.time}-{checkInCloses.time} on {start.day} {start.date}
          <sup>{start.dateOrdinalSuffix}</sup> {start.month}, and we&apos;re expecting to finish our closing ceremony at{" "}
          {end.time} on {end.day}.
        </p>
      </>
    ),
  },
  {
    slug: "coding-experience",
    question: "Do I need to be able to code to attend DurHack?",
    icon_path: "/assets/faq/icon-1.svg",
    answer: (
      <>
        <p>
          The most important thing when attending a hackathon is your enthusiasm for technology. DurHack is passionate
          about being very welcoming and beginner-friendly, and you&apos;ll learn loads at the event!
        </p>
        <p>We&apos;ll also be running several lead-up workshops with CompSoc to prepare people for DurHack.</p>
      </>
    ),
  },
  {
    slug: "food",
    question: "What can I eat?",
    icon_path: "/assets/faq/icon-2.svg",
    answer: (
      <>
        <p>
          We&apos;ll provide you with meals, snacks and drinks throughout the weekend, leaving you to concentrate on
          your projects. If you have special dietary requirements, please let us know when you register.
        </p>
        <p>
          For allergy reasons, please don&apos;t bring any products containing nuts (including peanuts) into the venue.
        </p>
      </>
    ),
  },
  {
    slug: "what-to-bring",
    question: "What should I bring?",
    icon_path: "/assets/faq/icon-3.svg",
    answer: (
      <>
        <p>
          All attendees will need to show valid student ID (other photo ID is acceptable for graduates) and one form of
          legal ID at registration. You&apos;ll also need a laptop and a charger, and you might want to bring
          toiletries.
        </p>
      </>
    ),
  },
  {
    slug: "who-can-attend",
    question: "Are students or alumni who aren't from Durham allowed to attend?",
    icon_path: "/assets/faq/icon-4.svg",
    answer: <p>Absolutely! We welcome students from any university, as long a you were a student in the last year.</p>,
  },
  {
    slug: "i-have-no-team",
    question: "What if I don't have a team?",
    icon_path: "/assets/faq/icon-1.svg",
    answer: (
      <>
        <p>
          Don&apos;t worry! Part of the fun of a hackathon is meeting new people. We&apos;ll have a team-forming event
          before hacking begins for those who want to meet and form new teams.
        </p>
      </>
    ),
  },
  {
    slug: "team-sizes",
    question: "How large can my team be?",
    icon_path: "/assets/faq/icon-2.svg",
    answer: (
      <>
        <p>
          There&apos;s absolutely no obligation for you to come to DurHack with a pre-made team. Many attendees
          won&apos;t, and we&apos;ll run team-forming exercises at the start to make sure everyone is part of an awesome
          team
        </p>
        <p>
          However, if you are already looking for teammates, there is a maximum of 4 people allowed per team. Remember
          that, of course, each member of your team needs to have their own DurHack ticket.
        </p>
      </>
    ),
  },
  {
    slug: "rest-overnight",
    question: "Can I take a break overnight?",
    icon_path: "/assets/faq/icon-3.svg",
    answer: (
      <>
        <p>
          You&apos;ll have 24 hours to create your project. It&apos;s important to take regular breaks, and that&apos;s
          why we&apos;ll be providing a relaxation room for attendees to have a rest if they want. Part of the fun of
          the hackathon is coding through the night!
        </p>
      </>
    ),
  },
  {
    slug: "what-can-i-make",
    question: "What can I build and who owns the IP?",
    icon_path: "/assets/faq/icon-1.svg",
    answer: (
      <>
        <p>
          Web apps, mobile apps, hardware, anything! Projects will be judged based on their creativity, technical
          accomplishments, polish and usefulness by our judges.
        </p>
        <p>The IP of your work remains with you, the attendees.</p>
      </>
    ),
  },
  {
    slug: "code-of-conduct",
    question: "Do you have a code of conduct?",
    icon_path: "/assets/faq/icon-2.svg",
    answer: (
      <>
        <p>Everybody at DurHack will be expected to abide by the MLH Code of Conduct.</p>
        <p>TL;DR: be respectful to each other.</p>
      </>
    ),
  },
  {
    slug: "other-questions",
    question: "What if I have other questions?",
    icon_path: "/assets/faq/icon-3.svg",
    answer: (
      <>
        <p>
          If you&apos;re still not sure about something, drop us a line at hello@durhack.com and we&apos;ll be very
          happy to help!
        </p>
      </>
    ),
  },
] satisfies FAQ[]
