// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#using_options

const pluralRules = new Intl.PluralRules("en-GB", { type: "ordinal" })

const suffixes = new Map<string, string>([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
])

function getOrdinalSuffixForRule(rule: Intl.LDMLPluralRule): string
function getOrdinalSuffixForRule(rule: string): string | undefined {
  return suffixes.get(rule)
}

export function getOrdinalSuffix(n: number): string {
  const rule = pluralRules.select(n)
  return getOrdinalSuffixForRule(rule)
}
