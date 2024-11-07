// https://petermorlion.com/iterating-a-typescript-enum/
export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
}

export function enumValues<O extends object, K extends keyof O = keyof O>(obj: O): O[K][] {
  return enumKeys(obj).map((key) => obj[key]) as O[K][]
}
