import Image from "next/image"
import type * as React from "react"

type ImageComponent = React.FC<Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">>

type OrganisationInput = {
  slug: string
  title: string
  image: ImageComponent
  link: string
  privacyPolicyLink?: string | null | undefined
  privacyPolicyTitle?: string | null | undefined
}

const organisations = [
  {
    slug: "tekgem",
    title: "Tekgem",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/tekgem-portrait-for-white-background.svg"
        alt="TekGem"
        width={119.96}
        height={145.56}
      />
    ),
    link: "https://www.tekgem.co",
  },
  {
    slug: "marshall-wace",
    title: "Marshall Wace",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/marshall-wace.svg" alt="Marshall Wace" width={1070} height={389} />
    ),
    link: "https://www.mwam.com",
    privacyPolicyLink: "https://www.mwam.com/regulatory-disclosures/privacy-policy",
  },
  {
    slug: "rewriting-the-code",
    title: "Rewriting the Code",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/rewriting-the-code.svg"
        alt="Rewriting the Code"
        width={240}
        height={217.567}
      />
    ),
    link: "https://rewritingthecode.org",
  },
  {
    slug: "waterstons",
    title: "Waterstons Ltd.",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/waterstons.svg" alt="Waterstons" width={567.04} height={311.04} />
    ),
    link: "https://waterstons.com",
    privacyPolicyLink: "https://www.waterstons.com/about-us/privacy-statement",
    privacyPolicyTitle: "Privacy Statement",
  },
  {
    slug: "qube-research-and-tech",
    title: "Qube Research & Technologies",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/qrt-stacked-for-white-background.svg"
        alt="Qube Research & Technologies"
        width={290}
        height={331.92}
      />
    ),
    link: "https://www.qube-rt.com",
    privacyPolicyLink: "https://www.qube-rt.com/privacy-policy",
  },
  {
    slug: "assured-data-protection",
    title: "Assured Data Protection",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/assured-data-protection.svg"
        alt="Assured Data Protection"
        width={1800}
        height={600}
      />
    ),
    link: "https://assured-dp.com",
  },
  {
    slug: "accenture",
    title: "Accenture",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/accenture.svg" alt="Accenture" width={909} height={240} />
    ),
    link: "https://www.accenture.com/gb-en",
    privacyPolicyLink: "https://www.accenture.com/gb-en/support/privacy-policy",
  },
  {
    slug: "atom-bank",
    title: "Atom Bank",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/atom-bank.svg" alt="Atom Bank" width={599.96} height={243.2} />
    ),
    link: "https://www.atombank.co.uk",
  },
  {
    slug: "durham-uni-venture-lab",
    title: "Durham University Venture Lab",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/venture-lab.svg"
        alt="Durham University Venture Lab"
        width={120}
        height={120}
      />
    ),
    link: "https://www.durham.ac.uk/venturelab",
  },
  {
    slug: "major-league-hacking",
    title: "Major League Hacking",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/mlh-logo-color.svg"
        alt="Major League Hacking"
        width={310.59}
        height={130.78}
      />
    ),
    link: "https://mlh.io",
  },
  {
    slug: "durham-uni-computing-society",
    title: "Durham University Computing Society",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/compsoc-v5-with-text.svg"
        alt="Durham University Computing Society"
        width={534.81}
        height={169.33}
      />
    ),
    link: "https://compsoc.tech",
  },
  {
    slug: "overleaf",
    title: "Overleaf",
    image: (props) => <Image {...props} src="/assets/sponsors/overleaf.svg" alt="Overleaf" width={130} height={38} />,
    link: "https://www.overleaf.com",
  },
  {
    slug: "keyboard-co",
    title: "The Keyboard Company",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/keyboard-company.svg"
        alt="The Keyboard Company"
        width={566.9}
        height={198.4}
      />
    ),
    link: "https://www.keyboardco.com",
  },
  {
    slug: "rs-group",
    title: "RS Group",
    image: (props) => <Image {...props} src="/assets/sponsors/rs-group.svg" alt="RS Group" width={24} height={24} />,
    link: "https://uk.rs-online.com/web/content/discovery/education",
  },
  {
    slug: "pragmatic-semi",
    title: "Pragmatic Semiconductor",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/pragmatic-semi.svg"
        alt="Pragmatic Semiconductor"
        width={703.7}
        height={258.4}
      />
    ),
    link: "https://www.pragmaticsemi.com",
  },
  {
    slug: "durham-uni-computer-science",
    title: "Durham University Computer Science",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/durham-uni.svg"
        alt="Durham University Computer Science"
        width={703.7}
        height={258.4}
      />
    ),
    link: "https://www.durham.ac.uk/departments/academic/computer-science",
  },
  {
    slug: "stand-out-stickers",
    title: "StandOut Stickers",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/stand-out-stickers.svg"
        alt="StandOut Stickers"
        width={230}
        height={122.55}
      />
    ),
    link: "https://hackp.ac/mlh-standoutstickers-hackathons",
  },
  {
    slug: "durham-uni-esports-and-gaming",
    title: "Durham University Esports & Gaming",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/dueg.svg"
        alt="Durham University Esports & Gaming"
        width={24}
        height={24}
      />
    ),
    link: "https://www.durham.ac.uk/colleges-and-student-experience/enrichment-activities/esports/dueg-info-page",
  },
  {
    slug: "durham-uni-student-union",
    title: "Durham Students' Union",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/durham-student-union.svg"
        alt="Durham Students' Union"
        width={1920}
        height={1080}
      />
    ),
    link: "https://www.durhamsu.com",
  },
  {
    slug: "durham-county-council",
    title: "Durham County Council",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/durham-county-council.svg"
        alt="Durham County Council"
        width={1002.6667}
        height={426.66666}
      />
    ),
    link: "https://www.durham.gov.uk",
  },
  {
    slug: "intel",
    title: "Intel",
    image: (props) => <Image {...props} src="/assets/sponsors/intel.svg" alt="Intel" width={395.4} height={155.9} />,
    link: "https://www.intel.com",
  },
  {
    slug: "hackathons-uk",
    title: "Hackathons UK",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/hackathonsuk.svg" alt="Hackathons UK" width={282.43} height={77.11} />
    ),
    link: "https://www.hackathons.org.uk",
  },
  {
    slug: "amazon-web-services",
    title: "Amazon Web Services",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/amazon-web-services.svg"
        alt="Amazon Web Services"
        width={79}
        height={48}
      />
    ),
    link: "https://aws.amazon.com",
  },
  {
    slug: "github",
    title: "GitHub",
    image: (props) => <Image {...props} src="/assets/sponsors/github.svg" alt="GitHub" width={600} height={200} />,
    link: "https://www.github.com",
  },
  {
    slug: "barclays",
    title: "Barclays",
    image: (props) => <Image {...props} src="/assets/sponsors/barclays.svg" alt="Barclays" width={500} height={90} />,
    link: "https://home.barclays",
  },
  {
    slug: "netcraft",
    title: "Netcraft",
    image: (props) => <Image {...props} src="/assets/sponsors/netcraft.svg" alt="Netcraft" width={253} height={44} />,
    link: "https://www.netcraft.com",
  },
  {
    slug: "g-research",
    title: "G-Research",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/g-research.svg" alt="G-Research" width={19.477} height={24} />
    ),
    link: "https://www.gresearch.com",
    privacyPolicyLink: "https://www.gresearch.com/privacy-policy",
  },
  {
    slug: "newton-consulting",
    title: "Newton Consulting Ltd.",
    image: (props) => (
      <Image
        {...props}
        src="/assets/sponsors/newton-consulting.svg"
        alt="Newton Consulting Ltd."
        width={150}
        height={36}
      />
    ),
    link: "https://www.newtonimpact.com",
  },
  {
    slug: "ibm",
    title: "IBM Corporation",
    image: (props) => <Image {...props} src="/assets/sponsors/ibm.svg" alt="IBM Corporation" width={58} height={23} />,
    link: "https://www.ibm.com",
  },
  {
    slug: "talkjs",
    title: "TalkJS",
    image: (props) => <Image {...props} src="/assets/sponsors/talkjs-logo.svg" alt="TalkJS" width={600} height={681} />,
    link: "https://talkjs.com",
    privacyPolicyLink: "https://talkjs.com/privacy",
  },
  {
    slug: "neptune-north",
    title: "Neptune North",
    image: (props) => (
      <Image {...props} src="/assets/sponsors/neptune-north.svg" alt="Neptune North" width={1e3} height={297.4} />
    ),
    link: "https://neptunenorth.co.uk",
    privacyPolicyLink: "https://www.neptunenorth.co.uk/privacy-policy",
  },
  {
    slug: "oag",
    title: "OAG",
    image: (props) => <Image {...props} src="/assets/sponsors/oag.svg" alt="OAG" width={90} height={40} />,
    link: "https://www.oag.com",
    privacyPolicyLink: "https://www.oag.com/privacy-notice",
  },
  {
    slug: "tpp",
    title: "TPP",
    image: (props) => <Image {...props} src="/assets/sponsors/tpp.svg" alt="TPP" width={1170} height={666} />,
    link: "https://tpp-uk.com/",
  },
] as const satisfies OrganisationInput[]

export type OrganisationSlug = (typeof organisations)[number]["slug"]
export type Organisation = OrganisationInput & { slug: OrganisationSlug }

const organisationsMap = new Map(organisations.map((organisation) => [organisation.slug, organisation])) satisfies Map<
  string,
  OrganisationInput
> as Map<string, Organisation>

export function getOrganisationSlugs(): readonly OrganisationSlug[] {
  return Array.from(organisationsMap.keys()) as OrganisationSlug[]
}

export function getOrganisationBySlug(slug: OrganisationSlug): Organisation
export function getOrganisationBySlug(slug: string): Organisation | undefined
export function getOrganisationBySlug(slug: string): Organisation | undefined {
  return organisationsMap.get(slug)
}

export function getAllOrganisations(): readonly Readonly<Organisation>[] {
  return Array.from(organisations) satisfies OrganisationInput[] as Readonly<Organisation>[]
}
