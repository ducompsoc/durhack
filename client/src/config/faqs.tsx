import * as React from "react"

type FAQ = {
  slug: string,
  question: React.ReactNode,
  answer: React.ReactNode
}

export const faqs = [
  {
    slug: "should-i-attend",
    question: "Should I attend DurHack?",
    answer: <>
      <p>If you&apos;ve thought at all about attending DurHack, yes! DurHack is welcoming to people of all abilities, all that&apos;s important is a willingness to get stuck in with your team. DurHack is designed to have an inclusive and encouraging environment, so don&apos;t be afraid to ask anyone for help at the event!</p>
      <p>DurHack is completely free to attend, and could not run without the generosity of our sponsors. We provide the space, WiFi, meals, snacks, and free swag.</p>
    </>
  },
  {
    slug: "venue",
    question: "Where is DurHack happening?",
    answer: <>
      <p>DurHack will be hosted at Durham University&apos;s Teaching and Learning Centre, South Road, Durham, DH1 3LS, England.</p>
      <p>Google Maps: <a className="underline" href="https://maps.app.goo.gl/LCoCEsoYP45S6rVDA">Teaching and Learning Centre • Durham University</a></p>
      <p>what3words: <a className="underline" href="https://what3words.com/thank.shop.merit"><code>thank.shop.merit</code></a></p>
    </>
  },
  {
    slug: "travel-costs",
    question: "Will I be able to get my travel costs reimbursed?",
    answer: <>
      <p>DurHack will be offering partial-to-full travel reimbursement (depending on your region). Please keep your receipt(s): we will release a form shortly after 5th November for you to put in your details and upload the receipt(s). Reimbursement should come through by 17th December.</p>
      <p>We have the following regional caps: </p>
      <p>20 miles (e.g. Newcastle) - £10, 20-100 miles (e.g. Leeds, Lancaster) - £40, 100+ miles (e.g. London, Oxford) - £65 </p>
      <p>(These should cover most standard train tickets - if you need to travel in an alternative way that may be more expensive, or your train is more than the price above and you need extra support in paying for it, please reach out to us providing more information).</p>
    </>
  },
  {
    slug: "timings",
    question: "What time does DurHack start and end?",
    answer: <>
      <p>Check-in for DurHack is 9:30-10:30am on 2nd November, and we&apos;re expecting to finish our closing ceremony at 16:30 on Sunday.</p>
    </>
  },
  {
    slug: "coding-experience",
    question: "Do I need to be able to code to attend DurHack?",
    answer: <>
      <p>The most important thing when attending a hackathon is your enthusiasm for technology. DurHack is passionate about being very welcoming and beginner-friendly, and you&apos;ll learn loads at the event!</p>
      <p>We&apos;ll also be running several lead-up workshops with CompSoc to prepare people for DurHack.</p>
    </>
  },
  {
    slug: "food",
    question: "What can I eat?",
    answer: <>
      <p>We&apos;ll provide you with meals, snacks and drinks throughout the weekend, leaving you to concentrate on your projects. If you have special dietary requirements, please let us know when you register.</p>
      <p>For allegery reasons, please don&apos;t bring any products containing nuts (including peanuts) into the venue.</p>
    </>
  },
  {
    slug: "what-to-bring",
    question: "What should I bring?",
    answer: <>
      <p>All attendees will need to show valid student ID (other photo ID is acceptable for graduates) at registration. You&apos;ll also need a laptop and a charger, and you might want to bring toiletries.</p>
    </>
  },
  {
    slug: "who-can-attend",
    question: "Are students or alumni who aren't from Durham allowed to attend?",
    answer: <p>Absolutely! We welcome students from any university, as long a you were a student in the last year.</p>
  },
  {
    slug: "i-have-no-team",
    question: "What if I don't have a team?",
    answer: <>
      <p>Don&apos;t worry! Part of the fun of a hackathon is meeting new people. We&apos;ll have a team-forming event before hacking begins for those who want to meet and form new teams.</p>
    </>
  },
  {
    slug: "team-sizes",
    question: "How large can my team be?",
    answer: <>
      <p>There&apos;s absolutely no obligation for you to come to DurHack with a pre-made team. Many attendees won&apos;t, and we&apos;ll run team-forming exercises at the start to make sure everyone is part of an awesome team</p>
      <p>However, if you are already looking for teammates, there is a maximum of 4 people allowed per team. Remember that, of course, each member of your team needs to have their own DurHack ticket.</p>
    </>
  },
  {
    slug: "rest-overnight",
    question: "Can I take a break overnight?",
    answer: <>
      <p>You&apos;ll have 24 hours to create your project. It&apos;s important to take regular breaks, and that&apos;s why we&apos;ll be providing a relaxation room for attendees to have a rest if they want. Part of the fun of the hackathon is coding through the night!</p>
    </>
  },
  {
    slug: "what-can-i-make",
    question: "What can I build and who owns the IP?",
    answer: <>
      <p>Web apps, mobile apps, hardware, anything! Projects will be judged based on their creativity, technical accomplishments, polish and usefulness by our judges.</p>
      <p>The IP of your work remains with you, the attendees.</p>
    </>
  },
  {
    slug: "code-of-conduct",
    question: "Do you have a code of conduct?",
    answer: <>
      <p>Everybody at DurHack will be expected to abide by the MLH Code of Conduct.</p>
      <p>TL;DR: be respectful to each other.</p>
    </>
  },
  {
    slug: "other-questions",
    question: "What if I have other questions?",
    answer: <>
      <p>If you&apos;re still not sure about something, drop us a line at hello@durhack.com and we&apos;ll be very happy to help!</p>
    </>
  },
] satisfies FAQ[]
