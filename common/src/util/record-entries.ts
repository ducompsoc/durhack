/**
 * Applies {@link Object.entries} to a <code>{@link Record}&lt;X,Y&gt;</code> object and casts the return value to
 * <code>Array&lt;[X, Y]&gt;</code>.
 *
 * This should only be used on 'data' records that **definitely do not contain additional keys**.
 * See the example below to understand that strictly type-annotated records may be implicitly 'polluted' with
 * keys that do not adhere to their annotated key type.
 *
 * This is a helper function that overcomes the issue that {@link Object.entries} does not restrict the type of
 * key values in its return value, i.e.
 * ```ts
 * const a: Record<"foo" | "bar", number> = { "foo": 10, "bar": 20 }
 * const entries = Object.entries(a)
 * // 'entries' has type Array<[string, number]>
 * ```
 * That behaviour is correct, because {@link Object.entries} will include 'all enumerable own properties'
 * of the provided object, for example:
 * ```ts
 * const x: Readonly<Record<"foo" | "bar", number>> = { "foo": 10, "bar": 20 }
 * function compute_baz(x: Record<"foo" | "bar", number> & { _baz?: number }) {
 *   if (x._baz != null) return x._baz
 *   const baz = x.foo + x.bar
 *   x._baz = value
 *   return value
 * }
 * compute_baz(x)  // this does not raise a type error as the '_baz' property is optional and not readonly
 * const entries = Object.entries(x)
 * // 'entries' has value [["foo", 10], ["bar", 20], ["_baz", 30]]
 * // it would be incorrect to annotate 'entries' as type Array<["foo" | "bar", number]>
 * ```
 */
export function recordEntries<X extends string, Y>(record: Record<X, Y>): [X, Y][] {
  return Object.entries(record) as [X, Y][]
}
