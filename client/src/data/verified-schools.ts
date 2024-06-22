const schoolNameRegex = new RegExp('^"?(.+)"?$', 'gm')

export async function getVerifiedSchoolsList(): Promise<string[]> {
  const response = await fetch("https://github.com/MLH/mlh-policies/raw/main/schools.csv",)
  const body = await response.text()
  const matches = body.matchAll(schoolNameRegex)
  matches.next() // ignore the header line
  const schoolNames = Array.from(matches)
    .map(match => match[1])
  const uniqueSchoolNames = new Set(schoolNames)
  return Array.from(uniqueSchoolNames)
}
