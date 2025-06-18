interface ObjectConstructor {
  hasOwn<T extends PropertyKey>(o: object, v: T): o is object & { [K in T]: unknown }
}
