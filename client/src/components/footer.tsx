import Link from "next/link"

export function Footer() {
  const mlhCodeOfConduct = (
    <Link className="underline" href="https://mlh.io/code-of-conduct">
      MLH Code of Conduct
    </Link>
  )
  const compsoc = (
    <Link className="underline" href="https://compsoc.tech">
      compsoc.tech
    </Link>
  )
  const durhamStudentsUnion = (
    <Link className="underline" href="https://durhamsu.com">
      durhamsu.com
    </Link>
  )
  const durhamStudentsUnionCompany = (
    <Link className="underline" href="https://find-and-update.company-information.service.gov.uk/company/07689815">
      07689815
    </Link>
  )
  const durhamStudentsUnionCharity = (
    <Link
      className="underline"
      href="https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5023833"
    >
      1145400
    </Link>
  )

  return (
    <footer className="border-muted-foreground border-t py-6 md:px-8 md:py-0 bg-[rgba(29,25,52,1)]">
      <div className="container flex flex-col items-center text-center justify-between gap-4 md:py-4">
        <p>DurHack follows the {mlhCodeOfConduct}.</p>
        <p>
          DurHack is an event hosted by Durham University Computing Society ({compsoc}), which is a student society
          affiliated with Durham Students' Union ({durhamStudentsUnion}). Durham Students' Union is registered in
          England as a company limited by guarantee ({durhamStudentsUnionCompany}) and a charity (
          {durhamStudentsUnionCharity}), with VAT number 119733690 and registered office Dunelm House, New Elvet, Durham
          DH1 3AN.
        </p>
      </div>
    </footer>
  )
}

/**
 * DurHack follows the __MLH Code of Conduct__. Photos and videos taken at events in 2024 .
 *
 * DurHack is an event hosted by Durham University Computing Society (__compsoc.tech__), which is a student society affiliated with Durham Students' Union (__durhamsu.com__). Durham Students' Union is registered in England as a company limited by guarantee (07689815) and a charity (1145400), with VAT number 119733690 and registered office Dunelm House, New Elvet, Durham DH1 3AN.
 */
