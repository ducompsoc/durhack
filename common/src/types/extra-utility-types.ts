/**
 * Include null and undefined in T
 */
export type Nullable<T> = T | null | undefined

/**
 * Make all properties in T nullable
 */
export type AllNullable<T> = {
  [P in keyof T]: Nullable<T>
}

/**
 * Make all properties in T non-nullable
 */
export type AllNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

/**
 * Make all properties in T nullable and optional
 */
export type Incomplete<T> = {
  [P in keyof T]?: Nullable<T[P]>
}

/**
 * Make all properties in T non-nullable and required
 */
export type Complete<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

/**
 * An object whose set of properties and their types is unknown
 */
// biome-ignore lint/suspicious/noExplicitAny: to allow the key type to be any (unknown) type
export type UnknownObject = { [P in keyof any]?: unknown }

/**
 * Construct a type with unknown properties of type T
 */
export type StringRecord<T> = UnknownObject & { [P in string]?: Nullable<T> }

/**
 * A function whose parameter types and return type is unknown
 */
export type UnknownFunction = (...args: unknown[]) => unknown
