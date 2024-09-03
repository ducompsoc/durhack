export type DeepPartial<T> = T extends (...rest: unknown[]) => unknown
  ? T
  : T extends object
    ? DeepPartialObject<T>
    : T | undefined

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>
}
