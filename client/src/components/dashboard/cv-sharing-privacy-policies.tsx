import type * as React from "react"

import { type Sponsor, sponsors} from "@/config/sponsors"
import { getOrganisationBySlug } from "@/config/organisations"

function CvSharingPrivacyPolicy({ sponsor, ...props }: React.ComponentProps<"li"> & { sponsor: Sponsor }) {
  const organisation = getOrganisationBySlug(sponsor.organisationSlug)
  return <li {...props}>
    <a className="underline" href={organisation.privacyPolicyLink ?? undefined}>
      {organisation.title} {organisation.privacyPolicyTitle ?? "Privacy Policy"}
    </a>
  </li>
}

export function CvSharingPrivacyPolicies({ style, ...props }: React.ComponentProps<"ul">) {
  // prefer 'sponsors' to 'signedSponsors' here as we want to *include* sponsors that haven't signed yet
  // otherwise some applicants will upload CVs before the sponsor has signed, and they won't have agreed to the
  // relevant privacy policy
  const cvSharingSponsors = sponsors.filter((sponsor) => sponsor.cvSharing)
  return (
    <ul style={{listStyleType: '"- "', ...style}} {...props}>
      {cvSharingSponsors.map((sponsor) => <CvSharingPrivacyPolicy key={sponsor.organisationSlug} sponsor={sponsor} />)}
    </ul>
  )
}
